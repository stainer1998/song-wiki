import { ListPage } from '../../components/resource/ListPage'
import type { ColumnDef } from '../../types/api'
import type { Song } from '../../types/resources'

function formatDuration(seconds: number | null): string {
  if (!seconds) return ''
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

const columns: ColumnDef<Song>[] = [
  { key: 'title', label: 'Título', sortable: true },
  { key: 'year', label: 'Año', sortable: true },
  { key: 'duration', label: 'Duración', render: row => formatDuration(row.duration) },
]

export function SongList() {
  return <ListPage resource="songs" title="Canciones" createPath="/songs/create" columns={columns} />
}
