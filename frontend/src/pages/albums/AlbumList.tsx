import { ListPage } from '../../components/resource/ListPage'
import type { ColumnDef } from '../../types/api'
import type { Album } from '../../types/resources'

const ALBUM_TYPE_LABELS: Record<string, string> = {
  studio: 'Estudio', live: 'En vivo', compilation: 'Compilación', ep: 'EP', single: 'Single',
}

const columns: ColumnDef<Album>[] = [
  { key: 'title', label: 'Título', sortable: true },
  { key: 'artist_name', label: 'Artista' },
  { key: 'release_year', label: 'Año', sortable: true },
  { key: 'album_type', label: 'Tipo', render: row => ALBUM_TYPE_LABELS[row.album_type] ?? row.album_type },
  { key: 'record_label_name', label: 'Sello' },
]

export function AlbumList() {
  return <ListPage resource="albums" title="Álbumes" createPath="/albums/create" columns={columns} />
}
