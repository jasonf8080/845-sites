import { STATUS_CONFIG } from '../../data'

export const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.not_received

  return (
    <span className={`whitespace-nowrap rounded-full px-3 py-1 text-sm font-semibold ${config.color}`}>
      {config.label}
    </span>
  )
}
