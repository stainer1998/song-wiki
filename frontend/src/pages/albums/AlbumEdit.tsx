import {
  Box, Button, Heading, HStack, Spinner, Center, Alert, AlertIcon,
} from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useResourceItem } from '../../hooks/useResourceItem'
import { useResourceList } from '../../hooks/useResourceList'
import { useUpdateMutation, useCreateMutation, useDeleteMutation } from '../../hooks/useResourceMutation'
import { AlbumForm, type AlbumFormValues, type TrackRow } from './AlbumForm'
import type { Album, Track } from '../../types/resources'

export function AlbumEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: album, isLoading: albumLoading, isError } = useResourceItem<Album>('albums', id)
  const { data: tracksData, isLoading: tracksLoading } = useResourceList<Track>('tracks', {
    filter: { album: Number(id) },
    pageSize: 200,
    ordering: 'disc_number,track_number',
  })

  const updateAlbum = useUpdateMutation('albums')
  const createTrack = useCreateMutation('tracks')
  const updateTrack = useUpdateMutation('tracks')
  const deleteTrack = useDeleteMutation('tracks')

  if (albumLoading || tracksLoading) return <Center py={20}><Spinner size="xl" color="teal.500" /></Center>
  if (isError || !album) return <Alert status="error"><AlertIcon />No se pudo cargar el álbum.</Alert>

  const existingTracks: TrackRow[] = (tracksData?.results ?? []).map(t => ({
    _dbId: t.id,
    track_number: t.track_number,
    disc_number: t.disc_number,
    song: t.song,
    duration_override: t.duration_override,
    is_bonus: t.is_bonus,
  }))

  async function onSubmit(values: AlbumFormValues) {
    const { tracks, ...albumData } = values

    await updateAlbum.mutateAsync({ id: id!, data: albumData })

    const originalIds = new Set(existingTracks.map(t => t._dbId).filter(Boolean) as number[])
    const submittedIds = new Set(tracks.filter(t => t._dbId).map(t => t._dbId) as number[])

    // Eliminar los que ya no están
    const toDelete = [...originalIds].filter(dbId => !submittedIds.has(dbId))
    await Promise.all(toDelete.map(dbId => deleteTrack.mutateAsync(dbId)))

    // Crear los nuevos y actualizar los existentes
    await Promise.all(
      tracks.map(track => {
        const payload = {
          album: Number(id),
          song: track.song,
          track_number: track.track_number,
          disc_number: track.disc_number,
          duration_override: track.duration_override || null,
          is_bonus: track.is_bonus,
        }
        if (track._dbId) {
          return updateTrack.mutateAsync({ id: track._dbId, data: payload })
        }
        return createTrack.mutateAsync(payload)
      })
    )

    navigate('/albums')
  }

  const isPending =
    updateAlbum.isPending || createTrack.isPending ||
    updateTrack.isPending || deleteTrack.isPending

  const defaultValues: Partial<AlbumFormValues> = { ...album, tracks: existingTracks }

  return (
    <Box maxW="800px">
      <HStack mb={6}>
        <Heading size="lg">Editar álbum</Heading>
      </HStack>
      <Box bg="white" borderRadius="lg" boxShadow="sm" p={6}>
        <AlbumForm defaultValues={defaultValues} onSubmit={onSubmit} />
        <HStack mt={6} justify="flex-end">
          <Button variant="ghost" onClick={() => navigate('/albums')}>Cancelar</Button>
          <Button colorScheme="teal" isLoading={isPending} form="resource-form" type="submit">
            Guardar
          </Button>
        </HStack>
      </Box>
    </Box>
  )
}
