from django.db import models


class CreditRole(models.TextChoices):
    COMPOSER = 'composer', 'Compositor'
    LYRICIST = 'lyricist', 'Letrista'
    ARRANGER = 'arranger', 'Arreglista'
    PRODUCER = 'producer', 'Productor'
    ENGINEER = 'engineer', 'Ingeniero'
    VOCALIST = 'vocalist', 'Vocalista'
    INSTRUMENTALIST = 'instrumentalist', 'Instrumentista'
    CONDUCTOR = 'conductor', 'Director'


class SongCredit(models.Model):
    song = models.ForeignKey('Song', on_delete=models.CASCADE, related_name='credits')
    person = models.ForeignKey('Person', on_delete=models.CASCADE, related_name='credits')
    role = models.CharField(max_length=20, choices=CreditRole.choices)
    instrument = models.CharField(max_length=100, blank=True)
    as_name = models.CharField(
        max_length=200, blank=True, help_text='Nombre acreditado si difiere del nombre real'
    )
    credited_on_track = models.ForeignKey(
        'Track', on_delete=models.SET_NULL, null=True, blank=True, related_name='specific_credits'
    )

    class Meta:
        verbose_name = 'Crédito'
        verbose_name_plural = 'Créditos'
        ordering = ['role', 'person__full_name']

    def __str__(self):
        return f'{self.person} — {self.get_role_display()} ({self.song})'
