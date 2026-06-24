import { CreatePage } from '../../components/resource/CreatePage'
import { CreditForm } from './CreditForm'

export function CreditCreate() {
  return (
    <CreatePage resource="credits" title="Nuevo crédito">
      {(onSubmit) => <CreditForm onSubmit={onSubmit} />}
    </CreatePage>
  )
}
