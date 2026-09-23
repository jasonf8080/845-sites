import { useState } from 'react'
import { DESIGN_DIRECTION_OPTIONS, STYLE_OPTIONS, SERVICE_TYPE_OPTIONS } from '../../data'

const findLabel = (options, value) => options.find((option) => option.value === value)?.label || '—'

const ReviewRow = ({ label, value }) => (
  <div className="grid grid-cols-1 gap-1 py-3 md:grid-cols-3 md:gap-4">
    <dt className="text-xs md:text-sm font-semibold uppercase tracking-wide text-gray-400">{label}</dt>
    <dd className="text-gray-700 md:col-span-2">{value}</dd>
  </div>
)

export const StepReview = ({ formData, contactEmail, onBack, onSubmit, submitting, error }) => {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="mt-6 flex flex-col gap-6">
      <h2 className="text-3xl md:text-4xl font-bold leading-tight text-primary">Ready to begin.</h2>
      <p className="text-base md:text-lg leading-relaxed text-gray-600">
        Review your project details, then submit — you'll be contacted by email to finalize details and payment.
      </p>

      <dl className="flex flex-col divide-y divide-gray-100 text-sm md:text-base">
        <ReviewRow label="Business" value={formData.business_name} />
        <ReviewRow
          label="Contact"
          value={`${formData.contact_name} · ${contactEmail}${formData.contact_phone ? ` · ${formData.contact_phone}` : ''}`}
        />
        <ReviewRow label="Industry" value={formData.industry || '—'} />
        <ReviewRow label="Service" value={findLabel(SERVICE_TYPE_OPTIONS, formData.service_type)} />
        <ReviewRow label="Website Goal" value={formData.website_goal || '—'} />
        <ReviewRow label="Design Direction" value={findLabel(DESIGN_DIRECTION_OPTIONS, formData.design_direction)} />
        <ReviewRow label="Style Preference" value={findLabel(STYLE_OPTIONS, formData.style_preference)} />
        <ReviewRow label="Inspiration Links" value={formData.inspiration_links || '—'} />
        <ReviewRow
          label="Uploaded Images"
          value={formData.inspiration_image_urls.length ? `${formData.inspiration_image_urls.length} uploaded` : 'None uploaded'}
        />
        <ReviewRow label="Special Features" value={formData.special_features || '—'} />
      </dl>

      <label className="flex items-start gap-3 text-sm md:text-base text-gray-700">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(event) => setAgreed(event.target.checked)}
          className="mt-1 h-4 w-4 accent-accent"
        />
        I understand this submits a project request to 845 Sites and does not charge any payment now. I'll be
        contacted by email to confirm details and arrange payment.
      </label>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <div className="mt-2 flex justify-between">
        <button type="button" onClick={onBack} className="text-base font-semibold text-gray-500 hover:text-primary">
          Back
        </button>
        <button
          type="button"
          disabled={!agreed || submitting}
          onClick={onSubmit}
          className="rounded-full bg-accent px-8 py-3 text-base font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitting ? 'Submitting…' : 'Submit Project Request'}
        </button>
      </div>
    </div>
  )
}
