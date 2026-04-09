"use client"

import { cn } from "@/shared/lib/utils"
import type { HomeServiceTab } from "@/features/home/model/home-tab"
import { landingRadiusTokens, landingSpaceTokens, landingTypeTokens } from "@/features/home/styles/landing-tokens"

interface StickyTabsProps {
  tab: HomeServiceTab
  setTab: (tab: HomeServiceTab) => void
}

const TAB_ITEMS: Array<{
  id: HomeServiceTab
  label: string
}> = [
  { id: "counseling", label: "심리상담" },
  { id: "coaching", label: "성장코칭" },
]

export function StickyTabs({ tab, setTab }: StickyTabsProps) {
  return (
    <section id="home-sticky-tabs" className="sticky top-16 z-[90] border-b border-[#e2e4e8] bg-[#ededee]/95 backdrop-blur md:top-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className={cn("flex h-16 items-end justify-center", landingSpaceTokens.tabGap)}>
          {TAB_ITEMS.map((item) => {
            const active = tab === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  "relative transition-colors duration-200",
                  landingSpaceTokens.tabButtonSpacing,
                  landingTypeTokens.tabLabel,
                  active ? "text-[#05070d]" : "text-[#8d939d] hover:text-[#232937]"
                )}
                aria-pressed={active}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-[3px] transition-opacity duration-200",
                    landingRadiusTokens.pill,
                    active ? "bg-[#05070d] opacity-100" : "bg-transparent opacity-0"
                  )}
                />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
