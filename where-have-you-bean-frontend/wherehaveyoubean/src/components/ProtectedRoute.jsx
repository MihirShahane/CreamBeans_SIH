import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export function RequireAuth({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}

export function RequireAdmin({ children }) {
  const { admin } = useAuth()
  const location = useLocation()
  if (!admin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }
  return children
}
