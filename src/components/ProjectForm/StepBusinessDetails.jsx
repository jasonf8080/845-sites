import { SERVICE_TYPE_OPTIONS } from '../../data'

export const StepBusinessDetails = ({ formData, updateFields, onNext }) => {
  const { business_name, contact_name, contact_phone, industry, service_type } = formData

  const canContinue = business_name.trim().length > 0 && contact_name.trim().length > 0

  return (
    <div className="mt-6 flex flex-col gap-6">
      <h2 className="font-display text-5xl leading-none text-primary md:text-[4rem]">
        Tell us about
        <span className="block">your business.</span>
      </h2>
      <p className="text-base leading-relaxed text-[var(--ink-soft)] md:text-lg">
        The essentials we need to prepare your website project.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/60 md:text-[11px]">
          Business Name
          <input
            type="text"
            required
            value={business_name}
            onChange={(event) => updateFields({ business_name: event.target.value })}
            className="border-0 border-b border-[rgba(31,45,61,0.25)] bg-transparent pb-2 pt-1 text-base text-primary focus:border-primary focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/60 md:text-[11px]">
          Your Name
          <input
            type="text"
            required
            value={contact_name}
            onChange={(event) => updateFields({ contact_name: event.target.value })}
            className="border-0 border-b border-[rgba(31,45,61,0.25)] bg-transparent pb-2 pt-1 text-base text-primary focus:border-primary focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/60 md:text-[11px]">
          Phone
          <input
            type="tel"
            value={contact_phone}
            onChange={(event) => updateFields({ contact_phone: event.target.value })}
            className="border-0 border-b border-[rgba(31,45,61,0.25)] bg-transparent pb-2 pt-1 text-base text-primary focus:border-primary focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/60 md:text-[11px]">
          Industry or Type of Business
          <input
            type="text"
            value={industry}
            onChange={(event) => updateFields({ industry: event.target.value })}
            className="border-0 border-b border-[rgba(31,45,61,0.25)] bg-transparent pb-2 pt-1 text-base text-primary focus:border-primary focus:outline-none"
          />
        </label>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-sm md:text-base font-semibold uppercase tracking-wide text-gray-500">
          Which service are you requesting?
        </span>
        {SERVICE_TYPE_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-base md:text-lg ${
              service_type === option.value ? 'border-accent bg-accent/5' : 'border-gray-200'
            }`}
          >
            <input
              type="radio"
              name="service_type"
              value={option.value}
              checked={service_type === option.value}
              onChange={(event) => updateFields({ service_type: event.target.value })}
              className="h-4 w-4 accent-accent"
            />
            {option.label}
          </label>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-end gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/60">Not yet</span>
        <button
          type="button"
          disabled={!canContinue}
          onClick={onNext}
          className="rounded-full bg-primary px-8 py-3 text-base font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  )
}
