# This file is only for development.

FROM node:8.12.0-alpine

ENV NODE_ENV development

RUN apk add --no-cache bash

WORKDIR /tevi-dev

COPY server/package.json .

RUN yarn install

COPY server .

EXPOSE 4000

CMD ["yarn", "dev"]

USER node