FROM node:latest AS build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
ARG PROFILE
ENV PROFILE $ENVIRONMENT
RUN echo "Environment: ${PROFILE}"
RUN npm run build --configuration=${PROFILE}

FROM nginx:latest
COPY --from=build /usr/src/app/dist/cogpt-gateway-compras-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80