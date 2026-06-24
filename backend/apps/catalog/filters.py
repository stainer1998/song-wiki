import django_filters
from apps.catalog.models import Artist, Album, Song, Person, SongCredit, OrchestraMember


class ArtistFilter(django_filters.FilterSet):
    class Meta:
        model = Artist
        fields = {'artist_type': ['exact'], 'nationality': ['exact'], 'genres': ['exact']}


class AlbumFilter(django_filters.FilterSet):
    class Meta:
        model = Album
        fields = {'artist': ['exact'], 'album_type': ['exact'], 'release_year': ['exact', 'gte', 'lte'], 'genres': ['exact']}


class SongFilter(django_filters.FilterSet):
    class Meta:
        model = Song
        fields = {'year': ['exact', 'gte', 'lte'], 'genres': ['exact']}


class PersonFilter(django_filters.FilterSet):
    class Meta:
        model = Person
        fields = {'nationality': ['exact']}


class SongCreditFilter(django_filters.FilterSet):
    class Meta:
        model = SongCredit
        fields = {'song': ['exact'], 'person': ['exact'], 'role': ['exact']}


class OrchestraMemberFilter(django_filters.FilterSet):
    class Meta:
        model = OrchestraMember
        fields = {'artist': ['exact'], 'person': ['exact'], 'is_current': ['exact']}
