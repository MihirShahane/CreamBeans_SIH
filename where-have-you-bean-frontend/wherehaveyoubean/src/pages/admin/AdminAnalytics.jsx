const monthly = [
  { m: 'Mar', reported: 62, returned: 41 },
  { m: 'Apr', reported: 78, returned: 55 },
  { m: 'May', reported: 54, returned: 39 },
  { m: 'Jun', reported: 30, returned: 20 },
  { m: 'Jul', reported: 88, returned: 61 },
  { m: 'Aug', reported: 104, returned: 79 },
]

const max = Math.max(...monthly.map((d) => d.reported))

export default function AdminAnalytics() {
  return (
    <div>
      <h1 className="font-display text-2xl text-cream mb-1">Analytics</h1>
      <p className="text-parchment mb-6">Reported vs. returned items over the last six months.</p>

      <div className="bg-espresso-800 border border-espresso-700 rounded-2xl p-6">
        <div className="flex items-end gap-4 h-56">
          {monthly.map((d) => (
            <div key={d.m} className="flex-1 flex flex-col items-center justify-end gap-1.5 h-full">
              <div className="w-full flex-1 flex items-end gap-1">
                <div
                  className="flex-1 bg-espresso-600 rounded-t-md transition-all"
                  style={{ height: `${(d.reported / max) * 100}%` }}
                  title={`Reported: ${d.reported}`}
                />
                <div
                  className="flex-1 bg-bean-gradient rounded-t-md transition-all"
                  style={{ height: `${(d.returned / max) * 100}%` }}
                  title={`Returned: ${d.returned}`}
                />
              </div>
              <span className="text-xs text-parchment font-mono">{d.m}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6 mt-6 text-xs text-parchment">
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-espresso-600 inline-block" /> Reported</span>
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-bean-gradient inline-block" /> Returned</span>
        </div>
      </div>

      <p className="text-xs text-parchment/70 mt-4">
        Scaffolded with mock data — connect to <code className="text-bean-300 font-mono">GET /admin/analytics</code> for live figures.
      </p>
    </div>
  )
}
