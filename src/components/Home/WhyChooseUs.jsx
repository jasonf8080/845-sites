import { FiZap, FiMapPin, FiTrendingUp, FiDollarSign } from 'react-icons/fi'

const CARD_DATA = [
  {
    id: 1,
    icon: FiZap,
    title: 'BUILT FOR\nSPEED',
    text: 'Every site is hand-coded and optimized to load fast on any device — performance is built in from the first line of code, not bolted on afterward.',
  },
  {
    id: 2,
    icon: FiMapPin,
    title: 'LOCAL,\nHUDSON VALLEY\nFOCUSED',
    text: 'Based in the 845 area and focused on Hudson Valley small businesses — you work directly with the person building your site, not a call center.',
  },
  {
    id: 3,
    icon: FiTrendingUp,
    title: 'SEO BUILT IN\nFROM DAY ONE',
    text: 'Clean semantic code, fast load times, structured data, and proper metadata so search engines can find and rank your business from the start.',
  },
  {
    id: 4,
    icon: FiDollarSign,
    title: 'SIMPLE,\nHONEST PRICING',
    text: 'One flat rate to build your site and one low monthly rate to keep it running — no hidden fees and no surprises.',
  },
]

export const WhyChooseUs = () => (
  <section id="why-us" className="bg-[var(--paper)] px-5 py-10 text-[var(--ink)] md:px-8 md:py-14">
    <div className="mx-auto max-w-[1600px]">
      <div className="mb-8 flex items-center justify-between md:mb-10">
        <div className="flex items-center gap-4">
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--ink-soft)]">02</span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--ink-soft)]">WHY CHOOSE US</span>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="pt-2">
          <h2 className="max-w-[700px] text-[3.2rem] font-black leading-[0.86] tracking-[-0.07em] text-[var(--ink)] md:text-[5.8rem] md:tracking-[-0.075em]">
            BUILT FOR
            <span className="mt-1 block">BUSINESSES</span>
            <span className="mt-1 block">THAT WANT TO</span>
            <span className="mt-1 block text-[var(--accent)]">STAND OUT.</span>
          </h2>

          <p className="mt-8 max-w-[480px] text-[1.05rem] leading-relaxed text-[var(--ink-soft)] md:text-[1.25rem]">
            You get a strategic partner and a tailored online presence, not a rushed template.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {CARD_DATA.map(({ id, icon: Icon, title, text }) => (
            <article
              key={id}
              className="min-h-[255px] rounded-[18px] border border-[var(--accent-soft)] bg-[var(--accent)] p-5 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[10px] border border-white/20 bg-white/5 text-[1.8rem] font-bold text-white">
                <Icon aria-hidden="true" />
              </div>

              <h3 className="max-w-[245px] text-[1.85rem] font-black leading-[0.96] tracking-[-0.07em] text-white md:text-[2.6rem] md:tracking-[-0.07em]">
                {title.split('\n').map((line, index) => (
                  <span key={line + index} className="block">
                    {line}
                  </span>
                ))}
              </h3>

              <p className="mt-4 max-w-[290px] text-[0.95rem] leading-relaxed text-white/80 md:text-[1.05rem]">
                {text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
)
