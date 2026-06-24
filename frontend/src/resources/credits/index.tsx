import {
  List, Datagrid, TextField, SelectField,
  Edit, SimpleForm, TextInput, ReferenceInput, SelectInput,
  Create, ReferenceField,
} from 'react-admin'

const roleChoices = [
  { id: 'composer', name: 'Compositor' },
  { id: 'lyricist', name: 'Letrista' },
  { id: 'arranger', name: 'Arreglista' },
  { id: 'producer', name: 'Productor' },
  { id: 'engineer', name: 'Ingeniero' },
  { id: 'vocalist', name: 'Vocalista' },
  { id: 'instrumentalist', name: 'Instrumentista' },
  { id: 'conductor', name: 'Director' },
]

export const CreditList = () => (
  <List>
    <Datagrid rowClick="edit">
      <ReferenceField source="song" reference="songs" label="Canción">
        <TextField source="title" />
      </ReferenceField>
      <ReferenceField source="person" reference="persons" label="Persona">
        <TextField source="full_name" />
      </ReferenceField>
      <SelectField source="role" choices={roleChoices} label="Rol" />
      <TextField source="instrument" label="Instrumento" />
    </Datagrid>
  </List>
)

const CreditForm = () => (
  <SimpleForm>
    <ReferenceInput source="song" reference="songs">
      <SelectInput optionText="title" label="Canción" required />
    </ReferenceInput>
    <ReferenceInput source="person" reference="persons">
      <SelectInput optionText="full_name" label="Persona" required />
    </ReferenceInput>
    <SelectInput source="role" choices={roleChoices} label="Rol" required />
    <TextInput source="instrument" label="Instrumento" />
    <TextInput source="as_name" label="Acreditado como (si difiere)" />
  </SimpleForm>
)

export const CreditEdit = () => <Edit><CreditForm /></Edit>
export const CreditCreate = () => <Create><CreditForm /></Create>
