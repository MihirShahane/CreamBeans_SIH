import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const emptyForm = { name: '', email: '', phone: '', password: '', confirm: '' }

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name || form.name.trim().length < 2) e.name = 'Enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid campus email.'
    if (!/^[+\d][\d\s-]{7,14}$/.test(form.phone)) e.phone = 'Enter a valid phone number.'
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters.'
    if (form.confirm !== form.password) e.confirm = 'Passwords do not match.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    const { confirm, ...payload } = form
    await register(payload)
    setLoading(false)
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-md px-5 py-16">
      <h1 className="font-display text-3xl text-cream mb-2">Create your account</h1>
      <p className="text-parchment mb-8">Verified students only — one account per campus email.</p>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <Field label="Full Name" error={errors.name}>
          <input value={form.name} onChange={update('name')} placeholder="Your full name" className={inputClass(errors.name)} />
        </Field>
        <Field label="Campus Email" error={errors.email}>
          <input type="email" value={form.email} onChange={update('email')} placeholder="you@campus.edu" className={inputClass(errors.email)} />
        </Field>
        <Field label="Phone Number" error={errors.phone}>
          <input value={form.phone} onChange={update('phone')} placeholder="+91 90000 00000" className={inputClass(errors.phone)} />
        </Field>
        <Field label="Password" error={errors.password}>
          <input type="password" value={form.password} onChange={update('password')} placeholder="At least 6 characters" className={inputClass(errors.password)} />
        </Field>
        <Field label="Confirm Password" error={errors.confirm}>
          <input type="password" value={form.confirm} onChange={update('confirm')} placeholder="Re-enter password" className={inputClass(errors.confirm)} />
        </Field>

        <button
          type="submit"
          disabled={loading}
          className="w-full text-sm font-medium bg-bean-gradient text-espresso-950 hover:opacity-90 disabled:opacity-60 transition-opacity px-6 py-3 rounded-full"
        >
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="text-sm text-parchment mt-6 text-center">
        Already have an account? <Link to="/login" className="text-bean-300 hover:underline">Log in</Link>
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
