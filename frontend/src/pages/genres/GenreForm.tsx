import { Input, Textarea, VStack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { FormField } from '../../components/ui/FormField'
import type { Genre } from '../../types/resources'

interface Props {
  defaultValues?: Partial<Genre>
  onSubmit: (values: unknown) => Promise<void>
}

export function GenreForm({ defaultValues, onSubmit }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<Genre>({ defaultValues })

  return (
    <form id="resource-form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch">
        <FormField label="Nombre" error={errors.name}>
          <Input {...register('name', { required: 'Campo requerido' })} />
        </FormField>
        <FormField label="Descripción">
          <Textarea {...register('description')} rows={3} />
        </FormField>
      </VStack>
    </form>
  )
}
