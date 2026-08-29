const STEPS = [
  'Crawling portfolio...',
  'Extracting information...',
  'Creating embeddings...',
  'Building knowledge base...',
]

export default function LoadingState({ step = 0 }) {
  const active = Math.min(Math.max(step, 0), STEPS.length - 1)

  return (
    <div className="mt-6 space-y-4 animate-fade-up" role="status" aria-live="polite">
      <div className="flex items-center gap-3">
        <span
          className="inline-flex h-5 w-5 shrink-0 animate-spin-slow rounded-full border-2 border-mist border-t-leaf"
          aria-hidden="true"
        />
        <p className="text-sm font-medium text-ink">Creating your AI assistant...</p>
      </div>

      <ul className="space-y-2 pl-1">
        {STEPS.map((label, index) => {
          const done = index < active
          const current = index === active
          return (
            <li
              key={label}
              className={`text-sm transition-colors ${
                current
                  ? 'font-medium text-leaf-deep'
                  : done
                    ? 'text-ink-soft/70'
                    : 'text-ink-soft/40'
              }`}
            >
              {done ? '✓ ' : current ? '→ ' : '  '}
              {label}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
