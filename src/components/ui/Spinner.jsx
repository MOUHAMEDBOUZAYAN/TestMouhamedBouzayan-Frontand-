const sizes = {
  sm: 'h-5 w-5 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-4',
}

function Spinner({ size = 'md', className = '', label = 'Loading...' }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
      role="status"
      aria-label={label}
    >
      <span
        className={[
          'animate-spin rounded-full border-indigo-600 border-t-transparent',
          sizes[size],
        ].join(' ')}
      />
      {label && (
        <span className="text-sm text-slate-500 sr-only">{label}</span>
      )}
    </div>
  )
}

export default Spinner
