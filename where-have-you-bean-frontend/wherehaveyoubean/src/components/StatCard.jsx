import { useCountUp } from '../hooks/useCountUp.js'

export default function StatCard({ stat, active }) {
  const value = useCountUp(stat.value, { start: active })

  return (
    <div className="bg-espresso-800 border border-espresso-700 rounded-2xl p-6 text-center">
      <p className="font-mono text-3xl md:text-4xl font-semibold text-bean-300">
        {value.toLocaleString('en-IN')}{stat.suffix}
      </p>
      <p className="text-xs md:text-sm text-parchment mt-2 uppercase tracking-wide">{stat.label}</p>
    </div>
  )
}
