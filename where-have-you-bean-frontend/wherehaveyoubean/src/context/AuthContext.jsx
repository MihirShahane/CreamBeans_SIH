import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

/**
 * MOCK AUTH — in-memory only, no persistence, no real backend call.
 * Future API requirements (for tech lead):
 *   POST /auth/register        { name, email, phone, password }
 *   POST /auth/login           { email, password } -> { token, user }
 *   POST /auth/admin/login     { email, password } -> { token, admin }
 *   GET  /auth/me               (bearer token)      -> { user }
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // { name, email, phone, verified }
  const [admin, setAdmin] = useState(null) // { name, email }

  const login = useCallback(({ email, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          reject(new Error('Enter your campus email and password.'))
          return
        }
        const mockUser = {
          name: email.split('@')[0].replace(/[._]/g, ' '),
          email,
          phone: '+91 98765 43210',
          verified: true,
        }
        setUser(mockUser)
        resolve(mockUser)
      }, 700)
    })
  }, [])

  const register = useCallback((payload) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = { ...payload, verified: true }
        setUser(mockUser)
        resolve(mockUser)
      }, 900)
    })
  }, [])

  const adminLogin = useCallback(({ email, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          reject(new Error('Enter admin credentials.'))
          return
        }
        const mockAdmin = { name: 'Campus Admin', email }
        setAdmin(mockAdmin)
        resolve(mockAdmin)
      }, 700)
    })
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const adminLogout = useCallback(() => {
    setAdmin(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, admin, login, register, logout, adminLogin, adminLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
