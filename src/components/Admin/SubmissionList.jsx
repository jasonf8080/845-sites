import { StatusBadge } from '../Dashboard/StatusBadge'
import { StatusUpdater } from './StatusUpdater'

export const SubmissionList = ({ submissions, selectedId, onSelect, onStatusChange }) => (
  <div className="flex flex-col divide-y divide-gray-100 rounded-2xl border border-gray-200">
    {submissions.map((submission) => (
      <button
        key={submission.id}
        type="button"
        onClick={() => onSelect(submission.id)}
        className={`flex flex-col gap-2 p-5 text-left transition-colors md:flex-row md:items-center md:justify-between ${
          selectedId === submission.id ? 'bg-accent/5' : 'hover:bg-gray-50'
        }`}
      >
        <div>
          <p className="text-lg md:text-xl font-semibold leading-snug text-primary">{submission.business_name}</p>
          <p className="text-sm text-gray-500">
            {submission.contact_name} · {submission.contact_email}
          </p>
        </div>
        <div className="flex items-center gap-3" onClick={(event) => event.stopPropagation()}>
          <StatusBadge status={submission.status} />
          <StatusUpdater status={submission.status} onChange={(status) => onStatusChange(submission.id, status)} />
        </div>
      </button>
    ))}
  </div>
)
