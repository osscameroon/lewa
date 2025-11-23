# SPDX-FileCopyrightText: 2025 Brady Fomegne and contributors
#
# SPDX-License-Identifier: MPL-2.0

# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

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
