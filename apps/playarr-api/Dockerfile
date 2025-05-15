# Stage 1: build
FROM node:18-alpine AS builder
WORKDIR /app
COPY apps/playarr-api/package*.json ./
COPY libs/*/package*.json ./libs/
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build playarr-api

# Stage 2: runtime
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist/apps/playarr-api ./dist
COPY --from=builder /app/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/main.js"]
