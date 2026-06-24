from django.db import models
from django.utils.text import slugify


class Artist(models.Model):
    ARTIST_TYPE_CHOICES = [
        ('solo', 'Solista'),
        ('orchestra', 'Orquesta / Conjunto'),
    ]

    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    artist_type = models.CharField(max_length=20, choices=ARTIST_TYPE_CHOICES, default='solo')
    bio = models.TextField(blank=True)
    formed_year = models.PositiveSmallIntegerField(null=True, blank=True)
    disbanded_year = models.PositiveSmallIntegerField(null=True, blank=True)
    nationality = models.ForeignKey(
        'Country', on_delete=models.SET_NULL, null=True, blank=True, related_name='artists'
    )
    genres = models.ManyToManyField('Genre', blank=True, related_name='artists')
    photo = models.ImageField(upload_to='artists/', null=True, blank=True)

    class Meta:
        verbose_name = 'Artista'
        verbose_name_plural = 'Artistas'
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.name)
            slug, n = base, 1
            while Artist.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f'{base}-{n}'
                n += 1
            self.slug = slug
        super().save(*args, **kwargs)
