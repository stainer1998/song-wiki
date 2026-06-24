import { CreatePage } from '../../components/resource/CreatePage'
import { GenreForm } from './GenreForm'

export function GenreCreate() {
  return (
    <CreatePage resource="genres" title="Nuevo género">
      {(onSubmit) => <GenreForm onSubmit={onSubmit} />}
    </CreatePage>
  )
}
