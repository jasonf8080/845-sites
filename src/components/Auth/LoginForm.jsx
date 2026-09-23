export const LoginForm = () => (
  <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#111b26] p-8 text-white shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
    <div className="mb-8 text-center">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#ff8d59]">Welcome back</p>
      <h1 className="mt-3 text-3xl font-black tracking-[-0.08em] text-white">Login</h1>
    </div>

    <form className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/80">
          Email address
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-full border border-white/10 bg-[#0d141b] px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-[#ff8d59] focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-white/80">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="w-full rounded-full border border-white/10 bg-[#0d141b] px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-[#ff8d59] focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-[#ff8d59] px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-95"
      >
        Sign In
      </button>
    </form>
  </div>
)
