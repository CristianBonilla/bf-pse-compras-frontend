FROM hub.fif.tech/base/nginx:1.27-alpine

USER root
ARG ENVIRONMENT

COPY dist/apps/gateway-compras-frontend /usr/share/nginx/html

RUN nginx -t
EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]
