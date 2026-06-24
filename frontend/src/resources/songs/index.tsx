import {
  List, Datagrid, TextField, NumberField,
  Edit, SimpleForm, TextInput, NumberInput,
  ReferenceArrayInput, SelectArrayInput,
  Create,
} from 'react-admin'

export const SongList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="title" label="Canción" />
      <NumberField source="year" label="Año" />
      <NumberField source="duration" label="Duración (seg)" />
    </Datagrid>
  </List>
)

const SongForm = () => (
  <SimpleForm>
    <TextInput source="title" label="Título" required />
    <NumberInput source="year" label="Año" />
    <NumberInput source="duration" label="Duración (segundos)" />
    <ReferenceArrayInput source="genres" reference="genres">
      <SelectArrayInput optionText="name" label="Géneros" />
    </ReferenceArrayInput>
    <TextInput source="lyrics" label="Letra" multiline rows={10} />
  </SimpleForm>
)

export const SongEdit = () => <Edit><SongForm /></Edit>
export const SongCreate = () => <Create><SongForm /></Create>
