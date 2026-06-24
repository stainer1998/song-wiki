from rest_framework.routers import DefaultRouter
from apps.catalog.views import (
    CountryViewSet, GenreViewSet, RecordLabelViewSet, PersonViewSet,
    ArtistViewSet, OrchestraMemberViewSet, AlbumViewSet,
    SongViewSet, TrackViewSet, SongCreditViewSet,
)

router = DefaultRouter()
router.register('countries', CountryViewSet, basename='country')
router.register('genres', GenreViewSet, basename='genre')
router.register('labels', RecordLabelViewSet, basename='label')
router.register('persons', PersonViewSet, basename='person')
router.register('artists', ArtistViewSet, basename='artist')
router.register('members', OrchestraMemberViewSet, basename='member')
router.register('albums', AlbumViewSet, basename='album')
router.register('songs', SongViewSet, basename='song')
router.register('tracks', TrackViewSet, basename='track')
router.register('credits', SongCreditViewSet, basename='credit')

urlpatterns = router.urls
