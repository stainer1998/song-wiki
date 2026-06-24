from django.db import models


class Track(models.Model):
    album = models.ForeignKey('Album', on_delete=models.CASCADE, related_name='tracks')
    song = models.ForeignKey('Song', on_delete=models.CASCADE, related_name='tracks')
    track_number = models.PositiveSmallIntegerField()
    disc_number = models.PositiveSmallIntegerField(default=1)
    duration_override = models.PositiveIntegerField(
        null=True, blank=True, help_text='Duración en segundos (sobreescribe la de la canción)'
    )
    is_bonus = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Pista'
        verbose_name_plural = 'Pistas'
        ordering = ['disc_number', 'track_number']
        unique_together = [('album', 'disc_number', 'track_number')]

    def __str__(self):
        return f'{self.disc_number}.{self.track_number:02d} — {self.song} ({self.album.title})'
