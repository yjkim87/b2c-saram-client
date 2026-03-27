import type { Metadata } from "next"
import { ExpertsSection } from "@/features/experts/experts-section"
import { SubpageHero } from "@/shared/layout/subpage-hero"

export const metadata: Metadata = {
  title: "전문가 소개",
  description:
    "아이와 부모의 성장을 함께 설계하는 사발면 전문가들의 프로필과 전문 분야를 확인해보세요.",
}

export default function ExpertsRoute() {
  return (
    <>
      <SubpageHero
        badge="전문가 소개"
        currentPage="전문가 소개"
        title="검증된 전문가와 함께하는 맞춤 코칭"
        description="분야와 키워드로 전문가를 탐색하고, 우리 가족에게 맞는 코치를 찾아 상세 프로필을 확인해보세요."
      />
      <ExpertsSection variant="full" />
    </>
  )
}
