import { Admin, Resource } from 'react-admin'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import AlbumIcon from '@mui/icons-material/Album'
import PersonIcon from '@mui/icons-material/Person'
import PublicIcon from '@mui/icons-material/Public'
import LabelIcon from '@mui/icons-material/Label'
import CategoryIcon from '@mui/icons-material/Category'
import StarIcon from '@mui/icons-material/Star'
import CreditScoreIcon from '@mui/icons-material/CreditScore'

import dataProvider from './dataProvider'
import authProvider from './authProvider'

import { ArtistList, ArtistEdit, ArtistCreate } from './resources/artists'
import { AlbumList, AlbumEdit, AlbumCreate } from './resources/albums'
import { SongList, SongEdit, SongCreate } from './resources/songs'
import { PersonList, PersonEdit, PersonCreate } from './resources/persons'
import { CountryList, CountryEdit, CountryCreate } from './resources/countries'
import { GenreList, GenreEdit, GenreCreate } from './resources/genres'
import { LabelList, LabelEdit, LabelCreate } from './resources/labels'
import { CreditList, CreditEdit, CreditCreate } from './resources/credits'

export default function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      title="Song Wiki Admin"
    >
      <Resource
        name="artists"
        list={ArtistList}
        edit={ArtistEdit}
        create={ArtistCreate}
        icon={StarIcon}
        options={{ label: 'Artistas' }}
      />
      <Resource
        name="albums"
        list={AlbumList}
        edit={AlbumEdit}
        create={AlbumCreate}
        icon={AlbumIcon}
        options={{ label: 'Álbumes' }}
      />
      <Resource
        name="songs"
        list={SongList}
        edit={SongEdit}
        create={SongCreate}
        icon={MusicNoteIcon}
        options={{ label: 'Canciones' }}
      />
      <Resource
        name="credits"
        list={CreditList}
        edit={CreditEdit}
        create={CreditCreate}
        icon={CreditScoreIcon}
        options={{ label: 'Créditos' }}
      />
      <Resource
        name="persons"
        list={PersonList}
        edit={PersonEdit}
        create={PersonCreate}
        icon={PersonIcon}
        options={{ label: 'Personas' }}
      />
      <Resource
        name="genres"
        list={GenreList}
        edit={GenreEdit}
        create={GenreCreate}
        icon={CategoryIcon}
        options={{ label: 'Géneros' }}
      />
      <Resource
        name="labels"
        list={LabelList}
        edit={LabelEdit}
        create={LabelCreate}
        icon={LabelIcon}
        options={{ label: 'Sellos' }}
      />
      <Resource
        name="countries"
        list={CountryList}
        edit={CountryEdit}
        create={CountryCreate}
        icon={PublicIcon}
        options={{ label: 'Países' }}
      />
    </Admin>
  )
}
