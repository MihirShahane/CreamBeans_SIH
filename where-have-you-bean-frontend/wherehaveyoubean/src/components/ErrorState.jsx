export default function ErrorState({
  title = "Couldn't load this page",
  message = 'The server did not respond. Check your connection and try again.',
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <span className="text-5xl mb-4">⚠️</span>
      <h3 className="font-display text-lg text-cream mb-1.5">{title}</h3>
      <p className="text-sm text-parchment max-w-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 text-sm font-medium bg-cream text-espresso-950 hover:bg-bean-300 transition-colors px-5 py-2.5 rounded-full"
        >
          Try again
        </button>
      )}
    </div>
  )
}
