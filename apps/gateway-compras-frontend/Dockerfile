# FROM hub.fif.tech/base/nginx:1.27-alpine
FROM hub.fif.tech/base/nginx:1.17-latest

COPY dist/apps/gateway-compras-frontend /usr/share/nginx/html

USER root
RUN mkdir -p /var/log/nginx && \
    chown -R nginx:nginx /var/log/nginx
RUN chown nginx:nginx /usr/share/nginx/html/*
RUN chown nginx:nginx /usr/share/nginx/html
RUN chmod 775 /usr/share/nginx/html
USER nginx

# COPY apps/gateway-compras-frontend/entrypoint.sh /usr/bin/entrypoint.sh
# COPY apps/gateway-compras-frontend/pre-start.sh /pre-start.sh
RUN ls -la /usr/share/nginx/html

RUN chmod 644 /etc/nginx/nginx.conf && \
    chown nginx:nginx /etc/nginx/nginx.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
