FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install typescript -g

COPY . .


RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]




