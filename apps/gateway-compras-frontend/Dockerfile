FROM hub.fif.tech/base/nginx:1.27-alpine

# Crear un directorio para los logs
USER root
RUN mkdir -p /var/log/nginx && \
    chown -R nginx:nginx /var/log/nginx
USER nginx

COPY dist/apps/gateway-compras-frontend /usr/share/nginx/html
RUN ls -la /usr/share/nginx/html

# RUN nginx -t
EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]