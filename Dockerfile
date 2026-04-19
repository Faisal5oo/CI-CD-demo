

FROM node:22-alpine AS builder

WORKDIR /app

copy package*.json ./

RUN npm install 

COPY . .

# serving with nginx
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon-off;"]
