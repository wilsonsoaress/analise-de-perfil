# Estágio 1: Build (Pode ser usado para instalar dependências também)
FROM node:20-alpine AS build-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
# Não precisamos do RUN npm run build nesta fase para o modo dev
# ...

# Estágio 2: Desenvolvimento (Adicione a cópia das dependências)
FROM node:20-alpine AS development-stage

WORKDIR /usr/src/app

# Copia as dependências e o código para o estágio de desenvolvimento
COPY --from=build-stage /usr/src/app/node_modules ./node_modules
COPY --from=build-stage /usr/src/app .

# O comando npm start (que executa react-scripts) já está definido no package.json
CMD ["npm", "start"]