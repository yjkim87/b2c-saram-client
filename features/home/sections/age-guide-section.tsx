"use client"

import { cn } from "@/shared/lib/utils"
import { CounselingCoachingCards } from "@/features/home/components/counseling-coaching-cards"
import type { HomeServiceTab } from "@/features/home/model/home-tab"
import {
  landingLayoutTokens,
  landingSectionTokens,
  landingTypeTokens,
} from "@/features/home/styles/landing-tokens"

interface AgeGuideSectionProps {
  tab: HomeServiceTab
}

export function AgeGuideSection({ tab }: AgeGuideSectionProps) {
  return (
    <section id="age-guide" className={cn("bg-[#FFF7EF]", landingSectionTokens.base)}>
      <div className={landingLayoutTokens.containerWide}>
        <div className={cn("text-center", landingLayoutTokens.sectionHeaderGap)}>
          <span className={cn("mb-4 inline-flex", landingTypeTokens.eyebrow)}>부모님의 마음</span>
          <h2 className={cn("mobile-auto-phrase", landingTypeTokens.sectionTitle)}>
            이런 고민, 혼자 하고 계셨나요?
          </h2>
          <p className={cn("mx-auto mt-5 max-w-2xl text-[#3A2F27]", landingTypeTokens.body)}>
            연령대별로 부모님들이 가장 많이 하시는 고민들입니다.
          </p>
        </div>

        <div key={`age-${tab}`} className="animate-in fade-in duration-200">
          <CounselingCoachingCards />
        </div>
      </div>
    </section>
  )
}
