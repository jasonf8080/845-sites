import { FiMail } from 'react-icons/fi'

export const Footer = () => (
  <footer id="contact" className="bg-[#0d141b] px-6 py-8 text-white md:px-8">
    <div className="mx-auto flex max-w-[1280px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div className="flex items-end gap-2 text-white">
        <span className="text-[2.2rem] font-black leading-none tracking-[-0.07em] md:tracking-[-0.08em]">E8GHT45</span>
        <span className="pb-1 text-[0.52rem] font-semibold uppercase tracking-[0.22em] text-white/80">SITES</span>
      </div>

      <p className="text-[0.72rem] uppercase tracking-[0.12em] text-white/75">
        Web design &amp; maintenance for the Hudson Valley.
      </p>

      <a
        href="mailto:jasonf8080@gmail.com"
        className="inline-flex items-center gap-2 text-[0.9rem] font-medium text-white/85 transition-colors hover:text-[#ef7a3d]"
      >
        <FiMail aria-hidden="true" /> jasonf8080@gmail.com
      </a>
    </div>
    <div className="mx-auto mt-6 h-px w-full max-w-[1280px] bg-white/10" />
    <p className="mx-auto mt-5 max-w-[1280px] text-[0.7rem] uppercase tracking-[0.14em] text-white/55">
      © {new Date().getFullYear()} 845 Sites. All rights reserved.
    </p>
  </footer>
)
