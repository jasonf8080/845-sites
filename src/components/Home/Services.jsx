import { FiCode, FiShield } from 'react-icons/fi'

const SERVICE_ITEMS = [
  {
    id: 'new-site',
    icon: FiCode,
    label: 'NEW SITE',
    title: 'CUSTOM WEBSITE\nBUILD',
    price: '$350',
    priceSuffix: 'ONE-TIME, FLAT RATE',
    description:
      'A fully custom, high-speed, mobile-first website designed and built from scratch for your business — no recycled templates, no bloated page builders.',
  },
  {
    id: 'maintenance',
    icon: FiShield,
    label: 'MAINTENANCE',
    title: 'ONGOING SITE\nMAINTENANCE',
    price: '$25',
    priceSuffix: 'PER MONTH',
    description:
      'Hosting coordination, uptime monitoring, security updates, and small content changes so your site stays fast, current, and online.',
  },
]

export const Services = () => (
  <section id="services" className="bg-[var(--paper)] px-5 py-10 md:px-8 md:py-14">
    <div className="mx-auto max-w-[1600px]">
      <div className="mb-8 flex items-center justify-between md:mb-10">
        <div className="flex items-center gap-4">
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--ink-soft)]">03</span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--ink-soft)]">SERVICES</span>
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.85fr_1.1fr_1.1fr]">
        <div className="flex flex-col justify-between pt-2">
          <h2 className="heading-section max-w-[420px] text-[var(--ink)]">
            SIMPLE,
            <span className="mt-1 block">HONEST</span>
            <span className="mt-1 block">PRICING.</span>
          </h2>

          <div className="mt-8 max-w-[380px]">
            <p className="text-body-lg text-[var(--ink-soft)]">
              No surprises, no confusing tiers, just a streamlined path from concept to launch.
            </p>

            <button
              type="button"
              className="mt-7 inline-flex items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]"
            >
              Compare Features <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {SERVICE_ITEMS.map(({ id, icon: Icon, label, title, price, priceSuffix, description }) => (
          <article
            key={id}
            className="rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-6 text-[#f4efe9] shadow-[0_18px_45px_rgba(0,0,0,0.14)] md:p-7"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#e78a5e]/70 bg-[rgba(231,138,94,0.08)] text-[1.8rem] text-[#f59d6c]">
                <Icon aria-hidden="true" />
              </div>
              <span className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-[#d7d0c9]">{label}</span>
            </div>

            <h3 className="max-w-[330px] text-[2.3rem] font-black leading-[0.92] tracking-[-0.07em] text-white md:text-[3.05rem] md:tracking-[-0.075em]">
              {title.split('\n').map((line, index) => (
                <span key={line + index} className="block">
                  {line}
                </span>
              ))}
            </h3>

            <div className="mt-7 flex items-baseline gap-3">
              <span className="text-[2.6rem] font-black leading-none tracking-[-0.07em] text-white md:text-[3.7rem] md:tracking-[-0.08em]">
                {price}
              </span>
              <span className="text-[0.74rem] font-medium uppercase tracking-[0.12em] text-[#d7d0c9]">
                {priceSuffix}
              </span>
            </div>

            <p className="mt-6 max-w-[430px] text-[1rem] leading-relaxed text-[#d7d0c9] md:text-[1.1rem]">
              {description}
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
)
