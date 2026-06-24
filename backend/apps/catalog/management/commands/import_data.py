from django.core.management.base import BaseCommand
from apps.catalog.importers.json_importer import JsonImporter
from apps.catalog.importers.flat_importer import FlatImporter


class Command(BaseCommand):
    help = 'Importa artistas, álbumes y canciones desde JSON, CSV o XLSX'

    def add_arguments(self, parser):
        parser.add_argument('--file', required=True, help='Ruta al archivo a importar')
        parser.add_argument('--format', choices=['json', 'csv', 'xlsx'], required=True, dest='fmt')
        parser.add_argument('--dry-run', action='store_true', help='Valida sin escribir en la BD')
        parser.add_argument('--no-atomic', action='store_true', help='No usar transacción atómica')

    def handle(self, *args, **options):
        file_path = options['file']
        fmt = options['fmt']
        dry_run = options['dry_run']
        atomic = not options['no_atomic']

        if fmt == 'json':
            importer = JsonImporter(stdout=self.stdout, stderr=self.stderr)
        else:
            importer = FlatImporter(fmt=fmt, stdout=self.stdout, stderr=self.stderr)

        result = importer.run(file_path, dry_run=dry_run, atomic=atomic)

        label = 'simulada (sin cambios)' if dry_run else 'completada'
        self.stdout.write(self.style.SUCCESS(
            f'\nImportación {label}: '
            f'{result["created"]} creados, {result["updated"]} actualizados, {result["errors"]} errores'
        ))
