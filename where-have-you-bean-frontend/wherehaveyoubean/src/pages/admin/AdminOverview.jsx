import { platformStats } from '../../mock/stats.js'

const activity = [
  { id: 1, text: 'Priya Nair reported a found item — "Black Laptop (Dell)"', time: '2h ago' },
  { id: 2, text: 'Claim submitted for "Room Keys with Guitar-Pick Keychain"', time: '5h ago' },
  { id: 3, text: 'Ananya Rao reported a lost item — "Black Dell Laptop"', time: '1d ago' },
  { id: 4, text: 'Match confirmed and closed — "College ID Card"', time: '2d ago' },
]

export default function AdminOverview() {
  return (
    <div>
      <h1 className="font-display text-2xl text-cream mb-1">Overview</h1>
      <p className="text-parchment mb-6">Campus-wide lost &amp; found activity at a glance.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {platformStats.map((s) => (
          <div key={s.id} className="bg-espresso-800 border border-espresso-700 rounded-2xl p-5">
            <p className="font-mono text-2xl font-semibold text-bean-300">{s.value.toLocaleString('en-IN')}{s.suffix}</p>
            <p className="text-xs text-parchment mt-1.5 uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-espresso-800 border border-espresso-700 rounded-2xl p-5">
        <h2 className="text-sm font-medium text-cream mb-4">Recent Activity</h2>
        <ul className="divide-y divide-espresso-700">
          {activity.map((a) => (
            <li key={a.id} className="py-3 flex items-center justify-between gap-4 text-sm">
              <span className="text-parchment">{a.text}</span>
              <span className="text-xs text-parchment/60 font-mono whitespace-nowrap">{a.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
