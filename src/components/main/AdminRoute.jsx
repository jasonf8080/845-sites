import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const AdminRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-base md:text-lg text-gray-500">
        Loading…
      </div>
    )
  }

  if (!user) return <Navigate to="/admin-login" replace />
  if (!isAdmin) return <Navigate to="/dashboard" replace />

  return children
}
