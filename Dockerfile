FROM node:latest

WORKDIR /backend

COPY ./backend/package*.json ./

RUN npm install 

COPY  ./backend .

RUN npm run build

COPY ./migrate_run.sh ./migrate_run.sh

RUN chmod +x migrate_run.sh

CMD ["sh", "migrate_run.sh"]
