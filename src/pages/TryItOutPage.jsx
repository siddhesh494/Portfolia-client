import { Link } from 'react-router-dom'
import PortfolioModal from '../components/PortfolioModal'
import ChatWindow from '../components/ChatWindow'
import { usePortfolio } from '../hooks/usePortfolio'

function StatusScreen({ emoji, title, children, actionLabel, onAction }) {
  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-hidden">
      <div className="pointer-events-none absolute -right-16 top-20 h-64 w-64 animate-float-slow blob bg-leaf/10 blur-2xl" />
      <div className="pointer-events-none absolute -left-20 bottom-32 h-56 w-56 animate-drift blob bg-sand/30 blur-2xl" />

      <header className="animate-slide-down relative flex items-center justify-between border-b border-mist/60 bg-foam/80 px-4 py-4 backdrop-blur-md sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-leaf text-sm font-bold text-white shadow-sm transition group-hover:rotate-6">
            ✦
          </span>
          <span className="font-display text-lg font-semibold text-ink transition group-hover:text-leaf-deep">
            Portfolia
          </span>
        </Link>
        <Link
          to="/"
          className="rounded-full px-3 py-1.5 text-sm font-bold text-ink-soft transition hover:bg-white/80 hover:text-leaf-deep"
        >
          ← Home
        </Link>
      </header>

      <div className="relative flex flex-1 items-center justify-center px-6">
        <div className="max-w-md animate-fade-up text-center">
          <span className="inline-block text-4xl animate-float">{emoji}</span>
          <p className="mt-4 font-display text-3xl font-semibold text-ink">
            {title}
          </p>
          <div className="mt-4 text-base font-medium leading-relaxed text-ink-soft">
            {children}
          </div>
          {actionLabel && onAction ? (
            <button
              type="button"
              onClick={onAction}
              className="btn-fun mt-8 inline-flex items-center rounded-full bg-leaf px-6 py-3 text-sm font-bold text-white shadow-md shadow-leaf/25"
            >
              {actionLabel}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default function TryItOutPage() {
  const {
    uuid,
    isInvalidLink,
    isChecking,
    isExpired,
    isIndexing,
    indexError,
    indexStep,
    createAssistant,
    clearPortfolio,
    markExpired,
    setIndexError,
  } = usePortfolio()

  const showModal = !uuid && !isInvalidLink

  if (isInvalidLink) {
    return (
      <StatusScreen
        emoji="🔗"
        title="This link isn’t valid"
        actionLabel="Create a new assistant"
        onAction={clearPortfolio}
      >
        <p>
          The URL should look like <span className="font-semibold text-ink">/try/your-assistant-id</span>.
          Check the link you received, or upload a document to start a new chat.
        </p>
      </StatusScreen>
    )
  }

  if (uuid && isChecking) {
    return (
      <StatusScreen emoji="⏳" title="Opening assistant">
        <p>Checking that this business assistant is still available…</p>
      </StatusScreen>
    )
  }

  if (uuid && isExpired) {
    return (
      <StatusScreen
        emoji="🌙"
        title="This assistant has expired"
        actionLabel="Upload a new document"
        onAction={clearPortfolio}
      >
        <p>
          This business chat is no longer available. It may have been removed
          overnight, or the link is no longer active.
        </p>
        <p className="mt-3 rounded-2xl border border-mist bg-white/70 px-4 py-3 text-sm font-medium text-ink-soft/80">
          Upload a document again to create a fresh assistant you can share.
        </p>
      </StatusScreen>
    )
  }

  if (uuid && indexError) {
    return (
      <StatusScreen
        emoji="⚠️"
        title="Couldn’t open this assistant"
        actionLabel="Try a new upload"
        onAction={clearPortfolio}
      >
        <p>{indexError}</p>
      </StatusScreen>
    )
  }

  return (
    <div className="min-h-[100dvh]">
      <PortfolioModal
        open={showModal}
        isIndexing={isIndexing}
        indexError={indexError}
        indexStep={indexStep}
        onSubmit={createAssistant}
        onClearError={() => setIndexError('')}
      />

      {uuid ? (
        <ChatWindow uuid={uuid} onReset={clearPortfolio} onExpired={markExpired} />
      ) : (
        <StatusScreen emoji="🚀" title="Try it out">
          <p>
            Upload a .txt, .doc, or .docx file with your services, packages, or
            FAQs to create an AI assistant for your business.
          </p>
          <p className="mt-3 rounded-2xl border border-mist bg-white/70 px-4 py-3 text-sm font-medium text-ink-soft/80">
            🧪 MVP preview — after upload, the URL will include a shareable
            assistant ID you can send to others.
          </p>
        </StatusScreen>
      )}
    </div>
  )
}
