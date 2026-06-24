import { CreatePage } from '../../components/resource/CreatePage'
import { SongForm } from './SongForm'

export function SongCreate() {
  return (
    <CreatePage resource="songs" title="Nueva canción">
      {(onSubmit) => <SongForm onSubmit={onSubmit} />}
    </CreatePage>
  )
}
