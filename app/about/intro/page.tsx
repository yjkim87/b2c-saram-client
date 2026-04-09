import { PageHeader } from "@/components/common/page-header"
import { StoryPage } from "@/features/story/pages/story-page"

export default function AboutIntroPage() {
  return (
    <>
      <PageHeader
        label="사발면 소개"
        title="사람의 발견을 원하면의 방향성을 소개합니다"
        description="우리의 미션과 성장 프로세스를 소개합니다."
      />
      <StoryPage />
    </>
  )
}
