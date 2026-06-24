import { ListPage } from '../../components/resource/ListPage'
import type { ColumnDef } from '../../types/api'
import type { Artist } from '../../types/resources'

const ARTIST_TYPE_LABELS: Record<string, string> = {
  solo: 'Solista',
  orchestra: 'Orquesta / Conjunto',
}

const columns: ColumnDef<Artist>[] = [
  { key: 'name', label: 'Artista', sortable: true },
  { key: 'artist_type', label: 'Tipo', render: row => ARTIST_TYPE_LABELS[row.artist_type] ?? row.artist_type },
  { key: 'nationality_name', label: 'Nacionalidad' },
  { key: 'formed_year', label: 'Inicio', sortable: true },
  { key: 'disbanded_year', label: 'Disolución' },
]

export function ArtistList() {
  return <ListPage resource="artists" title="Artistas" createPath="/artists/create" columns={columns} />
}
