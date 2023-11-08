FROM node:18-alpine

WORKDIR /backend

COPY ./package*.json ./

RUN npm install 

COPY  ./ .

RUN npm run build

RUN chmod +x migrate_run.sh

CMD ["sh", "migrate_run.sh"]
