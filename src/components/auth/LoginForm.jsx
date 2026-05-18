import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import Button from '../ui/Button'
import Input from '../ui/Input'

function LoginForm() {
  const navigate = useNavigate()
  const { login, loading, error, clearError } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    clearError()
    return () => clearError()
  }, [clearError])

  const onSubmit = async (data) => {
    try {
      await login({ email: data.email, password: data.password })
      navigate('/dashboard', { replace: true })
    } catch {
      // Error is handled in authStore
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address',
          },
        })}
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        })}
      />

      <Button type="submit" fullWidth loading={loading}>
        Sign in
      </Button>

      <p className="text-center text-sm text-slate-600">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-700">
          Create one
        </Link>
      </p>
    </form>
  )
}

export default LoginForm
