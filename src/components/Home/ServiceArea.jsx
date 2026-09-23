import { SERVICE_AREAS } from '../../data'

export const ServiceArea = () => (
  <section className="bg-[#0d141b] px-5 py-12 md:px-8 md:py-14">
    <div className="mx-auto max-w-[1280px]">
      <div className="mb-8 flex items-center gap-4 md:mb-10">
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/75">06</span>
        <span className="h-px flex-1 bg-white/25" />
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/75">Serving The Hudson Valley</span>
      </div>

      <h2 className="max-w-[700px] text-[2.7rem] leading-[0.9] text-white md:text-[4.2rem]">
        PROUDLY SERVING THE HUDSON VALLEY.
      </h2>

      <div className="mt-8 flex flex-wrap gap-3">
        {SERVICE_AREAS.map((area) => (
          <span
            key={area}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[0.74rem] font-medium uppercase tracking-[0.08em] text-white"
          >
            {area}
          </span>
        ))}
      </div>
    </div>
  </section>
)
