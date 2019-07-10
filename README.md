# Te Vi Colombia

Te vi Colombia es una aplicación que conduce a que cada uno de sus miembros gestione diferentes interacciones y conexiones en red con todos los integrantes logrando acceder de forma rápida y eficaz a diferentes alternativas y experiencias exitosas de Emprendimiento, Prácticas Profesionales y Empleabilidad.

- [Leer monografía](https://drive.google.com/open?id=1TGs419dkUpwrV6V9u02nqEcVlx3H_WovPlhQHgbbXY4)
- [Leer Manual de usuario](https://drive.google.com/open?id=18Ya_uQxy3pPQ_42Se73-9eStoVdYn6-ZehBt6-xBbBE)
- [Leer Manual técnico](https://drive.google.com/open?id=1Ej4WEnEZ7hjUe7eNk9KqP4uUHSOEW2oxsOSXtiYqdFA)

![Alt text](http://oi64.tinypic.com/e0h6s5.jpg "Te Vi Colombia")

> En este documento se explica el debido uso que se hace para correr la aplicación en producción y desarrollo.

## Te Vi Colombia Development (Desarrollo)

### Servidor (GraphQL A.P.I)

Antes de empezar, se debe de tener instalado en su computadora las herramientas PosgreSQL, Redis y Node.js.

Una vez hecho, debe de crear una base de datos con el nombre de `tevi_test` en PosgreSQL e ingresar a la carpeta [server](server) y luego instalar las dependencias de el [package.json](server/package.json) con `npm install` o `yarn install`.

Para finalizar, simplemente corra `npm run dev` o `yarn dev` dentro de [server](server).

### Cliente (Aplicación web)

Para iniciar la S.P.A de Te Vi Colombia en desarrollo, simplemente ingrese a la carpeta [client](client) y en el [package.json](client/package.json) encontrará que comandos son utilizados, instale las dependencias con `npm install` o `yarn install` y luego ingresar `npm run dev` o `yarn dev` para iniciar la aplicación.

## Te Vi Colombia Production (Producción)

### Servidor (GraphQL A.P.I)

Para pasar el código de TypeScript a JavaScript, simplemente ejecute `npm run build` o `yarn build`, después de esto, se genera una carpeta llamada `dist` con el código dentro. Ahora, con simplemente ejecutar [Now](https://zeit.co/docs) se subirá a la plataforma. Recuerde que la configuración de el servidor está en [now.json](server/now.json).

### Cliente (Aplicación web)

Simplemente ejecute [Now](https://zeit.co/docs). Recuerde que la configuración de este, está en [now.json](client/now.json).

## Tips

- Configura la contraseña con tu configuración de PostgreSQL:

```
ALTER USER postgres WITH PASSWORD 'Your_Awesome_Password';
```

- El archivo [.env](server/.env) es donde se definen las variables de entorno en development (desarrollo), tiene que tener las siguientes:

```
SESSION_SECRET=SuperSessionsSecretPassword
FRONTEND_HOST=http://localhost:3000

EMAIL_SERVICE=Gmail
EMAIL_USER=
EMAIL_PASSWORD=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

- Cada vez que modifique o cree un archivo con extensión `.graphql` debe de ejecutar `npm run types` o `yarn types`.
