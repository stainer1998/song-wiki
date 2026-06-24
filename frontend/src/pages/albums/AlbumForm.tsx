import { Input, Select, VStack, SimpleGrid, Divider } from '@chakra-ui/react'
import { useForm, FormProvider } from 'react-hook-form'
import { FormField } from '../../components/ui/FormField'
import { ReferenceSelect } from '../../components/ui/ReferenceSelect'
import { ReferenceMultiSelect } from '../../components/ui/ReferenceMultiSelect'
import { TrackInline } from './TrackInline'
import type { Album } from '../../types/resources'

export interface TrackRow {
  _dbId?: number
  track_number: number
  disc_number: number
  song: number
  duration_override: number | null
  is_bonus: boolean
}

export interface AlbumFormValues extends Omit<Album, 'id'> {
  tracks: TrackRow[]
}

interface Props {
  defaultValues?: Partial<AlbumFormValues>
  onSubmit: (values: AlbumFormValues) => Promise<void>
}

export function AlbumForm({ defaultValues, onSubmit }: Props) {
  const methods = useForm<AlbumFormValues>({
    defaultValues: { tracks: [], ...defaultValues },
  })
  const { register, handleSubmit, control, formState: { errors } } = methods

  return (
    <FormProvider {...methods}>
      <form id="resource-form" onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <FormField label="Título" error={errors.title}>
            <Input {...register('title', { required: 'Campo requerido' })} />
          </FormField>
          <FormField label="Tipo">
            <Select {...register('album_type')} w="240px">
              <option value="studio">Estudio</option>
              <option value="live">En vivo</option>
              <option value="compilation">Compilación</option>
              <option value="ep">EP</option>
              <option value="single">Single</option>
            </Select>
          </FormField>
          <FormField label="Artista" error={errors.artist}>
            <ReferenceSelect resource="artists" labelField="name" name="artist" control={control} isClearable={false} />
          </FormField>
          <FormField label="Sello discográfico">
            <ReferenceSelect resource="labels" labelField="name" name="record_label" control={control} />
          </FormField>
          <FormField label="Géneros">
            <ReferenceMultiSelect resource="genres" labelField="name" name="genres" control={control} />
          </FormField>
          <SimpleGrid columns={2} spacing={4}>
            <FormField label="Año de lanzamiento">
              <Input type="number" {...register('release_year', { valueAsNumber: true })} />
            </FormField>
            <FormField label="Fecha de lanzamiento">
              <Input type="date" {...register('release_date')} />
            </FormField>
          </SimpleGrid>

          <Divider />
          <TrackInline />
        </VStack>
      </form>
    </FormProvider>
  )
}
