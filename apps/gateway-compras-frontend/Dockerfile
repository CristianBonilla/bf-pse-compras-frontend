# FROM hub.fif.tech/base/nginx:1.27-alpine

# USER root
# COPY dist/apps/gateway-compras-frontend /usr/share/nginx/html

# RUN nginx -t
# EXPOSE 8000
# CMD ["nginx", "-g", "daemon off;"]


# Etapa de producción
FROM nginx:alpine

COPY --from=build dist/apps/gateway-compras-frontend /usr/share/nginx/html
EXPOSE 8000

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
