import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

export const Hero = () => (
  <section id="home" className="relative overflow-hidden bg-[#11171c] px-5 pb-10 pt-8 md:px-8 md:pb-16 md:pt-10">
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -left-28 top-0 h-[70%] w-[90%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_55%)]" />
      <div className="absolute right-[-18%] top-1/3 h-[70%] w-[60%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="absolute left-[-16%] top-1/2 h-[68%] w-[120%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_55%)]" />
    </div>

    <div className="relative mx-auto max-w-[1600px] min-h-[calc(100vh-88px)]">
      <div className="flex items-start justify-between pb-2 pt-12 md:pt-16">
        <div className="flex items-center gap-3 text-[0.94rem] font-medium text-[#ff6e3c]">
          <span className="text-[1.15rem] leading-none">✦</span>
          <span>Trusted Web Design Agency</span>
        </div>
      </div>

      <div className="grid items-end gap-8 pt-6 md:grid-cols-[1.2fr_0.8fr] md:pt-10">
        <div className="relative z-10">
          <h1 className="max-w-[900px] text-[2.5rem] font-black leading-[0.88] tracking-[-0.07em] text-white sm:text-[3.2rem] md:text-[6.4rem] md:tracking-[-0.08em]">
            <span className="block">We specialize in building</span>
            <span className="mt-2 block text-white/90">Website &</span>
          </h1>

          <div className="mt-4 flex h-[16px] w-[360px] max-w-[55vw] items-center">
            <span className="block h-[2px] w-full rounded-full bg-white/70" />
          </div>

          <div className="mt-8 flex items-end gap-0 md:mt-10">
            <span className="text-[5.2rem] font-black leading-[0.8] tracking-[-0.07em] text-[#ff6e3c] md:text-[18rem] md:tracking-[-0.09em]">
              D
            </span>
            <span className="pb-4 text-[2.5rem] font-black leading-[0.82] tracking-[-0.07em] text-white sm:text-[3.2rem] md:pb-8 md:text-[6.5rem] md:tracking-[-0.08em]">
              evelopment
            </span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-start justify-end pb-8 md:pb-10">
          <p className="max-w-[330px] text-[1.15rem] leading-[1.45] text-white/80 md:text-[1.28rem]">
            elevate your brand with the agency <br /> agency — everything from strategy to <br /> advertising &amp; scale.
          </p>

          <Link
            to="#"
            className="mt-6 inline-flex items-center gap-2 text-[0.98rem] font-medium text-[#ff6e3c] transition-opacity hover:opacity-90"
          >
            Explore More <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-[110px] right-4 hidden h-[110px] w-[80px] items-center justify-center bg-[#2d4dff] text-[1.05rem] font-bold uppercase tracking-[-0.06em] text-white md:flex">
        <span className="inline-block -rotate-90 whitespace-nowrap">Explore More Theme</span>
      </div>
    </div>
  </section>
)
