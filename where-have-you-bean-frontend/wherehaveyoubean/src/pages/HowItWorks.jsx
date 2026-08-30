import { Link } from 'react-router-dom'

const steps = [
  {
    n: '01',
    title: 'Report what happened',
    body: 'Tell us whether you lost or found something, then share a category, description, photo, location, and date/time.',
  },
  {
    n: '02',
    title: 'Smart matching runs',
    body: 'Our matching engine compares your report against the opposite list — lost reports against found items, and back — to surface likely matches.',
  },
  {
    n: '03',
    title: 'Review your matches',
    body: 'Potential matches appear ranked by match score, with the finder or reporter\'s details and where the item was seen.',
  },
  {
    n: '04',
    title: 'Verify and reconnect',
    body: 'Claiming a found item requires answering an ownership question — reviewed before contact details are exchanged.',
  },
]

export default function HowItWorks() {
  return (
    <div className="mx-auto max-w-5xl px-5 md:px-8 py-16">
      <span className="text-xs font-mono uppercase tracking-widest text-bean-400">The process</span>
      <h1 className="font-display text-3xl md:text-4xl text-cream mt-3 max-w-2xl">
        From "I lost it" to "I found it" — in four steps.
      </h1>
      <p className="text-parchment mt-4 max-w-xl">
        The same flow works whether you're reporting something lost or handing in
        something you found — the platform figures out the matching for you.
      </p>

      <ol className="mt-14 space-y-10">
        {steps.map((s, i) => (
          <li key={s.n} className="flex gap-6 md:gap-10">
            <span className="font-mono text-2xl md:text-3xl text-bean-500/70 shrink-0 w-14">{s.n}</span>
            <div className="border-l border-espresso-700 pl-6 md:pl-10 pb-2">
              <h3 className="font-display text-xl text-cream">{s.title}</h3>
              <p className="text-sm md:text-base text-parchment mt-2 max-w-lg">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-14 flex flex-wrap gap-4">
        <Link to="/report" className="text-sm font-medium bg-bean-gradient text-espresso-950 hover:opacity-90 transition-opacity px-6 py-3 rounded-full">
          Report an item
        </Link>
        <Link to="/lost" className="text-sm font-medium text-parchment border border-espresso-600 hover:border-bean-500 hover:text-cream transition-colors px-6 py-3 rounded-full">
          Browse lost items
        </Link>
      </div>
    </div>
  )
}
