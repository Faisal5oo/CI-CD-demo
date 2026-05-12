<<<<<<< HEAD
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build 

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
=======


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
>>>>>>> 2c2834c (security fix)
