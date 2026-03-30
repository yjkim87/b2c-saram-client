import { PageHeader } from "@/components/common/page-header"
import { ReviewsSection } from "@/features/reviews/reviews-section"

export default function ReviewsPage() {
  return (
    <>
      <PageHeader
        label="부모님 후기"
        title="실제 변화를 경험하셨습니다"
        description="가정에서 체감한 코칭 변화 사례를 통해 사발면의 상담 경험을 확인해보세요."
      />
      <ReviewsSection variant="full" />
    </>
  )
}
