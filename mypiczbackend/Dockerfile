FROM node:17-alpine
WORKDIR /app
COPY . .
RUN npm install
ENV REACT_APP_BACKEND_URL=http://34.170.50.72:4000 \
    REACT_APP_apiKey="AIzaSyBExlXv7LsWflJCda3bGK5QRmDaI5EE5hE" \
    REACT_APP_authDomain="mypicz-e8e72.firebaseapp.com" \
    REACT_APP_projectId="mypicz-e8e72" \
    REACT_APP_storageBucket="mypicz-e8e72.appspot.com" \
    REACT_APP_messagingSenderId="227199463926" \
    REACT_APP_appId="1:227199463926:web:687391c009cd23fd0197d7" \
    REACT_APP_measurementId="G-2G1KJDSSL0" 
# Pending to be added or removed due to Image issues
EXPOSE 4000
CMD [ "node", "index" ]