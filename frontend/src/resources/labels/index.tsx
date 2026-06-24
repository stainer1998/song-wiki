import {
  List, Datagrid, TextField, NumberField,
  Edit, SimpleForm, TextInput, NumberInput, ReferenceInput, SelectInput,
  Create, ReferenceField,
} from 'react-admin'

export const LabelList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" label="Sello" />
      <ReferenceField source="country" reference="countries" label="País">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="founded_year" label="Fundado" />
    </Datagrid>
  </List>
)

const LabelForm = () => (
  <SimpleForm>
    <TextInput source="name" label="Nombre" required />
    <ReferenceInput source="country" reference="countries">
      <SelectInput optionText="name" label="País" />
    </ReferenceInput>
    <NumberInput source="founded_year" label="Año de fundación" />
  </SimpleForm>
)

export const LabelEdit = () => <Edit><LabelForm /></Edit>
export const LabelCreate = () => <Create><LabelForm /></Create>
