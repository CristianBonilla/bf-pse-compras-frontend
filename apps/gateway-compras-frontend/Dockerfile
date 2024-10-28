FROM hub.fif.tech/base/nginx:1.27-alpine

USER root
ARG ENVIRONMENT

COPY --from=build dist/apps/gateway-compras-frontend /usr/share/nginx/html

RUN nginx -t

# Contar archivos copiados
RUN echo "Archivos copiados:" && \
    ls -1 /usr/share/nginx/html | wc -l && \
    ls -1 /usr/share/nginx/html
    
EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]
