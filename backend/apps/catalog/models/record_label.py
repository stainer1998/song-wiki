from django.db import models
from django.utils.text import slugify


class RecordLabel(models.Model):
    name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    country = models.ForeignKey(
        'Country', on_delete=models.SET_NULL, null=True, blank=True, related_name='labels'
    )
    founded_year = models.PositiveSmallIntegerField(null=True, blank=True)

    class Meta:
        verbose_name = 'Sello discográfico'
        verbose_name_plural = 'Sellos discográficos'
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
