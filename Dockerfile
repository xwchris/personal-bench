FROM node:12 as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm set strict-ssl false

RUN npm install

COPY ./ /app/

RUN npm run build

FROM nginx:1.16

COPY --from=build-stage /app/public/ /usr/share/nginx/html

COPY app.conf /etc/nginx/conf.d/default.conf
