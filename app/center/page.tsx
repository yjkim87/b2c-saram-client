import { CenterSection } from "@/features/center/center-section"
import { PageHeader } from "@/components/common/page-header"

export default function CenterPage() {
  return (
    <>
      <PageHeader
        label="센터 안내"
        title="편안한 상담 공간, 오프라인 센터"
        description="센터 위치와 방문 정보를 확인하고 편하게 찾아오실 수 있습니다."
      />
      <CenterSection variant="full" />
    </>
  )
}
