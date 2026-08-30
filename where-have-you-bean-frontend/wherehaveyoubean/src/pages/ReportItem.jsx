import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepIndicator from '../components/StepIndicator.jsx'
import { categories } from '../mock/categories.js'

const STEPS = ['Intent', 'Item Details', 'Review']

const emptyForm = {
  category: '',
  description: '',
  location: '',
  date: '',
  time: '',
  name: '',
  email: '',
  phone: '',
}

export default function ReportItem() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [step, setStep] = useState(1)
  const [intent, setIntent] = useState(null) // 'lost' | 'found'
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [imagePreview, setImagePreview] = useState(null)
  const [imageStatus, setImageStatus] = useState('idle') // idle | uploading | success | error
  const [submitting, setSubmitting] = useState(false)
  const [foundSuccess, setFoundSuccess] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleFile = (file) => {
    if (!file) return
    setImageStatus('uploading')
    setImagePreview(URL.createObjectURL(file))
    // MOCK upload — simulates occasional failure so the state is demoable.
    // Future API: POST /uploads (multipart) -> { url }
    setTimeout(() => {
      const fails = Math.random() < 0.12
      setImageStatus(fails ? 'error' : 'success')
    }, 1000)
  }

  const validate = () => {
    const e = {}
    if (!form.category) e.category = 'Choose a category.'
    if (!form.description || form.description.trim().length < 10) e.description = 'Add at least 10 characters describing the item.'
    if (imageStatus !== 'success') e.image = 'Upload a clear photo of the item.'
    if (!form.location) e.location = 'Tell us where this happened.'
    if (!form.date) e.date = 'Select a date.'
    if (!form.time) e.time = 'Select a time.'
    if (!form.name) e.name = 'Enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!/^[+\d][\d\s-]{7,14}$/.test(form.phone)) e.phone = 'Enter a valid phone number.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const goToDetails = (chosenIntent) => {
    setIntent(chosenIntent)
    setStep(2)
  }

  const handleReview = (e) => {
    e.preventDefault()
    if (!validate()) return
    setStep(3)
  }

  const handleFinalSubmit = () => {
    setSubmitting(true)
    // MOCK submission.
    // Future API: POST /items/lost  or  POST /items/found
    setTimeout(() => {
      setSubmitting(false)
      if (intent === 'lost') {
        const report = {
          ...form,
          date: `${form.date}T${form.time}:00`,
          image: imagePreview,
        }
        navigate('/report/matches', { state: { report } })
      } else {
        setFoundSuccess(true)
      }
    }, 1600)
  }

  if (foundSuccess) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <span className="text-5xl">🎉</span>
        <h1 className="font-display text-2xl text-cream mt-4">Thanks for handing it in</h1>
        <p className="text-parchment mt-3">
          Your found-item report is live. We'll notify you the moment someone's lost report matches it.
        </p>
        <div className="flex justify-center gap-3 mt-8">
          <button onClick={() => navigate('/found')} className="text-sm font-medium bg-cream text-espresso-950 hover:bg-bean-300 transition-colors px-5 py-2.5 rounded-full">
            View Found Items
          </button>
          <button onClick={() => navigate('/')} className="text-sm font-medium text-parchment border border-espresso-600 hover:text-cream transition-colors px-5 py-2.5 rounded-full">
            Back Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-5 md:px-8 py-12">
      <h1 className="font-display text-3xl text-cream mb-2">Report an Item</h1>
      <p className="text-parchment mb-8">One flow for lost and found — we'll match it either way.</p>

      <div className="mb-10">
        <StepIndicator steps={STEPS} current={step} />
      </div>

      {step === 1 && (
        <div className="grid sm:grid-cols-2 gap-5">
          <button
            onClick={() => goToDetails('lost')}
            className="group text-left bg-espresso-800 border border-espresso-700 hover:border-bean-500/70 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
          >
            <span className="text-3xl">🔎</span>
            <h3 className="font-display text-xl text-cream mt-4">I lost something</h3>
            <p className="text-sm text-parchment mt-2">We'll search current found reports for a match, ranked by confidence.</p>
            <span className="inline-block mt-5 text-sm text-bean-300 group-hover:translate-x-1 transition-transform">Report lost item →</span>
          </button>
          <button
            onClick={() => goToDetails('found')}
            className="group text-left bg-espresso-800 border border-espresso-700 hover:border-sprout-400/70 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
          >
            <span className="text-3xl">🤝</span>
            <h3 className="font-display text-xl text-cream mt-4">I found something</h3>
            <p className="text-sm text-parchment mt-2">List it so the owner can find and verify it's theirs.</p>
            <span className="inline-block mt-5 text-sm text-sprout-400 group-hover:translate-x-1 transition-transform">Report found item →</span>
          </button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleReview} className="space-y-6" noValidate>
          <div className="flex items-center gap-2 text-sm text-parchment">
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${intent === 'lost' ? 'bg-bean-400/90 text-espresso-950' : 'bg-sprout-500/90 text-espresso-950'}`}>
              {intent === 'lost' ? 'Lost Item' : 'Found Item'}
            </span>
            <button type="button" onClick={() => setStep(1)} className="text-xs text-parchment hover:text-cream underline underline-offset-2">
              change
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Category" error={errors.category}>
              <select
                value={form.category}
                onChange={update('category')}
                className={inputClass(errors.category)}
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </Field>

            <Field label="Location" error={errors.location}>
              <input
                value={form.location}
                onChange={update('location')}
                placeholder="e.g. Central Library, 2nd Floor"
                className={inputClass(errors.location)}
              />
            </Field>

            <Field label="Date" error={errors.date}>
              <input type="date" value={form.date} onChange={update('date')} className={inputClass(errors.date)} />
            </Field>

            <Field label="Time" error={errors.time}>
              <input type="time" value={form.time} onChange={update('time')} className={inputClass(errors.time)} />
            </Field>
          </div>

          <Field label="Description" error={errors.description}>
            <textarea
              value={form.description}
              onChange={update('description')}
              rows={4}
              placeholder="Brand, color, distinguishing marks, contents…"
              className={inputClass(errors.description)}
            />
          </Field>

          <Field label="Photo" error={errors.image}>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0]) }}
              className={`cursor-pointer rounded-xl border border-dashed ${errors.image ? 'border-red-400/60' : 'border-espresso-600'} hover:border-bean-500 transition-colors p-5 flex items-center gap-4`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded-lg" />
              ) : (
                <span className="text-2xl">📷</span>
              )}
              <div className="flex-1">
                {imageStatus === 'uploading' && <p className="text-sm text-parchment">Uploading photo…</p>}
                {imageStatus === 'success' && <p className="text-sm text-sprout-400">Photo uploaded ✓ — click to replace</p>}
                {imageStatus === 'error' && (
                  <div>
                    <p className="text-sm text-red-400">Upload failed. Check your connection and try again.</p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}
                      className="text-xs text-bean-300 underline underline-offset-2 mt-1"
                    >
                      Retry upload
                    </button>
                  </div>
                )}
                {imageStatus === 'idle' && <p className="text-sm text-parchment">Click or drag a photo here</p>}
              </div>
            </div>
          </Field>

          <div className="grid sm:grid-cols-3 gap-5">
            <Field label="Full Name" error={errors.name}>
              <input value={form.name} onChange={update('name')} placeholder="Your name" className={inputClass(errors.name)} />
            </Field>
            <Field label="Email" error={errors.email}>
              <input type="email" value={form.email} onChange={update('email')} placeholder="you@campus.edu" className={inputClass(errors.email)} />
            </Field>
            <Field label="Phone" error={errors.phone}>
              <input value={form.phone} onChange={update('phone')} placeholder="+91 90000 00000" className={inputClass(errors.phone)} />
            </Field>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setStep(1)} className="text-sm font-medium text-parchment border border-espresso-600 hover:text-cream transition-colors px-5 py-2.5 rounded-full">
              Back
            </button>
            <button type="submit" className="text-sm font-medium bg-cream text-espresso-950 hover:bg-bean-300 transition-colors px-6 py-2.5 rounded-full">
              Review report
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div>
          <div className="bg-espresso-800 border border-espresso-700 rounded-2xl p-6 space-y-4">
            <div className="flex gap-4">
              {imagePreview && <img src={imagePreview} alt="" className="w-20 h-20 rounded-xl object-cover" />}
              <div>
                <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${intent === 'lost' ? 'bg-bean-400/90 text-espresso-950' : 'bg-sprout-500/90 text-espresso-950'}`}>
                  {intent === 'lost' ? 'Lost Item' : 'Found Item'}
                </span>
                <h3 className="text-cream font-medium mt-2 capitalize">{form.category.replace('-', ' ')}</h3>
                <p className="text-sm text-parchment mt-1">{form.description}</p>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm border-t border-espresso-700 pt-4">
              <div><dt className="text-parchment/70 text-xs">Location</dt><dd className="text-cream">{form.location}</dd></div>
              <div><dt className="text-parchment/70 text-xs">Date &amp; time</dt><dd className="text-cream">{form.date} · {form.time}</dd></div>
              <div><dt className="text-parchment/70 text-xs">Reported by</dt><dd className="text-cream">{form.name}</dd></div>
              <div><dt className="text-parchment/70 text-xs">Contact</dt><dd className="text-cream">{form.email}</dd></div>
            </dl>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button onClick={() => setStep(2)} className="text-sm font-medium text-parchment border border-espresso-600 hover:text-cream transition-colors px-5 py-2.5 rounded-full">
              Edit
            </button>
            <button
              onClick={handleFinalSubmit}
              disabled={submitting}
              className="text-sm font-medium bg-bean-gradient text-espresso-950 hover:opacity-90 disabled:opacity-60 transition-opacity px-6 py-2.5 rounded-full"
            >
              {submitting ? 'Submitting…' : intent === 'lost' ? 'Submit & find matches' : 'Submit report'}
            </button>
          </div>
        </div>
      )}
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
