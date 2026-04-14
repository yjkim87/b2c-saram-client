// ------------------------------------------------------------------------------
// 화 일 명 : layout.tsx
// 용    도 : 퀵코칭가이드 공통 레이아웃 (서브페이지 공통 헤더/푸터 래핑)
// 작성일시 : 2026-04-13 (김재국)
// 수정일시 :
// 주의사항 :
//-------------------------------------------------------------------------------

import type { ReactNode } from "react"
import { SubpageLayout } from "@/shared/layout/subpage-layout"

interface QuickCoachingGuideLayoutProps {
  children: ReactNode
}

export default function QuickCoachingGuideLayout({ children }: QuickCoachingGuideLayoutProps) {
  return <SubpageLayout>{children}</SubpageLayout>
}
