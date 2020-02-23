FROM node:12.14.1-alpine as build-stage

WORKDIR /app

COPY ./package*.json /app/
RUN npm install

COPY ./public /app/public
COPY ./src /app/src
COPY ./tsconfig.json ./
RUN npm run build

FROM nginx:1.17.8-alpine

COPY --from=build-stage /app/build/ /var/www/

COPY containers/ui/nginx.conf /etc/nginx/nginx.conf
