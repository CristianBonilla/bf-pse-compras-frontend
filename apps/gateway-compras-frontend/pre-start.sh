#!/bin/sh
set -e

echo "ENVIRONMENT ${ENV-default}"
cd /usr/share/nginx/html/configs
if [ "${ENV}" != "" ]; then
    mv environment.${ENV}.json environment.json
fi
ls | grep -v 'environment.json$' | xargs rm
if [ "${ENV}" == "prod" ]; then
    cd /usr/share/nginx/html
    sed -i 's/static-qa/static/g' index.html
fi
