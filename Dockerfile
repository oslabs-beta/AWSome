# Use an official Node.js image.
FROM node:23.6.0 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ /app
RUN npm run build

#Running Production
FROM nginx:stable-alpine AS production
COPY --from=builder /app/nginx /etc/nginx/conf.d
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
# Run the dev server.
ENTRYPOINT ["nginx", "-g", "daemon off;"] 