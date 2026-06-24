import { CreatePage } from '../../components/resource/CreatePage'
import { LabelForm } from './LabelForm'

export function LabelCreate() {
  return (
    <CreatePage resource="labels" title="Nuevo sello">
      {(onSubmit) => <LabelForm onSubmit={onSubmit} />}
    </CreatePage>
  )
}
