import { CreatePage } from '../../components/resource/CreatePage'
import { PersonForm } from './PersonForm'

export function PersonCreate() {
  return (
    <CreatePage resource="persons" title="Nueva persona">
      {(onSubmit) => <PersonForm onSubmit={onSubmit} />}
    </CreatePage>
  )
}
