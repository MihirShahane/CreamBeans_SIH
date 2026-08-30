import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const sections = [
  { to: '/admin/dashboard', label: 'Overview', icon: '📊', end: true },
  { to: '/admin/dashboard/claims', label: 'Claims Review', icon: '🧾' },
  { to: '/admin/dashboard/users', label: 'User Management', icon: '🧑‍🎓' },
  { to: '/admin/dashboard/reports', label: 'Reports', icon: '🗂️' },
  { to: '/admin/dashboard/analytics', label: 'Analytics', icon: '📈' },
]

export default function AdminDashboard() {
  const { admin, adminLogout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-8 grid md:grid-cols-[220px_1fr] gap-8">
      <aside className="md:sticky md:top-24 md:self-start">
        <div className="mb-6">
          <p className="text-xs text-parchment/70 uppercase tracking-wide">Signed in as</p>
          <p className="text-sm text-cream mt-1">{admin?.name || 'Admin'}</p>
        </div>
        <nav className="space-y-1">
          {sections.map((s) => (
            <NavLink
              key={s.to}
              to={s.to}
              end={s.end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 text-sm px-3 py-2.5 rounded-lg transition-colors ${
                  isActive ? 'bg-espresso-800 text-bean-300' : 'text-parchment hover:text-cream hover:bg-espresso-800/60'
                }`
              }
            >
              <span>{s.icon}</span> {s.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={() => { adminLogout(); navigate('/') }}
          className="mt-6 w-full text-left text-sm px-3 py-2.5 rounded-lg text-parchment hover:text-cream hover:bg-espresso-800/60 transition-colors"
        >
          ⏻ Log out
        </button>
      </aside>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
