export const getTaskId = (task) => task?.id ?? task?._id

export const TASK_STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
]

export const STATUS_STYLES = {
  pending: 'bg-amber-100 text-amber-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  done: 'bg-emerald-100 text-emerald-800',
}

export const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
