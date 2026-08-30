import ScoreRing from './ScoreRing.jsx'

const dateFmt = (iso) =>
  new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })

export default function MatchCard({ match, rank }) {
  const { item, final_score } = match
  const pct = Math.round(final_score * 100)

  return (
    <div className="relative bg-espresso-800 border border-espresso-700 rounded-2xl overflow-hidden hover:border-bean-500/50 transition-all duration-300 animate-fadeUp">
      {rank === 1 && (
        <div className="absolute top-0 left-0 right-0 bg-bean-gradient text-espresso-950 text-[11px] font-semibold uppercase tracking-wide text-center py-1.5 z-10">
          Best Match
        </div>
      )}
      <div className={`flex flex-col sm:flex-row ${rank === 1 ? 'pt-7' : ''}`}>
        <div className="sm:w-40 h-40 sm:h-auto shrink-0 bg-espresso-700">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 p-5 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="min-w-0">
            <span className="inline-block text-[10px] uppercase tracking-wide text-sprout-400 font-semibold mb-1">
              {item.category.replace('-', ' ')}
            </span>
            <h3 className="font-medium text-cream">{item.title}</h3>
            <p className="text-sm text-parchment mt-1 line-clamp-2">{item.description}</p>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-parchment/90">
              <span>📍 {item.location}</span>
              <span className="font-mono">🕒 {dateFmt(item.date)}</span>
              <span>👤 {item.finder.name}</span>
              <span className="truncate">✉️ {item.finder.email}</span>
              <span>📞 {item.finder.phone}</span>
            </div>
          </div>
          <div className="flex sm:flex-col items-center justify-between sm:justify-start gap-3 shrink-0">
            <ScoreRing score={final_score} />
            <button className="text-xs font-medium bg-cream text-espresso-950 hover:bg-bean-300 transition-colors px-3 py-2 rounded-full whitespace-nowrap">
              Contact Finder
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
