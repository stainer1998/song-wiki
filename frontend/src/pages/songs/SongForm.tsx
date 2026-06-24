import { Input, Textarea, VStack, SimpleGrid } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { FormField } from '../../components/ui/FormField'
import { ReferenceMultiSelect } from '../../components/ui/ReferenceMultiSelect'
import type { Song } from '../../types/resources'

interface Props {
  defaultValues?: Partial<Song>
  onSubmit: (values: unknown) => Promise<void>
}

export function SongForm({ defaultValues, onSubmit }: Props) {
  const { register, handleSubmit, control, formState: { errors } } = useForm<Song>({ defaultValues })

  return (
    <form id="resource-form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch">
        <FormField label="Título" error={errors.title}>
          <Input {...register('title', { required: 'Campo requerido' })} />
        </FormField>
        <SimpleGrid columns={2} spacing={4}>
          <FormField label="Año">
            <Input type="number" {...register('year', { valueAsNumber: true })} />
          </FormField>
          <FormField label="Duración (segundos)">
            <Input type="number" {...register('duration', { valueAsNumber: true })} />
          </FormField>
        </SimpleGrid>
        <FormField label="Géneros">
          <ReferenceMultiSelect resource="genres" labelField="name" name="genres" control={control} />
        </FormField>
        <FormField label="Letra">
          <Textarea {...register('lyrics')} rows={10} fontFamily="mono" fontSize="sm" />
        </FormField>
      </VStack>
    </form>
  )
}
