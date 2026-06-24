import {
  List, Datagrid, TextField, NumberField, SelectField,
  Edit, SimpleForm, TextInput, NumberInput,
  ReferenceInput, SelectInput, ReferenceArrayInput, SelectArrayInput,
  Create, ReferenceField,
} from 'react-admin'

const artistTypeChoices = [
  { id: 'solo', name: 'Solista' },
  { id: 'orchestra', name: 'Orquesta / Conjunto' },
]

export const ArtistList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" label="Artista" />
      <SelectField source="artist_type" choices={artistTypeChoices} label="Tipo" />
      <ReferenceField source="nationality" reference="countries" label="Nacionalidad">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="formed_year" label="Inicio" />
      <NumberField source="disbanded_year" label="Disolución" />
    </Datagrid>
  </List>
)

const ArtistForm = () => (
  <SimpleForm>
    <TextInput source="name" label="Nombre" required />
    <SelectInput source="artist_type" choices={artistTypeChoices} label="Tipo" required />
    <ReferenceInput source="nationality" reference="countries">
      <SelectInput optionText="name" label="Nacionalidad" />
    </ReferenceInput>
    <NumberInput source="formed_year" label="Año de inicio" />
    <NumberInput source="disbanded_year" label="Año de disolución" />
    <ReferenceArrayInput source="genres" reference="genres">
      <SelectArrayInput optionText="name" label="Géneros" />
    </ReferenceArrayInput>
    <TextInput source="bio" label="Biografía" multiline rows={5} />
  </SimpleForm>
)

export const ArtistEdit = () => <Edit><ArtistForm /></Edit>
export const ArtistCreate = () => <Create><ArtistForm /></Create>
