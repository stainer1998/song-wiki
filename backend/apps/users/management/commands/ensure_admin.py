import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    help = 'Crea el superusuario administrador si no existe'

    def handle(self, *args, **options):
        username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
        email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@songwiki.local')
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'admin123')

        user = User.objects.filter(username=username).first()
        if user:
            user.email = email
            user.set_password(password)
            user.save()
            self.stdout.write(self.style.SUCCESS(f'  Admin "{username}" actualizado.'))
            return

        User.objects.create_superuser(username=username, email=email, password=password)
        self.stdout.write(self.style.SUCCESS(
            f'  Admin creado → usuario: {username} / contraseña: {password}'
        ))
