import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid campus email.'
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')
    if (!validate()) return
    setLoading(true)
    try {
      await login(form)
      navigate(from, { replace: true })
    } catch (err) {
      setServerError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-5 py-16">
      <h1 className="font-display text-3xl text-cream mb-2">Welcome back</h1>
      <p className="text-parchment mb-8">Log in with your verified campus account.</p>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <Field label="Campus Email" error={errors.email}>
          <input type="email" value={form.email} onChange={update('email')} placeholder="you@campus.edu" className={inputClass(errors.email)} />
        </Field>
        <Field label="Password" error={errors.password}>
          <input type="password" value={form.password} onChange={update('password')} placeholder="••••••••" className={inputClass(errors.password)} />
        </Field>

        {serverError && <p className="text-sm text-red-400">{serverError}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full text-sm font-medium bg-bean-gradient text-espresso-950 hover:opacity-90 disabled:opacity-60 transition-opacity px-6 py-3 rounded-full"
        >
          {loading ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <p className="text-sm text-parchment mt-6 text-center">
        New here? <Link to="/register" className="text-bean-300 hover:underline">Create an account</Link>
      </p>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="block text-sm text-cream mb-1.5">{label}</span>
      {children}
      {error && <span className="block text-xs text-red-400 mt-1.5">{error}</span>}
    </label>
  )
}

function inputClass(error) {
  return `w-full rounded-xl bg-espresso-900 border ${
    error ? 'border-red-400/60' : 'border-espresso-600'
  } focus:border-bean-500 text-cream text-sm px-4 py-2.5 outline-none transition-colors`
}
