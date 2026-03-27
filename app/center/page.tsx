import type { Metadata } from "next"
import { CenterSection } from "@/features/center/center-section"
import { SubpageHero } from "@/shared/layout/subpage-hero"

export const metadata: Metadata = {
  title: "센터 소개",
  description:
    "사발면 오프라인 센터 위치, 연락처, 교통편과 방문 정보를 한 번에 확인해보세요.",
}

export default function CenterRoute() {
  return (
    <>
      <SubpageHero
        badge="센터 소개"
        currentPage="센터 소개"
        title="편안한 상담 공간, 오프라인 센터 안내"
        description="센터 위치와 연락처, 주차 및 대중교통 안내까지 방문 전 필요한 정보를 상세하게 제공합니다."
      />
      <CenterSection variant="full" showGallery={true} showIntroText={false} />
    </>
  )
}
