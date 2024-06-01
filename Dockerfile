FROM node:latest

WORKDIR /app

COPY ./server /app


RUN npm install

EXPOSE 5000

CMD ["npm", "start"]
