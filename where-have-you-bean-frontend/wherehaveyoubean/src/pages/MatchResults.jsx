import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import MatchCard from '../components/MatchCard.jsx'
import { MatchCardSkeleton } from '../components/Skeletons.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ErrorState from '../components/ErrorState.jsx'
import { generateMatches } from '../mock/matches.js'
import { lostItems } from '../mock/items.js'

const FALLBACK_REPORT = {
  ...lostItems[0],
  location: lostItems[0].location,
}

const PROCESSING_STEPS = [
  'Reading your report…',
  'Scanning verified found reports…',
  'Comparing category, location, and timing…',
  'Ranking potential matches…',
]

export default function MatchResults() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const report = state?.report || FALLBACK_REPORT

  const [phase, setPhase] = useState('processing') // processing | done | error
  const [processingIdx, setProcessingIdx] = useState(0)
  const [matches, setMatches] = useState([])

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setProcessingIdx((i) => Math.min(i + 1, PROCESSING_STEPS.length - 1))
    }, 500)

    const doneTimer = setTimeout(() => {
      clearInterval(stepTimer)
      try {
        const results = generateMatches(report)
        setMatches(results)
        setPhase('done')
      } catch {
        setPhase('error')
      }
    }, 2200)

    return () => {
      clearInterval(stepTimer)
      clearTimeout(doneTimer)
    }
  }, [report])

  if (phase === 'error') {
    return (
      <ErrorState
        title="Matching service unavailable"
        message="We couldn't reach the matching engine. Your report has been saved — try refreshing to search again."
        onRetry={() => window.location.reload()}
      />
    )
  }

  if (phase === 'processing') {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-espresso-700" />
          <div className="absolute inset-0 rounded-full border-4 border-bean-400 border-t-transparent animate-spin" />
          <span className="absolute inset-0 flex items-center justify-center text-2xl">🫘</span>
        </div>
        <h1 className="font-display text-2xl text-cream">AI Matching in progress</h1>
        <p className="text-parchment mt-3 font-mono text-sm">{PROCESSING_STEPS[processingIdx]}</p>

        <div className="mt-10 space-y-3 text-left">
          <MatchCardSkeleton />
          <MatchCardSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-5 md:px-8 py-12">
      <div className="mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-bean-400">Golden path · Lost report submitted</span>
        <h1 className="font-display text-3xl text-cream mt-2">Potential Matches</h1>
        <p className="text-parchment mt-2">
          For your <span className="text-cream">{report.category?.replace('-', ' ')}</span> report near{' '}
          <span className="text-cream">{report.location}</span> — ranked by match confidence.
        </p>
      </div>

      {matches.length === 0 ? (
        <EmptyState
          title="No matches yet"
          message="We'll keep watching new found reports and notify you the moment something matches."
          action={
            <Link to="/found" className="text-sm font-medium bg-cream text-espresso-950 hover:bg-bean-300 transition-colors px-5 py-2.5 rounded-full">
              Browse found items manually
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {matches.map((m, i) => (
            <MatchCard key={m.item.id} match={m} rank={i + 1} />
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-3 mt-10">
        <button onClick={() => navigate('/report')} className="text-sm font-medium text-parchment border border-espresso-600 hover:text-cream transition-colors px-5 py-2.5 rounded-full">
          Report another item
        </button>
        <Link to="/" className="text-sm font-medium text-parchment border border-espresso-600 hover:text-cream transition-colors px-5 py-2.5 rounded-full">
          Back to home
        </Link>
      </div>
    </div>
  )
}
