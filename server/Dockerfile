# This file is only for development.

FROM node:8.12.0-alpine

ENV NODE_ENV development

RUN apk add --no-cache bash

WORKDIR /teviepe-dev

COPY ./package.json .

RUN yarn install

COPY . .

EXPOSE 4000

CMD ["yarn", "dev"]

USER node