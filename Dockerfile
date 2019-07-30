FROM node:10

# Create App directory

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --production

COPY . .

ENV NODE_ENV=production
ENV PORT=3002
ENV HOST=0.0.0.0

EXPOSE 3002
CMD [ "npm", "run", "start" ]