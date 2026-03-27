import { BadgeCheck } from "lucide-react"
import { detailTokens } from "../design-tokens"
import type { HeaderSectionData } from "@/features/experts/lib/types"

interface HeaderSectionProps {
  data: HeaderSectionData
}

function splitCategoryBadge(categoryBadge: string) {
  const tokens = categoryBadge.trim().split(/\s+/)

  if (tokens.length > 1) {
    return {
      emoji: tokens[0],
      category: tokens.slice(1).join(" "),
    }
  }

  return {
    emoji: "🌱",
    category: categoryBadge,
  }
}

export function HeaderSection({ data }: HeaderSectionProps) {
  const { emoji, category } = splitCategoryBadge(data.categoryBadge)
  const hasPlusSuffix = data.totalSessionsValue.endsWith("+")
  const sessionNumber = hasPlusSuffix
    ? data.totalSessionsValue.slice(0, -1)
    : data.totalSessionsValue

  return (
    <section
      className={`${detailTokens.card} ${detailTokens.sectionSpacing} flex flex-col items-start gap-6 p-6 md:flex-row md:items-center md:gap-10 md:p-8`}
    >
      <div className="relative w-full md:w-[180px] md:shrink-0">
        <div className="h-[132px] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-inner md:h-[180px] md:rounded-3xl">
          <img src={data.imageUrl} alt={data.name} className="h-full w-full object-cover object-top" />
        </div>

        <div className="absolute -bottom-3 -right-3 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-sm md:-bottom-4 md:-right-4">
          <div className="flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-1.5 md:py-2">
            <span className="text-xs md:text-sm">{emoji}</span>
            <span className="whitespace-nowrap text-xs font-bold text-emerald-700">{category}</span>
          </div>
        </div>
      </div>

      <div className="mt-2 flex flex-grow flex-col justify-center md:mt-0">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-md border border-blue-100/50 bg-blue-50/50 px-2 py-1 text-slate-600"
            title="Assesta 공식 검증 완료"
          >
            <BadgeCheck className="h-3.5 w-3.5 text-blue-500" />
            <span className="mt-[1px] text-xs font-bold uppercase tracking-tight text-blue-700">
              {data.certificationLabel}
            </span>
          </span>

          <span className="text-xs font-bold text-slate-400">|</span>
          <span className="text-sm font-bold text-emerald-600">{data.specialty}</span>
        </div>

        <h1 className={`${detailTokens.title} mb-4 text-3xl md:text-4xl`}>{data.name}</h1>

        <ul className="flex flex-wrap gap-1.5 md:gap-2">
          {data.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-lg border border-slate-200/60 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-500"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <aside className="mt-0 flex w-full justify-center md:w-auto md:justify-end">
        <div className="flex w-full flex-col items-center rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 md:w-auto md:items-end md:py-5">
          <span className="mb-1 text-xs font-bold tracking-wide text-slate-500">{data.totalSessionsLabel}</span>

          <div className="flex items-start">
            <span className="text-4xl font-black leading-none tracking-tighter text-slate-900 md:text-[2.5rem]">
              {sessionNumber}
            </span>
            {hasPlusSuffix && (
              <span className="ml-0.5 text-2xl font-black leading-none text-emerald-500 md:text-3xl">
                +
              </span>
            )}
          </div>
        </div>
      </aside>
    </section>
  )
}
