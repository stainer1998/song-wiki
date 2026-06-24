from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from apps.catalog.models import Country
from .resources import CountryResource


@admin.register(Country)
class CountryAdmin(ImportExportModelAdmin):
    resource_class = CountryResource
    list_display = ('name', 'iso_code')
    search_fields = ('name', 'iso_code')
