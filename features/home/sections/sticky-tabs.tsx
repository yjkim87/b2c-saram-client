"use client"

import { Brain, TrendingUp } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import type { HomeServiceTab } from "@/features/home/model/home-tab"

interface StickyTabsProps {
  tab: HomeServiceTab
  setTab: (tab: HomeServiceTab) => void
}

const TAB_ITEMS: Array<{
  id: HomeServiceTab
  label: string
  icon: typeof Brain
  activeClassName: string
}> = [
  {
    id: "counseling",
    label: "심리상담",
    icon: Brain,
    activeClassName: "bg-emerald-600 text-white shadow-[0_8px_20px_rgba(5,150,105,0.25)]",
  },
  {
    id: "coaching",
    label: "성장코칭",
    icon: TrendingUp,
    activeClassName: "bg-amber-500 text-white shadow-[0_8px_20px_rgba(245,158,11,0.25)]",
  },
]

export function StickyTabs({ tab, setTab }: StickyTabsProps) {
  return (
    <section id="home-sticky-tabs" className="sticky top-16 z-[90] border-b border-[#EDE3D8] bg-[#FFF9F4]/95 backdrop-blur md:top-20">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-3 sm:px-6 lg:px-8">
        <div className="inline-flex w-full max-w-[360px] items-center gap-2 rounded-full border border-[#E4D7CB] bg-white p-1.5 shadow-sm">
          {TAB_ITEMS.map((item) => {
            const Icon = item.icon
            const active = tab === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  "inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition-all duration-200",
                  active ? item.activeClassName : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
                aria-pressed={active}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
