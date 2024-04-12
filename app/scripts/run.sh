#!/bin/sh

# Collect static files and migrate if needed
python /home/app/manage.py collectstatic --noinput
python /home/app/manage.py makemigrations --noinput
python /home/app/manage.py migrate --noinput

python manage.py runserver 0.0.0.0:8000

