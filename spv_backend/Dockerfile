FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY .npmrc .

RUN npm install --no-package-lock --legacy-peer-deps

COPY . .

EXPOSE 8080

CMD ["npm", "start"] 