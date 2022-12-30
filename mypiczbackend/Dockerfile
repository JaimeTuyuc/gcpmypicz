FROM node:17-alpine
WORKDIR /app
COPY . .
RUN npm install
ENV PORT=4000 \
    HOST_DB=34.27.222.115 \
    USER_DB=postgres \
    PORT_DB=5432 \
    PASSWORD_DB=123456 \
    DATABASE_DB=mypiczdb1 \
    SECRET_KEY=randomAndMultipleStringToMakeAJswonWebTokenToVerifyTheUsersTokenAndThisShouldBeAVeryRandomString \
    FRONT_END_URL=http://localhost:8080 
EXPOSE 4000
CMD [ "node", "index" ]