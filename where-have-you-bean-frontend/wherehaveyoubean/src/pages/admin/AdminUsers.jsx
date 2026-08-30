export default function AdminUsers() {
  return (
    <div>
      <h1 className="font-display text-2xl text-cream mb-1">User Management</h1>
      <p className="text-parchment mb-6">Verify, suspend, or review campus student accounts.</p>

      <div className="bg-espresso-800 border border-espresso-700 rounded-2xl p-10 text-center">
        <span className="text-4xl">🧑‍🎓</span>
        <h2 className="font-display text-lg text-cream mt-4">Coming soon</h2>
        <p className="text-sm text-parchment mt-2 max-w-sm mx-auto">
          This panel is scaffolded and routed — connect it to <code className="text-bean-300 font-mono">GET /admin/users</code> to
          list accounts and <code className="text-bean-300 font-mono">PATCH /admin/users/:id</code> to update status.
        </p>
      </div>
    </div>
  )
}
