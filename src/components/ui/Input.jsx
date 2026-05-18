import { forwardRef } from 'react'

const Input = forwardRef(function Input(
  {
    label,
    id,
    type = 'text',
    error,
    className = '',
    ...props
  },
  ref,
) {
  const inputId = id || props.name

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        type={type}
        className={[
          'w-full rounded-lg border px-3 py-2 text-sm text-slate-900 transition-colors',
          'placeholder:text-slate-400',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
          error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-slate-300',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
})

export default Input
