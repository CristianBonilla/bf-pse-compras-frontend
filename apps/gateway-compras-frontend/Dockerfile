FROM hub.fif.tech/base/nginx:1.17-latest

ARG BUILDNUMBER
ARG DOCKER_BUILD_ARGS_ENV
ARG NGINX_ENVIRONMENT=k8s

ENV BUILD_NUMBER=${BUILDNUMBER}

COPY dist/apps/gateway-compras-frontend /usr/share/nginx/html

USER root
RUN chown nginx:nginx /usr/share/nginx/html/*
RUN chown nginx:nginx /usr/share/nginx/html
RUN chmod 775 /usr/share/nginx/html
RUN chmod -R 775 /var/log/nginx
USER nginx

RUN nginx -t
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]