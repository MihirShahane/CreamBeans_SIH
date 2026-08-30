import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getFoundItemById } from '../mock/items.js'
import ClaimModal from '../components/ClaimModal.jsx'
import ErrorState from '../components/ErrorState.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const dateFmt = (iso) =>
  new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })

export default function FoundItemDetail() {
  const { id } = useParams()
  const item = getFoundItemById(id)
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showClaim, setShowClaim] = useState(false)

  if (!item) {
    return (
      <ErrorState
        title="We couldn't find that item"
        message="It may have already been claimed or the link is incorrect."
      />
    )
  }

  const handleClaimClick = () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: `/found/${id}` } } })
      return
    }
    setShowClaim(true)
  }

  return (
    <div className="mx-auto max-w-5xl px-5 md:px-8 py-10">
      <Link to="/found" className="text-sm text-parchment hover:text-cream transition-colors">← Back to Found Items</Link>

      <div className="grid md:grid-cols-2 gap-10 mt-6">
        <div className="rounded-2xl overflow-hidden border border-espresso-700 aspect-[4/3]">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        </div>

        <div>
          <span className="inline-block text-[11px] uppercase tracking-wide text-sprout-400 font-semibold mb-2">
            {item.category.replace('-', ' ')} · Found
          </span>
          <h1 className="font-display text-3xl text-cream">{item.title}</h1>
          <p className="text-parchment mt-3">{item.description}</p>

          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-parchment/70 text-xs uppercase tracking-wide">Location</dt>
              <dd className="text-cream mt-1">{item.location}</dd>
            </div>
            <div>
              <dt className="text-parchment/70 text-xs uppercase tracking-wide">Date &amp; Time</dt>
              <dd className="text-cream mt-1 font-mono">{dateFmt(item.date)}</dd>
            </div>
            <div>
              <dt className="text-parchment/70 text-xs uppercase tracking-wide">Found by</dt>
              <dd className="text-cream mt-1">{item.finder.name}</dd>
            </div>
            <div>
              <dt className="text-parchment/70 text-xs uppercase tracking-wide">Status</dt>
              <dd className="text-sprout-400 mt-1 capitalize">{item.status}</dd>
            </div>
          </dl>

          <button
            onClick={handleClaimClick}
            className="mt-8 w-full sm:w-auto text-sm font-medium bg-bean-gradient text-espresso-950 hover:opacity-90 transition-opacity px-8 py-3.5 rounded-full shadow-glow"
          >
            Claim This Item
          </button>
          {!user && (
            <p className="text-xs text-parchment/70 mt-3">You'll need to log in first to submit a claim.</p>
          )}
        </div>
      </div>

      {showClaim && <ClaimModal item={item} onClose={() => setShowClaim(false)} />}
    </div>
  )
}
