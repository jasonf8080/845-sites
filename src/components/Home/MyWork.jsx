import { useMemo, useState } from 'react'

const projects = [
  {
    name: 'South Salem Winery',
    image: '/images/south-salem-winery-reference.jpg',
    url: 'https://southsalemwinery.com/',
    description:
      'A polished wine brand experience built to feel elevated, intimate, and memorable — highlighting tastings, events, and a refined local story.',
    features: [
      { label: 'LUXURY BRAND', text: 'Boutique visuals with premium positioning.', icon: '✦' },
      { label: 'EVENT-READY', text: 'Showcases tastings, reservations, and experiences.', icon: '◍' },
      { label: 'LOCAL STORY', text: 'Crafted for a Hudson Valley destination audience.', icon: '▣' },
    ],
  },
  {
    name: 'Gardenside Kitchen',
    image: '/images/gardenside-reference.jpg',
    url: 'https://gardensidekitchen.com/',
    description:
      'A custom website for a local café in South Salem, NY — showcasing their menu, events, and unique greenhouse setting.',
    features: [
      { label: 'LOCAL CAFÉ', text: 'Menu, coffee, pastries & wine.', icon: '☕' },
      { label: 'CUSTOM DESIGN', text: 'Built around their brand and space.', icon: '✦' },
      { label: 'BUILT FOR GROWTH', text: 'Mobile-friendly, SEO optimized.', icon: '▣' },
    ],
  },
]

export const MyWork = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showDetails, setShowDetails] = useState(false)

  const activeProject = useMemo(() => projects[activeIndex], [activeIndex])

  const goToProject = (nextIndex) => {
    setActiveIndex(nextIndex)
    setShowDetails(false)
  }

  const goPrev = () => {
    const nextIndex = (activeIndex - 1 + projects.length) % projects.length
    goToProject(nextIndex)
  }

  const goNext = () => {
    const nextIndex = (activeIndex + 1) % projects.length
    goToProject(nextIndex)
  }

  const toggleDetails = () => {
    setShowDetails((current) => !current)
  }

  return (
    <section className="relative overflow-hidden bg-[#0b141b] px-5 py-12 text-white md:px-8 md:py-16">
      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid items-center gap-10 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-[620px]">
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#ff7f45]/50 bg-transparent px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#ff7f45]">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#ff7f45]" />
              Featured Project
            </div>

            <h2 className="text-[4rem] font-black leading-[0.8] tracking-[-0.07em] text-white sm:text-[4.7rem] lg:text-[6.2rem]">
              <span className="block text-white">{activeProject.name.split(' ')[0].toUpperCase()}</span>
              <span className="block text-white">{activeProject.name.split(' ').slice(1).join(' ').toUpperCase()}</span>
            </h2>

            <p className="mt-6 max-w-[530px] text-[1.14rem] leading-[1.5] text-white/72 md:text-[1.28rem]">
              {activeProject.description}
            </p>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href={activeProject.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#ff6e3c] px-7 py-4 text-[1.02rem] font-semibold text-white shadow-[0_12px_26px_rgba(255,110,60,0.35)] transition-all duration-300 hover:-translate-y-0.5"
              >
                {showDetails ? 'Hide Details' : 'View Project'} <span aria-hidden="true">→</span>
              </a>

              <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 p-2">
                <button
                  type="button"
                  aria-label="Previous project"
                  onClick={goPrev}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#111b24] text-xl text-white transition hover:border-[#ff7f45]/50 hover:text-[#ff7f45]"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Next project"
                  onClick={goNext}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#111b24] text-xl text-white transition hover:border-[#ff7f45]/50 hover:text-[#ff7f45]"
                >
                  →
                </button>
              </div>
            </div>

            <div
              className={`mt-10 space-y-5 transition-all duration-500 ${
                showDetails ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
              }`}
            >
              {activeProject.features.map((item) => (
                <div key={item.label} className="flex items-center gap-4 rounded-[16px] border border-white/10 bg-white/3 px-4 py-4 opacity-100 transition-opacity duration-500">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#ff7f45]/60 bg-[#111b24] text-[1.3rem] text-[#ff7f45]">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[0.96rem] font-black uppercase tracking-[-0.04em] text-white md:text-[1.08rem]">
                      {item.label}
                    </div>
                    <div className="mt-1 text-[0.9rem] text-white/68">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <div className="h-[420px] w-[420px] rounded-full border border-[#ff7f45]/30" />
            </div>

            <div
              key={activeProject.name}
              className={`mx-auto max-w-[760px] rounded-[28px] border border-[#ff7f45]/40 bg-[#111a22] p-3 shadow-[0_0_30px_rgba(255,119,59,0.12)] transition-all duration-500 ${
                showDetails ? 'scale-[1.01] opacity-100' : 'scale-[0.99] opacity-90'
              }`}
            >
              <img
                src={activeProject.image}
                alt={`${activeProject.name} website reference`}
                className="h-[540px] w-full rounded-[20px] object-cover object-center transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
