import tablib
from django.db import transaction
from django.utils.text import slugify
from .base import BaseImporter
from .json_importer import JsonImporter
from apps.catalog.models import Artist, Album, Song, Track, SongCredit


class FlatImporter(BaseImporter):
    """
    Importa CSV/XLSX con filas planas (una canción/crédito por fila).

    Columnas esperadas:
      artist_slug, album_title, release_year, disc_number, track_number,
      song_title, song_year, credit_person, credit_role, credit_instrument
    """

    def __init__(self, fmt, **kwargs):
        super().__init__(**kwargs)
        self.fmt = fmt
        self._json_importer = JsonImporter(stdout=kwargs.get('stdout'), stderr=kwargs.get('stderr'))

    def run(self, file_path, dry_run=False, atomic=True):
        mode = 'rb' if self.fmt == 'xlsx' else 'r'
        encoding = None if self.fmt == 'xlsx' else 'utf-8'
        with open(file_path, mode, encoding=encoding) as f:
            content = f.read()

        dataset = tablib.Dataset().load(content, headers=True)

        def _import():
            grouped = {}
            for row in dataset.dict:
                key = (row.get('artist_slug'), row.get('album_title'), row.get('track_number'))
                grouped.setdefault(key, []).append(row)

            for (artist_slug, album_title, track_number), rows in grouped.items():
                try:
                    self._import_group(artist_slug, album_title, track_number, rows)
                except Exception as e:
                    self.errors += 1
                    self.err(f'Error en {artist_slug}/{album_title}/{track_number}: {e}')

        if dry_run:
            with transaction.atomic():
                _import()
                transaction.set_rollback(True)
        elif atomic:
            with transaction.atomic():
                _import()
        else:
            _import()

        return self._result()

    def _import_group(self, artist_slug, album_title, track_number, rows):
        try:
            artist = Artist.objects.get(slug=artist_slug)
        except Artist.DoesNotExist:
            self.err(f'  Artista no encontrado: {artist_slug}')
            self.errors += 1
            return

        first = rows[0]
        album_slug = slugify(f'{album_title}-{artist_slug}')
        album, created = Album.objects.get_or_create(
            slug=album_slug,
            defaults={
                'title': album_title,
                'artist': artist,
                'release_year': first.get('release_year') or None,
            },
        )
        if created:
            self.created += 1

        song_title = first.get('song_title', '').strip()
        song_slug = slugify(song_title)
        song, created = Song.objects.get_or_create(
            slug=song_slug,
            defaults={'title': song_title, 'year': first.get('song_year') or None},
        )
        if created:
            self.created += 1

        Track.objects.get_or_create(
            album=album,
            disc_number=int(first.get('disc_number') or 1),
            track_number=int(track_number or 1),
            defaults={'song': song},
        )

        for row in rows:
            person_name = (row.get('credit_person') or '').strip()
            role = (row.get('credit_role') or '').strip()
            if not person_name or not role:
                continue
            person = self._json_importer.get_or_create_person(person_name)
            SongCredit.objects.get_or_create(
                song=song,
                person=person,
                role=role,
                defaults={'instrument': row.get('credit_instrument') or ''},
            )
