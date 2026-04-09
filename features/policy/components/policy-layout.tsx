import type { ReactNode } from "react"
import { PolicyTabs, type PolicyTabItem } from "@/features/policy/components/policy-tabs"
import type { PolicyType } from "@/features/policy/model/policy.types"
import { cn } from "@/shared/lib/utils"

type PolicyLayoutProps = {
  tabs: PolicyTabItem[]
  activeType: PolicyType
  onTypeChange: (type: PolicyType) => void
  versions: string[]
  selectedVersion: string | null
  onVersionChange: (version: string) => void
  hasSidebar: boolean
  sidebar: ReactNode
  children: ReactNode
}

export function PolicyLayout({
  tabs,
  activeType,
  onTypeChange,
  versions,
  selectedVersion,
  onVersionChange,
  hasSidebar,
  sidebar,
  children,
}: PolicyLayoutProps) {
  return (
    <section className="bg-[#F4F6FA] pb-16 pt-24 sm:pb-24 sm:pt-28">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
        <div className="overflow-hidden lg:overflow-visible rounded-[1.4rem] border border-slate-200/80 bg-white shadow-[0_24px_60px_-48px_rgba(15,23,42,0.45)]">
          <PolicyTabs
            tabs={tabs}
            activeType={activeType}
            onChange={onTypeChange}
            versions={versions}
            selectedVersion={selectedVersion}
            onVersionChange={onVersionChange}
          />

          <div
            className={cn(
              "grid gap-6 p-4 sm:gap-8 sm:p-8 [&>*]:min-w-0",
              hasSidebar ? "lg:grid-cols-[260px_minmax(0,1fr)]" : "lg:grid-cols-1"
            )}
          >
            {hasSidebar && <div className="min-w-0">{sidebar}</div>}
            <div className="min-w-0">{children}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
