# syntax=docker/dockerfile:1

FROM node:22.14-slim AS base

FROM base AS install
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM base AS prerelease
WORKDIR /app

COPY --from=install /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM nginx:alpine AS release
WORKDIR /usr/share/nginx/html

COPY --from=prerelease /app/dist ./

EXPOSE 80/tcp

CMD [ "nginx", "-g", "daemon off;" ]
