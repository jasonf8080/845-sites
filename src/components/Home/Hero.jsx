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
  <section
    id="home"
    className="relative overflow-hidden bg-[#201d1b] px-5 pb-8 pt-6 text-white md:px-8 md:pb-10 md:pt-8"
    style={{
      backgroundImage: "linear-gradient(90deg, rgba(13,10,8,0.82) 0%, rgba(26,22,18,0.68) 42%, rgba(13,10,8,0.78) 100%), url('/images/header.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
    }}
  >
    

    <div className="relative mx-auto max-w-[1500px]">
      <div className="flex min-h-[calc(100vh-120px)] flex-col justify-between">
        <div className="relative z-10 pt-4 xl:pt-8">
          <div className="grid items-start gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="max-w-[820px]">
              <div className="text-eyebrow mb-5 flex items-center gap-4 text-[#d8d1c9]">
                <span>Websites for real businesses</span>
                <span className="h-px flex-1 bg-white/15" />
              </div>

              <h1 className="heading-hero text-white">
                <span className="block">LOCAL</span>
                <span className="block text-white">BUSINESSES</span>
                <span className="block text-[#d7d0c9]">BIGGER</span>
              </h1>

              <p className="text-lead mt-6 font-medium text-white">
                Modern websites, built for growth.
              </p>

              <p className="text-body-lg mt-4 max-w-[620px] text-[#d7d0c9]">
                We help Hudson Valley businesses stand out online with custom websites, local SEO, and modern design — so you can get more customers and focus on what you do best.
              </p>

              <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <Link
                  to="/login"
                  className="warm-button-primary px-6 py-4 text-[0.9rem] font-semibold uppercase tracking-[0.02em] md:text-[1.06rem]"
                >
                  Get Your Website <FiArrowRight aria-hidden="true" className="text-lg" />
                </Link>
              </div>
            </div>

            <div className="relative hidden min-h-[460px] xl:block">
              <div className="absolute inset-x-0 top-0 flex justify-center">
                <div className="text-[0.78rem] font-medium uppercase tracking-[0.22em] text-[#d7d0c9]">
                  <div className="text-left">914</div>
                  <div className="text-left">845</div>
                  <div className="text-left">AND BEYOND</div>
                </div>
              </div>

              <div className="absolute left-1/2 top-[40%] h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-white/15 shadow-[0_0_25px_rgba(255,255,255,0.02)]" />
              <div className="absolute left-1/2 top-[40%] h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

              <div className="absolute inset-x-0 top-[28%] flex justify-center">
                <div className="text-[10rem] font-black leading-none tracking-[-0.09em] text-white/10">845</div>
              </div>

              <div className="absolute right-[10%] top-[14%] text-right">
                <div className="text-[3.2rem] italic leading-none text-white/80">Hudson Valley</div>
                <div className="mt-1 flex items-center gap-3 text-[2.2rem] italic leading-none text-white/80">
                  <span>Built</span>
                  <span className="h-[3px] w-24 rounded-full bg-white/80" />
                </div>
              </div>

              <div className="absolute bottom-[13%] right-[4%] text-[0.7rem] uppercase tracking-[0.22em] text-[#d7d0c9]">
                <div className="text-right">Modern</div>
                <div className="text-right">Local</div>
                <div className="text-right">Impactful</div>
              </div>

              <div className="absolute bottom-[8%] right-[10%] flex h-[110px] w-[110px] items-center justify-center rounded-full border border-white/10 bg-[#161310] text-white shadow-[0_0_20px_rgba(255,255,255,0.04)]">
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
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[1.3rem] text-white">
                  <Icon aria-hidden="true" />
                </div>
                <div>
                  <div className="text-[0.92rem] font-black uppercase tracking-[-0.04em] text-white md:text-[1rem]">
                    {title}
                  </div>
                  <div className="mt-1 text-[0.72rem] leading-relaxed text-[#d7d0c9] md:text-[0.76rem]">{description}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-[0.72rem] uppercase tracking-[0.24em] text-[#d7d0c9]">
            <span>Scroll to explore</span>
            <span>Est. 2024</span>
          </div>
        </div>
      </div>
    </div>
  </section>
)
