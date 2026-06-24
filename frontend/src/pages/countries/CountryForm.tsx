import { Input, VStack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { FormField } from '../../components/ui/FormField'
import type { Country } from '../../types/resources'

interface Props {
  defaultValues?: Partial<Country>
  onSubmit: (values: unknown) => Promise<void>
}

export function CountryForm({ defaultValues, onSubmit }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<Country>({ defaultValues })

  return (
    <form id="resource-form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch">
        <FormField label="Nombre" error={errors.name}>
          <Input {...register('name', { required: 'Campo requerido' })} />
        </FormField>
        <FormField label="Código ISO" error={errors.iso_code}>
          <Input {...register('iso_code', { required: 'Campo requerido' })} maxLength={3} w="120px" />
        </FormField>
      </VStack>
    </form>
  )
}
