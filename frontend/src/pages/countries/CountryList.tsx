import { ListPage } from '../../components/resource/ListPage'
import type { ColumnDef } from '../../types/api'
import type { Country } from '../../types/resources'

const columns: ColumnDef<Country>[] = [
  { key: 'name', label: 'País', sortable: true },
  { key: 'iso_code', label: 'ISO' },
]

export function CountryList() {
  return <ListPage resource="countries" title="Países" createPath="/countries/create" columns={columns} />
}
