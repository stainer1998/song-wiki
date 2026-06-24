import { Input, VStack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { FormField } from '../../components/ui/FormField'
import { ReferenceSelect } from '../../components/ui/ReferenceSelect'
import type { RecordLabel } from '../../types/resources'

interface Props {
  defaultValues?: Partial<RecordLabel>
  onSubmit: (values: unknown) => Promise<void>
}

export function LabelForm({ defaultValues, onSubmit }: Props) {
  const { register, handleSubmit, control, formState: { errors } } = useForm<RecordLabel>({ defaultValues })

  return (
    <form id="resource-form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch">
        <FormField label="Nombre" error={errors.name}>
          <Input {...register('name', { required: 'Campo requerido' })} />
        </FormField>
        <FormField label="País">
          <ReferenceSelect resource="countries" labelField="name" name="country" control={control} />
        </FormField>
        <FormField label="Año de fundación">
          <Input type="number" {...register('founded_year', { valueAsNumber: true })} w="160px" />
        </FormField>
      </VStack>
    </form>
  )
}
