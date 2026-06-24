from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('editor', 'Editor'),
        ('contributor', 'Contributor'),
        ('reader', 'Reader'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='reader')

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
