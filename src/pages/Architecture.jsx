import { Boxes, Cloud, Container, GitBranch, Lock, Network, Server } from 'lucide-react'

const layers = [
  {
    title: 'Source & automation',
    icon: GitBranch,
    points: [
      'GitHub repository as system of record for application and workflow definitions.',
      'GitHub Actions orchestrates test (Vitest), build, and publish stages on every merge.',
      'Branch protection and required checks enforce the quality gate before promotion.',
    ],
  },
  {
    title: 'Artifact & registry',
    icon: Container,
    points: [
      'Multi-stage Dockerfile produces a minimal runtime image with pinned base tags.',
      'Images push to Amazon ECR; immutable digests are what EC2 pulls—not floating tags.',
      'Each deployment references a specific digest for traceability and rollback clarity.',
    ],
  },
  {
    title: 'Compute & networking',
    icon: Server,
    points: [
      'EC2 hosts the container runtime with security groups scoped to ingress requirements.',
      'Reverse proxy terminates TLS and forwards to the containerized Node/Vite static bundle.',
      'IAM roles grant the instance narrow rights to pull from ECR and write logs.',
    ],
  },
  {
    title: 'Secrets & identity',
    icon: Lock,
    points: [
      'GitHub OIDC federation removes static AWS access keys from CI configuration.',
      'Short-lived tokens minted per workflow run align with least-privilege IAM policies.',
      'Runtime secrets stay out of the image; injected via instance configuration where needed.',
    ],
  },
]

export default function Architecture() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300/90">
          Reference architecture
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
          AWS and Docker delivery model
        </h1>
        <p className="mt-4 text-lg text-slate-400">
          This page documents how the pieces fit together: versioned source, automated builds,
          immutable containers, and constrained cloud access. It mirrors how the same ideas apply
          to production systems at scale.
        </p>
      </header>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 text-white">
            <Cloud className="h-6 w-6 text-violet-300" aria-hidden="true" />
            <h2 className="text-xl font-semibold">End-to-end flow</h2>
          </div>
          <ol className="mt-6 space-y-4 text-sm text-slate-300">
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 text-xs font-semibold text-fuchsia-100">
                1
              </span>
              <span>
                Engineer merges a change; Actions runs Vitest and fails fast on regressions.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 text-xs font-semibold text-fuchsia-100">
                2
              </span>
              <span>Docker build produces an image tagged for the commit; push uploads layers to ECR.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 text-xs font-semibold text-fuchsia-100">
                3
              </span>
              <span>
                Deployment job refreshes the running task or service on EC2 to pull the new digest.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 text-xs font-semibold text-fuchsia-100">
                4
              </span>
              <span>Post-deploy probes validate HTTP health before traffic is considered good.</span>
            </li>
          </ol>
        </div>

        <div className="space-y-4">
          <div className="glass-panel flex items-start gap-4 rounded-2xl p-6">
            <Network className="mt-1 h-6 w-6 text-fuchsia-300" aria-hidden="true" />
            <div>
              <h3 className="text-lg font-semibold text-white">Edge and ingress</h3>
              <p className="mt-2 text-sm text-slate-400">
                Public listeners stay minimal. TLS is terminated at the proxy; upstream traffic
                stays on private interfaces where possible.
              </p>
            </div>
          </div>
          <div className="glass-panel flex items-start gap-4 rounded-2xl p-6">
            <Boxes className="mt-1 h-6 w-6 text-violet-300" aria-hidden="true" />
            <div>
              <h3 className="text-lg font-semibold text-white">Why containers here</h3>
              <p className="mt-2 text-sm text-slate-400">
                Packaging the Vite build inside a container makes runtime dependencies explicit and
                keeps host drift from changing what users see in production.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {layers.map((layer) => (
          <article key={layer.title} className="glass-panel rounded-2xl p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-950/60 text-fuchsia-200">
                <layer.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="text-lg font-semibold text-white">{layer.title}</h2>
            </div>
            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              {layer.points.map((point, index) => (
                <li key={`${layer.title}-${index}`} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400/80" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  )
}
