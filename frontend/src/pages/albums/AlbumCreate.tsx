import { Box, Button, Heading, HStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useCreateMutation } from '../../hooks/useResourceMutation'
import { AlbumForm, type AlbumFormValues } from './AlbumForm'
import type { Album } from '../../types/resources'

export function AlbumCreate() {
  const navigate = useNavigate()
  const createAlbum = useCreateMutation('albums')
  const createTrack = useCreateMutation('tracks')

  async function onSubmit(values: AlbumFormValues) {
    const { tracks, ...albumData } = values

    const album = await createAlbum.mutateAsync(albumData) as Album

    await Promise.all(
      tracks.map(track =>
        createTrack.mutateAsync({
          album: album.id,
          song: track.song,
          track_number: track.track_number,
          disc_number: track.disc_number,
          duration_override: track.duration_override || null,
          is_bonus: track.is_bonus,
        })
      )
    )

    navigate('/albums')
  }

  const isPending = createAlbum.isPending || createTrack.isPending

  return (
    <Box maxW="800px">
      <HStack mb={6}>
        <Heading size="lg">Nuevo álbum</Heading>
      </HStack>
      <Box bg="white" borderRadius="lg" boxShadow="sm" p={6}>
        <AlbumForm onSubmit={onSubmit} />
        <HStack mt={6} justify="flex-end">
          <Button variant="ghost" onClick={() => navigate('/albums')}>Cancelar</Button>
          <Button colorScheme="teal" isLoading={isPending} form="resource-form" type="submit">
            Crear
          </Button>
        </HStack>
      </Box>
    </Box>
  )
}
