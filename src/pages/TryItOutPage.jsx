import { Link } from 'react-router-dom'
import PortfolioModal from '../components/PortfolioModal'
import ChatWindow from '../components/ChatWindow'
import { usePortfolio } from '../hooks/usePortfolio'

export default function TryItOutPage() {
  const {
    uuid,
    isIndexing,
    indexError,
    indexStep,
    createAssistant,
    clearPortfolio,
    setIndexError,
  } = usePortfolio()

  const showModal = !uuid

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
        <ChatWindow uuid={uuid} onReset={clearPortfolio} />
      ) : (
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
              <span className="inline-block text-4xl animate-float">🚀</span>
              <p className="mt-4 font-display text-3xl font-semibold text-ink">
                Try it out
              </p>
              <p className="mt-4 text-base font-medium leading-relaxed text-ink-soft">
                Enter your portfolio URL in the modal to create an AI assistant
                grounded in your site content.
              </p>
              <p className="mt-3 rounded-2xl border border-mist bg-white/70 px-4 py-3 text-sm font-medium text-ink-soft/80">
                🧪 MVP preview — integration into your own site is coming soon.
                For now, just try it out!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
