import { useEffect, useRef } from "react"
import type { PolicyHeading } from "@/features/policy/model/policy.types"
import { cn } from "@/shared/lib/utils"

type PolicySidebarProps = {
  headings: PolicyHeading[]
  activeHeadingId: string
  onSelectHeading: (headingId: string) => void
}

export function PolicySidebar({ headings, activeHeadingId, onSelectHeading }: PolicySidebarProps) {
  const navRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!activeHeadingId || !navRef.current) {
      return
    }

    const activeButton = navRef.current.querySelector<HTMLElement>(`[data-heading-id="${activeHeadingId}"]`)

    if (!activeButton) {
      return
    }

    const container = navRef.current.parentElement

    if (!container || container.scrollHeight <= container.clientHeight) {
      return
    }

    const containerTop = container.scrollTop
    const containerBottom = containerTop + container.clientHeight
    const buttonTop = activeButton.offsetTop
    const buttonBottom = buttonTop + activeButton.offsetHeight

    if (buttonTop < containerTop) {
      container.scrollTo({ top: buttonTop, behavior: "smooth" })
      return
    }

    if (buttonBottom > containerBottom) {
      container.scrollTo({ top: buttonBottom - container.clientHeight, behavior: "smooth" })
    }
  }, [activeHeadingId])

  if (!headings.length) {
    return null
  }

  return (
    <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Contents</p>
      <nav ref={navRef} className="mt-3 space-y-1">
        {headings.map((heading) => {
          const isActive = heading.id === activeHeadingId

          return (
            <button
              key={heading.id}
              data-heading-id={heading.id}
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
