FROM node:16.20.2-slim

# Create and define the node_modules's cache directory.
WORKDIR /cache


COPY yarn.lock ./

COPY package.json ./

RUN yarn install --prefer-offline --no-audit


WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . .