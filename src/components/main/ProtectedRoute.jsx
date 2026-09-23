import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-base md:text-lg text-gray-500">
        Loading…
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  return children
}
