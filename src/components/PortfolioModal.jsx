import { useRef, useState } from 'react'
import LoadingState from './LoadingState'

const ALLOWED_EXTENSIONS = ['.txt', '.doc', '.docx']
const MAX_FILE_SIZE_MB = 5

function getExtension(filename) {
  const match = filename.toLowerCase().match(/\.[^.]+$/)
  return match ? match[0] : ''
}

function formatBytes(size) {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

export default function PortfolioModal({
  open,
  isIndexing,
  indexError,
  indexStep,
  onSubmit,
  onClearError,
}) {
  const [file, setFile] = useState(null)
  const [localError, setLocalError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef(null)

  if (!open) {
    return null
  }

  const validateAndSetFile = (nextFile) => {
    if (!nextFile) return

    const extension = getExtension(nextFile.name)
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      setLocalError('Please upload a .txt, .doc, or .docx file.')
      setFile(null)
      return
    }

    if (nextFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setLocalError(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB} MB.`)
      setFile(null)
      return
    }

    if (nextFile.size === 0) {
      setLocalError('Uploaded file is empty.')
      setFile(null)
      return
    }

    setLocalError('')
    onClearError?.()
    setFile(nextFile)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isIndexing) return

    onClearError?.()
    setLocalError('')

    if (!file) {
      setLocalError('Please choose a .txt, .doc, or .docx file.')
      return
    }

    await onSubmit(file)
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
          Upload a business document (.txt, .doc, or .docx) — services, packages,
          rates, or FAQs. We&apos;ll index the text and create a chat assistant
          grounded only in that content.
        </p>
        <p className="mt-3 rounded-xl bg-leaf/5 px-3 py-2 text-xs font-medium leading-relaxed text-ink-soft/75">
          Built for interiors, builders, small finance, banquet halls, and similar businesses. MVP preview — website embed coming soon.
        </p>

        {isIndexing ? (
          <LoadingState step={indexStep} />
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <span className="mb-1.5 block text-sm font-medium text-ink-soft">
                Business document
              </span>

              <input
                ref={inputRef}
                type="file"
                accept=".txt,.doc,.docx,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                disabled={isIndexing}
                onChange={(e) => {
                  const next = e.target.files?.[0] || null
                  validateAndSetFile(next)
                }}
              />

              <button
                type="button"
                disabled={isIndexing}
                onClick={() => inputRef.current?.click()}
                onDragEnter={(e) => {
                  e.preventDefault()
                  setIsDragging(true)
                }}
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDragging(true)
                }}
                onDragLeave={(e) => {
                  e.preventDefault()
                  setIsDragging(false)
                }}
                onDrop={(e) => {
                  e.preventDefault()
                  setIsDragging(false)
                  const next = e.dataTransfer.files?.[0] || null
                  validateAndSetFile(next)
                }}
                className={`w-full rounded-2xl border-2 border-dashed px-4 py-8 text-center transition ${
                  isDragging
                    ? 'border-leaf bg-leaf/10'
                    : 'border-mist bg-white hover:border-leaf/40'
                } disabled:opacity-60`}
              >
                <p className="text-2xl" aria-hidden="true">
                  📄
                </p>
                <p className="mt-2 text-sm font-bold text-ink">
                  {file ? file.name : 'Drop a file here or click to browse'}
                </p>
                <p className="mt-1 text-xs font-medium text-ink-soft/65">
                  {file
                    ? formatBytes(file.size)
                    : `.txt, .doc, .docx · up to ${MAX_FILE_SIZE_MB} MB`}
                </p>
              </button>

              {file ? (
                <button
                  type="button"
                  onClick={() => {
                    setFile(null)
                    if (inputRef.current) inputRef.current.value = ''
                  }}
                  className="mt-2 text-xs font-bold text-ink-soft hover:text-coral"
                >
                  Remove file
                </button>
              ) : null}
            </div>

            {error ? (
              <p className="rounded-lg bg-coral/10 px-3 py-2 text-sm text-coral" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isIndexing || !file}
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
