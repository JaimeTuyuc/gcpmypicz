FROM node:17-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV REACT_APP_BACKEND_URL=http://34.170.50.72:4000 \
    REACT_APP_apiKey="AIzaSyBExlXv7LsWflJCda3bGK5QRmDaI5EE5hE" \
    REACT_APP_authDomain="mypicz-e8e72.firebaseapp.com" \
    REACT_APP_projectId="mypicz-e8e72" \
    REACT_APP_storageBucket="mypicz-e8e72.appspot.com" \
    REACT_APP_messagingSenderId="227199463926" \
    REACT_APP_appId="1:227199463926:web:687391c009cd23fd0197d7" \
    REACT_APP_measurementId="G-2G1KJDSSL0" 
RUN npm run build
FROM nginx:1.21.3-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]