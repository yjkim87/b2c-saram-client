import { BrandSection } from "@/features/brand/brand-section"
import { PageHeader } from "@/components/common/page-header"

export default function BrandPage() {
  return (
    <>
      <PageHeader
        label="브랜드스토리"
        title="신뢰를 쌓아온 사발면의 이야기"
        description="데이터 기반의 객관성과 신뢰를 바탕으로 부모와 아이를 연결합니다."
      />
      <BrandSection variant="full" />
    </>
  )
}
