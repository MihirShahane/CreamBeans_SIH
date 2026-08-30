import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function AdminLogin() {
  const { adminLogin } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await adminLogin(form)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <div className="text-center mb-8">
        <span className="text-3xl">🛡️</span>
        <h1 className="font-display text-2xl text-cream mt-3">Admin Access</h1>
        <p className="text-parchment mt-2 text-sm">Restricted to campus lost &amp; found moderators.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-espresso-800 border border-espresso-700 rounded-2xl p-6" noValidate>
        <label className="block">
          <span className="block text-sm text-cream mb-1.5">Admin Email</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={update('email')}
            placeholder="admin@campus.edu"
            className="w-full rounded-xl bg-espresso-900 border border-espresso-600 focus:border-bean-500 text-cream text-sm px-4 py-2.5 outline-none transition-colors"
          />
        </label>
        <label className="block">
          <span className="block text-sm text-cream mb-1.5">Password</span>
          <input
            type="password"
            required
            value={form.password}
            onChange={update('password')}
            placeholder="••••••••"
            className="w-full rounded-xl bg-espresso-900 border border-espresso-600 focus:border-bean-500 text-cream text-sm px-4 py-2.5 outline-none transition-colors"
          />
        </label>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full text-sm font-medium bg-cream text-espresso-950 hover:bg-bean-300 disabled:opacity-60 transition-colors px-6 py-3 rounded-full"
        >
          {loading ? 'Verifying…' : 'Access Admin Panel'}
        </button>
      </form>
    </div>
  )
}
