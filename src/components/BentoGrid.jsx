import { Box, GitBranch, LineChart, Lock, Radar, Workflow } from 'lucide-react'

const cards = [
  {
    title: 'Immutable deployments',
    body: 'Every push builds a new Docker image in ECR.',
    icon: Box,
    span: 'md:col-span-1',
    accent: 'from-violet-600/30 to-fuchsia-600/10',
  },
  {
    title: 'Declarative pipelines',
    body: 'Workflows codify lint, test, build, and promote—no manual drift between environments.',
    icon: Workflow,
    span: 'md:col-span-2',
    accent: 'from-fuchsia-600/25 to-transparent',
  },
  {
    title: 'Least-privilege access',
    body: 'GitHub OIDC to AWS removes long-lived keys from developer machines.',
    icon: Lock,
    span: 'md:col-span-2',
    accent: 'from-violet-500/20 to-transparent',
  },
  {
    title: 'Progressive delivery',
    body: 'Health-gated rollouts with automatic stop on failed probes.',
    icon: Radar,
    span: 'md:col-span-1',
    accent: 'from-fuchsia-500/25 to-violet-600/10',
  },
  {
    title: 'Trunk-based flow',
    body: 'Short-lived branches, fast merges, and a single source of truth for what ships.',
    icon: GitBranch,
    span: 'md:col-span-1',
    accent: 'from-violet-600/20 to-transparent',
  },
  {
    title: 'Operational signals',
    body: 'Structured logs and simple RED metrics keep incidents diagnosable without noise.',
    icon: LineChart,
    span: 'md:col-span-2',
    accent: 'from-fuchsia-600/15 to-violet-700/10',
  },
]

export default function BentoGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Engineering signals, not slide filler
        </h2>
        <p className="mt-4 text-slate-400">
          Each capability maps to something you can inspect in code: workflows, IaC, containers,
          and runtime checks.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.title}
            className={[
              'group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition hover:border-fuchsia-400/30',
              card.span,
            ].join(' ')}
          >
            <div
              className={[
                'pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br opacity-60 blur-3xl transition group-hover:opacity-90',
                card.accent,
              ].join(' ')}
              aria-hidden="true"
            />
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-950/60 text-fuchsia-200 shadow-[0_0_32px_-8px_rgba(217,70,239,0.55)]">
              <card.icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="relative mt-5 text-lg font-semibold text-white">{card.title}</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-slate-400">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
