import { ExpertsSection } from "@/features/experts/experts-section"
import { PageHeader } from "@/components/common/page-header"

export default function ExpertsPage() {
  return (
    <>
      <PageHeader
        label="전문가 소개"
        title="아이를 이해하는 전문가를 소개합니다"
        description="검증된 전문가의 전문 분야와 코칭 특징을 한눈에 확인해보세요."
      />
      <ExpertsSection variant="full" />
    </>
  )
}
