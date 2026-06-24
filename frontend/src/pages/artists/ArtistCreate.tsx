import { CreatePage } from '../../components/resource/CreatePage'
import { ArtistForm } from './ArtistForm'

export function ArtistCreate() {
  return (
    <CreatePage resource="artists" title="Nuevo artista">
      {(onSubmit) => <ArtistForm onSubmit={onSubmit} />}
    </CreatePage>
  )
}
