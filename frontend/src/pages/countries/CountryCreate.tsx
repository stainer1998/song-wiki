import { CreatePage } from '../../components/resource/CreatePage'
import { CountryForm } from './CountryForm'

export function CountryCreate() {
  return (
    <CreatePage resource="countries" title="Nuevo país">
      {(onSubmit) => <CountryForm onSubmit={onSubmit} />}
    </CreatePage>
  )
}
