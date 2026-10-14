import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/main'
import { useAuth } from './context/AuthContext'
import { HomePage, LoginPage, NotFoundPage, DashboardPage, StartPage, SubmissionDetailPage } from './pages'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-6 py-16 text-sm font-medium text-[var(--ink-soft)]">
        Loading your dashboard...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-6 py-16 text-sm font-medium text-[var(--ink-soft)]">
        Loading admin panel...
      </div>
    )
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/submission" element={
          <ProtectedRoute>
            <AdminRoute>
              <SubmissionDetailPage />
            </AdminRoute>
          </ProtectedRoute>
        } />
        <Route path="/submission/:id" element={
          <ProtectedRoute>
            <AdminRoute>
              <SubmissionDetailPage />
            </AdminRoute>
          </ProtectedRoute>
        } />
        <Route path="/submisson" element={
          <ProtectedRoute>
            <AdminRoute>
              <SubmissionDetailPage />
            </AdminRoute>
          </ProtectedRoute>
        } />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
