import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ItemCard from '../components/ItemCard.jsx'
import { GridSkeleton } from '../components/Skeletons.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { lostItems } from '../mock/items.js'
import { categories } from '../mock/categories.js'

export default function LostItems() {
  const [params, setParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const activeCategory = params.get('category') || 'all'

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    return lostItems.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.location.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  const setCategory = (id) => {
    if (id === 'all') {
      params.delete('category')
    } else {
      params.set('category', id)
    }
    setParams(params, { replace: true })
  }

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-cream">Lost Items</h1>
        <p className="text-parchment mt-2">Browse what fellow students have reported missing.</p>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <h2 className="text-xs uppercase tracking-wide text-parchment mb-3">Categories</h2>
          <nav className="space-y-1">
            <button
              onClick={() => setCategory('all')}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                activeCategory === 'all' ? 'bg-espresso-800 text-bean-300' : 'text-parchment hover:text-cream hover:bg-espresso-800/60'
              }`}
            >
              All Items
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                  activeCategory === c.id ? 'bg-espresso-800 text-bean-300' : 'text-parchment hover:text-cream hover:bg-espresso-800/60'
                }`}
              >
                <span>{c.emoji} {c.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <div>
          {/* Search + mobile filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-parchment">🔍</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, location, or description…"
                className="w-full bg-espresso-800 border border-espresso-700 focus:border-bean-500 rounded-full pl-11 pr-4 py-2.5 text-sm text-cream outline-none transition-colors"
              />
            </div>
            <select
              value={activeCategory}
              onChange={(e) => setCategory(e.target.value)}
              className="lg:hidden bg-espresso-800 border border-espresso-700 rounded-full px-4 py-2.5 text-sm text-cream outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <GridSkeleton count={8} />
          ) : filtered.length === 0 ? (
            <EmptyState
              title="No lost items match your search"
              message="Try a different keyword or clear your category filter."
              action={
                <button
                  onClick={() => { setQuery(''); setCategory('all') }}
                  className="text-sm font-medium bg-cream text-espresso-950 hover:bg-bean-300 transition-colors px-5 py-2.5 rounded-full"
                >
                  Clear filters
                </button>
              }
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((item) => (
                <ItemCard key={item.id} item={item} type="lost" className="w-full" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
