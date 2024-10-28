FROM hub.fif.tech/base/nginx:1.27-alpine

USER root

ARG BUILDCOMMAND
ARG BUILDPATH

# RUN $BUILDCOMMAND
RUN 'npx nx run gateway-compras-frontend:build'

RUN echo "RUN ${BUILDCOMMAND}"

# COPY $BUILDPATH /usr/share/nginx/html
COPY dist/apps/gateway-compras-frontend /usr/share/nginx/html
RUN echo "COPY ${BUILDPATH} /usr/share/nginx/html"

RUN nginx -t
EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]
