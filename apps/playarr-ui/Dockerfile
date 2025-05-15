# Stage 1: build
FROM node:18-alpine AS builder
WORKDIR /app
COPY apps/playarr-ui/package*.json ./
COPY libs/*/package*.json ./libs/
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build playarr-ui -- --prod

# Stage 2: serve
FROM nginx:stable-alpine
COPY --from=builder /app/dist/apps/playarr-ui /usr/share/nginx/html
COPY apps/playarr-ui/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
