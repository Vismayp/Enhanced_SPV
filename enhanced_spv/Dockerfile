FROM node:18-alpine AS build

WORKDIR /app

COPY package.json .
COPY .npmrc .

RUN npm install --no-package-lock --legacy-peer-deps

COPY . .

RUN npm run build

# Production environment
FROM node:18-alpine

WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy build files from build stage
COPY --from=build /app/build ./build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"] 