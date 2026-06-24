from django.db import models


class OrchestraMember(models.Model):
    artist = models.ForeignKey('Artist', on_delete=models.CASCADE, related_name='members')
    person = models.ForeignKey('Person', on_delete=models.CASCADE, related_name='orchestra_memberships')
    role = models.CharField(max_length=100, blank=True)
    instrument = models.CharField(max_length=100, blank=True)
    join_year = models.PositiveSmallIntegerField(null=True, blank=True)
    leave_year = models.PositiveSmallIntegerField(null=True, blank=True)
    is_current = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Miembro de orquesta'
        verbose_name_plural = 'Miembros de orquesta'
        ordering = ['person__full_name']

    def __str__(self):
        return f'{self.person} — {self.artist}'
