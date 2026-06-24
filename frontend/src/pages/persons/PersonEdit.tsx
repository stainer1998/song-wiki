import { EditPage } from '../../components/resource/EditPage'
import { PersonForm } from './PersonForm'
import type { Person } from '../../types/resources'

export function PersonEdit() {
  return (
    <EditPage<Person> resource="persons" title="Editar persona">
      {(data, onSubmit) => <PersonForm defaultValues={data} onSubmit={onSubmit} />}
    </EditPage>
  )
}
