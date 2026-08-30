import { useRef } from 'react'

export default function Rail({ title, subtitle, children, viewAllTo }) {
  const scrollerRef = useRef(null)

  const scrollBy = (dir) => {
    scrollerRef.current?.scrollBy({ left: dir * 560, behavior: 'smooth' })
  }

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-5 md:px-8 flex items-end justify-between mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-display text-cream">{title}</h2>
          {subtitle && <p className="text-sm text-parchment mt-1">{subtitle}</p>}
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="w-9 h-9 rounded-full border border-espresso-600 flex items-center justify-center text-parchment hover:text-cream hover:border-bean-500 transition-colors"
          >
            ‹
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="w-9 h-9 rounded-full border border-espresso-600 flex items-center justify-center text-parchment hover:text-cream hover:border-bean-500 transition-colors"
          >
            ›
          </button>
        </div>
      </div>
      <div ref={scrollerRef} className="rail px-5 md:px-8">
        {children}
      </div>
    </section>
  )
}
