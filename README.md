# Te Vi Colombia

### Tejidos virtuales para el emprendimiento, las prácticas profesionales y la empleabilidad

> En este documento se explica el debido uso que se hace para correr la aplicación en producción y desarrollo.

## Te Vi Colombia Development (Desarrollo)

Antes de empezar, se debe de tener instalado en su computadora la herramienta Docker, aquí un ejemplo con [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/), y [docker-compose](https://docs.docker.com/compose/install/).

Una vez hecho, en la carpeta [docker](docker) hay dos archivos, [Dockerfile](docker/Dockerfile) y [docker-compose.yml](docker/docker-compose.yml). Estos traen la configuración y herramientas que necesita la A.P.I de Te Vi Colombia para funcionar.

Una vez dentro, simplemente ingresando `sudo docker-compose up --build` y una conexión a internet para descargar por primera vez MySQL, Node.js y Redis, todo servirá. Si sale un error de que la base de datos `tevi_test` no existe, simplemente con ingresar al contenedor de MySQL y crear la base de datos, todo estará bien.

Para iniciar la S.P.A de Te Vi Colombia en desarrollo, simplemente ingrese a la carpeta [client](client), en el package.json encontrará que comandos son utilizados, simplemente con ingresar `npm run dev` o `yarn dev` y haber instalado con anterioridad los paquetes de node, todo funcionará perfectamente.
