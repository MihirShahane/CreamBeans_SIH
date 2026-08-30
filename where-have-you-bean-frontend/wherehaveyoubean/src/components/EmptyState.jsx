export default function EmptyState({
  icon = '🫘',
  title = 'Nothing here yet',
  message = 'Try adjusting your filters or check back soon.',
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <span className="text-5xl mb-4 opacity-80">{icon}</span>
      <h3 className="font-display text-lg text-cream mb-1.5">{title}</h3>
      <p className="text-sm text-parchment max-w-sm">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
