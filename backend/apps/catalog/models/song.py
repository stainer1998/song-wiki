from django.db import models
from django.utils.text import slugify


class Song(models.Model):
    title = models.CharField(max_length=300)
    slug = models.SlugField(max_length=340, unique=True, blank=True)
    duration = models.PositiveIntegerField(null=True, blank=True, help_text='Duración en segundos')
    year = models.PositiveSmallIntegerField(null=True, blank=True)
    lyrics = models.TextField(blank=True)
    genres = models.ManyToManyField('Genre', blank=True, related_name='songs')

    class Meta:
        verbose_name = 'Canción'
        verbose_name_plural = 'Canciones'
        ordering = ['title']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title)
            slug, n = base, 1
            while Song.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f'{base}-{n}'
                n += 1
            self.slug = slug
        super().save(*args, **kwargs)
