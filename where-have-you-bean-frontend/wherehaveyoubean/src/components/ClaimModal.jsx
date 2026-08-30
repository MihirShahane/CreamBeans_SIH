import { useState } from 'react'

export default function ClaimModal({ item, onClose }) {
  const [answer, setAnswer] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!answer.trim()) return
    setStatus('submitting')
    // MOCK submission — future API: POST /claims { itemId, answer }
    setTimeout(() => {
      setStatus('success')
    }, 1100)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-espresso-950/80 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="claim-modal-title"
    >
      <div className="w-full max-w-md bg-espresso-800 border border-espresso-600 rounded-2xl p-6 animate-fadeUp">
        {status === 'success' ? (
          <div className="text-center py-4">
            <span className="text-4xl">✅</span>
            <h3 id="claim-modal-title" className="font-display text-lg text-cream mt-3">Claim submitted</h3>
            <p className="text-sm text-parchment mt-2">
              {item.finder.name} will review your answer and reach out at your registered email to arrange pickup.
            </p>
            <button
              onClick={onClose}
              className="mt-6 text-sm font-medium bg-cream text-espresso-950 hover:bg-bean-300 transition-colors px-5 py-2.5 rounded-full"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 id="claim-modal-title" className="font-display text-lg text-cream">Verify ownership</h3>
                <p className="text-sm text-parchment mt-1">Claiming: {item.title}</p>
              </div>
              <button type="button" onClick={onClose} aria-label="Close" className="text-parchment hover:text-cream">✕</button>
            </div>

            <label className="block text-sm text-cream mb-2" htmlFor="claim-answer">
              {item.claimQuestion}
            </label>
            <textarea
              id="claim-answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={3}
              required
              placeholder="Type your answer…"
              className="w-full rounded-xl bg-espresso-900 border border-espresso-600 focus:border-bean-500 text-cream text-sm px-4 py-3 outline-none transition-colors"
            />
            <p className="text-xs text-parchment/70 mt-2">
              This answer is reviewed by the finder to confirm ownership before contact details are exchanged.
            </p>

            {status === 'error' && (
              <p className="text-xs text-red-400 mt-2">Something went wrong. Please try again.</p>
            )}

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 text-sm font-medium text-parchment border border-espresso-600 hover:border-bean-500 hover:text-cream transition-colors px-4 py-2.5 rounded-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="flex-1 text-sm font-medium bg-cream text-espresso-950 hover:bg-bean-300 disabled:opacity-60 transition-colors px-4 py-2.5 rounded-full"
              >
                {status === 'submitting' ? 'Submitting…' : 'Submit claim'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
