FROM node:17-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

RUN npm run build
FROM nginx:1.21.3-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]