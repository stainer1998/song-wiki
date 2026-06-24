import type { ReactNode } from 'react'

export interface PaginatedResponse<T> {
  count: number
  results: T[]
}

export interface ListParams {
  page?: number
  pageSize?: number
  ordering?: string
  filter?: Record<string, string | number>
}

export interface ColumnDef<T> {
  key: string
  label: string
  sortable?: boolean
  render?: (row: T) => ReactNode
}
