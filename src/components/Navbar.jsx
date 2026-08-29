import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="animate-slide-down sticky top-0 z-40 border-b border-mist/50 bg-foam/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-leaf text-base font-bold text-white shadow-md shadow-leaf/30 transition group-hover:scale-110 group-hover:rotate-3">
            ✦
          </span>
          <span className="font-display text-xl font-semibold text-ink transition group-hover:text-leaf-deep">
            Portfolia
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href="#integrate"
            className="rounded-full px-3 py-2 text-sm font-semibold text-ink-soft transition hover:bg-white/80 hover:text-leaf-deep"
          >
            How to integrate
          </a>
          <Link
            to="/try"
            className="btn-fun rounded-full bg-leaf px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-leaf/25"
          >
            Try out ✨
          </Link>
        </div>
      </nav>
    </header>
  )
}
