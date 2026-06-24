import { useQuery } from '@tanstack/react-query'
import { getOne } from '../api/resources'

export function useResourceItem<T>(resource: string, id: number | string | undefined) {
  return useQuery<T>({
    queryKey: [resource, 'detail', id],
    queryFn: () => getOne<T>(resource, id!),
    enabled: id !== undefined,
  })
}
