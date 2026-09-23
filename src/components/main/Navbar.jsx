import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'

export const Navbar = () => {
  const [open, setOpen] = useState(false)

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'My Work', href: '#my-work' },
    { label: 'Reviews', href: '#reviews' },
  ]

  return (
    <header className="sticky top-0 z-40 bg-[#0d141b] text-white">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 text-white" aria-label="Home">
          <img src="/logo-mark.png" alt="845 Sites logo" className="h-14 w-auto md:h-16" />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[0.76rem] font-medium uppercase tracking-[0.12em] text-white/80 transition-opacity hover:text-white"
            >
              {label}
            </a>
          ))}

          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-full bg-[#ff6e3c] px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-95"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center justify-center text-white lg:hidden"
        >
          {open ? <FiX size={28} /> : <FiMenu size={30} />}
        </button>
      </nav>

      {open && (
        <div className="flex flex-col gap-4 border-t border-white/10 bg-[#0d141b] px-6 py-5 lg:hidden">
          {links.map(({ label, href }) => (
            <a key={label} href={href} className="text-base font-medium text-white/80">
              {label}
            </a>
          ))}
          <Link
            to="/login"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-[#ff6e3c] px-5 py-3 text-sm font-medium text-white"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  )
}
