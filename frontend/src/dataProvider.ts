import { DataProvider, GetListParams, GetListResult, fetchUtils } from 'react-admin'

const API_URL = '/api/v1'

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  const token = localStorage.getItem('access_token')
  const headers = new Headers(options.headers || {})
  if (token) headers.set('Authorization', `Bearer ${token}`)
  return fetchUtils.fetchJson(url, { ...options, headers })
}

const buildQuery = (params: GetListParams): string => {
  const page = params.pagination?.page ?? 1
  const perPage = params.pagination?.perPage ?? 25
  const field = params.sort?.field ?? 'id'
  const order = params.sort?.order ?? 'ASC'
  const ordering = order === 'DESC' ? `-${field}` : field

  const filterParts = Object.entries(params.filter || {}).map(
    ([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(val))}`
  )

  return [
    `page=${page}`,
    `page_size=${perPage}`,
    `ordering=${ordering}`,
    ...filterParts,
  ].join('&')
}

const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const query = buildQuery(params)
    const { json } = await httpClient(`${API_URL}/${resource}/?${query}`)
    return { data: json.results, total: json.count } as GetListResult
  },

  getOne: async (resource, { id }) => {
    const { json } = await httpClient(`${API_URL}/${resource}/${id}/`)
    return { data: json }
  },

  getMany: async (resource, { ids }) => {
    const requests = ids.map(id => httpClient(`${API_URL}/${resource}/${id}/`))
    const responses = await Promise.all(requests)
    return { data: responses.map(r => r.json) }
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const ordering = order === 'DESC' ? `-${field}` : field
    const query = `page=${page}&page_size=${perPage}&ordering=${ordering}&${params.target}=${params.id}`
    const { json } = await httpClient(`${API_URL}/${resource}/?${query}`)
    return { data: json.results, total: json.count }
  },

  create: async (resource, { data }) => {
    const { json } = await httpClient(`${API_URL}/${resource}/`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return { data: json }
  },

  update: async (resource, { id, data }) => {
    const { json } = await httpClient(`${API_URL}/${resource}/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
    return { data: json }
  },

  updateMany: async (resource, { ids, data }) => {
    await Promise.all(
      ids.map(id =>
        httpClient(`${API_URL}/${resource}/${id}/`, {
          method: 'PATCH',
          body: JSON.stringify(data),
        })
      )
    )
    return { data: ids }
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete: async (resource, { id, previousData }: any) => {
    await httpClient(`${API_URL}/${resource}/${id}/`, { method: 'DELETE' })
    return { data: previousData ?? { id } }
  },

  deleteMany: async (resource, { ids }) => {
    await Promise.all(
      ids.map(id => httpClient(`${API_URL}/${resource}/${id}/`, { method: 'DELETE' }))
    )
    return { data: ids }
  },
}

export default dataProvider
