const API_URL = '/api/v1'

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
  }
}

export async function apiRequest<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('access_token')
  const headers = new Headers(options.headers)
  headers.set('Content-Type', 'application/json')
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const res = await fetch(url, { ...options, headers })

  if (res.status === 401) {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    window.location.replace('/login')
    throw new ApiError(401, 'No autorizado')
  }

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new ApiError(res.status, body || res.statusText)
  }

  if (res.status === 204) return undefined as T
  return res.json()
}

export { API_URL }
