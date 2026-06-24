import {
  Box, Button, FormControl, FormLabel, FormErrorMessage,
  Heading, Input, VStack, Alert, AlertIcon, Text,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'

interface FormValues {
  username: string
  password: string
}

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>()

  async function onSubmit({ username, password }: FormValues) {
    setError('')
    try {
      await login(username, password)
      navigate('/', { replace: true })
    } catch {
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
      <Box bg="white" p={8} borderRadius="lg" boxShadow="md" w="full" maxW="360px">
        <Heading size="lg" mb={2} color="teal.600">Song Wiki</Heading>
        <Text color="gray.500" mb={6} fontSize="sm">Iniciar sesión</Text>

        {error && (
          <Alert status="error" borderRadius="md" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl isInvalid={!!errors.username}>
              <FormLabel>Usuario</FormLabel>
              <Input {...register('username', { required: 'Campo requerido' })} autoFocus />
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel>Contraseña</FormLabel>
              <Input type="password" {...register('password', { required: 'Campo requerido' })} />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              w="full"
              isLoading={isSubmitting}
              loadingText="Ingresando..."
            >
              Ingresar
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  )
}
