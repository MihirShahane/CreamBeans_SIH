import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-espresso-700 mt-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🫘</span>
            <span className="font-display text-cream">Where Have You Bean?</span>
          </div>
          <p className="text-sm text-parchment max-w-xs">
            A verified, campus-only lost &amp; found network with smart matching —
            built for Smart India Hackathon 2026.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-wide text-parchment mb-3">Browse</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/lost" className="text-cream/80 hover:text-bean-300 transition-colors">Lost Items</Link></li>
            <li><Link to="/found" className="text-cream/80 hover:text-bean-300 transition-colors">Found Items</Link></li>
            <li><Link to="/report" className="text-cream/80 hover:text-bean-300 transition-colors">Report Item</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-wide text-parchment mb-3">Account</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="text-cream/80 hover:text-bean-300 transition-colors">Log In</Link></li>
            <li><Link to="/register" className="text-cream/80 hover:text-bean-300 transition-colors">Register</Link></li>
            <li><Link to="/admin/login" className="text-cream/80 hover:text-bean-300 transition-colors">Admin</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-espresso-700 py-5 text-center text-xs text-parchment/70">
        Built for campus communities · Verified students only · SIH 2026
      </div>
    </footer>
  )
}
