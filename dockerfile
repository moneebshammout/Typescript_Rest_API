#
# Builder stage.

FROM node:alpine AS builder

WORKDIR /app

RUN npm i npm@latest -g

COPY package*.json ../app/

COPY tsconfig*.json ../app/

COPY ./src ./src

RUN npm ci  && npm run build

#
# Production stage.

FROM node:alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --quiet --only=production

COPY --from=builder ../app/build ./build

CMD npm start 