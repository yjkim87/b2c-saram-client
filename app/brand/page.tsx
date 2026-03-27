import type { Metadata } from "next"
import { BrandSection } from "@/features/brand/brand-section"
import { SubpageHero } from "@/shared/layout/subpage-hero"

export const metadata: Metadata = {
  title: "브랜드스토리",
  description:
    "사발면의 철학과 핵심 가치, 그리고 부모와 아이의 성장을 위해 걸어온 브랜드 스토리를 확인해보세요.",
}

export default function BrandRoute() {
  return (
    <>
      <SubpageHero
        badge="브랜드스토리"
        currentPage="브랜드스토리"
        title="신뢰를 쌓아온 사발면의 이야기"
        description="데이터 기반의 객관성, 부모와 아이를 잇는 연결, 전문가의 통찰로 이어지는 사발면의 핵심 가치와 미션을 소개합니다."
      />
      <BrandSection variant="full" />
    </>
  )
}
