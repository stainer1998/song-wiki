import { useQuery } from '@tanstack/react-query'
import { getList } from '../api/resources'
import type { ListParams, PaginatedResponse } from '../types/api'

export function useResourceList<T>(resource: string, params: ListParams = {}) {
  return useQuery<PaginatedResponse<T>>({
    queryKey: [resource, 'list', params],
    queryFn: () => getList<T>(resource, params),
    placeholderData: (prev) => prev,
  })
}
