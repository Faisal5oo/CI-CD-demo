import {
  Activity,
  Box,
  Cpu,
  GitBranch,
  LayoutDashboard,
  LineChart,
  Server,
  ShieldCheck,
} from 'lucide-react'
import DashboardChart from './DashboardChart.jsx'

const navItems = [
  { label: 'Overview', icon: LayoutDashboard, active: true },
  { label: 'Pipelines', icon: GitBranch, active: false },
  { label: 'Registry', icon: Box, active: false },
  { label: 'Compute', icon: Server, active: false },
  { label: 'Signals', icon: LineChart, active: false },
]

function MetricCard({ title, value, detail, trend }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 shadow-inner shadow-white/5">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{detail}</p>
      {trend ? (
        <p className="mt-2 text-xs font-medium text-emerald-400/90">{trend}</p>
      ) : null}
    </div>
  )
}

export default function DevOpsDashboard() {
  return (
    <div className="glass-panel glow-ring overflow-hidden rounded-2xl">
      <div className="flex flex-col border-b border-white/10 bg-slate-950/40 lg:flex-row">
        <aside className="flex gap-2 border-white/10 p-4 lg:w-52 lg:flex-col lg:border-r lg:gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={[
                'flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition',
                item.active
                  ? 'bg-violet-500/15 text-white shadow-[inset_0_0_0_1px_rgba(168,85,247,0.35)]'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200',
              ].join(' ')}
            >
              <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {item.label}
            </button>
          ))}
        </aside>

        <div className="flex-1 space-y-6 p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Delivery health
              </p>
              <h2 className="text-lg font-semibold text-white">CI/CD throughput (sample)</h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Synthetic live feed for portfolio context
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Pipeline success (30d)"
              value="98.4%"
              detail="GitHub Actions → EC2 path"
              trend="Within SLO for personal projects"
            />
            <MetricCard
              title="P95 deploy time"
              value="3m 12s"
              detail="Build, push ECR, roll out"
            />
            <MetricCard
              title="Last image digest"
              value="sha256:9f2a…c41"
              detail="Immutable artifact in ECR"
            />
            <MetricCard
              title="Service checks"
              value="OK"
              detail="HTTP + process probes"
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-slate-950/30 p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <Activity className="h-4 w-4 text-fuchsia-300" aria-hidden="true" />
                Workflow runs (rolling week)
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
                Representative data
              </div>
            </div>
            <DashboardChart />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-violet-300" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-white">Supply chain posture</p>
                <p className="mt-1 text-sm text-slate-400">
                  Signed commits, least-privilege IAM for deploy role, and pinned base images in the
                  Dockerfile keep the promotion path auditable.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <Box className="mt-0.5 h-5 w-5 text-fuchsia-300" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-white">Runtime contract</p>
                <p className="mt-1 text-sm text-slate-400">
                  Container runs behind a reverse proxy on EC2; health endpoint drives automated
                  rollback decisions when probes fail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
