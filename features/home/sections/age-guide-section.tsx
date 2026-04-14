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
          <span className={cn("mb-4 inline-flex", landingTypeTokens.eyebrow)}>INTEGRATED SOLUTION</span>
          <h2 className={cn("mobile-auto-phrase", landingTypeTokens.sectionTitle)}>
            <span className="text-[#FF7A33]">심리상담</span>으로 단단하게, <br />
            <span className="text-[#FF7A33]">성장코칭</span>으로 당당하게
          </h2>
          <p className={cn("mx-auto mt-5 max-w-2xl text-[#3A2F27]", landingTypeTokens.sectionSubtitle)}>
            아이의 성장 단계와 필요에 따라 심리상담과 성장코칭의 차이를 확인해보세요.
          </p>
        </div>

        <div key={`age-${tab}`} className="animate-in fade-in duration-200">
          <CounselingCoachingCards bubbleAlign="left" buttonWidth="full" useAgePresetQuickGuide />
        </div>
      </div>
    </section>
  )
}
