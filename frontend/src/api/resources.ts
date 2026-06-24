import { apiRequest, API_URL } from './client'
import type { PaginatedResponse, ListParams } from '../types/api'

function buildQuery(params: ListParams): string {
  const page = params.page ?? 1
  const pageSize = params.pageSize ?? 25
  const ordering = params.ordering ?? 'id'
  const filterParts = Object.entries(params.filter ?? {}).map(
    ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`
  )
  return [`page=${page}`, `page_size=${pageSize}`, `ordering=${ordering}`, ...filterParts].join('&')
}

export function getList<T>(resource: string, params: ListParams = {}): Promise<PaginatedResponse<T>> {
  return apiRequest(`${API_URL}/${resource}/?${buildQuery(params)}`)
}

export function getOne<T>(resource: string, id: number | string): Promise<T> {
  return apiRequest(`${API_URL}/${resource}/${id}/`)
}

export function create<T>(resource: string, data: unknown): Promise<T> {
  return apiRequest(`${API_URL}/${resource}/`, { method: 'POST', body: JSON.stringify(data) })
}

export function update<T>(resource: string, id: number | string, data: unknown): Promise<T> {
  return apiRequest(`${API_URL}/${resource}/${id}/`, { method: 'PATCH', body: JSON.stringify(data) })
}

export function destroy(resource: string, id: number | string): Promise<void> {
  return apiRequest(`${API_URL}/${resource}/${id}/`, { method: 'DELETE' })
}
