export default function AdminReports() {
  return (
    <div>
      <h1 className="font-display text-2xl text-cream mb-1">Reports</h1>
      <p className="text-parchment mb-6">Audit every lost and found submission across campus.</p>

      <div className="bg-espresso-800 border border-espresso-700 rounded-2xl p-10 text-center">
        <span className="text-4xl">🗂️</span>
        <h2 className="font-display text-lg text-cream mt-4">Coming soon</h2>
        <p className="text-sm text-parchment mt-2 max-w-sm mx-auto">
          Scaffolded and routed — connect it to <code className="text-bean-300 font-mono">GET /admin/reports</code> with filters
          for category, status, and date range.
        </p>
      </div>
    </div>
  )
}
