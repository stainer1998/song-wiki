import { Input, Select, VStack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { FormField } from '../../components/ui/FormField'
import { ReferenceSelect } from '../../components/ui/ReferenceSelect'
import type { SongCredit } from '../../types/resources'

interface Props {
  defaultValues?: Partial<SongCredit>
  onSubmit: (values: unknown) => Promise<void>
}

export function CreditForm({ defaultValues, onSubmit }: Props) {
  const { register, handleSubmit, control, formState: { errors } } = useForm<SongCredit>({ defaultValues })

  return (
    <form id="resource-form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch">
        <FormField label="Canción" error={errors.song}>
          <ReferenceSelect resource="songs" labelField="title" name="song" control={control} isClearable={false} />
        </FormField>
        <FormField label="Persona" error={errors.person}>
          <ReferenceSelect resource="persons" labelField="full_name" name="person" control={control} isClearable={false} />
        </FormField>
        <FormField label="Rol" error={errors.role}>
          <Select {...register('role', { required: 'Campo requerido' })} w="280px">
            <option value="">— seleccionar —</option>
            <option value="composer">Compositor</option>
            <option value="lyricist">Letrista</option>
            <option value="arranger">Arreglista</option>
            <option value="producer">Productor</option>
            <option value="engineer">Ingeniero</option>
            <option value="vocalist">Vocalista</option>
            <option value="instrumentalist">Instrumentista</option>
            <option value="conductor">Director</option>
          </Select>
        </FormField>
        <FormField label="Instrumento">
          <Input {...register('instrument')} />
        </FormField>
        <FormField label="Nombre acreditado">
          <Input {...register('as_name')} placeholder="Solo si difiere del nombre real" />
        </FormField>
      </VStack>
    </form>
  )
}
