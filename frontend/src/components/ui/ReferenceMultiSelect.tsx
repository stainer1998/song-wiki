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
}

export function ReferenceMultiSelect<T extends FieldValues>({
  resource, labelField, name, control, placeholder = 'Seleccionar...',
}: Props<T>) {
  const { data: options = [], isLoading } = useReferenceOptions(resource, labelField)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const value = Array.isArray(field.value)
          ? options.filter(o => (field.value as number[]).includes(o.value))
          : []
        return (
          <Select
            isMulti
            options={options}
            value={value}
            onChange={opts => field.onChange(opts.map(o => o.value))}
            isLoading={isLoading}
            placeholder={placeholder}
            chakraStyles={{ container: (p) => ({ ...p, w: '100%' }) }}
          />
        )
      }}
    />
  )
}
