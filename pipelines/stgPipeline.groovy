#!groovy

try {

  node('azure-slave') {

    env.DOCKER_IMAGE ='hub.fif.tech/base/fif-common-pm2:11.12.0-3.2.9-1'

    env.DOCKER_TERRAFORM_IMAGE ='hub.fif.tech/base/fif-terraform:3.0.0'

    env.VAULT_ADDR = 'https://vault.fif.tech:8200'

    env.IMAGE_NAME = 'gateway-compras-front'

    env.CLUSTER = 'banco-co-gateway-compras'

    env.ENVIRONMENT = 'stg'

    stage('Docker pull') {

      docker.image('$DOCKER_IMAGE').pull()

      docker.image('$DOCKER_TERRAFORM_IMAGE').pull()

    }

    stage('Clean Workspace') {

      docker.image('$DOCKER_IMAGE').inside('-u root'){

        sh('find ${WORKSPACE} -mindepth 1 -delete')

      }

      docker.image('$DOCKER_TERRAFORM_IMAGE').inside('-u root --entrypoint=""'){

        sh('find ${WORKSPACE} -mindepth 1 -delete')

      }

    }

    stage('Checkout') {

      checkout scm

    }



    stage('Download production dependencies'){

      docker.image('$DOCKER_IMAGE').inside('-u root'){

        withCredentials([[$class: 'StringBinding', credentialsId: 'jenkins-npm', variable: 'PASSWORD']]) {

          sh '''

            echo 'registry=https://npm-registry.fif.tech/' > .cnpmrc

            echo '//npm-registry.fif.tech/:_authToken="'$PASSWORD'"' >> .cnpmrc

            echo '@types:registry=https://registry.npmjs.org' >> .cnpmrc

            rm -rf ./node_modules

            npm install --userconfig=.cnpmrc --production --no-optional

            rm .cnpmrc

          '''

        }

      }

    }



    stage('Dependency Check Analysis') {

        catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {

            docker.image('hub.fif.tech/base/plugins/dependency-check-v6:latest').inside('--entrypoint="" -u root'){

                withCredentials([string(credentialsId:'secaas-plugin-key',variable:'SECAAS_PLUGIN_KEY'), string(credentialsId: 'business-id', variable: 'BUSINESS_ID')]) {

                env.CI_JOB="true"

                env.DC_TARGET_LANG="node" // Cambiar por lenguaje correspondiente.

                sh '''

                    export PROJECT_NAME=$JOB_BASE_NAME

                    entrypoint.sh dependency-cli

                '''

                }

            }

        }

    }



    stage('Building Docker Image'){

      sh '''

        docker build --rm=true -t "$IMAGE_NAME:$ENVIRONMENT" -f ${WORKSPACE}/Dockerfile . --build-arg BUILDNUMBER=$ENVIRONMENT --label version=$ENVIRONMENT

      '''

    }



    stage('Sonarqube Analysis') {

     docker.image('hub.fif.tech/base/plugins/sonar-scanner-cli:4-latest').inside('--entrypoint="" -u root'){

       withCredentials([string(credentialsId:'secaas-plugin-key',variable:'SECAAS_PLUGIN_KEY'), string(credentialsId: 'business-id', variable: 'BUSINESS_ID'), string(credentialsId: 'sonar-plugin-pipeline', variable: 'SONAR_TOKEN')]) {

          env.SONAR_HOST_URL="https://sonar.fif.tech"

            env.BRANCH = "master"

            sh '''

                sonar-scanner-cli

            '''

        }

      }

    }



    // stage('Anchore Analysis') {

    //     sh '''

    //     docker pull anchore/jenkins

    //     echo "$IMAGE_NAME:$ENVIRONMENT" > images.txt

    //     '''

    //     anchore bailOnWarn: false, inputQueries: [

    //     [query: 'cve-scan all'], [query: 'list-packages all'],

    //     [query: 'list-files all'], [query: 'show-pkg-diffs base']

    //     ], name: 'images.txt'

    // }



    stage('Vault get Credentials') {

      docker.image('$DOCKER_TERRAFORM_IMAGE').inside('-u root --entrypoint="" -e VAULT_ADDR=$VAULT_ADDR') {

        withCredentials([usernamePassword(credentialsId: 'banco-co-gateway-compras-qa-pipeline', passwordVariable: 'SECRET_ID', usernameVariable: 'ROLE_ID')]) {

          script {

            env.VAULT_TOKEN = sh(returnStdout: true, script: 'vault write -field=token auth/approle/login role_id=${ROLE_ID} secret_id=${SECRET_ID}').trim()

            sh '''

              vault read -field=auth_config kv/clusters/banco-co-gateway-compras-qa-cluster/shared/automated/harbor-banco-co-gateway-compras > config.json

            '''

          }

        }

      }

    }

    stage('Publish Docker Image'){

      sh '''

        export DOCKER_CONFIG=$WORKSPACE

        docker tag $IMAGE_NAME:$ENVIRONMENT hub.fif.tech/$CLUSTER/$IMAGE_NAME:$ENVIRONMENT

        docker push hub.fif.tech/$CLUSTER/$IMAGE_NAME:$ENVIRONMENT

      '''

      try{

        sh('docker rmi $(docker images -f "dangling=true" -q) --force')

      }catch(error){

        sh('echo "No docker images found to delete"')

      }

    }

  }



    stage ('Sleep')

    {

       sleep 90

    }



node('cislaveazure') {

    notifyBuild()

    stage('Checkout code') {

      checkout scm

    }

    stage('Deploying Stack') {

      sh '''

        eval $(docker-machine env banco-co-gateway-compras-qa-cluster --shell sh)

        set -a

        docker pull hub.fif.tech/$CLUSTER/$IMAGE_NAME:$ENVIRONMENT

        source deploy/stg.env

        docker stack deploy --with-registry-auth -c ${WORKSPACE}/deploy/docker-stack.yml  gateway-compras-front

      '''

    }

 }

}

catch(error){

  currentBuild.result = 'FAILURE'

  throw error

} finally {

  node('azure-slave') {

    stage('Clean Workspace') {

      docker.image('$DOCKER_IMAGE').inside('-u root') {

        sh('find ${WORKSPACE} -mindepth 1 -delete')

      }

      docker.image('$DOCKER_TERRAFORM_IMAGE').inside('-u root --entrypoint=""'){

        sh('find ${WORKSPACE} -mindepth 1 -delete')

      }

    }

  }

  notifyBuild(currentBuild.result)

}




def notifyBuild(String buildStatus = 'STARTED') {

  // build status of null means successful

  buildStatus =  buildStatus ?: 'SUCCESSFUL'



  // Default values

  def colorCode = 'danger'

  def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"

  def summary = "${subject} (${env.BUILD_URL})"



  // Override default values based on build status

  if (buildStatus == 'STARTED') {

    colorCode = 'warning'

  } else if (buildStatus == 'SUCCESSFUL') {

    colorCode = 'good'

  } else {

    colorCode = 'danger'

  }

}