/**
 * ScoreRing — the product's signature visual: a match score rendered as a
 * cross-section "roast ring", echoing the bean pun in the product name and
 * giving the AI-matching moment (the SIH golden path) a mark judges will
 * remember.
 */
export default function ScoreRing({ score, size = 84 }) {
  const pct = Math.round(score * 100)
  const radius = (size - 10) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - score)

  const tier =
    pct >= 85 ? { label: 'Strong match', ring: '#E0A85B' } :
    pct >= 65 ? { label: 'Likely match', ring: '#C9A06E' } :
    { label: 'Possible match', ring: '#8A7A63' }

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2A211C"
          strokeWidth="7"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={tier.ring}
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={pct >= 85 ? 'animate-pulseRing' : ''}
          style={{ filter: pct >= 85 ? 'drop-shadow(0 0 6px rgba(224,168,91,0.85))' : 'none' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-mono text-lg font-semibold text-cream leading-none">{pct}%</span>
        <span className="text-[10px] uppercase tracking-wide text-parchment mt-0.5">Match</span>
      </div>
    </div>
  )
}
