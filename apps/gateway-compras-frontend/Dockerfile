FROM hub.fif.tech/base/nginx:1.27-alpine

USER root
ARG ENVIRONMENT

ARG BUILDPATH

COPY $BUILDPATH .

COPY dist/apps/gateway-compras-frontend /usr/share/nginx/html

RUN mkdir -p /var/log/nginx && \
    chown -R nginx:nginx /var/log/nginx

RUN chown nginx:nginx /usr/share/nginx/html/*
RUN chown nginx:nginx /usr/share/nginx/html
RUN chmod 775 /usr/share/nginx/html
RUN chmod -R 775 /var/log/nginx

RUN nginx -t
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 8080