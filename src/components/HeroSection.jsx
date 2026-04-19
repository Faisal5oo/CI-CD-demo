import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
      <div className="mx-auto mb-10 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-100 shadow-[0_0_40px_-12px_rgba(168,85,247,0.75)]">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span>CI/CD gate: Vitest on every change</span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Deploying this app through GitHub Actions on EC2—a fully automated pipeline.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-slate-400 sm:text-xl">
          A showcase of enterprise-grade DevOps automation, from GitHub Actions to AWS EC2.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/architecture"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)] transition hover:bg-slate-100"
          >
            Review stack
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to="/live"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-fuchsia-400/40 hover:bg-white/10"
          >
            Live deployment metrics
          </Link>
        </div>
      </div>
    </section>
  )
}
