import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

export const CTASection = () => (
  <section className="bg-[#0d141b] px-5 pb-10 pt-8 md:px-8 md:pb-12 md:pt-10">
    <div className="mx-auto max-w-[1280px] rounded-[24px] bg-[#1a2332] px-5 py-8 text-white md:px-8 md:py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white/70">LET&apos;S BUILD</p>
          <h2 className="mt-3 max-w-[760px] text-[2.7rem] leading-[0.9] text-white md:text-[5rem]">
            READY TO GROW YOUR BUSINESS ONLINE?
          </h2>
        </div>

        <Link
          to="/login"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--button)] px-7 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-[var(--ink)] transition-transform hover:scale-[1.02]"
        >
          Start Your Project <FiArrowRight aria-hidden="true" />
        </Link>
      </div>

      <p className="mt-6 max-w-[700px] text-[1rem] leading-relaxed text-white/75 md:text-[1.08rem]">
        Tell us about your business and get started with a clean, modern website built for growth.
      </p>
    </div>
  </section>
)
