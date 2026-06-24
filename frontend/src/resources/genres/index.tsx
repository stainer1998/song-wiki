import {
  List, Datagrid, TextField,
  Edit, SimpleForm, TextInput,
  Create,
} from 'react-admin'

export const GenreList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" label="Género" />
      <TextField source="slug" />
    </Datagrid>
  </List>
)

const GenreForm = () => (
  <SimpleForm>
    <TextInput source="name" label="Nombre" required />
    <TextInput source="description" label="Descripción" multiline rows={3} />
  </SimpleForm>
)

export const GenreEdit = () => <Edit><GenreForm /></Edit>
export const GenreCreate = () => <Create><GenreForm /></Create>
