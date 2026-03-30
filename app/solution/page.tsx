import { SolutionSection } from "@/features/solution/solution-section"
import { PageHeader } from "@/components/common/page-header"

export default function SolutionPage() {
  return (
    <>
      <PageHeader
        label="솔루션"
        title="아이의 성장 단계에 맞는 맞춤 솔루션"
        description="학습, 정서, 관계까지 성장 단계별로 필요한 서비스를 제공합니다."
      />
      <SolutionSection variant="full" />
    </>
  )
}
