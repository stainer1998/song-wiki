#!/bin/sh
set -e

echo "→ Aplicando migraciones..."
python manage.py migrate --noinput

echo "→ Creando administrador por defecto..."
python manage.py ensure_admin

echo "→ Iniciando servidor..."
exec "$@"
