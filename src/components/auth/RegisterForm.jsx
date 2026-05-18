import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import Button from '../ui/Button'
import Input from '../ui/Input'

function RegisterForm() {
  const navigate = useNavigate()
  const { register: registerUser, loading, error, clearError } = useAuthStore()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const password = watch('password')

  useEffect(() => {
    clearError()
    return () => clearError()
  }, [clearError])

  const onSubmit = async (data) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      })
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
        label="Full name"
        type="text"
        placeholder="John Doe"
        error={errors.name?.message}
        {...register('name', {
          required: 'Name is required',
          minLength: {
            value: 2,
            message: 'Name must be at least 2 characters',
          },
        })}
      />

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

      <Input
        label="Confirm password"
        type="password"
        placeholder="••••••••"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (value) =>
            value === password || 'Passwords do not match',
        })}
      />

      <Button type="submit" fullWidth loading={loading}>
        Create account
      </Button>

      <p className="text-center text-sm text-slate-600">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
          Sign in
        </Link>
      </p>
    </form>
  )
}

export default RegisterForm
