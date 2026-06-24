from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from apps.catalog.models import Artist, OrchestraMember, Album
from .resources import ArtistResource


class OrchestraMemberInline(admin.TabularInline):
    model = OrchestraMember
    extra = 0
    autocomplete_fields = ('person',)
    fields = ('person', 'role', 'instrument', 'join_year', 'leave_year', 'is_current')


class AlbumSummaryInline(admin.TabularInline):
    model = Album
    extra = 0
    fields = ('title', 'release_year', 'album_type')
    readonly_fields = ('title', 'release_year', 'album_type')
    show_change_link = True
    can_delete = False

    def has_add_permission(self, request, obj=None):
        return False


@admin.register(Artist)
class ArtistAdmin(ImportExportModelAdmin):
    resource_class = ArtistResource
    list_display = ('name', 'artist_type', 'nationality', 'formed_year', 'disbanded_year')
    list_filter = ('artist_type', 'nationality', 'genres')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}
    autocomplete_fields = ('nationality',)
    filter_horizontal = ('genres',)
    inlines = [OrchestraMemberInline, AlbumSummaryInline]
