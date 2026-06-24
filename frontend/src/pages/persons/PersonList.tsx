import { ListPage } from '../../components/resource/ListPage'
import type { ColumnDef } from '../../types/api'
import type { Person } from '../../types/resources'

const columns: ColumnDef<Person>[] = [
  { key: 'full_name', label: 'Nombre', sortable: true },
  { key: 'nationality_name', label: 'Nacionalidad' },
  { key: 'birth_date', label: 'Nacimiento', sortable: true },
  { key: 'death_date', label: 'Fallecimiento' },
]

export function PersonList() {
  return <ListPage resource="persons" title="Personas" createPath="/persons/create" columns={columns} />
}
