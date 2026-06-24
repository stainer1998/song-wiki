from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from apps.catalog.models import Song, SongCredit, Track
from .resources import SongResource, SongCreditResource


class SongCreditInline(admin.StackedInline):
    model = SongCredit
    extra = 0
    autocomplete_fields = ('person',)
    fields = ('person', 'role', 'instrument', 'as_name', 'credited_on_track')


class TrackAppearanceInline(admin.TabularInline):
    model = Track
    extra = 0
    readonly_fields = ('album', 'disc_number', 'track_number', 'is_bonus')
    fields = ('album', 'disc_number', 'track_number', 'is_bonus')
    show_change_link = True
    can_delete = False
    verbose_name = 'Aparición en álbum'
    verbose_name_plural = 'Apariciones en álbumes'

    def has_add_permission(self, request, obj=None):
        return False


@admin.register(Song)
class SongAdmin(ImportExportModelAdmin):
    resource_class = SongResource
    list_display = ('title', 'year', 'duration')
    list_filter = ('genres', 'year')
    search_fields = ('title',)
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('genres',)
    inlines = [SongCreditInline, TrackAppearanceInline]


@admin.register(SongCredit)
class SongCreditAdmin(ImportExportModelAdmin):
    resource_class = SongCreditResource
    list_display = ('song', 'person', 'role', 'instrument')
    list_filter = ('role',)
    search_fields = ('song__title', 'person__full_name')
    autocomplete_fields = ('song', 'person')
