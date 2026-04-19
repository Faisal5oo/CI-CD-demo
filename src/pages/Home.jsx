import { lazy, Suspense } from 'react'
import HeroSection from '../components/HeroSection.jsx'
import LogoStrip from '../components/LogoStrip.jsx'
import BentoGrid from '../components/BentoGrid.jsx'

const DevOpsDashboard = lazy(() => import('../components/DevOpsDashboard.jsx'))

function DashboardFallback() {
  return (
    <div
      className="glass-panel flex h-[420px] items-center justify-center rounded-2xl text-sm text-slate-400"
      role="status"
      aria-live="polite"
    >
      Loading delivery dashboard…
    </div>
  )
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <Suspense fallback={<DashboardFallback />}>
          <DevOpsDashboard />
        </Suspense>
      </section>
      <LogoStrip />
      <BentoGrid />
    </>
  )
}
