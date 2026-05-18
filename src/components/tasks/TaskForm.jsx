import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { TASK_STATUSES } from '../../utils/helpers'

function TaskForm({ defaultValues, onSubmit, onCancel, loading }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      status: 'pending',
      ...defaultValues,
    },
  })

  useEffect(() => {
    reset({
      title: '',
      description: '',
      status: 'pending',
      ...defaultValues,
    })
  }, [defaultValues, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Input
        label="Title"
        placeholder="Task title"
        error={errors.title?.message}
        {...register('title', {
          required: 'Title is required',
          minLength: {
            value: 2,
            message: 'Title must be at least 2 characters',
          },
        })}
      />

      <div className="w-full">
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          placeholder="Optional description"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          {...register('description')}
        />
      </div>

      <div className="w-full">
        <label htmlFor="status" className="mb-1.5 block text-sm font-medium text-slate-700">
          Status
        </label>
        <select
          id="status"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          {...register('status', { required: 'Status is required' })}
        >
          {TASK_STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
        {errors.status && (
          <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
        )}
        <Button type="submit" loading={loading}>
          Save task
        </Button>
      </div>
    </form>
  )
}

export default TaskForm
