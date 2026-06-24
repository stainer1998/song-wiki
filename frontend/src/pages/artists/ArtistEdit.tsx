import { EditPage } from '../../components/resource/EditPage'
import { ArtistForm } from './ArtistForm'
import type { Artist } from '../../types/resources'

export function ArtistEdit() {
  return (
    <EditPage<Artist> resource="artists" title="Editar artista">
      {(data, onSubmit) => <ArtistForm defaultValues={data} onSubmit={onSubmit} />}
    </EditPage>
  )
}
