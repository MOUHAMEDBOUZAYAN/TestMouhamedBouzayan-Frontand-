import { create } from 'zustand'
import * as taskService from '../services/task.service'

const getErrorMessage = (error) =>
  error.response?.data?.message || error.message || 'Something went wrong'

const normalizeTasks = (data) => {
  if (Array.isArray(data)) return data
  if (data?.tasks) return data.tasks
  return []
}

const getTaskId = (task) => task.id ?? task._id

const useTaskStore = create((set) => ({
  tasks: [],
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  fetchTasks: async () => {
    set({ loading: true, error: null })
    try {
      const data = await taskService.getTasks()
      set({ tasks: normalizeTasks(data), loading: false })
    } catch (error) {
      set({ loading: false, error: getErrorMessage(error) })
      throw error
    }
  },

  createTask: async (taskData) => {
    set({ loading: true, error: null })
    try {
      const data = await taskService.createTask(taskData)
      const task = data.task ?? data

      set((state) => ({
        tasks: [...state.tasks, task],
        loading: false,
      }))

      return task
    } catch (error) {
      set({ loading: false, error: getErrorMessage(error) })
      throw error
    }
  },

  updateTask: async (id, taskData) => {
    set({ loading: true, error: null })
    try {
      const data = await taskService.updateTask(id, taskData)
      const updated = data.task ?? data

      set((state) => ({
        tasks: state.tasks.map((task) =>
          getTaskId(task) === id ? { ...task, ...updated } : task,
        ),
        loading: false,
      }))

      return updated
    } catch (error) {
      set({ loading: false, error: getErrorMessage(error) })
      throw error
    }
  },

  deleteTask: async (id) => {
    set({ loading: true, error: null })
    try {
      await taskService.deleteTask(id)

      set((state) => ({
        tasks: state.tasks.filter((task) => getTaskId(task) !== id),
        loading: false,
      }))
    } catch (error) {
      set({ loading: false, error: getErrorMessage(error) })
      throw error
    }
  },
}))

export default useTaskStore
