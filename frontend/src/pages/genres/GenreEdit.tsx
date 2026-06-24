import { EditPage } from '../../components/resource/EditPage'
import { GenreForm } from './GenreForm'
import type { Genre } from '../../types/resources'

export function GenreEdit() {
  return (
    <EditPage<Genre> resource="genres" title="Editar género">
      {(data, onSubmit) => <GenreForm defaultValues={data} onSubmit={onSubmit} />}
    </EditPage>
  )
}
