export default function StepIndicator({ steps, current }) {
  return (
    <ol className="flex items-center gap-2 md:gap-4">
      {steps.map((label, i) => {
        const step = i + 1
        const isActive = step === current
        const isDone = step < current
        return (
          <li key={label} className="flex items-center gap-2 md:gap-4 flex-1">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-semibold transition-colors ${
                  isDone
                    ? 'bg-bean-500 text-espresso-950'
                    : isActive
                    ? 'bg-bean-gradient text-espresso-950'
                    : 'bg-espresso-700 text-parchment'
                }`}
              >
                {isDone ? '✓' : step}
              </span>
              <span className={`text-xs md:text-sm truncate ${isActive ? 'text-cream font-medium' : 'text-parchment'}`}>
                {label}
              </span>
            </div>
            {step < steps.length && <div className={`h-px flex-1 ${isDone ? 'bg-bean-500' : 'bg-espresso-700'}`} />}
          </li>
        )
      })}
    </ol>
  )
}
