import { Box, Button, Heading, HStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useCreateMutation } from '../../hooks/useResourceMutation'

interface Props {
  resource: string
  title: string
  children: (onSubmit: (values: unknown) => Promise<void>) => ReactNode
}

export function CreatePage({ resource, title, children }: Props) {
  const navigate = useNavigate()
  const mutation = useCreateMutation(resource)

  async function onSubmit(values: unknown) {
    await mutation.mutateAsync(values)
    navigate(`/${resource}`)
  }

  return (
    <Box maxW="720px">
      <HStack mb={6}>
        <Heading size="lg">{title}</Heading>
      </HStack>
      <Box bg="white" borderRadius="lg" boxShadow="sm" p={6}>
        {children(onSubmit)}
        <HStack mt={6} justify="flex-end">
          <Button variant="ghost" onClick={() => navigate(`/${resource}`)}>Cancelar</Button>
          <Button
            colorScheme="teal"
            isLoading={mutation.isPending}
            form="resource-form"
            type="submit"
          >
            Crear
          </Button>
        </HStack>
      </Box>
    </Box>
  )
}
