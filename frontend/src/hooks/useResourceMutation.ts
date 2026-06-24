import { useMutation, useQueryClient } from '@tanstack/react-query'
import { create, update, destroy } from '../api/resources'

export function useCreateMutation(resource: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: unknown) => create(resource, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [resource] }),
  })
}

export function useUpdateMutation(resource: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: unknown }) =>
      update(resource, id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [resource] }),
  })
}

export function useDeleteMutation(resource: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number | string) => destroy(resource, id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [resource] }),
  })
}
