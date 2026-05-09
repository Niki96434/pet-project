FROM node:24.13.0-alpine

WORKDIR /frontend

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]