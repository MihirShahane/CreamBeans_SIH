import { useEffect, useRef, useState } from 'react'

/**
 * A lightweight CSS 3D "carousel" of recent item previews — pure CSS3
 * transforms (no library), auto-rotates and pauses on hover/focus.
 */
export default function HeroShowcase({ items }) {
  const [active, setActive] = useState(0)
  const timer = useRef(null)
  const paused = useRef(false)

  useEffect(() => {
    timer.current = setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % items.length)
    }, 2600)
    return () => clearInterval(timer.current)
  }, [items.length])

  const angleStep = 360 / items.length

  return (
    <div
      className="relative mx-auto w-full max-w-sm aspect-square"
      style={{ perspective: '1200px' }}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
    >
      <div
        className="absolute inset-0 transition-transform duration-[1200ms] ease-in-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${-active * angleStep}deg)`,
        }}
      >
        {items.map((item, i) => {
          const angle = i * angleStep
          const isActive = i === active
          return (
            <div
              key={item.id}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: `rotateY(${angle}deg) translateZ(180px)`,
              }}
            >
              <div
                className={`relative w-44 h-56 rounded-2xl overflow-hidden border transition-all duration-700 ${
                  isActive
                    ? 'border-bean-400/70 shadow-glow scale-100 opacity-100'
                    : 'border-espresso-700 opacity-40 scale-90'
                }`}
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso-950/90 to-transparent p-3">
                  <p className="text-[11px] text-cream truncate">{item.title}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="absolute -bottom-8 inset-x-0 flex justify-center gap-1.5">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Show item ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${i === active ? 'w-6 bg-bean-400' : 'w-1.5 bg-espresso-600'}`}
          />
        ))}
      </div>
    </div>
  )
}
