import { useQuery } from '@tanstack/react-query'
import { getList } from '../api/resources'
import type { PaginatedResponse } from '../types/api'

interface Option {
  value: number
  label: string
}

export function useReferenceOptions(resource: string, labelField: string) {
  return useQuery<Option[]>({
    queryKey: [resource, 'options'],
    queryFn: async () => {
      const res = await getList<Record<string, unknown>>(resource, { pageSize: 500, ordering: labelField })
      return (res as PaginatedResponse<Record<string, unknown>>).results.map(item => ({
        value: item.id as number,
        label: String(item[labelField] ?? ''),
      }))
    },
    staleTime: 5 * 60 * 1000,
  })
}
