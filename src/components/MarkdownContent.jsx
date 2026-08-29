import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownContent({ content, variant = 'assistant' }) {
  const isUser = variant === 'user'

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1
            className={`mb-2 mt-1 text-lg font-bold leading-snug ${
              isUser ? 'text-white' : 'text-ink'
            }`}
          >
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2
            className={`mb-2 mt-2 text-base font-bold leading-snug ${
              isUser ? 'text-white' : 'text-ink'
            }`}
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3
            className={`mb-1.5 mt-2 text-sm font-semibold leading-snug ${
              isUser ? 'text-white' : 'text-ink'
            }`}
          >
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p
            className={`mb-2 last:mb-0 leading-relaxed ${
              isUser ? 'text-white/95' : 'text-ink-soft'
            }`}
          >
            {children}
          </p>
        ),
        strong: ({ children }) => (
          <strong className={`font-semibold ${isUser ? 'text-white' : 'text-ink'}`}>
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className={`italic ${isUser ? 'text-white/90' : 'text-ink-soft'}`}>
            {children}
          </em>
        ),
        ul: ({ children }) => (
          <ul
            className={`mb-2 list-disc space-y-1 pl-5 last:mb-0 ${
              isUser ? 'text-white/95' : 'text-ink-soft'
            }`}
          >
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol
            className={`mb-2 list-decimal space-y-1 pl-5 last:mb-0 ${
              isUser ? 'text-white/95' : 'text-ink-soft'
            }`}
          >
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`underline underline-offset-2 ${
              isUser
                ? 'text-white hover:text-white/80'
                : 'text-leaf hover:text-leaf-deep'
            }`}
          >
            {children}
          </a>
        ),
        code: ({ children, className }) => {
          const isBlock = className?.includes('language-')
          if (isBlock) {
            return (
              <code className="block overflow-x-auto rounded-lg bg-ink/5 px-3 py-2 font-mono text-xs">
                {children}
              </code>
            )
          }
          return (
            <code
              className={`rounded px-1 py-0.5 font-mono text-xs ${
                isUser ? 'bg-white/20 text-white' : 'bg-leaf/10 text-leaf-deep'
              }`}
            >
              {children}
            </code>
          )
        },
        pre: ({ children }) => (
          <pre className="mb-2 overflow-x-auto rounded-lg last:mb-0">{children}</pre>
        ),
        blockquote: ({ children }) => (
          <blockquote
            className={`mb-2 border-l-2 pl-3 italic last:mb-0 ${
              isUser ? 'border-white/40 text-white/85' : 'border-leaf/40 text-ink-soft'
            }`}
          >
            {children}
          </blockquote>
        ),
        hr: () => (
          <hr
            className={`my-3 border-t ${isUser ? 'border-white/20' : 'border-mist'}`}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
