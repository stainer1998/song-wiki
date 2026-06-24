import {
  List, Datagrid, TextField,
  Edit, SimpleForm, TextInput,
  Create,
} from 'react-admin'

export const CountryList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" label="País" />
      <TextField source="iso_code" label="Código ISO" />
    </Datagrid>
  </List>
)

const CountryForm = () => (
  <SimpleForm>
    <TextInput source="name" label="País" required />
    <TextInput source="iso_code" label="Código ISO (3 letras)" required />
  </SimpleForm>
)

export const CountryEdit = () => <Edit><CountryForm /></Edit>
export const CountryCreate = () => <Create><CountryForm /></Create>
