import { apiRequest, API_URL } from './client'

export interface Me {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
}

export async function loginRequest(username: string, password: string): Promise<void> {
  const data = await apiRequest<{ access: string; refresh: string }>(
    `${API_URL}/auth/token/`,
    { method: 'POST', body: JSON.stringify({ username, password }) }
  )
  localStorage.setItem('access_token', data.access)
  localStorage.setItem('refresh_token', data.refresh)
}

export async function getMeRequest(): Promise<Me> {
  return apiRequest<Me>(`${API_URL}/auth/me/`)
}

export function logoutCleanup(): void {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}
