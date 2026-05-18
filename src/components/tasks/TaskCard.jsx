import Button from '../ui/Button'
import { getTaskId, STATUS_STYLES, TASK_STATUSES, formatDate } from '../../utils/helpers'

function TaskCard({ task, onEdit, onDelete, onStatusChange, loading }) {
  const taskId = getTaskId(task)
  const statusClass = STATUS_STYLES[task.status] || STATUS_STYLES.pending

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-slate-900">{task.title}</h3>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClass}`}>
              {TASK_STATUSES.find((s) => s.value === task.status)?.label || task.status}
            </span>
          </div>

          {task.description && (
            <p className="text-sm text-slate-600">{task.description}</p>
          )}

          {task.createdAt && (
            <p className="mt-2 text-xs text-slate-400">{formatDate(task.createdAt)}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={task.status}
            onChange={(e) => onStatusChange(taskId, e.target.value)}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-2 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {TASK_STATUSES.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>

          <Button variant="secondary" size="sm" onClick={() => onEdit(task)} disabled={loading}>
            Edit
          </Button>

          <Button variant="danger" size="sm" onClick={() => onDelete(taskId)} disabled={loading}>
            Delete
          </Button>
        </div>
      </div>
    </article>
  )
}

export default TaskCard
