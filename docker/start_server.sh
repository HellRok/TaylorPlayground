#!/bin/sh

envsubst \$PORT < nginx.conf.template > nginx.conf
nginx -c /app/nginx.conf
