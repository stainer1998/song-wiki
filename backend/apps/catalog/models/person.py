from django.db import models
from django.utils.text import slugify


class Person(models.Model):
    full_name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    death_date = models.DateField(null=True, blank=True)
    nationality = models.ForeignKey(
        'Country', on_delete=models.SET_NULL, null=True, blank=True, related_name='persons'
    )
    bio = models.TextField(blank=True)
    photo = models.ImageField(upload_to='persons/', null=True, blank=True)

    class Meta:
        verbose_name = 'Persona'
        verbose_name_plural = 'Personas'
        ordering = ['full_name']

    def __str__(self):
        return self.full_name

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.full_name)
            slug, n = base, 1
            while Person.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f'{base}-{n}'
                n += 1
            self.slug = slug
        super().save(*args, **kwargs)
