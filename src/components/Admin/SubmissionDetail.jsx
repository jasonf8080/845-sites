import { StatusBadge } from '../Dashboard/StatusBadge'
import { StatusUpdater } from './StatusUpdater'
import { DESIGN_DIRECTION_OPTIONS, STYLE_OPTIONS, SERVICE_TYPE_OPTIONS } from '../../data'

const findLabel = (options, value) => options.find((option) => option.value === value)?.label || '—'

const DetailRow = ({ label, value }) => (
  <div className="flex flex-col gap-1 py-3">
    <dt className="text-xs md:text-sm font-semibold uppercase tracking-wide text-gray-400">{label}</dt>
    <dd className="text-gray-700">{value}</dd>
  </div>
)

export const SubmissionDetail = ({ submission, onStatusChange }) => (
  <aside className="flex flex-col gap-5 rounded-2xl border border-gray-200 p-6">
    <div className="flex items-start justify-between gap-4">
      <h2 className="text-2xl md:text-3xl font-bold leading-snug text-primary">{submission.business_name}</h2>
      <StatusBadge status={submission.status} />
    </div>

    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold uppercase tracking-wide text-gray-500">Status</span>
      <StatusUpdater status={submission.status} onChange={(status) => onStatusChange(submission.id, status)} />
    </div>

    <dl className="flex flex-col divide-y divide-gray-100 text-sm md:text-base">
      <DetailRow
        label="Contact"
        value={`${submission.contact_name} · ${submission.contact_email}${
          submission.contact_phone ? ` · ${submission.contact_phone}` : ''
        }`}
      />
      <DetailRow label="Industry" value={submission.industry || '—'} />
      <DetailRow label="Service" value={findLabel(SERVICE_TYPE_OPTIONS, submission.service_type)} />
      <DetailRow label="Website Goal" value={submission.website_goal || '—'} />
      <DetailRow label="Design Direction" value={findLabel(DESIGN_DIRECTION_OPTIONS, submission.design_direction)} />
      <DetailRow label="Style Preference" value={findLabel(STYLE_OPTIONS, submission.style_preference)} />
      <DetailRow label="Inspiration Links" value={submission.inspiration_links || '—'} />
      <DetailRow label="Special Features" value={submission.special_features || '—'} />
      <DetailRow label="Submitted" value={new Date(submission.created_at).toLocaleString()} />
    </dl>

    {submission.inspiration_image_urls?.length > 0 && (
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold uppercase tracking-wide text-gray-500">Inspiration Images</span>
        <div className="grid grid-cols-3 gap-2">
          {submission.inspiration_image_urls.map((url) => (
            <img
              key={url}
              src={url}
              alt={`Inspiration reference uploaded by ${submission.contact_name} for ${submission.business_name}`}
              width={120}
              height={120}
              loading="lazy"
              className="aspect-square w-full rounded-lg object-cover"
            />
          ))}
        </div>
      </div>
    )}
  </aside>
)
