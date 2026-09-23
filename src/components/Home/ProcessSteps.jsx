import { useLayoutEffect, useRef } from 'react'
import {
  FiMessageSquare,
  FiShield,
  FiCreditCard,
  FiPenTool,
  FiEye,
  FiSliders,
  FiCheck,
  FiServer,
  FiSend,
} from 'react-icons/fi'
import { gsap } from '../../lib/gsapConfig'
import { PROCESS_STEPS } from '../../data'

const ICONS = {
  1: FiMessageSquare,
  2: FiShield,
  3: FiCreditCard,
  4: FiPenTool,
  5: FiEye,
  6: FiSliders,
  7: FiCheck,
  8: FiServer,
  9: FiSend,
}

export const ProcessSteps = () => {
  const containerRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.process-step', {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-[#0d141b] px-5 py-12 text-white md:px-8 md:py-16">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-7 text-center">
          <span className="block text-[0.72rem] font-black uppercase tracking-[0.2em] text-[#ff8d59] md:text-[0.8rem]">
            OUR PROCESS
          </span>
          <h2 className="mt-3 text-[2.4rem] font-black leading-[0.82] tracking-[-0.08em] text-white md:text-[4.6rem]">
            <span className="block">A SIMPLE PROCESS.</span>
            <span className="mt-1 block text-white/70">BEAUTIFUL RESULTS.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[760px] text-[0.82rem] leading-relaxed text-white/72 md:text-[1.02rem]">
            From idea to a live, professional website — without the hassle. We handle the technical stuff so you can focus on your business.
          </p>
        </div>

        <div className="relative mt-10 md:mt-12">
          <div className="relative z-10 grid gap-x-3 gap-y-10 md:grid-cols-5">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = ICONS[step.id]
              const isBottomRow = index >= 5

              return (
                <div
                  key={step.id}
                  className={`process-step flex flex-col items-center text-center ${isBottomRow ? 'pt-10 md:pt-16' : ''}`}
                >
                  <div className="mb-3 flex items-center justify-center">
                    <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full border-[3px] border-[#ff8d59] bg-[#0e1a28] text-[1.7rem] text-[#ff8d59] shadow-[0_0_12px_rgba(255,141,89,0.6)] md:h-[82px] md:w-[82px] md:text-[2rem]">
                      <Icon aria-hidden="true" />
                    </div>
                  </div>

                  <div className="text-[1.15rem] font-black leading-none tracking-[-0.06em] text-[#ff8d59] md:text-[1.5rem]">
                    {String(step.id).padStart(2, '0')}.
                  </div>

                  <h3 className="mt-2 max-w-[200px] text-[0.9rem] font-black leading-[1.05] tracking-[-0.06em] text-white md:text-[1.2rem]">
                    {step.title.toUpperCase()}
                  </h3>

                  <p className="mt-2 max-w-[220px] text-[0.7rem] leading-relaxed text-white/75 md:text-[0.85rem]">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
