import { useState } from 'react'
import LoadingState from './LoadingState'

function isValidHttpUrl(value) {
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

export default function PortfolioModal({
  open,
  isIndexing,
  indexError,
  indexStep,
  onSubmit,
  onClearError,
}) {
  const [url, setUrl] = useState('')
  const [localError, setLocalError] = useState('')

  if (!open) {
    return null
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isIndexing) return

    onClearError?.()
    setLocalError('')

    const trimmed = url.trim()
    if (!trimmed) {
      setLocalError('Please enter a portfolio URL.')
      return
    }

    const normalized = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
    if (!isValidHttpUrl(normalized)) {
      setLocalError('Enter a valid http:// or https:// URL.')
      return
    }

    await onSubmit(normalized)
  }

  const error = localError || indexError

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]"
        aria-hidden="true"
      />

      <div
        className="relative w-full max-w-md animate-fade-up rounded-[1.75rem] border border-white/80 bg-foam/95 p-8 shadow-[0_24px_60px_-28px_rgba(26,46,42,0.35)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="portfolio-modal-title"
      >
        <p className="font-accent mb-1 text-2xl text-leaf">Portfolia ✦</p>
        <h1
          id="portfolio-modal-title"
          className="font-display text-3xl font-semibold leading-tight text-ink"
        >
          Build Your AI Assistant
        </h1>
        <p className="mt-3 text-sm font-medium leading-relaxed text-ink-soft/85">
          Enter your portfolio URL. We&apos;ll crawl it and create a chat assistant
          grounded only in your site.
        </p>
        <p className="mt-3 rounded-xl bg-leaf/5 px-3 py-2 text-xs font-medium leading-relaxed text-ink-soft/75">
          MVP preview — embed on your portfolio coming soon. Try the demo for now!
        </p>

        {isIndexing ? (
          <LoadingState step={indexStep} />
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-soft">
                Portfolio URL
              </span>
              <input
                type="url"
                inputMode="url"
                autoComplete="url"
                placeholder="https://yourportfolio.com"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value)
                  if (localError) setLocalError('')
                  if (indexError) onClearError?.()
                }}
                disabled={isIndexing}
                className="w-full rounded-2xl border-2 border-mist bg-white px-4 py-3.5 text-sm font-medium text-ink outline-none transition placeholder:text-ink-soft/40 focus:border-leaf focus:ring-2 focus:ring-leaf/20 disabled:opacity-60"
              />
            </label>

            {error ? (
              <p className="rounded-lg bg-coral/10 px-3 py-2 text-sm text-coral" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isIndexing}
              className="btn-fun w-full rounded-full bg-leaf px-4 py-3.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              Create Assistant
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
