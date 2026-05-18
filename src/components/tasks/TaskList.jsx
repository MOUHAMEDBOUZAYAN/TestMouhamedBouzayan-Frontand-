import { useEffect, useState } from 'react'
import useTaskStore from '../../store/taskStore'
import { getTaskId } from '../../utils/helpers'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import Spinner from '../ui/Spinner'
import TaskCard from './TaskCard'
import TaskForm from './TaskForm'

function TaskList() {
  const {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    clearError,
  } = useTaskStore()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    fetchTasks()
    return () => clearError()
  }, [fetchTasks, clearError])

  const openCreateModal = () => {
    setEditingTask(null)
    setIsModalOpen(true)
  }

  const openEditModal = (task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingTask(null)
  }

  const handleSubmit = async (formData) => {
    try {
      if (editingTask) {
        await updateTask(getTaskId(editingTask), formData)
      } else {
        await createTask(formData)
      }
      closeModal()
    } catch {
      // Error handled in taskStore
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return
    try {
      await deleteTask(id)
    } catch {
      // Error handled in taskStore
    }
  }

  const handleStatusChange = async (id, status) => {
    const task = tasks.find((t) => getTaskId(t) === id)
    if (!task || task.status === status) return

    try {
      await updateTask(id, {
        title: task.title,
        description: task.description,
        status,
      })
    } catch {
      // Error handled in taskStore
    }
  }

  if (loading && tasks.length === 0) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" label="Loading tasks..." />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">My tasks</h2>
          <p className="text-sm text-slate-600">{tasks.length} task(s)</p>
        </div>
        <Button onClick={openCreateModal}>+ New task</Button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center">
          <p className="text-slate-600">No tasks yet. Create your first one!</p>
          <Button className="mt-4" onClick={openCreateModal}>
            Create task
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard
              key={getTaskId(task)}
              task={task}
              onEdit={openEditModal}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              loading={loading}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingTask ? 'Edit task' : 'New task'}
      >
        <TaskForm
          defaultValues={
            editingTask
              ? {
                  title: editingTask.title,
                  description: editingTask.description || '',
                  status: editingTask.status,
                }
              : undefined
          }
          onSubmit={handleSubmit}
          onCancel={closeModal}
          loading={loading}
        />
      </Modal>
    </div>
  )
}

export default TaskList
