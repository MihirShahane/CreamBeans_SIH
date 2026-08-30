import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

const links = [
  { to: '/lost', label: 'Lost Items' },
  { to: '/found', label: 'Found Items' },
  { to: '/report', label: 'Report Item' },
  { to: '/how-it-works', label: 'How It Works' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 bg-espresso-950/90 backdrop-blur border-b border-espresso-700">
      <nav className="mx-auto max-w-7xl px-5 md:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10 md:gap-16">
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <span className="text-2xl">🫘</span>
            <span className="font-display text-lg tracking-tight text-cream group-hover:text-bean-300 transition-colors">
              Where Have You Bean?
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `relative text-sm font-medium py-2 transition-colors ${
                      isActive ? 'text-bean-300' : 'text-parchment hover:text-cream'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {l.label}
                      <span
                        className={`absolute left-0 -bottom-0.5 h-0.5 bg-bean-400 rounded-full transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-parchment">Hi, {user.name.split(' ')[0]}</span>
              <button
                onClick={() => { logout(); navigate('/') }}
                className="text-sm font-medium text-parchment hover:text-cream transition-colors px-3 py-2"
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm font-medium text-espresso-950 bg-cream hover:bg-bean-300 transition-colors px-4 py-2 rounded-full"
            >
              Log in
            </Link>
          )}
          <Link
            to="/admin/login"
            className="text-sm font-medium text-parchment hover:text-cream border border-espresso-600 hover:border-bean-500 transition-colors px-4 py-2 rounded-full"
          >
            Admin
          </Link>
        </div>

        <button
          className="lg:hidden text-cream p-2"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-espresso-700 bg-espresso-950 px-5 py-4 space-y-1 animate-fadeUp">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-2.5 text-sm font-medium ${isActive ? 'text-bean-300' : 'text-parchment'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="flex gap-3 pt-3">
            <Link to="/login" onClick={() => setOpen(false)} className="flex-1 text-center text-sm font-medium text-espresso-950 bg-cream px-4 py-2.5 rounded-full">
              Log in
            </Link>
            <Link to="/admin/login" onClick={() => setOpen(false)} className="flex-1 text-center text-sm font-medium text-parchment border border-espresso-600 px-4 py-2.5 rounded-full">
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
