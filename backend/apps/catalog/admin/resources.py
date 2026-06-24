from import_export import resources, fields
from import_export.widgets import ForeignKeyWidget, ManyToManyWidget

from apps.catalog.models import (
    Country, Genre, RecordLabel, Person, Artist,
    Album, Song, SongCredit, OrchestraMember,
)


class CountryResource(resources.ModelResource):
    class Meta:
        model = Country
        import_id_fields = ['iso_code']
        fields = ('id', 'name', 'iso_code')


class GenreResource(resources.ModelResource):
    class Meta:
        model = Genre
        import_id_fields = ['slug']
        fields = ('id', 'name', 'slug', 'description')


class PersonResource(resources.ModelResource):
    nationality = fields.Field(
        column_name='nationality',
        attribute='nationality',
        widget=ForeignKeyWidget(Country, 'iso_code'),
    )

    class Meta:
        model = Person
        import_id_fields = ['slug']
        fields = ('id', 'full_name', 'slug', 'birth_date', 'death_date', 'nationality', 'bio')


class ArtistResource(resources.ModelResource):
    nationality = fields.Field(
        column_name='nationality',
        attribute='nationality',
        widget=ForeignKeyWidget(Country, 'iso_code'),
    )
    genres = fields.Field(
        column_name='genres',
        attribute='genres',
        widget=ManyToManyWidget(Genre, field='slug', separator='|'),
    )

    class Meta:
        model = Artist
        import_id_fields = ['slug']
        fields = ('id', 'name', 'slug', 'artist_type', 'bio', 'formed_year', 'disbanded_year', 'nationality', 'genres')


class AlbumResource(resources.ModelResource):
    artist = fields.Field(
        column_name='artist',
        attribute='artist',
        widget=ForeignKeyWidget(Artist, 'slug'),
    )
    record_label = fields.Field(
        column_name='record_label',
        attribute='record_label',
        widget=ForeignKeyWidget(RecordLabel, 'slug'),
    )
    genres = fields.Field(
        column_name='genres',
        attribute='genres',
        widget=ManyToManyWidget(Genre, field='slug', separator='|'),
    )

    class Meta:
        model = Album
        import_id_fields = ['slug']
        fields = ('id', 'title', 'slug', 'artist', 'release_year', 'release_date', 'record_label', 'album_type', 'genres')


class SongResource(resources.ModelResource):
    genres = fields.Field(
        column_name='genres',
        attribute='genres',
        widget=ManyToManyWidget(Genre, field='slug', separator='|'),
    )

    class Meta:
        model = Song
        import_id_fields = ['slug']
        fields = ('id', 'title', 'slug', 'year', 'duration', 'lyrics', 'genres')


class SongCreditResource(resources.ModelResource):
    song = fields.Field(
        column_name='song',
        attribute='song',
        widget=ForeignKeyWidget(Song, 'slug'),
    )
    person = fields.Field(
        column_name='person',
        attribute='person',
        widget=ForeignKeyWidget(Person, 'slug'),
    )

    class Meta:
        model = SongCredit
        import_id_fields = ['id']
        fields = ('id', 'song', 'person', 'role', 'instrument', 'as_name')


class OrchestraMemberResource(resources.ModelResource):
    artist = fields.Field(
        column_name='artist',
        attribute='artist',
        widget=ForeignKeyWidget(Artist, 'slug'),
    )
    person = fields.Field(
        column_name='person',
        attribute='person',
        widget=ForeignKeyWidget(Person, 'slug'),
    )

    class Meta:
        model = OrchestraMember
        import_id_fields = ['id']
        fields = ('id', 'artist', 'person', 'role', 'instrument', 'join_year', 'leave_year', 'is_current')
