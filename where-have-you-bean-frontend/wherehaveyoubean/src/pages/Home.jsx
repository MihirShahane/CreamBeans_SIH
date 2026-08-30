import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Rail from '../components/Rail.jsx'
import ItemCard from '../components/ItemCard.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import StatCard from '../components/StatCard.jsx'
import HeroShowcase from '../components/HeroShowcase.jsx'
import { lostItems, foundItems } from '../mock/items.js'
import { categories } from '../mock/categories.js'
import { platformStats } from '../mock/stats.js'

export default function Home() {
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setStatsVisible(true),
      { threshold: 0.4 }
    )
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  const showcaseItems = [...foundItems.slice(0, 3), ...lostItems.slice(0, 3)]

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-espresso-700">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(224,168,91,0.10),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-14 items-center relative">
          <div className="animate-fadeUp">
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-bean-400 mb-4">
              Campus-verified · Smart matching
            </span>
            <h1 className="font-display text-4xl sm:text-5xl leading-[1.08] text-cream">
              Where Have You <span className="text-bean-300">Bean?</span>
            </h1>
            <p className="text-parchment text-base md:text-lg mt-5 max-w-lg">
              Lost something on campus? Find it faster through verified student
              reporting, smart matching, and secure ownership verification.
            </p>
            <div className="flex flex-wrap items-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-sm text-parchment">
                <span className="text-sprout-400">●</span> Verified student accounts
              </div>
              <div className="flex items-center gap-2 text-sm text-parchment">
                <span className="text-sprout-400">●</span> Campus-only network
              </div>
              <div className="flex items-center gap-2 text-sm text-parchment">
                <span className="text-sprout-400">●</span> Admin-moderated listings
              </div>
            </div>
          </div>

          <HeroShowcase items={showcaseItems} />
        </div>
      </section>

      <Rail title="Recently Found" subtitle="Items handed in by students across campus">
        {foundItems.map((item) => (
          <ItemCard key={item.id} item={item} type="found" />
        ))}
      </Rail>

      <Rail title="Recently Lost" subtitle="Help a fellow student find their way back to their things">
        {lostItems.map((item) => (
          <ItemCard key={item.id} item={item} type="lost" />
        ))}
      </Rail>

      {/* CATEGORIES */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="text-xl md:text-2xl font-display text-cream mb-1">Popular Categories</h2>
          <p className="text-sm text-parchment mb-5">Jump straight to what you're missing</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="py-14">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="text-xl md:text-2xl font-display text-cream mb-1">Platform Statistics</h2>
          <p className="text-sm text-parchment mb-6">A growing, trusted network — one campus at a time</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {platformStats.map((s) => (
              <StatCard key={s.id} stat={s} active={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-16 border-t border-espresso-700">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid md:grid-cols-3 gap-8">
          <div>
            <span className="text-2xl">🪪</span>
            <h3 className="font-display text-lg text-cream mt-3">Verified student accounts</h3>
            <p className="text-sm text-parchment mt-2">
              Every report ties back to a real, verified campus identity — no anonymous noise.
            </p>
          </div>
          <div>
            <span className="text-2xl">🏫</span>
            <h3 className="font-display text-lg text-cream mt-3">Campus-only exclusivity</h3>
            <p className="text-sm text-parchment mt-2">
              Listings stay within your campus community, so matches are relevant and pickup is easy.
            </p>
          </div>
          <div>
            <span className="text-2xl">🛡️</span>
            <h3 className="font-display text-lg text-cream mt-3">Admin moderation</h3>
            <p className="text-sm text-parchment mt-2">
              Claims are reviewed and disputes resolved by campus administrators, not left to chance.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-5 md:px-8 mt-10">
          <Link
            to="/report"
            className="inline-block text-sm font-medium bg-bean-gradient text-espresso-950 hover:opacity-90 transition-opacity px-6 py-3 rounded-full"
          >
            Report an item →
          </Link>
        </div>
      </section>
    </div>
  )
}
