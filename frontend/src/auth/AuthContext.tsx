import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { loginRequest, getMeRequest, logoutCleanup, type Me } from '../api/auth'

interface AuthState {
  user: Me | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Me | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      getMeRequest()
        .then(setUser)
        .catch(() => logoutCleanup())
        .finally(() => setChecked(true))
    } else {
      setChecked(true)
    }
  }, [])

  async function login(username: string, password: string) {
    await loginRequest(username, password)
    const me = await getMeRequest()
    setUser(me)
  }

  function logout() {
    logoutCleanup()
    setUser(null)
  }

  if (!checked) return null

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
