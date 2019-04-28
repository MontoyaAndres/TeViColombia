# Te Vi Colombia

Tejidos virtuales para el emprendimiento, las prácticas profesionales y la empleabilidad

> En este documento se explica el debido uso que se hace para correr la aplicación en producción y desarrollo.

## Te Vi Colombia Development (Desarrollo)

### Servidor (GraphQL A.P.I)

Antes de empezar, se debe de tener instalado en su computadora las herramientas MySQL y Redis. En Linux (Ubuntu) se hace de la siguiente manera:

```
# Instalación de MySQL y Redis

sudo apt install mysql-server redis-server
```

En el caso de Node.js, se recomienda seguir esta [guía](https://github.com/nodesource/distributions#installation-instructions).

Una vez hecho, debe de crear una base de datos con el nombre de `tevi_test` en MySQL e ingresar a la carpeta [server](server) y luego instalar las dependencias de el [package.json](server/package.json) con `npm install` o `yarn install`.

Para finalizar, simplemente corra `npm run dev` o `yarn dev` dentro de [server](server).

### Cliente (Aplicación web)

Para iniciar la S.P.A de Te Vi Colombia en desarrollo, simplemente ingrese a la carpeta [client](client) y en el [package.json](client/package.json) encontrará que comandos son utilizados, instale las dependencias con `npm install` o `yarn install` y luego ingresar `npm run dev` o `yarn dev` para iniciar la aplicación.

## Te Vi Colombia Production (Producción)

### Servidor (GraphQL A.P.I)

Para pasar el código de TypeScript a JavaScript, simplemente ejecute `npm run build` o `yarn build`, después de esto, de genera una carpeta llamada `dist` con el código dentro. Ahora, con simplemente ejecutar Now, se subirá a la plataforma. Recuerde que la configuración de el servidor está en [now.json](server/now.json).

### Cliente (Aplicación web)

Simplemente ejecute [Now](). Recuerde que la configuración de este, está en [now.json](cliente/now.json).

## Tips

- Si estas trabajando en desarrollo, y te sale este error: `ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server`, la solución es:

```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Contraseña de root';
```

- El archivo [.env](server/.env) es donde se definen las variables de entorno en development (desarrollo).
