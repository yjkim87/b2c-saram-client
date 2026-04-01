import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { detailTokens } from "./design-tokens"
import { HeaderSection } from "./sections/header-section"
import { PhilosophySection } from "./sections/philosophy-section"
import { BioSection } from "./sections/bio-section"
import { InfoGridSection } from "./sections/info-grid-section"
import type { ExpertProfileData } from "@/features/experts/lib/types"

interface ExpertDetailViewProps {
  backHref: string
  profileData: ExpertProfileData
}

export function ExpertDetailView({ backHref, profileData }: ExpertDetailViewProps) {
  return (
    <main className={detailTokens.page}>
      <div className={detailTokens.container}>
        <Link
          href={backHref}
          className="group mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-slate-900 md:text-base"
        >
          <span className="inline-flex rounded-full border border-slate-200 bg-white p-1.5 shadow-sm transition-all group-hover:bg-slate-50">
            <ArrowLeft className="h-5 w-5" />
          </span>
          목록으로
        </Link>

        <HeaderSection data={profileData.header} />
        <PhilosophySection data={profileData.philosophy} />
        <BioSection data={profileData.bio} />
        <InfoGridSection cards={profileData.infoCards} />
      </div>
    </main>
  )
}
