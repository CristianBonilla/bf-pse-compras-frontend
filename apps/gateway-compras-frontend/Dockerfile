FROM hub.fif.tech/base/nginx-fif:1.17-5

USER root
ARG ENVIRONMENT

ARG BUILDPATH

COPY $BUILDPATH .

COPY dist/apps/gateway-compras-frontend /usr/share/nginx/html

RUN chown nginx:nginx /usr/share/nginx/html/*
RUN chown nginx:nginx /usr/share/nginx/html
RUN chmod 775 /usr/share/nginx/html
USER nginx

RUN nginx -t
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 8080