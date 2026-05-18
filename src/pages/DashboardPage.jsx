import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import Button from '../components/ui/Button'

function DashboardPage() {
  const navigate = useNavigate()
  const { user, logout, loading } = useAuthStore()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
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
            <Button variant="secondary" onClick={handleLogout} loading={loading}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <p className="text-slate-600">
          Dashboard is ready. Task components will be added in the next step.
        </p>
      </main>
    </div>
  )
}

export default DashboardPage
