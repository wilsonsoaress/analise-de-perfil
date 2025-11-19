# Estágio 1: Build/Dependencies
FROM node:20-alpine AS build-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
# Estágio 2: Produção
FROM node:20-alpine AS production-stage
WORKDIR /usr/src/app
COPY --from=build-stage /usr/src/app/node_modules ./node_modules
COPY --from=build-stage /usr/src/app .
EXPOSE 5000
CMD [ "node", "server.js" ]
