FROM node:16 as base

ARG APP_PORT
EXPOSE ${APP_PORT}

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
