const REVIEWS = [
  {
    quote:
      'Jason did a great job bringing Gardenside Kitchen to life online. The website really captures the feel of our café and makes it easy for people to see what we offer before they visit. It feels like us, which was exactly what we wanted.',
    author: 'Tracy Assue',
    role: 'Gardenside Kitchen',
  },
  {
    quote:
      'The new website gives South Salem Winery a much stronger presence online. Jason understood what makes our winery unique and built a site that showcases our wines and our story in a clean, professional way. We’re really happy with how it came out.',
    author: 'John Vuolo',
    role: 'South Salem Winery',
  },
]

export const Reviews = () => (
  <section className="bg-[var(--paper)] px-5 py-10 text-[var(--ink)] md:px-8 md:py-14">
    <div className="mx-auto max-w-[1600px]">
      <div className="mb-8 flex items-center justify-between md:mb-10">
        <div className="flex items-center gap-4">
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--ink-soft)]">05</span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--ink-soft)]">REVIEWS</span>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="pt-2">
          <h2 className="max-w-[560px] text-[3.2rem] font-black leading-[0.86] tracking-[-0.07em] text-[var(--ink)] md:text-[5.4rem] md:tracking-[-0.075em]">
            OWNERS WHO
            <span className="mt-1 block">STOPPED</span>
            <span className="mt-1 block">WORRYING</span>
            <span className="mt-1 block">ABOUT THEIR</span>
            <span className="mt-1 block">WEBSITE.</span>
          </h2>

          <p className="mt-8 max-w-[500px] text-[1.05rem] leading-relaxed text-[var(--ink-soft)] md:text-[1.18rem]">
            Real feedback from real business owners.
            <br />
            Built to make an impact.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {REVIEWS.map((review) => (
            <article
              key={review.author}
              className="rounded-[24px] border border-[var(--accent-soft)] bg-[var(--accent)] px-6 py-6 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] md:px-8 md:py-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="text-[1.75rem] tracking-[0.12em] text-white md:text-[2.15rem]">★★★★★</div>
              </div>

              <p className="mt-6 max-w-[430px] text-[1.05rem] leading-relaxed text-white/85 md:text-[1.18rem]">
                “{review.quote}”
              </p>

              <div className="mt-8 h-px w-full bg-white/15" />

              <div className="mt-6">
                <p className="text-[1.02rem] font-black uppercase tracking-[-0.05em] text-white md:text-[1.1rem] md:tracking-[-0.04em]">{review.author.toUpperCase()}</p>
                <p className="mt-2 max-w-[290px] text-[0.72rem] uppercase tracking-[0.12em] text-white/70 md:text-[0.82rem]">
                  {review.role.toUpperCase()}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
)
