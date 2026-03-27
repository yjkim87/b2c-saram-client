import type { Metadata } from "next"
import { SolutionSection } from "@/features/solution/solution-section"
import { SubpageHero } from "@/shared/layout/subpage-hero"

export const metadata: Metadata = {
  title: "솔루션",
  description:
    "영유아부터 고등학생까지 성장 단계별 니즈를 반영한 사발면의 맞춤형 코칭 솔루션을 확인해보세요.",
}

export default function SolutionRoute() {
  return (
    <>
      <SubpageHero
        badge="솔루션"
        currentPage="솔루션"
        title="성장 단계별 맞춤 코칭 솔루션"
        description="아이의 발달 단계에 맞춰 학습, 정서, 관계, 진로까지 통합적으로 지원하는 사발면의 전문 솔루션을 소개합니다."
      />
      <SolutionSection variant="full" />
    </>
  )
}
