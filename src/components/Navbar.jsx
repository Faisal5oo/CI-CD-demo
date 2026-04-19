import { NavLink } from 'react-router-dom'
import { Layers } from 'lucide-react'

const linkClass = ({ isActive }) =>
  [
    'rounded-full px-4 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-white/10 text-white shadow-[0_0_24px_-8px_rgba(168,85,247,0.65)]'
      : 'text-slate-400 hover:text-white',
  ].join(' ')

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#020617]/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:gap-6 sm:px-6">
        <NavLink
          to="/"
          className="group flex items-center gap-2 text-white"
          aria-label="AetherFlow home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-fuchsia-500/30 bg-gradient-to-br from-violet-600/40 to-fuchsia-600/30 shadow-[0_0_32px_-6px_rgba(217,70,239,0.55)]">
            <Layers className="h-5 w-5 text-white" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold tracking-tight">AetherFlow</span>
        </NavLink>

        <nav
          className="flex flex-wrap items-center justify-center gap-1 rounded-full border border-white/10 bg-white/5 p-1"
          aria-label="Primary"
        >
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/architecture" className={linkClass}>
            Architecture
          </NavLink>
          <NavLink to="/live" className={linkClass}>
            Live Status
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="glow-ring hidden rounded-full border border-fuchsia-400/40 bg-transparent px-4 py-2 text-sm font-medium text-fuchsia-100 shadow-[0_0_28px_-10px_rgba(217,70,239,0.7)] transition hover:border-fuchsia-300/60 hover:text-white sm:inline-flex"
          >
            View pipeline
          </a>
        </div>
      </div>
    </header>
  )
}
