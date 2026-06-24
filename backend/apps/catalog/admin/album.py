from django.contrib import admin
from django.utils.html import format_html
from import_export.admin import ImportExportModelAdmin
from apps.catalog.models import Album, Track
from .resources import AlbumResource


class TrackInline(admin.TabularInline):
    model = Track
    extra = 0
    autocomplete_fields = ('song',)
    fields = ('disc_number', 'track_number', 'song', 'duration_override', 'is_bonus')
    ordering = ('disc_number', 'track_number')


@admin.register(Album)
class AlbumAdmin(ImportExportModelAdmin):
    resource_class = AlbumResource
    list_display = ('title', 'artist', 'release_year', 'album_type', 'cover_thumbnail')
    list_filter = ('album_type', 'release_year', 'genres')
    search_fields = ('title', 'artist__name')
    prepopulated_fields = {'slug': ('title',)}
    autocomplete_fields = ('artist', 'record_label')
    filter_horizontal = ('genres',)
    inlines = [TrackInline]

    @admin.display(description='Cover')
    def cover_thumbnail(self, obj):
        if obj.cover_art:
            return format_html('<img src="{}" style="height:40px;">', obj.cover_art.url)
        return '—'
