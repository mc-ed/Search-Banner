FROM node:10

EXPOSE 3000

RUN npm install

CMD [ "node", "./server/index.js" ]
