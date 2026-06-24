import { ListPage } from '../../components/resource/ListPage'
import type { ColumnDef } from '../../types/api'
import type { Genre } from '../../types/resources'

const columns: ColumnDef<Genre>[] = [
  { key: 'name', label: 'Género', sortable: true },
  { key: 'description', label: 'Descripción' },
]

export function GenreList() {
  return <ListPage resource="genres" title="Géneros" createPath="/genres/create" columns={columns} />
}
