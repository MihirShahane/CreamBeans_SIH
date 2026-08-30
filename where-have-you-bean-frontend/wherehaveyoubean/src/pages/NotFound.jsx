import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-5 py-28 text-center">
      <span className="text-5xl">🫘</span>
      <h1 className="font-display text-3xl text-cream mt-4">Page not found</h1>
      <p className="text-parchment mt-3">
        Looks like this page wandered off campus. Let's get you back on track.
      </p>
      <Link
        to="/"
        className="inline-block mt-8 text-sm font-medium bg-cream text-espresso-950 hover:bg-bean-300 transition-colors px-6 py-3 rounded-full"
      >
        Back to home
      </Link>
    </div>
  )
}
