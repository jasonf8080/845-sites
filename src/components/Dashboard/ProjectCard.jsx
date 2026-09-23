import { StatusBadge } from './StatusBadge'
import { SERVICE_TYPE_OPTIONS } from '../../data'

export const ProjectCard = ({ submission }) => {
  const serviceLabel =
    SERVICE_TYPE_OPTIONS.find((option) => option.value === submission.service_type)?.label || submission.service_type
  const submittedOn = new Date(submission.created_at).toLocaleDateString()

  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-gray-200 p-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl md:text-2xl font-semibold leading-snug text-primary">{submission.business_name}</h3>
        <StatusBadge status={submission.status} />
      </div>
      <p className="text-sm md:text-base text-gray-500">{serviceLabel}</p>
      <p className="text-sm text-gray-400">Submitted {submittedOn}</p>
    </article>
  )
}
