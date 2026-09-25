import { useState } from 'react'

export const LoginForm = () => {
  const [mode, setMode] = useState('signin')
  const isSignUp = mode === 'signup'

  return (
    <div className="flex w-full max-w-2xl flex-col items-center">
      <img src="/logo-mark.png" alt="845 Sites logo" className="mb-6 h-32 w-auto md:mb-8 md:h-40" />
       <h1 className="text-center text-[2.2rem] font-black leading-[0.92] tracking-[-0.07em] text-white md:text-[3.1rem] md:tracking-[-0.08em]">
          {isSignUp ? 'Create your account' : 'Welcome back'}
        </h1>

        <p className="mt-3 text-[1rem] leading-relaxed text-white/65 md:text-[1.08rem]">
          {isSignUp ? 'Sign up to get started' : 'Sign in to continue'}
        </p>

      <div className="mt-12 w-full rounded-[32px] border border-white/10 bg-[#111b26] px-6 py-10 text-white shadow-[0_24px_60px_rgba(0,0,0,0.25)] md:px-12 md:py-14">
        <div className="flex flex-col items-center text-center">
       

        <form className="mt-10 w-full max-w-lg space-y-5 text-left">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-[#0d141b] px-6 py-4 text-[1rem] font-semibold text-white transition hover:border-white/20 hover:bg-[#101921]"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[0.85rem] font-black text-[#0d141b]">G</span>
            {isSignUp ? 'Sign up with Google' : 'Sign in with Google'}
          </button>

          <div className="flex items-center gap-4 px-1">
            <span className="h-px flex-1 bg-white/12" />
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/45">or</span>
            <span className="h-px flex-1 bg-white/12" />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/75">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-full border border-white/10 bg-[#0d141b] px-6 py-4 text-base text-white placeholder:text-white/40 focus:border-[#ff8d59] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-white/75">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-full border border-white/10 bg-[#0d141b] px-6 py-4 text-base text-white placeholder:text-white/40 focus:border-[#ff8d59] focus:outline-none"
            />
          </div>

          {isSignUp && (
            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-white/75">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="w-full rounded-full border border-white/10 bg-[#0d141b] px-6 py-4 text-base text-white placeholder:text-white/40 focus:border-[#ff8d59] focus:outline-none"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-[#ff8d59] px-5 py-4 text-base font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-95"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>

          <p className="pt-2 text-center text-[0.95rem] text-white/65">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setMode(isSignUp ? 'signin' : 'signup')}
              className="font-semibold text-white underline decoration-white/40 underline-offset-4 transition hover:text-[#ff8d59]"
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
