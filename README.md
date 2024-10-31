# Frontend PSE Compras

Con PSE Compras podemos realizar pagos por Internet de manera ágil y segura. 

La aplicación está desarrollada en Angular 18.2.0 y nx 20.0.5

## Ambientes (Dominios de red privada)

| Ambiente  | Dominio url  |
|-------------|-------------|
| TEST  | https://gateway-compras-backend-test-banco-co-cross-preprod-priv.fif.tech/  |
| QA  | https://gateway-compras-backend-qa-banco-co-cross-preprod-priv.fif.tech/  |
| PROD  | pendiente...  |


## Herramientas

| Componente  | Enlace  | 
|-------------|-------------|
| Repositorio de imágenes  | [Proyecto en Harbor](https://harbor.fif.tech/harbor/projects/275/repositories)  | 
| Repositorio de deploy  | [Repositorio](https://gitlab.falabella.tech/fif/canales-digitales/fanatizar-clientes/bfco/gateway-compras/gateway-compras-backend-deploy)  | 
| ArgoCD  | [ArgoCD preprod](https://argocd-banco-co-cross-preprod-priv.fif.tech/applications/)  | 
| Documentación de PSE  | [Confluence](https://confluence.falabella.tech/display/PFCP/DAP+PSE+Compras)  | 
| Repositorio del backend | [Apis backend](https://gitlab.falabella.tech/fif/canales-digitales/fanatizar-clientes/bfco/gateway-compras/gateway-compras-backend) |



## Correr aplicación local

Si es la primera vez, tendrás que instalar todas las dependencias con el comando:
```sh
npm install
```
Para poner a funcionar la aplicación localmente ejecuta el comando:

```sh
nx serve gateway-compras-frontend
```

Si realizas algún cambio y quieres verificar el coverage de tu código, escribe el comando:

```sh
npm run coverage
```

## Cómo desplegar un ajuste

Antes de iniciar, asegúrate de estar en la rama develop.

Para subir tus cambios al clúster, tendrás que modificar 2 repositorios, el primero que es en el que estamos y el segundo es el [repositorio del deploy](https://gitlab.falabella.tech/fif/canales-digitales/fanatizar-clientes/bfco/gateway-compras/gateway-compras-backend-deploy).

Antes de crear un commit debes tener en cuenta las convenciones de commits.

Este proyecto sigue el estándar de [Conventional Commits](https://www.conventionalcommits.org/), que proporciona un conjunto de reglas para escribir mensajes de commit que son fáciles de entender y útiles para la automatización. A continuación, se describen los prefijos más comunes utilizados en los mensajes de commit.

## Prefijos de Commits

### `feat:`
- **Descripción**: Se utiliza para indicar la adición de una nueva característica.
- **Ejemplo**: git commit -m "**feat:** Se agrega funcionalidad de login"


### `fix:`
- **Descripción**: Indica que se ha realizado un cambio que corrige un error (bug).
- **Ejemplo**: git commmit -m "**fix:** corrijo error en doble clic del botón ingresar"


### `chore:`
- **Descripción**: Cambios que no afectan el código fuente, como tareas de mantenimiento o cambios de configuración.
- **Ejemplo**: git commit -m "**chore:** realizo ajuste en archivo .gitignore"


### `docs:`
- **Descripción**: Se utiliza para realizar cambios en la documentación.
- **Ejemplo**: git commit -m "**docs:** agrego enlace de base de datos en archivo README.md"


### `style:`
- **Descripción**: Cambios que no afectan el significado del código (por ejemplo, formato, espacios en blanco).
- **Ejemplo**: git commit -m "**style:** elimino archivo sin usar"


### `refactor:`
- **Descripción**: Cambios en el código que no corrigen errores ni añaden características, pero que mejoran la estructura.
- **Ejemplo**: git commit -m "**refactor:** mejora en rendimiento de login"


### `test:`
- **Descripción**: Se refiere a añadir o modificar pruebas.
- **Ejemplo**: git commit -m "**test:** agrego pruebas para funcionalidad de login"


### `build:`
- **Descripción**: Cambios que afectan el sistema de construcción o dependencias externas.
- **Ejemplo**: git commit -m "**build:** cambio archivo dockerfile para la creación de la imagen"


### `ci:`
- **Descripción**: Cambios en los archivos de configuración de integración continua.
- **Ejemplo**: git commit -m "**ci:** agrego un stage al pipeline"


### Ejemplo completo
```sh
git add .
git commit -m "fix: arreglo error en login"
git push origin develop
```

Después de subir los cambios, tendremos que realizar un pull request con la rama master, ya que en la rama "**master**" es donde se ejecuta el pipeline. 

Cuando se haga el merge con la rama master, se ejecuta el pipeline y al final si todo sale bien, tendremos una nueva verisón de despliegue y una imagen guardada en harbor.

La nueva versión se verá algo así: 
"**gateway-compras-frontend_v0.1.23**"

Copiamos el tag de versión para luego ir al [repositorio del deploy](https://gitlab.falabella.tech/fif/canales-digitales/fanatizar-clientes/bfco/gateway-compras/gateway-compras-backend-deploy).

## Enlaces relacionados

Más información:

- [Documentación Portafolio Clientes Personas](https://confluence.falabella.tech/display/PFCP/DAP+PSE+Compras)
- [Obtenga más información sobre Nx en CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
