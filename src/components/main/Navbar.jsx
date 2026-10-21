import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'

const PublicNavbar = () => {
  const [open, setOpen] = useState(false)
  const links = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'My Work', href: '#my-work' },
    { label: 'Reviews', href: '#reviews' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[var(--app-bg-strong)]/85 text-white backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 text-white" aria-label="Home">
          <div className="flex items-end gap-1 text-[2.2rem] font-black leading-none tracking-[-0.14em] text-white md:text-[3rem]">
            <span className="text-[var(--text-strong)]">E</span>
            <span className="text-[var(--accent)]">&</span>
            <span className="text-[var(--text-strong)]">GHT</span>
            <span className="text-[var(--accent)]">45</span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[0.72rem] font-medium uppercase tracking-[0.15em] text-[var(--text-soft)] transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}

          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[#17191d] shadow-[0_12px_25px_rgba(18,24,34,0.22)] transition-transform hover:-translate-y-0.5"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center justify-center text-[#f3efe9] lg:hidden"
        >
          {open ? <FiX size={28} /> : <FiMenu size={30} />}
        </button>
      </nav>

      {open && (
        <div className="flex flex-col gap-4 border-t border-white/10 bg-[var(--app-bg-strong)] px-6 py-5 lg:hidden">
          {links.map(({ label, href }) => (
            <a key={label} href={href} className="text-base font-medium text-[var(--text-soft)]">
              {label}
            </a>
          ))}
          <Link
            to="/login"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-[#17191d]"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  )
}

const AuthenticatedNavbar = () => {
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    if (isLoggingOut) {
      return
    }

    try {
      setIsLoggingOut(true)
      const result = await signOut()

      if (result?.error) {
        console.error('Logout failed:', result.error)
        return
      }

      navigate('/', { replace: true })
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[var(--app-bg-strong)]/85 text-white backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 text-white" aria-label="Go to homepage">
          <div className="flex items-end gap-1 text-[2.2rem] font-black leading-none tracking-[-0.14em] text-white md:text-[3rem]">
            <span className="text-[var(--text-strong)]">E</span>
            <span className="text-[var(--accent)]">&</span>
            <span className="text-[var(--text-strong)]">GHT</span>
            <span className="text-[var(--accent)]">45</span>
          </div>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[#17191d] shadow-[0_12px_25px_rgba(18,24,34,0.22)] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoggingOut ? 'Logging out...' : 'Log Out'}
        </button>
      </nav>
    </header>
  )
}

export const Navbar = () => {
  const { pathname } = useLocation()
  const isLoginPage = pathname === '/login'
  const isDashboardRoute = pathname === '/dashboard' || pathname.startsWith('/dashboard/')
  const isStartRoute = pathname === '/start' || pathname.startsWith('/start/')

  if (isLoginPage) {
    return null
  }

  if (isDashboardRoute || isStartRoute) {
    return <AuthenticatedNavbar />
  }

  return <PublicNavbar />
}
