import { EditPage } from '../../components/resource/EditPage'
import { CountryForm } from './CountryForm'
import type { Country } from '../../types/resources'

export function CountryEdit() {
  return (
    <EditPage<Country> resource="countries" title="Editar país">
      {(data, onSubmit) => <CountryForm defaultValues={data} onSubmit={onSubmit} />}
    </EditPage>
  )
}
