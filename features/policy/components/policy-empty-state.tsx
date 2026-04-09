type PolicyEmptyStateProps = {
  title: string
  description: string
}

export function PolicyEmptyState({ title, description }: PolicyEmptyStateProps) {
  return (
    <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center sm:px-8">
      <h2 className="text-xl font-bold tracking-tight text-slate-900">{title}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">{description}</p>
    </section>
  )
}
