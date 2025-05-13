#!/usr/bin/sh

PATH="$PATH:.venv/bin/"

set -ex

.venv/bin/python manage.py collectstatic --noinput
.venv/bin/python manage.py makemigrations --noinput
.venv/bin/python manage.py migrate --noinput

if [ -z "$@" ]; then
    gunicorn lewa.asgi:application -k uvicorn_worker.UvicornWorker -b :8000 -w 2
else
    eval .venv/bin/python manage.py $@
fi
