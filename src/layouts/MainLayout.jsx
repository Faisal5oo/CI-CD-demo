import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

export default function MainLayout() {
  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-[#020617] text-slate-200">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-space opacity-70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fuchsia-600/20 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-[-10%] h-[420px] w-[420px] rounded-full bg-violet-600/15 blur-[100px]"
        aria-hidden="true"
      />
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
      <footer className="relative z-10 border-t border-white/5 bg-slate-950/40 py-10 text-center text-sm text-slate-500">
        <p>AetherFlow — portfolio artifact demonstrating CI/CD, containerization, and cloud delivery.</p>
      </footer>
    </div>
  )
}
