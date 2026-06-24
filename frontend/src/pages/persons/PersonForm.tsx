import { Input, Textarea, VStack, SimpleGrid } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { FormField } from '../../components/ui/FormField'
import { ReferenceSelect } from '../../components/ui/ReferenceSelect'
import type { Person } from '../../types/resources'

interface Props {
  defaultValues?: Partial<Person>
  onSubmit: (values: unknown) => Promise<void>
}

export function PersonForm({ defaultValues, onSubmit }: Props) {
  const { register, handleSubmit, control, formState: { errors } } = useForm<Person>({ defaultValues })

  return (
    <form id="resource-form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch">
        <FormField label="Nombre completo" error={errors.full_name}>
          <Input {...register('full_name', { required: 'Campo requerido' })} />
        </FormField>
        <FormField label="Nacionalidad">
          <ReferenceSelect resource="countries" labelField="name" name="nationality" control={control} />
        </FormField>
        <SimpleGrid columns={2} spacing={4}>
          <FormField label="Fecha de nacimiento">
            <Input type="date" {...register('birth_date')} />
          </FormField>
          <FormField label="Fecha de fallecimiento">
            <Input type="date" {...register('death_date')} />
          </FormField>
        </SimpleGrid>
        <FormField label="Biografía">
          <Textarea {...register('bio')} rows={5} />
        </FormField>
      </VStack>
    </form>
  )
}
