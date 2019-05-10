FROM node:alpine

COPY . /app

WORKDIR /app

RUN npm run install:only:setup

EXPOSE 3000

CMD npm start