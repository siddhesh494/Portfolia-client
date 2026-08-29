import { Link } from 'react-router-dom'
import AnimateOnScroll from '../components/AnimateOnScroll'
import Navbar from '../components/Navbar'

const features = [
  {
    title: 'Drop in a URL',
    description:
      'Paste your portfolio link. We crawl your site, extract the content, and build a knowledge base in minutes.',
    icon: '🔗',
  },
  {
    title: 'Answers from your site only',
    description:
      'Visitors ask questions and get grounded replies — pulled strictly from your portfolio, not the open web.',
    icon: '🎯',
  },
  {
    title: 'Always on',
    description:
      'Your AI assistant works 24/7 so you can focus on building while it handles the repetitive “tell me about you” questions.',
    icon: '⚡',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-[100dvh] overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-24 pt-14 sm:px-6 sm:pt-20">
        {/* Floating blobs */}
        <div className="pointer-events-none absolute -right-20 top-8 h-80 w-80 animate-float-slow blob bg-leaf/15 blur-2xl" />
        <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 animate-drift blob bg-sand/40 blur-2xl" />
        <div className="pointer-events-none absolute right-1/4 top-1/2 h-40 w-40 animate-pulse-soft blob bg-coral/15 blur-xl" />

        {/* Playful floating emoji */}
        <span className="pointer-events-none absolute right-[12%] top-[18%] hidden text-3xl animate-float sm:block">
          💬
        </span>
        <span className="pointer-events-none absolute left-[8%] top-[35%] hidden text-2xl animate-float stagger-3 sm:block">
          ✨
        </span>

        <div className="relative mx-auto max-w-6xl">
          <div className="animate-fade-up mb-5 flex flex-wrap items-center gap-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-leaf/25 bg-white/80 px-4 py-1.5 text-sm font-bold text-leaf shadow-sm">
              <span className="inline-block h-2 w-2 animate-pulse-soft rounded-full bg-leaf" />
              Portfolio AI for solo entrepreneurs
            </p>
            <p className="inline-flex items-center gap-2 rounded-full border border-coral/25 bg-coral/10 px-4 py-1.5 text-sm font-bold text-coral shadow-sm">
              🧪 MVP — early preview
            </p>
          </div>

          <h1 className="animate-fade-up stagger-1 font-display max-w-3xl text-[2.6rem] font-semibold leading-[1.08] text-ink sm:text-[3.75rem]">
            The{' '}
            <span className="font-accent text-[3rem] font-bold text-leaf sm:text-[4.2rem]">
              easiest
            </span>{' '}
            way to add AI to your portfolio
          </h1>

          <p className="animate-fade-up stagger-2 mt-7 max-w-2xl text-lg font-medium leading-relaxed text-ink-soft sm:text-xl">
            Portfolia turns your personal site into a friendly chat experience.
            Let visitors ask about your work, skills, and projects — and get
            instant answers sourced only from <em className="text-leaf">your</em>{' '}
            content.
          </p>

          <div className="animate-fade-up stagger-3 mt-11 flex flex-wrap items-center gap-4">
            <Link
              to="/try"
              className="btn-fun inline-flex items-center gap-2 rounded-full bg-leaf px-7 py-4 text-base font-bold text-white shadow-lg shadow-leaf/30"
            >
              Try it out
              <span className="animate-drift inline-block" aria-hidden="true">
                →
              </span>
            </Link>
            <a
              href="#about"
              className="btn-fun inline-flex items-center rounded-full border-2 border-mist bg-white/90 px-7 py-4 text-base font-bold text-ink-soft"
            >
              Learn more
            </a>
          </div>

          <div className="animate-fade-up stagger-4 mt-8 max-w-xl rounded-2xl border border-sand/60 bg-bloom/50 px-5 py-4">
            <p className="text-sm font-bold text-ink">
              This is our MVP — try the demo today.
            </p>
            <p className="mt-1.5 text-sm font-medium leading-relaxed text-ink-soft">
              Full integration into your own portfolio is coming soon. For now,
              paste any URL and experience how Portfolia works.
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-y border-mist/60 bg-white/40 px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <AnimateOnScroll>
              <p className="font-accent text-2xl text-leaf">What is Portfolia?</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-[2.6rem] sm:leading-tight">
                Your portfolio, now with a brain 🧠
              </h2>
              <p className="mt-6 text-base font-medium leading-relaxed text-ink-soft">
                Portfolia is a lightweight AI layer for personal portfolios and
                solo-founder sites. Instead of making visitors hunt through pages,
                you give them a conversational interface that understands your
                work.
              </p>
              <p className="mt-4 text-base font-medium leading-relaxed text-ink-soft">
                It&apos;s the <strong className="text-ink">easiest way to integrate AI</strong>{' '}
                into your portfolio — no complex setup, no generic chatbot that
                hallucinates. Just your site, indexed once, answering questions
                on your behalf.
              </p>
              <p className="mt-4 rounded-2xl border border-leaf/20 bg-leaf/5 px-4 py-3 text-sm font-medium leading-relaxed text-ink-soft">
                <strong className="text-leaf-deep">MVP note:</strong> you can try
                the full experience right now. Embedding Portfolia directly on
                your portfolio site is on the roadmap — stay tuned!
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={150}>
              <div className="card-lift rounded-3xl border border-mist/80 bg-bloom/50 p-7 shadow-sm sm:p-9">
                <p className="font-accent text-2xl text-leaf">Perfect for</p>
                <ul className="mt-5 space-y-4 font-medium text-ink-soft">
                  {[
                    'Developers & designers showcasing projects',
                    'Freelancers tired of repeating the same intro calls',
                    'Solo entrepreneurs who want a polished, interactive portfolio',
                    'Anyone who wants AI that answers questions for them',
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-leaf/15 text-sm text-leaf">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <AnimateOnScroll className="text-center">
            <p className="font-accent text-2xl text-leaf">How it works</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-[2.6rem]">
              Three steps to your own portfolio AI
            </h2>
          </AnimateOnScroll>

          <div className="mt-14 grid gap-7 sm:grid-cols-3">
            {features.map((feature, index) => (
              <AnimateOnScroll key={feature.title} delay={index * 120}>
                <article className="card-lift group h-full rounded-3xl border border-mist/80 bg-white/80 p-7 shadow-sm">
                  <span className="inline-block text-3xl transition group-hover:animate-wiggle">
                    {feature.icon}
                  </span>
                  <p className="mt-5 text-sm font-bold uppercase tracking-wide text-leaf/80">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-ink-soft">
                    {feature.description}
                  </p>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Try it out CTA */}
      <section className="px-4 py-24 sm:px-6">
        <AnimateOnScroll>
          <div className="cta-flowy relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] p-8 text-white shadow-2xl shadow-leaf/30 sm:p-14">
            <div className="relative z-10 max-w-2xl">
              <p className="font-accent text-3xl text-white/90">Try it out</p>
              <h2 className="mt-2 font-display text-3xl font-semibold sm:text-[2.5rem] sm:leading-tight">
                See it in action with your portfolio
              </h2>
              <p className="mt-5 text-base font-medium leading-relaxed text-white/90">
                Enter any portfolio URL, wait while we index it, then chat with an
                AI that only knows what&apos;s on that site. No signup required.
              </p>
              <p className="mt-3 text-sm font-medium text-white/75">
                This MVP lets you test the magic — portfolio integration drops soon.
              </p>
              <Link
                to="/try"
                className="btn-fun mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-leaf shadow-lg"
              >
                Launch the demo ✨
              </Link>
            </div>
            <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 animate-float-slow rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-8 right-1/4 h-32 w-32 animate-drift rounded-full bg-white/10 blur-xl" />
          </div>
        </AnimateOnScroll>
      </section>

      {/* How to integrate — placeholder */}
      <section id="integrate" className="border-t border-mist/60 bg-white/30 px-4 py-24 sm:px-6">
        <AnimateOnScroll className="mx-auto max-w-3xl text-center">
          <p className="font-accent text-2xl text-leaf">How to integrate</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-[2.6rem]">
            Embed Portfolia on your site
          </h2>
          <div className="mt-10 rounded-3xl border-2 border-dashed border-mist bg-foam/80 px-8 py-20">
            <span className="inline-block text-4xl animate-float">🚧</span>
            <p className="mt-4 text-base font-bold text-ink-soft/70">
              Integration into your portfolio — coming soon
            </p>
            <p className="mt-2 text-sm font-medium leading-relaxed text-ink-soft/55">
              We&apos;re building drop-in widgets, embed codes, and API docs so
              you can add Portfolia to your own site. This MVP is a live preview —
              for now, head to <strong className="text-ink-soft/70">Try out</strong> and
              test it with any portfolio URL.
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-mist/60 px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <AnimateOnScroll>
            <div className="rounded-3xl border border-mist/80 bg-white/70 p-8 shadow-sm sm:p-12">
              <div className="grid gap-10 sm:grid-cols-2 sm:items-center">
                <div>
                  <p className="font-accent text-2xl text-leaf">Contact</p>
                  <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
                    Let&apos;s build something together
                  </h2>
                  <p className="mt-5 text-sm font-medium leading-relaxed text-ink-soft">
                    Questions, feedback, or want Portfolia on your portfolio?
                    Reach out — I&apos;d love to hear from you.
                  </p>
                </div>

                <div className="space-y-4">
                  <a
                    href="mailto:siddhesh.ss26@gmail.com"
                    className="card-lift flex items-center gap-4 rounded-2xl border border-mist bg-bloom/40 px-6 py-5"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf/15 text-2xl">
                      ✉️
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-ink-soft/60">
                        Email
                      </p>
                      <p className="text-sm font-bold text-ink">
                        siddhesh.ss26@gmail.com
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://siddheshshinde.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-lift flex items-center gap-4 rounded-2xl border border-mist bg-bloom/40 px-6 py-5"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf/15 text-2xl">
                      🌐
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-ink-soft/60">
                        Portfolio
                      </p>
                      <p className="text-sm font-bold text-ink">
                        siddheshshinde.in
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-mist/60 px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="font-display text-xl font-semibold text-ink">
            Portfolia ✦
          </p>
          <div className="text-center sm:text-right">
            <p className="text-sm font-medium text-ink-soft/55">
              MVP preview · Portfolio integration coming soon
            </p>
            <p className="mt-1 text-sm font-medium text-ink-soft/55">
              Built by{' '}
              <a
                href="https://siddheshshinde.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-leaf transition hover:underline"
              >
                Siddhesh Shinde
              </a>
              {' · '}
              © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
