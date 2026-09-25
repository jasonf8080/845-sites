import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'

export const Navbar = () => {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isLoginPage = pathname === '/login'

  if (isLoginPage) {
    return null
  }

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'My Work', href: '#my-work' },
    { label: 'Reviews', href: '#reviews' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050505] text-white backdrop-blur-sm">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 text-white" aria-label="Home">
          <img src="/logo-mark.png" alt="845 Sites logo" className="h-14 w-auto md:h-16" />
        </Link>

        {!isLoginPage && (
          <div className="hidden items-center gap-8 lg:flex">
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-[0.76rem] font-medium uppercase tracking-[0.12em] text-[#9ca3af] transition-colors hover:text-white"
              >
                {label}
              </a>
            ))}

            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full bg-[var(--button)] px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        )}

        {!isLoginPage && (
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex items-center justify-center text-[var(--ink)] lg:hidden"
          >
            {open ? <FiX size={28} /> : <FiMenu size={30} />}
          </button>
        )}
      </nav>

      {open && !isLoginPage && (
        <div className="flex flex-col gap-4 border-t border-white/10 bg-[#050505] px-6 py-5 lg:hidden">
          {links.map(({ label, href }) => (
            <a key={label} href={href} className="text-base font-medium text-[#9ca3af]">
              {label}
            </a>
          ))}
          <Link
            to="/login"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--button)] px-5 py-3 text-sm font-medium text-white"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  )
}
