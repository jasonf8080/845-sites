import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const LoginForm = () => {
  const [mode, setMode] = useState('signin')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()
  const { signInWithGoogle, signInWithPassword, signUpWithEmail, isConfigured } = useAuth()

  const isSignUp = mode === 'signup'

  const handleGoogleAuth = async () => {
    setStatus({ type: 'idle', message: '' })

    if (!isConfigured) {
      setStatus({
        type: 'error',
        message: 'Supabase is not configured yet. Add your valid project URL and publishable key to .env.',
      })
      return
    }

    try {
      setIsSubmitting(true)
      const result = await signInWithGoogle()
      if (result?.error) {
        throw result.error
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error?.message || 'Google sign in could not be started. Check your Supabase settings.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    if (!isConfigured) {
      setStatus({
        type: 'error',
        message: 'Supabase is not configured. Add your live project URL and publishable key before signing in.',
      })
      return
    }

    if (isSignUp && !fullName.trim()) {
      setStatus({ type: 'error', message: 'Please enter your full name.' })
      return
    }

    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedEmail) {
      setStatus({ type: 'error', message: 'Please enter an email address.' })
      return
    }

    if (!password) {
      setStatus({ type: 'error', message: 'Please enter a password.' })
      return
    }

    if (isSignUp) {
      if (password.length < 6) {
        setStatus({ type: 'error', message: 'Password must be at least 6 characters long.' })
        return
      }

      if (password !== confirmPassword) {
        setStatus({ type: 'error', message: 'Passwords do not match.' })
        return
      }
    }

    try {
      setIsSubmitting(true)
      setStatus({ type: 'idle', message: '' })

      if (isSignUp) {
        const result = await signUpWithEmail(normalizedEmail, password, fullName.trim())
        if (result?.error) throw result.error

        const sessionResult = result?.data?.session
          ? { data: { session: result.data.session } }
          : await signInWithPassword(normalizedEmail, password)

        if (sessionResult?.error) {
          if (sessionResult.error?.message?.toLowerCase?.().includes('email not confirmed')) {
            throw new Error(
              'Email confirmation is currently enabled in Supabase. Disable it in Authentication > Providers > Email so new users can access the dashboard immediately.'
            )
          }
          throw sessionResult.error
        }

        setStatus({ type: 'success', message: 'Account created successfully.' })
        setPassword('')
        setConfirmPassword('')
        navigate('/dashboard')
        return
      }

      const result = await signInWithPassword(normalizedEmail, password)
      if (result?.error) throw result.error

      setStatus({ type: 'success', message: 'Signed in successfully.' })
      navigate('/dashboard')
    } catch (error) {
      setStatus({
        type: 'error',
        message: error?.message || 'Unable to continue. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex w-full max-w-2xl flex-col items-center">
      <Link to="/" aria-label="Home" className="mb-6 block md:mb-8">
        <img src="/logo-mark.png" alt="845 Sites logo" className="h-32 w-auto md:h-40" />
      </Link>

      <h1 className="text-center text-[2.2rem] font-black leading-[0.92] tracking-[-0.07em] text-[var(--ink)] md:text-[3.1rem] md:tracking-[-0.08em]">
        {isSignUp ? 'Create your account' : 'Welcome back'}
      </h1>

      <p className="mt-3 text-[1rem] leading-relaxed text-[var(--ink-soft)] md:text-[1.08rem]">
        {isSignUp ? 'Sign up to get started' : 'Sign in to continue'}
      </p>

      <div className="mt-12 w-full rounded-[32px] border border-[var(--border)] bg-[var(--paper-strong)] px-6 py-10 text-[var(--ink)] shadow-[0_24px_60px_rgba(15,17,21,0.08)] md:px-12 md:py-14">
        <div className="flex flex-col items-center text-center">
          {!isConfigured && (
            <p className="mb-5 w-full rounded-full border border-amber-300 bg-amber-50 px-4 py-3 text-left text-sm text-amber-900">
              Supabase auth is disabled until you add a valid project URL and publishable key to your .env file.
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-2 w-full max-w-lg space-y-5 text-left">
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isSubmitting || !isConfigured}
              className="flex w-full items-center justify-center gap-3 rounded-full border border-[var(--border)] bg-[var(--paper)] px-6 py-4 text-[1rem] font-semibold text-[var(--ink)] transition hover:border-[var(--accent)]/40 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--ink)] text-[0.85rem] font-black text-white">G</span>
              {isSignUp ? 'Sign up with Google' : 'Sign in with Google'}
            </button>

            <div className="flex items-center gap-4 px-1">
              <span className="h-px flex-1 bg-[var(--border)]" />
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--ink-soft)]">or</span>
              <span className="h-px flex-1 bg-[var(--border)]" />
            </div>

            {isSignUp && (
              <div>
                <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-[var(--ink-soft)]">
                  Full name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Jane Smith"
                  className="w-full rounded-full border border-[var(--border)] bg-[var(--paper)] px-6 py-4 text-base text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
                  disabled={!isConfigured}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--ink-soft)]">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-full border border-[var(--border)] bg-[var(--paper)] px-6 py-4 text-base text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
                disabled={!isConfigured}
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-[var(--ink-soft)]">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-full border border-[var(--border)] bg-[var(--paper)] px-6 py-4 text-base text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
                disabled={!isConfigured}
              />
            </div>

            {isSignUp && (
              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-[var(--ink-soft)]">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Confirm your password"
                  className="w-full rounded-full border border-[var(--border)] bg-[var(--paper)] px-6 py-4 text-base text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
                  disabled={!isConfigured}
                />
              </div>
            )}

            {status.message && (
              <p
                className={`text-sm ${
                  status.type === 'error' ? 'text-red-600' : 'text-green-700'
                }`}
              >
                {status.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !isConfigured}
              className="w-full rounded-full bg-[var(--button)] px-5 py-4 text-base font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </button>

            <p className="pt-2 text-center text-[0.95rem] text-[var(--ink-soft)]">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setMode(isSignUp ? 'signin' : 'signup')
                  setStatus({ type: 'idle', message: '' })
                }}
                className="font-semibold text-[var(--ink)] underline decoration-[var(--border)] underline-offset-4 transition hover:text-[var(--accent)]"
                disabled={!isConfigured}
              >
                {isSignUp ? 'Log in' : 'Sign up'}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
