export default function ChatMessage({ role, content }) {
  const isUser = role === 'user'

  return (
    <div
      className={`flex animate-fade-up ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[75%] ${
          isUser
            ? 'rounded-br-md bg-leaf text-white'
            : 'rounded-bl-md border border-mist bg-white text-ink shadow-sm'
        }`}
      >
        {!isUser ? (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-leaf">
            AI
          </p>
        ) : null}
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  )
}
