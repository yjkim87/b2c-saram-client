"use client"

import { cn } from "@/shared/lib/utils"
import { CounselingCoachingCards } from "@/features/home/components/counseling-coaching-cards"
import {
  landingLayoutTokens,
  landingSectionTokens,
  landingTypeTokens,
} from "@/features/home/styles/landing-tokens"

export function FeaturesSection() {
  return (
    <section id="features" className={cn("bg-[#FFFFFF]", landingSectionTokens.base, "pt-6 md:pt-10")}>
      <div className={landingLayoutTokens.containerWide}>
        <div className={cn("text-center", landingLayoutTokens.sectionHeaderGap)}>
          <span className={cn("mb-4 inline-flex uppercase", landingTypeTokens.eyebrow)}>INTEGRATED SOLUTION</span>
          <h2 className={cn("mobile-auto-phrase", landingTypeTokens.sectionTitle)}>
            심리상담으로 단단하게,
            <br />
            성장코칭으로 당당하게
          </h2>
          <p className={cn("mx-auto mt-5 max-w-2xl text-[#3A2F27]", landingTypeTokens.body)}>
            <span className="sm:hidden">
              아이의 성장 단계와 필요에 따라
              <br />
              심리상담과 성장코칭의 차이를 확인해보세요.
            </span>
            <span className="hidden sm:inline">
              아이의 성장 단계와 필요에 따라 심리상담과 성장코칭의 차이를 확인해보세요.
            </span>
          </p>
        </div>

        <CounselingCoachingCards useAgePresetQuickGuide />
      </div>
    </section>
  )
}
