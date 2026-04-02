import { PageHeader } from "@/components/common/page-header"
import { ReviewsSection } from "@/features/reviews/reviews-section"

export function CommunityReviewsPage() {
  return (
    <>
      <PageHeader
        label="\uACE0\uAC1D \uD6C4\uAE30"
        title="\uC2E4\uC81C \uBCC0\uD654 \uACBD\uD5D8\uC744 \uD655\uC778\uD574\uBCF4\uC138\uC694"
        description="\uC0AC\uBC1C\uBA74 \uC0C1\uB2F4/\uCF54\uCE6D\uC744 \uACBD\uD5D8\uD55C \uBCF4\uD638\uC790\uB4E4\uC758 \uC0DD\uC0DD\uD55C \uD6C4\uAE30\uB97C \uBAA8\uC558\uC2B5\uB2C8\uB2E4."
      />
      <ReviewsSection variant="full" />
    </>
  )
}