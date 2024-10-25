FROM hub.fif.tech/base/nginx:1.17-latest

ARG BUILDNUMBER
ARG DOCKER_BUILD_ARGS_ENV
ARG NGINX_ENVIRONMENT=k8s

ENV BUILD_NUMBER=${BUILDNUMBER}

# COPY apps/web/entrypoint.sh /usr/bin/entrypoint.sh
# COPY apps/web/pre-start.sh /pre-start.sh
# COPY apps/web/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY dist/apps/gateway-compras-frontend /usr/share/nginx/html

USER root
RUN chown nginx:nginx /usr/share/nginx/html/*
RUN chown nginx:nginx /usr/share/nginx/html
RUN chmod 775 /usr/share/nginx/html
USER nginx


EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]