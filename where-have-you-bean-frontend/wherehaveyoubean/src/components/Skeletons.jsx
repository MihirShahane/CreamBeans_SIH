export function ItemCardSkeleton() {
  return (
    <div className="shrink-0 w-[240px] md:w-[260px] rounded-2xl overflow-hidden border border-espresso-700">
      <div className="skeleton aspect-[4/3]" />
      <div className="p-4 space-y-2 bg-espresso-800">
        <div className="skeleton h-3.5 rounded w-3/4" />
        <div className="skeleton h-3 rounded w-1/2" />
        <div className="skeleton h-3 rounded w-1/3" />
      </div>
    </div>
  )
}

export function MatchCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-espresso-700 flex flex-col sm:flex-row">
      <div className="skeleton sm:w-40 h-40" />
      <div className="flex-1 p-5 bg-espresso-800 space-y-3">
        <div className="skeleton h-3 rounded w-1/4" />
        <div className="skeleton h-4 rounded w-1/2" />
        <div className="skeleton h-3 rounded w-full" />
        <div className="skeleton h-3 rounded w-2/3" />
      </div>
    </div>
  )
}

export function GridSkeleton({ count = 8, Comp = ItemCardSkeleton }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <Comp key={i} />
      ))}
    </div>
  )
}
