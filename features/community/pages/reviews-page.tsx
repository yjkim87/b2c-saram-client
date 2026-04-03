import { PageHeader } from "@/components/common/page-header"
import { ReviewsSection } from "@/features/reviews/reviews-section"

export function CommunityReviewsPage() {
  return (
    <>
      <PageHeader
        label="고객 후기"
        title="실제 변화 경험을 확인해보세요"
        description="사발면 상담/코칭을 경험한 보호자들의 생생한 후기를 모았습니다."
      />
      <ReviewsSection variant="full" />
    </>
  )
}
