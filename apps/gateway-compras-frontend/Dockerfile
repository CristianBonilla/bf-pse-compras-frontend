FROM hub.fif.tech/base/nginx:1.27-alpine

USER root
ARG ENVIRONMENT

COPY dist/apps/gateway-compras-frontend /usr/share/nginx/html

RUN nginx -t
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 8080