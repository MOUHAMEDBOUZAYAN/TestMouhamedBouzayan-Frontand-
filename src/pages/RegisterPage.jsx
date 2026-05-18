import RegisterForm from '../components/auth/RegisterForm'

function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Create an account</h1>
          <p className="mt-2 text-slate-600">Start managing your tasks today</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
