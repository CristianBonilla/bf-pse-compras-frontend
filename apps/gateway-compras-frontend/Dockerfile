FROM hub.fif.tech/base/nginx:1.27-alpine

USER root

ARG BUILDCOMMAND
ARG BUILDPATH

# Ejecutar el comando de construcción
RUN $BUILDCOMMAND

COPY $BUILDPATH /usr/share/nginx/html

RUN nginx -t
EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]
