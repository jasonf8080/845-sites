import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const AdminLoginForm = () => {
  const { signInWithPassword } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    const { error: signInError } = await signInWithPassword(email, password)

    setSubmitting(false)

    if (signInError) {
      setError(signInError.message)
      return
    }

    navigate('/admin')
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-4">
      <h1 className="text-2xl md:text-3xl font-bold leading-tight text-primary">Admin Sign In</h1>
      <p className="text-sm md:text-base text-gray-500">This page is for the 845 Sites administrator only.</p>

      <label className="flex flex-col gap-1 text-left text-sm md:text-base text-gray-700">
        Email
        <input
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-base focus:border-accent focus:outline-none"
        />
      </label>

      <label className="flex flex-col gap-1 text-left text-sm md:text-base text-gray-700">
        Password
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-base focus:border-accent focus:outline-none"
        />
      </label>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-white transition-opacity disabled:opacity-60"
      >
        {submitting ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  )
}
