import { Select } from 'chakra-react-select'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { useReferenceOptions } from '../../hooks/useReferenceOptions'

interface Props<T extends FieldValues> {
  resource: string
  labelField: string
  name: Path<T>
  control: Control<T>
  placeholder?: string
  isClearable?: boolean
}

export function ReferenceSelect<T extends FieldValues>({
  resource, labelField, name, control, placeholder = 'Seleccionar...', isClearable = true,
}: Props<T>) {
  const { data: options = [], isLoading } = useReferenceOptions(resource, labelField)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          options={options}
          value={options.find(o => o.value === field.value) ?? null}
          onChange={opt => field.onChange(opt?.value ?? null)}
          isLoading={isLoading}
          placeholder={placeholder}
          isClearable={isClearable}
          chakraStyles={{ container: (p) => ({ ...p, w: '100%' }) }}
        />
      )}
    />
  )
}
