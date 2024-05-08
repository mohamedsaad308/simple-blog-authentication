#!/bin/bash

. $VENV_PATH/bin/activate

if [ "$CELERY" != "true" ]; then

    poetry run python manage.py migrate


    poetry run python manage.py runserver 0.0.0.0:8000

fi

exec "$@"
