import type { PolicyHeading } from "@/features/policy/model/policy.types"
import { cn } from "@/shared/lib/utils"

type PolicySidebarProps = {
  headings: PolicyHeading[]
  activeHeadingId: string
  onSelectHeading: (headingId: string) => void
}

export function PolicySidebar({ headings, activeHeadingId, onSelectHeading }: PolicySidebarProps) {
  if (!headings.length) {
    return null
  }

  return (
    <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Contents</p>
      <nav className="mt-3 space-y-1">
        {headings.map((heading) => {
          const isActive = heading.id === activeHeadingId

          return (
            <button
              key={heading.id}
              type="button"
              onClick={() => onSelectHeading(heading.id)}
              className={cn(
                "block w-full rounded-lg px-3 py-2 text-left text-sm leading-relaxed transition-colors",
                heading.level === 3 && "pl-6",
                isActive
                  ? "bg-white font-semibold text-slate-900 shadow-sm"
                  : "text-slate-600 hover:bg-white hover:text-slate-900"
              )}
            >
              {heading.text}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
