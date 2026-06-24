from rest_framework.viewsets import ModelViewSet
from apps.catalog.models import (
    Country, Genre, RecordLabel, Person, Artist,
    OrchestraMember, Album, Song, Track, SongCredit,
)
from apps.catalog.serializers import (
    CountrySerializer, GenreSerializer, RecordLabelSerializer,
    PersonSerializer, ArtistSerializer, OrchestraMemberSerializer,
    AlbumSerializer, SongSerializer, TrackSerializer, SongCreditSerializer,
)
from apps.catalog.filters import (
    ArtistFilter, AlbumFilter, SongFilter, PersonFilter,
    SongCreditFilter, OrchestraMemberFilter,
)


class CountryViewSet(ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    search_fields = ('name', 'iso_code')
    ordering_fields = ('name', 'iso_code')
    ordering = ('name',)


class GenreViewSet(ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    search_fields = ('name',)
    ordering_fields = ('name',)
    ordering = ('name',)


class RecordLabelViewSet(ModelViewSet):
    queryset = RecordLabel.objects.select_related('country')
    serializer_class = RecordLabelSerializer
    search_fields = ('name',)
    ordering_fields = ('name', 'founded_year')
    ordering = ('name',)


class PersonViewSet(ModelViewSet):
    queryset = Person.objects.select_related('nationality')
    serializer_class = PersonSerializer
    filterset_class = PersonFilter
    search_fields = ('full_name',)
    ordering_fields = ('full_name', 'birth_date')
    ordering = ('full_name',)


class ArtistViewSet(ModelViewSet):
    queryset = Artist.objects.select_related('nationality').prefetch_related('genres')
    serializer_class = ArtistSerializer
    filterset_class = ArtistFilter
    search_fields = ('name',)
    ordering_fields = ('name', 'formed_year')
    ordering = ('name',)


class OrchestraMemberViewSet(ModelViewSet):
    queryset = OrchestraMember.objects.select_related('artist', 'person')
    serializer_class = OrchestraMemberSerializer
    filterset_class = OrchestraMemberFilter
    ordering_fields = ('person__full_name', 'join_year')
    ordering = ('person__full_name',)


class AlbumViewSet(ModelViewSet):
    queryset = Album.objects.select_related('artist', 'record_label').prefetch_related('genres')
    serializer_class = AlbumSerializer
    filterset_class = AlbumFilter
    search_fields = ('title', 'artist__name')
    ordering_fields = ('title', 'release_year', 'artist__name')
    ordering = ('-release_year',)


class SongViewSet(ModelViewSet):
    queryset = Song.objects.prefetch_related('genres')
    serializer_class = SongSerializer
    filterset_class = SongFilter
    search_fields = ('title',)
    ordering_fields = ('title', 'year')
    ordering = ('title',)


class TrackViewSet(ModelViewSet):
    queryset = Track.objects.select_related('album', 'song')
    serializer_class = TrackSerializer
    filterset_fields = ('album', 'song')
    ordering_fields = ('disc_number', 'track_number')
    ordering = ('disc_number', 'track_number')


class SongCreditViewSet(ModelViewSet):
    queryset = SongCredit.objects.select_related('song', 'person')
    serializer_class = SongCreditSerializer
    filterset_class = SongCreditFilter
    ordering_fields = ('role', 'person__full_name')
    ordering = ('role', 'person__full_name')
