import { Link } from 'react-router-dom'

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/lost?category=${category.id}`}
      className="group relative bg-espresso-800 border border-espresso-700 hover:border-bean-500/60 rounded-2xl p-5 flex flex-col items-start gap-3 transition-all duration-300 hover:-translate-y-1"
    >
      <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{category.emoji}</span>
      <div>
        <h3 className="font-medium text-cream text-sm">{category.label}</h3>
        <p className="text-xs text-parchment mt-0.5 font-mono">{category.count} items</p>
      </div>
    </Link>
  )
}
