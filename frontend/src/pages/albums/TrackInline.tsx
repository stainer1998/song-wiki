import {
  Box, Button, Checkbox, Heading, HStack, IconButton, Input,
  Table, Tbody, Td, Th, Thead, Tr, Text,
} from '@chakra-ui/react'
import { useFieldArray, useFormContext, Controller } from 'react-hook-form'
import { LuPlus, LuTrash2, LuGripVertical } from 'react-icons/lu'
import { Select } from 'chakra-react-select'
import { useReferenceOptions } from '../../hooks/useReferenceOptions'
import type { AlbumFormValues } from './AlbumForm'

export function TrackInline() {
  const { register, control, formState: { errors } } = useFormContext<AlbumFormValues>()
  const { fields, append, remove } = useFieldArray({ control, name: 'tracks' })
  const { data: songOptions = [], isLoading: songsLoading } = useReferenceOptions('songs', 'title')

  const trackErrors = errors.tracks

  return (
    <Box>
      <HStack justify="space-between" mb={3}>
        <Heading size="sm" color="gray.700">Pistas</Heading>
        <Button
          leftIcon={<LuPlus />}
          size="xs"
          colorScheme="teal"
          variant="outline"
          onClick={() => append({
            _dbId: undefined,
            track_number: fields.length + 1,
            disc_number: 1,
            song: undefined as unknown as number,
            duration_override: null,
            is_bonus: false,
          })}
        >
          Agregar pista
        </Button>
      </HStack>

      {fields.length === 0 && (
        <Text color="gray.400" fontSize="sm" textAlign="center" py={4}>
          Sin pistas. Hacé clic en "Agregar pista" para comenzar.
        </Text>
      )}

      {fields.length > 0 && (
        <Box overflowX="auto" borderWidth={1} borderRadius="md" borderColor="gray.200">
          <Table size="sm" variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th w="32px" />
                <Th w="70px">Disco</Th>
                <Th w="70px">Nº</Th>
                <Th>Canción</Th>
                <Th w="120px">Duración (s)</Th>
                <Th w="70px" textAlign="center">Bonus</Th>
                <Th w="40px" />
              </Tr>
            </Thead>
            <Tbody>
              {fields.map((field, index) => (
                <Tr key={field.id}>
                  <Td color="gray.300" cursor="grab">
                    <LuGripVertical />
                  </Td>
                  <Td>
                    <Input
                      type="number"
                      size="sm"
                      min={1}
                      {...register(`tracks.${index}.disc_number`, { valueAsNumber: true, min: 1 })}
                      isInvalid={!!trackErrors?.[index]?.disc_number}
                    />
                  </Td>
                  <Td>
                    <Input
                      type="number"
                      size="sm"
                      min={1}
                      {...register(`tracks.${index}.track_number`, {
                        valueAsNumber: true,
                        required: true,
                        min: 1,
                      })}
                      isInvalid={!!trackErrors?.[index]?.track_number}
                    />
                  </Td>
                  <Td minW="200px">
                    <Controller
                      name={`tracks.${index}.song`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: f }) => (
                        <Select
                          options={songOptions}
                          value={songOptions.find(o => o.value === f.value) ?? null}
                          onChange={opt => f.onChange(opt?.value ?? null)}
                          isLoading={songsLoading}
                          placeholder="Seleccionar canción..."
                          size="sm"
                          isInvalid={!!trackErrors?.[index]?.song}
                          chakraStyles={{ container: (p) => ({ ...p, w: '100%', minW: '180px' }) }}
                        />
                      )}
                    />
                  </Td>
                  <Td>
                    <Input
                      type="number"
                      size="sm"
                      min={0}
                      placeholder="—"
                      {...register(`tracks.${index}.duration_override`, { valueAsNumber: true })}
                    />
                  </Td>
                  <Td textAlign="center">
                    <Controller
                      name={`tracks.${index}.is_bonus`}
                      control={control}
                      render={({ field: f }) => (
                        <Checkbox isChecked={f.value} onChange={e => f.onChange(e.target.checked)} />
                      )}
                    />
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Eliminar pista"
                      icon={<LuTrash2 />}
                      size="xs"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => remove(index)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  )
}
