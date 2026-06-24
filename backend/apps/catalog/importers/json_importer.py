import json
from django.db import transaction
from django.utils.text import slugify
from .base import BaseImporter
from apps.catalog.models import Country, Genre, RecordLabel, Person, Artist, Album, Song, Track, SongCredit


class JsonImporter(BaseImporter):
    def run(self, file_path, dry_run=False, atomic=True):
        with open(file_path, encoding='utf-8') as f:
            data = json.load(f)

        def _import():
            for item in data:
                try:
                    self._import_artist(item)
                except Exception as e:
                    self.errors += 1
                    self.err(f'Error en artista "{item.get("name", "?")}": {e}')

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

    def get_or_create_country(self, iso_code):
        if not iso_code:
            return None
        country, _ = Country.objects.get_or_create(
            iso_code=iso_code.upper(), defaults={'name': iso_code}
        )
        return country

    def get_or_create_genre(self, name):
        genre, _ = Genre.objects.get_or_create(name=name, defaults={'slug': slugify(name)})
        return genre

    def get_or_create_person(self, full_name):
        slug = slugify(full_name)
        person, created = Person.objects.get_or_create(slug=slug, defaults={'full_name': full_name})
        if created:
            self.log(f'  + Persona: {full_name}')
        return person

    def _get_or_create_label(self, name):
        if not name:
            return None
        slug = slugify(name)
        label, _ = RecordLabel.objects.get_or_create(slug=slug, defaults={'name': name})
        return label

    def _import_artist(self, data):
        slug = slugify(data['name'])
        country = self.get_or_create_country(data.get('nationality'))
        artist, created = Artist.objects.update_or_create(
            slug=slug,
            defaults={
                'name': data['name'],
                'artist_type': data.get('artist_type', 'solo'),
                'bio': data.get('bio', ''),
                'formed_year': data.get('formed_year'),
                'disbanded_year': data.get('disbanded_year'),
                'nationality': country,
            },
        )
        if created:
            self.created += 1
            self.log(f'+ Artista: {artist.name}')
        else:
            self.updated += 1
            self.log(f'~ Artista: {artist.name}')

        for genre_name in data.get('genres', []):
            artist.genres.add(self.get_or_create_genre(genre_name))

        for album_data in data.get('albums', []):
            self._import_album(album_data, artist)

    def _import_album(self, data, artist):
        slug = slugify(f'{data["title"]}-{artist.slug}')
        label = self._get_or_create_label(data.get('record_label'))
        album, created = Album.objects.update_or_create(
            slug=slug,
            defaults={
                'title': data['title'],
                'artist': artist,
                'release_year': data.get('release_year'),
                'album_type': data.get('album_type', 'studio'),
                'record_label': label,
            },
        )
        if created:
            self.created += 1
            self.log(f'  + Álbum: {album.title}')
        else:
            self.updated += 1

        for track_data in data.get('tracks', []):
            self._import_track(track_data, album)

    def _import_track(self, data, album):
        song_data = data.get('song', {})
        song_slug = slugify(song_data.get('title', ''))
        song, created = Song.objects.get_or_create(
            slug=song_slug,
            defaults={
                'title': song_data.get('title', ''),
                'year': song_data.get('year'),
                'lyrics': song_data.get('lyrics', ''),
            },
        )
        if created:
            self.created += 1
            self.log(f'    + Canción: {song.title}')

        Track.objects.get_or_create(
            album=album,
            disc_number=data.get('disc_number', 1),
            track_number=data.get('track_number', 1),
            defaults={'song': song, 'is_bonus': data.get('is_bonus', False)},
        )

        for credit_data in song_data.get('credits', []):
            person = self.get_or_create_person(credit_data['person'])
            SongCredit.objects.get_or_create(
                song=song,
                person=person,
                role=credit_data['role'],
                defaults={
                    'instrument': credit_data.get('instrument', ''),
                    'as_name': credit_data.get('as_name', ''),
                },
            )
