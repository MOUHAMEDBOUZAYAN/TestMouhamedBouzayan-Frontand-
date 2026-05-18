import { create } from 'zustand'
import * as authService from '../services/auth.service'
import { TOKEN_KEY } from '../services/api'

const getStoredToken = () => localStorage.getItem(TOKEN_KEY)

const getErrorMessage = (error) =>
  error.response?.data?.message || error.message || 'Something went wrong'

const extractAuthData = (data) => ({
  token: data.token || data.accessToken || null,
  user: data.user ?? null,
})

const useAuthStore = create((set) => ({
  user: null,
  token: getStoredToken(),
  isAuthenticated: !!getStoredToken(),
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  login: async (credentials) => {
    set({ loading: true, error: null })
    try {
      const data = await authService.login(credentials)
      const { token, user } = extractAuthData(data)

      if (token) {
        localStorage.setItem(TOKEN_KEY, token)
      }

      set({
        user,
        token,
        isAuthenticated: !!token,
        loading: false,
        error: null,
      })

      return data
    } catch (error) {
      const message = getErrorMessage(error)
      set({ loading: false, error: message })
      throw error
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null })
    try {
      const data = await authService.register(userData)
      const { token, user } = extractAuthData(data)

      if (token) {
        localStorage.setItem(TOKEN_KEY, token)
      }

      set({
        user,
        token,
        isAuthenticated: !!token,
        loading: false,
        error: null,
      })

      return data
    } catch (error) {
      const message = getErrorMessage(error)
      set({ loading: false, error: message })
      throw error
    }
  },

  logout: async () => {
    set({ loading: true, error: null })
    try {
      await authService.logout()
    } catch {
      // Clear local session even if server logout fails
    } finally {
      localStorage.removeItem(TOKEN_KEY)
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      })
    }
  },
}))

export default useAuthStore
