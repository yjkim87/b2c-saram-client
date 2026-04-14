// ------------------------------------------------------------------------------
// 화 일 명 : page.tsx
// 용    도 : 퀵코칭가이드 라우트 진입점 (첫 Step 데이터를 서버에서 조회하여 페이지 컴포넌트에 전달)
// 작성일시 : 2026-04-13 (김재국)
// 수정일시 :
// 주의사항 :
//-------------------------------------------------------------------------------

export const dynamic = "force-dynamic"

import { getStepData } from "@/features/quick_coaching_guide/actions/Quick_Coaching_Guide_Actions"
import { QuickCoachingGuide_Page } from "@/features/quick_coaching_guide/pages/Quick_Coaching_Guide_Page"
import { QUICK_COACHING_GUIDE_INITIAL_STEP_ID } from "@/features/quick_coaching_guide/lib/Quick_Coaching_Guide_Data"

export default async function QuickCoachingGuideRoutePage() {
  const initialStep = await getStepData(QUICK_COACHING_GUIDE_INITIAL_STEP_ID)
  return <QuickCoachingGuide_Page initialStep={initialStep} />
}
