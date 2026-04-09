import type { PolicyType } from "@/features/policy/model/policy.types"
import { cn } from "@/shared/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"

export type PolicyTabItem = {
  type: PolicyType
  label: string
}

type PolicyTabsProps = {
  tabs: PolicyTabItem[]
  activeType: PolicyType
  onChange: (type: PolicyType) => void
  versions: string[]
  selectedVersion: string | null
  onVersionChange: (version: string) => void
}

export function PolicyTabs({
  tabs,
  activeType,
  onChange,
  versions,
  selectedVersion,
  onVersionChange,
}: PolicyTabsProps) {
  const hasVersions = versions.length > 0
  const normalizedValue = selectedVersion && versions.includes(selectedVersion) ? selectedVersion : undefined

  return (
    <div className="border-b border-slate-200 px-4 py-3 sm:px-8 sm:py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-full bg-slate-100 p-1">
          {tabs.map((tab) => {
            const isActive = tab.type === activeType

            return (
              <button
                key={tab.type}
                type="button"
                onClick={() => onChange(tab.type)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-6",
                  isActive
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                )}
                aria-pressed={isActive}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="w-full sm:w-auto">
          <Select value={normalizedValue} onValueChange={onVersionChange} disabled={!hasVersions}>
            <SelectTrigger className="h-11 w-full min-w-[150px] rounded-xl border-slate-300 bg-white text-slate-900 sm:w-[170px]">
              <SelectValue placeholder="버전 없음" />
            </SelectTrigger>
            <SelectContent>
              {versions.map((version) => (
                <SelectItem key={version} value={version}>
                  {version}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
