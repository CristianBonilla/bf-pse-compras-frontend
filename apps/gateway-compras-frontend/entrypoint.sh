#!/bin/sh

set -e

# If we don't want to use stdout and stderr to log
if [[ "${NGINX_FILE_LOG}" == "1" ]]; then
    cp /etc/nginx/nginx.conf /tmp
    sed -i -e "s,nginx/error.log,nginx/$(hostname)-error.log," /tmp/nginx.conf
    sed -i -e "s,nginx/access.log,nginx/$(hostname)-\$host-access.log," /tmp/nginx.conf
    cat /tmp/nginx.conf >/etc/nginx/nginx.conf
    rm -f /tmp/nginx.conf
fi

chmod 444 /etc/nginx/nginx.conf

FILE=/pre-start.sh
if test -f "$FILE"; then
    echo "$FILE exists."
    sh $FILE
fi

# default behaviour is to launch nginx
if [[ -z ${1} ]]; then
    echo "Starting nginx..."
    exec $(which nginx) -c /etc/nginx/nginx.conf -g "daemon off;" ${EXTRA_ARGS}
else
    exec "$@"
fi
