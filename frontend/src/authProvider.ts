import { AuthProvider } from 'react-admin'

const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const res = await fetch('/api/v1/auth/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (!res.ok) throw new Error('Usuario o contraseña incorrectos')
    const { access, refresh } = await res.json()
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)
  },

  logout: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    return Promise.resolve()
  },

  checkAuth: () =>
    localStorage.getItem('access_token') ? Promise.resolve() : Promise.reject(),

  checkError: ({ status }: { status: number }) => {
    if (status === 401) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      return Promise.reject()
    }
    return Promise.resolve()
  },

  getIdentity: async () => {
    const token = localStorage.getItem('access_token')
    if (!token) return Promise.reject()
    const res = await fetch('/api/v1/auth/me/', {
      headers: { Authorization: `Bearer ${token}` },
    })
    const user = await res.json()
    return { id: user.id, fullName: `${user.first_name} ${user.last_name}`.trim() || user.username }
  },

  getPermissions: () => Promise.resolve(),
}

export default authProvider
