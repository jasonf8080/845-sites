import { Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../context/AuthContext'
import { AdminLoginForm } from '../components/Auth'

export const AdminLoginPage = () => {
  const { user, isAdmin, loading } = useAuth()

  if (!loading && user) return <Navigate to={isAdmin ? '/admin' : '/dashboard'} replace />

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-6 py-16">
      <Helmet>
        <title>Admin Sign In | 845 Sites</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AdminLoginForm />
    </section>
  )
}
