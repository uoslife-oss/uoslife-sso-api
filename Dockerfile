FROM node:16-alpine as base

ARG APP_PORT
EXPOSE ${APP_PORT}

RUN apk add g++ make py3-pip

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn

FROM base as production

WORKDIR /app

COPY tsconfig.json tsconfig.json
COPY tsconfig.build.json tsconfig.build.json
COPY src src

RUN yarn build && npm prune --omit=dev --force && rm package-lock.json
CMD ["node", "dist/main"]
