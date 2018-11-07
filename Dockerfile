FROM node:10 AS base
WORKDIR /app
RUN apt-get update && apt-get install -yq git
COPY package*.json ./
RUN npm install --only=production
COPY . /app
CMD ["node", "server.js"]
