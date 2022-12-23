FROM node:latest AS build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm run build --prod

FROM nginx:latest
COPY --from=build /usr/src/app/dist/cogpt-gateway-compras-frontend /usr/share/nginx/html
EXPOSE 80