import { FormControl, FormLabel, FormErrorMessage, type FormControlProps } from '@chakra-ui/react'
import type { FieldError } from 'react-hook-form'
import type { ReactNode } from 'react'

interface Props extends FormControlProps {
  label: string
  error?: FieldError
  children: ReactNode
}

export function FormField({ label, error, children, ...rest }: Props) {
  return (
    <FormControl isInvalid={!!error} {...rest}>
      <FormLabel fontSize="sm" fontWeight="medium">{label}</FormLabel>
      {children}
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}
