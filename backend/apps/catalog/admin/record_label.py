from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from apps.catalog.models import RecordLabel


@admin.register(RecordLabel)
class RecordLabelAdmin(ImportExportModelAdmin):
    list_display = ('name', 'country', 'founded_year')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}
    autocomplete_fields = ('country',)
