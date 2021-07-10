FROM node:alpine

WORKDIR /app
COPY package.json .

RUN npm i && npm build

COPY src /app/src

CMD npm run start
