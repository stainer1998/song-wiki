import {
  List, Datagrid, TextField, DateField,
  Edit, SimpleForm, TextInput, DateInput, ReferenceInput, SelectInput,
  Create, ReferenceField,
} from 'react-admin'

export const PersonList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="full_name" label="Nombre" />
      <ReferenceField source="nationality" reference="countries" label="Nacionalidad">
        <TextField source="name" />
      </ReferenceField>
      <DateField source="birth_date" label="Nacimiento" />
      <DateField source="death_date" label="Fallecimiento" />
    </Datagrid>
  </List>
)

const PersonForm = () => (
  <SimpleForm>
    <TextInput source="full_name" label="Nombre completo" required />
    <ReferenceInput source="nationality" reference="countries">
      <SelectInput optionText="name" label="Nacionalidad" />
    </ReferenceInput>
    <DateInput source="birth_date" label="Fecha de nacimiento" />
    <DateInput source="death_date" label="Fecha de fallecimiento" />
    <TextInput source="bio" label="Biografía" multiline rows={5} />
  </SimpleForm>
)

export const PersonEdit = () => <Edit><PersonForm /></Edit>
export const PersonCreate = () => <Create><PersonForm /></Create>
