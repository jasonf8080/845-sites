import { Link } from 'react-router-dom'
import { FiArrowRight, FiGlobe, FiTrendingUp, FiZap, FiShield } from 'react-icons/fi'

const FEATURE_ITEMS = [
  {
    title: 'More visibility',
    description: 'Get found by local customers.',
    icon: FiGlobe,
  },
  {
    title: 'More customers',
    description: 'Turn visitors into real business.',
    icon: FiTrendingUp,
  },
  {
    title: 'Local focus',
    description: 'Built for the Hudson Valley.',
    icon: FiShield,
  },
  {
    title: 'Modern & fast',
    description: 'High performance, always.',
    icon: FiZap,
  },
]

export const Hero = () => (
  <section id="home" className="relative overflow-hidden bg-[#050505] px-5 pb-8 pt-6 text-white md:px-8 md:pb-10 md:pt-8">
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(43,43,44,0.35),transparent_22%),radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.08),transparent_18%),linear-gradient(90deg,#050505_0%,#0d0d0d_40%,#050505_100%)]" />
      <div className="absolute -left-[10%] top-[8%] h-[72%] w-[72%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_28%,transparent_68%)] blur-3xl" />
      <div className="absolute right-[8%] top-[18%] h-[50%] w-[50%] rounded-full border border-white/20" />
      <div className="absolute right-[11%] top-[21%] h-[42%] w-[42%] rounded-full border border-white/10" />
      <div className="absolute right-[10%] top-[18%] h-[52%] w-[52%] rounded-full border border-white/10" />
    </div>

    <div className="relative mx-auto max-w-[1500px]">
      <div className="flex min-h-[calc(100vh-120px)] flex-col justify-between">
        <div className="relative z-10 pt-4 xl:pt-8">
          <div className="grid items-start gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="max-w-[820px]">
              <div className="mb-5 flex items-center gap-4 text-[0.68rem] font-medium uppercase tracking-[0.26em] text-[#b3b3b3] md:text-[0.72rem]">
                <span>Websites for real businesses</span>
                <span className="h-px flex-1 bg-white/15" />
              </div>

              <h1 className="text-[2.9rem] font-black leading-[0.82] tracking-[-0.07em] text-white sm:text-[4rem] lg:text-[7.5rem] xl:text-[9rem]">
                <span className="block">LOCAL</span>
                <span className="block text-white">BUSINESSES</span>
                <span className="block text-[#cfcfcf]">BIGGER</span>
              </h1>

              <p className="mt-6 text-[1.15rem] font-medium leading-[1.35] text-white md:text-[1.65rem] md:leading-[1.25]">
                Modern websites, built for growth.
              </p>

              <p className="mt-4 max-w-[620px] text-[1.06rem] leading-[1.5] text-[#b3b3b3] md:text-[1.2rem]">
                We help Hudson Valley businesses stand out online with custom websites, local SEO, and modern design — so you can get more customers and focus on what you do best.
              </p>

              <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--button)] px-6 py-4 text-[0.9rem] font-semibold uppercase tracking-[0.02em] text-white shadow-[0_12px_28px_rgba(239,122,61,0.28)] transition-transform hover:-translate-y-0.5 md:text-[1.06rem]"
                >
                  Get Your Website <FiArrowRight aria-hidden="true" className="text-lg" />
                </Link>
              </div>
            </div>

            <div className="relative hidden min-h-[460px] xl:block">
              <div className="absolute inset-x-0 top-0 flex justify-center">
                <div className="text-[0.78rem] font-medium uppercase tracking-[0.22em] text-[#b3b3b3]">
                  <div className="text-left">914</div>
                  <div className="text-left">845</div>
                  <div className="text-left">AND BEYOND</div>
                </div>
              </div>

              <div className="absolute left-1/2 top-[40%] h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-white/25 shadow-[0_0_25px_rgba(255,255,255,0.06)]" />
              <div className="absolute left-1/2 top-[40%] h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15" />

              <div className="absolute inset-x-0 top-[28%] flex justify-center">
                <div className="text-[10rem] font-black leading-none tracking-[-0.09em] text-white/10">845</div>
              </div>

              <div className="absolute right-[10%] top-[14%] text-right">
                <div className="font-['Caveat'] text-[3.2rem] italic leading-none text-white/80">Hudson Valley</div>
                <div className="mt-1 flex items-center gap-3 text-[2.2rem] font-['Caveat'] italic leading-none text-white/80">
                  <span>Built</span>
                  <span className="h-[3px] w-24 rounded-full bg-white/80" />
                </div>
              </div>

              <div className="absolute bottom-[13%] right-[4%] text-[0.7rem] uppercase tracking-[0.22em] text-[#b3b3b3]">
                <div className="text-right">Modern</div>
                <div className="text-right">Local</div>
                <div className="text-right">Impactful</div>
              </div>

              <div className="absolute bottom-[8%] right-[10%] flex h-[110px] w-[110px] items-center justify-center rounded-full border border-white/20 bg-[#0d0d0d] text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full border border-white/15 text-[2.2rem]">
                  <FiArrowRight aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-10 border-t border-white/10 pt-7">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {FEATURE_ITEMS.map(({ title, description, icon: Icon }) => (
              <div key={title} className="flex items-center gap-4 border-r border-white/10 px-2 py-2 last:border-r-0 md:px-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[1.3rem] text-white">
                  <Icon aria-hidden="true" />
                </div>
                <div>
                  <div className="text-[0.92rem] font-black uppercase tracking-[-0.04em] text-white md:text-[1rem]">
                    {title}
                  </div>
                  <div className="mt-1 text-[0.72rem] leading-relaxed text-[#b3b3b3] md:text-[0.76rem]">{description}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-[0.72rem] uppercase tracking-[0.24em] text-[#b3b3b3]">
            <span>Scroll to explore</span>
            <span>Est. 2024</span>
          </div>
        </div>
      </div>
    </div>
  </section>
)
