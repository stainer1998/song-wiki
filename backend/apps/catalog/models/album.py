from django.db import models
from django.utils.text import slugify


class Album(models.Model):
    ALBUM_TYPE_CHOICES = [
        ('studio', 'Estudio'),
        ('live', 'En vivo'),
        ('compilation', 'Compilación'),
        ('ep', 'EP'),
        ('single', 'Single'),
    ]

    title = models.CharField(max_length=300)
    slug = models.SlugField(max_length=340, unique=True, blank=True)
    artist = models.ForeignKey('Artist', on_delete=models.CASCADE, related_name='albums')
    release_year = models.PositiveSmallIntegerField(null=True, blank=True)
    release_date = models.DateField(null=True, blank=True)
    record_label = models.ForeignKey(
        'RecordLabel', on_delete=models.SET_NULL, null=True, blank=True, related_name='albums'
    )
    cover_art = models.ImageField(upload_to='albums/', null=True, blank=True)
    album_type = models.CharField(max_length=20, choices=ALBUM_TYPE_CHOICES, default='studio')
    genres = models.ManyToManyField('Genre', blank=True, related_name='albums')

    class Meta:
        verbose_name = 'Álbum'
        verbose_name_plural = 'Álbumes'
        ordering = ['artist', '-release_year']

    def __str__(self):
        return f'{self.title} ({self.artist})'

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title)
            slug, n = base, 1
            while Album.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f'{base}-{n}'
                n += 1
            self.slug = slug
        super().save(*args, **kwargs)
