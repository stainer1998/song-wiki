from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from apps.catalog.models import Person
from .resources import PersonResource


@admin.register(Person)
class PersonAdmin(ImportExportModelAdmin):
    resource_class = PersonResource
    list_display = ('full_name', 'nationality', 'birth_date', 'death_date')
    list_filter = ('nationality',)
    search_fields = ('full_name',)
    prepopulated_fields = {'slug': ('full_name',)}
    autocomplete_fields = ('nationality',)
