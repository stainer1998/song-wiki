import { EditPage } from '../../components/resource/EditPage'
import { CreditForm } from './CreditForm'
import type { SongCredit } from '../../types/resources'

export function CreditEdit() {
  return (
    <EditPage<SongCredit> resource="credits" title="Editar crédito">
      {(data, onSubmit) => <CreditForm defaultValues={data} onSubmit={onSubmit} />}
    </EditPage>
  )
}
