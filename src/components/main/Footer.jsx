import { FiMail } from 'react-icons/fi'

export const Footer = () => (
  <footer id="contact" className="border-t border-white/10 bg-[#1c1a19] px-6 py-8 text-white md:px-8">
    <div className="mx-auto flex max-w-[1280px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div className="flex items-end gap-2 text-white">
        <span className="text-[2.2rem] font-black leading-none tracking-[-0.1em] text-[#f7f4f1] md:tracking-[-0.12em]">E&GH T45</span>
        <span className="pb-1 text-[0.52rem] font-semibold uppercase tracking-[0.22em] text-[#d7d0c9]/70">SITES</span>
      </div>

      <p className="text-[0.72rem] uppercase tracking-[0.12em] text-[#d7d0c9]/80">
        Web design &amp; maintenance for the Hudson Valley.
      </p>

      <a
        href="mailto:jasonf8080@gmail.com"
        className="inline-flex items-center gap-2 text-[0.9rem] font-medium text-[#f7f4f1] transition-colors hover:text-[#e7b287]"
      >
        <FiMail aria-hidden="true" /> jasonf8080@gmail.com
      </a>
    </div>
    <div className="mx-auto mt-6 h-px w-full max-w-[1280px] bg-white/10" />
    <p className="mx-auto mt-5 max-w-[1280px] text-[0.7rem] uppercase tracking-[0.14em] text-[#d7d0c9]/60">
      © {new Date().getFullYear()} 845 Sites. All rights reserved.
    </p>
  </footer>
)
