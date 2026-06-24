import { Input, Select, Textarea, VStack, SimpleGrid } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { FormField } from '../../components/ui/FormField'
import { ReferenceSelect } from '../../components/ui/ReferenceSelect'
import { ReferenceMultiSelect } from '../../components/ui/ReferenceMultiSelect'
import type { Artist } from '../../types/resources'

interface Props {
  defaultValues?: Partial<Artist>
  onSubmit: (values: unknown) => Promise<void>
}

export function ArtistForm({ defaultValues, onSubmit }: Props) {
  const { register, handleSubmit, control, formState: { errors } } = useForm<Artist>({ defaultValues })

  return (
    <form id="resource-form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch">
        <FormField label="Nombre" error={errors.name}>
          <Input {...register('name', { required: 'Campo requerido' })} />
        </FormField>
        <FormField label="Tipo">
          <Select {...register('artist_type')} w="240px">
            <option value="solo">Solista</option>
            <option value="orchestra">Orquesta / Conjunto</option>
          </Select>
        </FormField>
        <FormField label="Nacionalidad">
          <ReferenceSelect resource="countries" labelField="name" name="nationality" control={control} />
        </FormField>
        <FormField label="Géneros">
          <ReferenceMultiSelect resource="genres" labelField="name" name="genres" control={control} />
        </FormField>
        <SimpleGrid columns={2} spacing={4}>
          <FormField label="Año de inicio">
            <Input type="number" {...register('formed_year', { valueAsNumber: true })} />
          </FormField>
          <FormField label="Año de disolución">
            <Input type="number" {...register('disbanded_year', { valueAsNumber: true })} />
          </FormField>
        </SimpleGrid>
        <FormField label="Biografía">
          <Textarea {...register('bio')} rows={5} />
        </FormField>
      </VStack>
    </form>
  )
}
