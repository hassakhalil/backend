FROM node:18-alpine

WORKDIR /frontend

COPY /package*.json .
RUN npm install


WORKDIR /frontend/pong-front
COPY ./pong-front/public ./public
COPY ./pong-front/src ./src
COPY ./pong-front/* .

COPY ./pong-front/package*.json .
RUN npm install


CMD ["npm", "run", "dev"]