import PortfolioModal from './components/PortfolioModal'
import ChatWindow from './components/ChatWindow'
import { usePortfolio } from './hooks/usePortfolio'

export default function App() {
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
        <div className="flex min-h-[100dvh] items-center justify-center px-6">
          <div className="max-w-lg text-center opacity-40">
            <p className="font-display text-4xl text-ink">Portfolia</p>
            <p className="mt-2 text-sm text-ink-soft">
              Your 24/7 portfolio chat assistant
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
