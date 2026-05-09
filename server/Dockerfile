FROM node:24.13.0-alpine

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]