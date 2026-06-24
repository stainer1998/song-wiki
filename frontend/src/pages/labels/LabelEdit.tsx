import { EditPage } from '../../components/resource/EditPage'
import { LabelForm } from './LabelForm'
import type { RecordLabel } from '../../types/resources'

export function LabelEdit() {
  return (
    <EditPage<RecordLabel> resource="labels" title="Editar sello">
      {(data, onSubmit) => <LabelForm defaultValues={data} onSubmit={onSubmit} />}
    </EditPage>
  )
}
