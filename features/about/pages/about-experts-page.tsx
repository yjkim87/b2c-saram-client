import { PageHeader } from "@/components/common/page-header"
import { ExpertListPage } from "@/features/experts/pages/expert-list-page"

export function AboutExpertsPage() {
  return (
    <>
      <PageHeader
        label="전문가 소개"
        title="아이의 성장을 함께할 전문가들을 소개합니다."
        description="검증된 전문가의 분야와 코칭 포인트를 확인해보세요."
      />
      <ExpertListPage />
    </>
  )
}
