import { ListPage } from '../../components/resource/ListPage'
import type { ColumnDef } from '../../types/api'
import type { RecordLabel } from '../../types/resources'

const columns: ColumnDef<RecordLabel>[] = [
  { key: 'name', label: 'Sello', sortable: true },
  { key: 'country_name', label: 'País' },
  { key: 'founded_year', label: 'Fundado', sortable: true },
]

export function LabelList() {
  return <ListPage resource="labels" title="Sellos discográficos" createPath="/labels/create" columns={columns} />
}
