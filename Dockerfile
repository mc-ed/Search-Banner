FROM node:10

RUN npm install

EXPOSE 3000

CMD [ "npm server-dev" ]
