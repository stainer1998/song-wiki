import { Box, Button, Heading, HStack, Spinner, Center, Alert, AlertIcon } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useResourceItem } from '../../hooks/useResourceItem'
import { useUpdateMutation } from '../../hooks/useResourceMutation'

interface Props<T> {
  resource: string
  title: string
  children: (data: T, onSubmit: (values: unknown) => Promise<void>) => ReactNode
}

export function EditPage<T>({ resource, title, children }: Props<T>) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data, isLoading, isError } = useResourceItem<T>(resource, id)
  const mutation = useUpdateMutation(resource)

  async function onSubmit(values: unknown) {
    await mutation.mutateAsync({ id: id!, data: values })
    navigate(`/${resource}`)
  }

  if (isLoading) return <Center py={20}><Spinner size="xl" color="teal.500" /></Center>
  if (isError || !data) return (
    <Alert status="error"><AlertIcon />No se pudo cargar el registro.</Alert>
  )

  return (
    <Box maxW="720px">
      <HStack mb={6}>
        <Heading size="lg">{title}</Heading>
      </HStack>
      <Box bg="white" borderRadius="lg" boxShadow="sm" p={6}>
        {children(data, onSubmit)}
        <HStack mt={6} justify="flex-end">
          <Button variant="ghost" onClick={() => navigate(`/${resource}`)}>Cancelar</Button>
          <Button
            colorScheme="teal"
            isLoading={mutation.isPending}
            form="resource-form"
            type="submit"
          >
            Guardar
          </Button>
        </HStack>
      </Box>
    </Box>
  )
}
