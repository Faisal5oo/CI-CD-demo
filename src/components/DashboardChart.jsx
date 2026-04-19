import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const data = [
  { day: 'Mon', runs: 4 },
  { day: 'Tue', runs: 6 },
  { day: 'Wed', runs: 3 },
  { day: 'Thu', runs: 8 },
  { day: 'Fri', runs: 5 },
  { day: 'Sat', runs: 2 },
  { day: 'Sun', runs: 3 },
]

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null
  }
  return (
    <div className="rounded-lg border border-white/10 bg-slate-950/95 px-3 py-2 text-xs text-slate-200 shadow-lg backdrop-blur-md">
      <p className="font-medium text-white">{label}</p>
      <p className="text-slate-400">
        Workflow runs: <span className="text-fuchsia-300">{payload[0].value}</span>
      </p>
    </div>
  )
}

export default function DashboardChart() {
  return (
    <div className="h-48 w-full sm:h-56">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="deployFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.55} />
              <stop offset="95%" stopColor="#d946ef" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" vertical={false} />
          <XAxis dataKey="day" stroke="#64748b" tickLine={false} axisLine={false} fontSize={11} />
          <YAxis stroke="#64748b" tickLine={false} axisLine={false} fontSize={11} width={28} />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'rgba(168,85,247,0.25)' }} />
          <Area
            type="monotone"
            dataKey="runs"
            stroke="#c084fc"
            strokeWidth={2}
            fill="url(#deployFill)"
            dot={{ r: 3, fill: '#f0abfc', strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#fae8ff', stroke: '#a855f7', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
