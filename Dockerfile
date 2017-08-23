FROM node:8.4.0

COPY . /opt/ngx-express-starter
WORKDIR /opt/ngx-express-starter

RUN npm install
RUN npm run build

EXPOSE 80
ENTRYPOINT [ "npm", "start" ]
