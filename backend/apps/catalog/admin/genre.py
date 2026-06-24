from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from apps.catalog.models import Genre
from .resources import GenreResource


@admin.register(Genre)
class GenreAdmin(ImportExportModelAdmin):
    resource_class = GenreResource
    list_display = ('name', 'slug')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}
