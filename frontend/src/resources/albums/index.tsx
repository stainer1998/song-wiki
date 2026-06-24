import {
  List, Datagrid, TextField, NumberField, SelectField,
  Edit, SimpleForm, TextInput, NumberInput, DateInput,
  ReferenceInput, SelectInput, ReferenceArrayInput, SelectArrayInput,
  Create, ReferenceField,
} from 'react-admin'

const albumTypeChoices = [
  { id: 'studio', name: 'Estudio' },
  { id: 'live', name: 'En vivo' },
  { id: 'compilation', name: 'Compilación' },
  { id: 'ep', name: 'EP' },
  { id: 'single', name: 'Single' },
]

export const AlbumList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="title" label="Álbum" />
      <ReferenceField source="artist" reference="artists" label="Artista">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="release_year" label="Año" />
      <SelectField source="album_type" choices={albumTypeChoices} label="Tipo" />
      <ReferenceField source="record_label" reference="labels" label="Sello">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
)

const AlbumForm = () => (
  <SimpleForm>
    <TextInput source="title" label="Título" required />
    <ReferenceInput source="artist" reference="artists">
      <SelectInput optionText="name" label="Artista" required />
    </ReferenceInput>
    <SelectInput source="album_type" choices={albumTypeChoices} label="Tipo" />
    <NumberInput source="release_year" label="Año de lanzamiento" />
    <DateInput source="release_date" label="Fecha exacta de lanzamiento" />
    <ReferenceInput source="record_label" reference="labels">
      <SelectInput optionText="name" label="Sello discográfico" />
    </ReferenceInput>
    <ReferenceArrayInput source="genres" reference="genres">
      <SelectArrayInput optionText="name" label="Géneros" />
    </ReferenceArrayInput>
  </SimpleForm>
)

export const AlbumEdit = () => <Edit><AlbumForm /></Edit>
export const AlbumCreate = () => <Create><AlbumForm /></Create>
