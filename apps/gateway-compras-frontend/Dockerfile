FROM hub.fif.tech/base/nginx:1.27-alpine

USER root
RUN mkdir -p /var/log/nginx && \
    chown -R nginx:nginx /var/log/nginx

USER nginx

COPY apps/gateway-compras-frontend/entrypoint.sh /usr/bin/entrypoint.sh
COPY apps/gateway-compras-frontend/pre-start.sh /pre-start.sh
COPY dist/apps/gateway-compras-frontend /usr/share/nginx/html
RUN ls -la /usr/share/nginx/html

RUN chmod 644 /etc/nginx/nginx.conf && \
    chown nginx:nginx /etc/nginx/nginx.conf

EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]
