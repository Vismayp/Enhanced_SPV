FROM node:18-alpine AS build

WORKDIR /app

# Copy dependency files
COPY package.json .
COPY .npmrc .
COPY fix-modules.js .

# First install ajv explicitly to ensure it's available
RUN npm install ajv@8.12.0 ajv-keywords@5.1.0 schema-utils@4.2.0 --no-package-lock --legacy-peer-deps

# Then install all dependencies
RUN npm install --no-package-lock --legacy-peer-deps

# Run fix script
RUN node fix-modules.js

# Copy source files
COPY . .

# Build the app
RUN npm run build || (npm list && exit 1)

# Production environment
FROM node:18-alpine

WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy build files from build stage
COPY --from=build /app/build ./build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"] 