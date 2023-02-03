FROM node:latest AS build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
ARG BUILDNUMBER=production
RUN echo "--configuration= $BUILDNUMBER"
RUN npm run build --configuration=$BUILDNUMBER

FROM nginx:latest
COPY --from=build /usr/src/app/dist/cogpt-gateway-compras-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80