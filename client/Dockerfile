FROM node:16.20.2-slim

WORKDIR /home/fairstock

COPY yarn.lock ./

COPY package.json ./

RUN yarn install --prefer-offline --no-audit

COPY ./ ./

CMD yarn start

EXPOSE 3000