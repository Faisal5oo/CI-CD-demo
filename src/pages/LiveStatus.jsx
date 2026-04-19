import { useEffect, useState } from 'react'
import { Activity, Clock3, Cpu, Gauge, ShieldCheck } from 'lucide-react'

function formatClock(iso) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(iso))
  } catch {
    return '—'
  }
}

function jitter(value, spread, seed) {
  const x = Math.sin(seed) * 10000
  const rnd = x - Math.floor(x)
  const delta = (rnd - 0.5) * spread
  return Math.max(0, value + delta)
}

export default function LiveStatus() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setTick((n) => n + 1)
    }, 2500)
    return () => window.clearInterval(id)
  }, [])

  const snapshot = {
    timestamp: new Date().toISOString(),
    successRate: Number(jitter(98.6, 0.35, tick + 1.1).toFixed(2)),
    p95Ms: Math.round(jitter(420, 40, tick + 2.2)),
    rpm: Math.round(jitter(1280, 120, tick + 3.3)),
    errorRate: Number(jitter(0.12, 0.04, tick + 4.4).toFixed(2)),
    cpu: Number(jitter(34, 6, tick + 5.5).toFixed(1)),
    mem: Number(jitter(58, 5, tick + 6.6).toFixed(1)),
  }

  const tiles = [
    {
      label: 'Synthetic success rate',
      value: `${snapshot.successRate}%`,
      hint: 'Rolling window for demo purposes',
      icon: ShieldCheck,
    },
    {
      label: 'Edge p95 latency',
      value: `${snapshot.p95Ms} ms`,
      hint: 'Includes TLS + proxy hop',
      icon: Gauge,
    },
    {
      label: 'Observed throughput',
      value: `${snapshot.rpm} rpm`,
      hint: 'Representative load generator',
      icon: Activity,
    },
    {
      label: 'Client error ratio',
      value: `${snapshot.errorRate}%`,
      hint: '4xx/5xx over total responses',
      icon: Cpu,
    },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300/90">
            Live status
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
            Deployment and runtime metrics
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Numbers below oscillate on a timer to mimic a live telemetry feed while keeping this
            portfolio site static and inexpensive to host. Wire the same layout to CloudWatch,
            Prometheus, or your vendor of choice.
          </p>
        </div>
        <div className="glass-panel inline-flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-300">
          <Clock3 className="h-4 w-4 text-fuchsia-300" aria-hidden="true" />
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Last refresh</p>
            <p className="font-medium text-white">{formatClock(snapshot.timestamp)}</p>
          </div>
        </div>
      </header>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map((tile) => (
          <div key={tile.label} className="glass-panel rounded-2xl p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {tile.label}
              </p>
              <tile.icon className="h-4 w-4 text-violet-300" aria-hidden="true" />
            </div>
            <p className="mt-4 text-3xl font-semibold tracking-tight text-white">{tile.value}</p>
            <p className="mt-2 text-xs text-slate-500">{tile.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="glass-panel rounded-2xl p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-white">Instance utilization</h2>
          <p className="mt-2 text-sm text-slate-400">
            CPU and memory are sampled for illustration. In production, pair this view with alarms
            on sustained saturation and disk pressure.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">CPU</p>
              <div className="mt-2 h-2 rounded-full bg-white/5">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-[0_0_24px_-4px_rgba(217,70,239,0.8)]"
                  style={{ width: `${Math.min(100, snapshot.cpu)}%` }}
                />
              </div>
              <p className="mt-2 text-2xl font-semibold text-white">{snapshot.cpu}%</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Memory</p>
              <div className="mt-2 h-2 rounded-full bg-white/5">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 shadow-[0_0_24px_-4px_rgba(168,85,247,0.8)]"
                  style={{ width: `${Math.min(100, snapshot.mem)}%` }}
                />
              </div>
              <p className="mt-2 text-2xl font-semibold text-white">{snapshot.mem}%</p>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">Release posture</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              <span>Health checks green after last promotion.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
              <span>Autoscaling policy idle (fixed-size EC2 for this demo).</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-400" />
              <span>Rollback path verified via previous image digest in ECR.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
