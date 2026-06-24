import { EditPage } from '../../components/resource/EditPage'
import { SongForm } from './SongForm'
import type { Song } from '../../types/resources'

export function SongEdit() {
  return (
    <EditPage<Song> resource="songs" title="Editar canción">
      {(data, onSubmit) => <SongForm defaultValues={data} onSubmit={onSubmit} />}
    </EditPage>
  )
}
