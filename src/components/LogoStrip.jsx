const brands = ['AWS', 'Docker', 'GitHub', 'Terraform', 'Prometheus', 'Nginx']

export default function LogoStrip() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Stack references used in this project
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {brands.map((name) => (
          <div
            key={name}
            className="flex items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] px-4 py-6 text-sm font-medium text-slate-400 backdrop-blur-sm"
          >
            {name}
          </div>
        ))}
      </div>
    </section>
  )
}
