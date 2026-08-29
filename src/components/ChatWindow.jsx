import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ChatMessage from './ChatMessage'
import { askQuestion } from '../services/api'

export default function ChatWindow({ uuid, onReset }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hi! Ask me anything about this portfolio.',
    },
  ])
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const bottomRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isSending])

  const sendMessage = async () => {
    const question = input.trim()
    if (!question || isSending || !uuid) return

    const userMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: question,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsSending(true)

    try {
      const data = await askQuestion(uuid, question)
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: data.answer || "I couldn't find that information in the portfolio.",
        },
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: 'assistant',
          content:
            error?.message ||
            'Sorry — something went wrong answering that. Please try again.',
        },
      ])
    } finally {
      setIsSending(false)
      textareaRef.current?.focus()
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex h-[100dvh] w-full flex-col">
      <header className="flex items-center justify-between border-b border-mist/80 bg-foam/80 px-4 py-3 backdrop-blur-md sm:px-6">
        <div>
          <Link
            to="/"
            className="font-accent text-xl text-leaf transition hover:text-leaf-deep"
          >
            Portfolia ✦
          </Link>
          <h1 className="font-display text-xl font-semibold text-ink sm:text-2xl">
            Portfolio AI Assistant
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="hidden rounded-lg border border-mist bg-white px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-leaf/40 hover:text-leaf-deep sm:inline-flex"
          >
            Home
          </Link>
          {onReset ? (
            <button
              type="button"
              onClick={onReset}
              className="rounded-lg border border-mist bg-white px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-leaf/40 hover:text-leaf-deep"
            >
              New portfolio
            </button>
          ) : null}
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col overflow-hidden px-3 sm:px-4">
        <div className="flex-1 space-y-3 overflow-y-auto py-5">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={message.content}
            />
          ))}

          {isSending ? (
            <div className="flex justify-start animate-fade-up">
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-mist bg-white px-4 py-3 shadow-sm">
                <span className="typing-dot h-2 w-2 rounded-full bg-leaf" />
                <span className="typing-dot h-2 w-2 rounded-full bg-leaf" />
                <span className="typing-dot h-2 w-2 rounded-full bg-leaf" />
              </div>
            </div>
          ) : null}

          <div ref={bottomRef} />
        </div>

        <div className="border-t border-mist/70 bg-foam/70 py-3 backdrop-blur-sm sm:py-4">
          <div className="flex items-end gap-2 rounded-2xl border border-mist bg-white p-2 shadow-sm focus-within:border-leaf/50 focus-within:ring-2 focus-within:ring-leaf/15">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSending}
              placeholder="Ask a question..."
              className="max-h-32 min-h-[44px] flex-1 resize-none bg-transparent px-2 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/45 disabled:opacity-60"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={isSending || !input.trim()}
              className="btn-fun mb-0.5 rounded-full bg-leaf px-5 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </div>
          <p className="mt-2 px-1 text-[11px] text-ink-soft/55">
            Enter to send · Shift+Enter for a new line
          </p>
        </div>
      </div>
    </div>
  )
}
