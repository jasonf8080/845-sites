export const MyWork = () => (
  <section className="bg-[#11171c] px-5 py-10 text-white md:px-8 md:py-14">
    <div className="mx-auto max-w-[1600px]">
      <div className="mb-8 flex items-center justify-between md:mb-10">
        <div className="flex items-center gap-4">
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/70">04</span>
          <span className="h-px flex-1 bg-white/20" />
        </div>
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/70">OUR WORK</span>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="pt-2">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-4 py-2 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-[#ff6e3c]">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#ff6e3c]" />
            FEATURED PROJECT
          </div>

          <h2 className="max-w-[520px] text-[3.3rem] font-black leading-[0.84] tracking-[-0.07em] text-white md:text-[5.2rem] md:tracking-[-0.075em]">
            IF YOU WANT TO
            <span className="mt-1 block">PLANT GROW YOU?</span>
            <span className="mt-1 block">IN THE RIGHT SPOT.</span>
          </h2>

          <p className="mt-7 max-w-[520px] text-[1.06rem] leading-relaxed text-white/72 md:text-[1.16rem]">
            We help local businesses elevate their brand with modern, high-performance websites — everything from
            strategy to design, development, and growth.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-[#ff6e3c] px-8 py-4 text-[1.05rem] font-semibold text-white shadow-none transition-opacity hover:opacity-95"
            >
              View Project <span aria-hidden="true" className="ml-2">→</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-8 py-4 text-[1.05rem] font-semibold text-white transition-opacity hover:opacity-90"
            >
              See More Work
            </button>
          </div>
        </div>

        <div className="rounded-[24px] border border-white/15 bg-[#1b2530] p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
          <div
            className="relative overflow-hidden rounded-[18px] border border-white/10 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(rgba(17, 23, 28, 0.35), rgba(17, 23, 28, 0.35)), url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1400&q=80')",
              minHeight: '500px',
            }}
          >
            <div className="flex items-center justify-between px-5 py-4 text-[0.8rem] text-white/80">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/20 text-[1.1rem] font-semibold">
                  G
                </span>
                <span className="text-[0.9rem] font-semibold text-white">Gardenside</span>
              </div>

              <div className="hidden items-center gap-6 md:flex">
                {['Home', 'About', 'Menu', 'Events', 'Contact'].map((item) => (
                  <span key={item} className="text-[0.7rem] uppercase tracking-[0.04em] text-white/80">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-5 pb-6 pt-10 md:px-8 md:pb-8">
              <div className="mx-auto max-w-[760px] text-center">
                <div className="mb-4 inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.4em] text-white/85">
                  <span className="h-px w-10 bg-white/45" />
                  EST 2026
                  <span className="h-px w-10 bg-white/45" />
                </div>

                <h3 className="text-[2.6rem] font-semibold leading-[0.84] tracking-[-0.07em] text-white md:text-[4.1rem] md:tracking-[-0.065em]">
                  Gardenside Kitchen &amp; Coffee Bar
                </h3>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[0.64rem] uppercase tracking-[0.22em] text-white/80 md:text-[0.7rem]">
                  <span>Fresh Coffee</span>
                  <span className="text-[#d8c9b4]">•</span>
                  <span>Handcrafted Pastries</span>
                  <span className="text-[#d8c9b4]">•</span>
                  <span>Locally Sourced</span>
                </div>

                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <button type="button" className="rounded-none border border-white/30 bg-white/10 px-8 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white">
                    View Menu
                  </button>
                  <button type="button" className="rounded-none border border-white/30 bg-transparent px-8 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white">
                    Our Story
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {[
          { title: 'CUSTOM BUILT', label: 'No templates', icon: 'code' },
          { title: 'MOBILE FIRST', label: 'Fully responsive', icon: 'mobile' },
          { title: 'LOCAL SEO', label: 'Westchester focused', icon: 'pin' },
          { title: 'FAST + MODERN', label: 'Performance optimized', icon: 'speed' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-[18px] border border-white/15 bg-[rgba(255,255,255,0.02)] px-5 py-5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#ff6e3c] text-[1.5rem] text-[#ff6e3c]">
              {stat.icon === 'code' ? '</>' : stat.icon === 'mobile' ? '⌂' : stat.icon === 'pin' ? '⌖' : '⌁'}
            </div>
            <div>
              <div className="text-[2rem] font-black leading-none tracking-[-0.07em] text-white md:tracking-[-0.07em]">{stat.title}</div>
              <div className="mt-1 text-[0.68rem] uppercase tracking-[0.12em] text-white/75">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)
