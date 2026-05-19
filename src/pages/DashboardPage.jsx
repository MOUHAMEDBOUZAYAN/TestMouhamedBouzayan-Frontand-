import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import TaskList from '../components/tasks/TaskList'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'

function DashboardPage() {
  const navigate = useNavigate()
  const { user, logout, loading } = useAuthStore()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const handleConfirmLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      navigate('/login', { replace: true })
    } catch {
      toast.error('Unable to logout')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-slate-900">Task Management</h1>
          <div className="flex items-center gap-4">
            {user?.name && (
              <span className="text-sm text-slate-600">Hello, {user.name}</span>
            )}
            <Button
              variant="secondary"
              onClick={() => setIsLogoutModalOpen(true)}
              loading={loading}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <TaskList />
      </main>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Logout"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsLogoutModalOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmLogout} loading={loading}>
              Logout
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          Are you sure you want to logout from your account?
        </p>
      </Modal>
    </div>
  )
}

export default DashboardPage
