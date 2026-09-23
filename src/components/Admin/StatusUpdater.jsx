import { STATUS_CONFIG } from '../../data'

export const StatusUpdater = ({ status, onChange }) => (
  <select
    value={status}
    onChange={(event) => onChange(event.target.value)}
    className="rounded-full border border-gray-300 bg-white px-3 py-1 text-sm focus:border-accent focus:outline-none"
    aria-label="Update project status"
  >
    {Object.entries(STATUS_CONFIG).map(([value, config]) => (
      <option key={value} value={value}>
        {config.label}
      </option>
    ))}
  </select>
)
