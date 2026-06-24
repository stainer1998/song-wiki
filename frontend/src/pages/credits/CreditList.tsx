import { ListPage } from '../../components/resource/ListPage'
import type { ColumnDef } from '../../types/api'
import type { SongCredit } from '../../types/resources'

const columns: ColumnDef<SongCredit>[] = [
  { key: 'song_title', label: 'Canción', sortable: true },
  { key: 'person_name', label: 'Persona', sortable: true },
  { key: 'role_display', label: 'Rol' },
  { key: 'instrument', label: 'Instrumento' },
]

export function CreditList() {
  return <ListPage resource="credits" title="Créditos" createPath="/credits/create" columns={columns} />
}
