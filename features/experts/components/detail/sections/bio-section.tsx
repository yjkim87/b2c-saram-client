import { detailTokens } from "../design-tokens"
import type { BioSectionData } from "@/features/experts/lib/types"

interface BioSectionProps {
  data: BioSectionData
}

export function BioSection({ data }: BioSectionProps) {
  return (
    <section className={`${detailTokens.card} ${detailTokens.sectionSpacing} p-8`}>
      <div className="flex items-center gap-2">
        <span className="h-6 w-2 rounded-full bg-blue-400" />
        <h2 className={`${detailTokens.title} text-lg`}>{data.title}</h2>
      </div>

      <p className={`${detailTokens.body} mt-4 text-base`}>{data.description}</p>
    </section>
  )
}
