import { detailTokens } from "../design-tokens"
import type { PhilosophySectionData } from "@/features/experts/lib/types"

interface PhilosophySectionProps {
  data: PhilosophySectionData
}

export function PhilosophySection({ data }: PhilosophySectionProps) {
  const quoteText = data.highlights.join("\n")

  return (
    <section
      className={`${detailTokens.card} ${detailTokens.sectionSpacing} group relative overflow-hidden p-6 md:p-10`}
    >
      <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/2 rounded-full bg-emerald-50/60 blur-3xl transition-transform duration-1000 group-hover:translate-x-1/4" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 -translate-x-1/4 translate-y-1/3 rounded-full bg-blue-50/40 blur-3xl transition-transform duration-1000 group-hover:-translate-x-1/3" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-start md:pl-8">
        <p className="pointer-events-none absolute -left-2 -top-2 z-0 select-none text-[120px] font-black leading-none text-emerald-500 opacity-[0.04] md:-top-6 md:left-0 md:text-[180px]">
          &ldquo;
        </p>

        <div className="relative z-10 w-full pl-4 pt-4 md:pl-12 md:pt-6">
          <div className="mb-4 flex items-center gap-4 opacity-90">
            <h2 className="text-xs font-bold tracking-[0.2em] text-emerald-600 md:text-sm">{data.title}</h2>
            <span className="h-px max-w-[80px] flex-grow bg-gradient-to-r from-emerald-300 to-transparent md:max-w-[120px]" />
          </div>

          <p className={`${detailTokens.title} mb-5 whitespace-pre-line text-xl leading-[1.4] tracking-tight md:text-[1.75rem]`}>
            {quoteText}
          </p>

          <p className="max-w-2xl text-base font-medium leading-relaxed text-slate-600 md:text-left">
            {data.description}
          </p>
        </div>
      </div>
    </section>
  )
}
