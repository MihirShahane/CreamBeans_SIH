import { Link } from 'react-router-dom'

const dateFmt = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

export default function ItemCard({ item, type = 'lost', className = '' }) {
  const locationLabel = type === 'found' ? 'Found at' : 'Lost at'
  const Wrapper = type === 'found' ? Link : 'div'
  const wrapperProps = type === 'found' ? { to: `/found/${item.id}` } : {}

  return (
    <Wrapper
      {...wrapperProps}
      className={`group shrink-0 w-[240px] md:w-[260px] bg-espresso-800 rounded-2xl overflow-hidden border border-espresso-700 hover:border-bean-500/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-espresso-700">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-transparent" />
        <span className={`absolute top-2.5 left-2.5 text-[10px] uppercase tracking-wide font-semibold px-2 py-1 rounded-full ${
          type === 'found' ? 'bg-sprout-500/90 text-espresso-950' : 'bg-bean-400/90 text-espresso-950'
        }`}>
          {type === 'found' ? 'Found' : 'Lost'}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-cream text-sm truncate">{item.title}</h3>
        <p className="text-xs text-parchment mt-1 truncate">{locationLabel} {item.location}</p>
        <p className="text-xs text-parchment/70 mt-0.5 font-mono">{dateFmt(item.date)}</p>
      </div>
    </Wrapper>
  )
}
