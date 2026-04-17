// ------------------------------------------------------------------------------
// 화 일 명 : page.tsx
// 용    도 : 퀵코칭가이드 라우트 진입점 (첫 Step 데이터를 서버에서 조회하여 페이지 컴포넌트에 전달)
// 작성일시 : 2026-04-13 (김재국)
// 수정일시 : 2026-04-14 (김재국) - gradeLevel 파라미터 전달 (자동선택은 클라이언트에서 처리)
// 주의사항 :
//-------------------------------------------------------------------------------

export const dynamic = "force-dynamic"

import { getStepData } from "@/features/quick_coaching_guide/actions/Quick_Coaching_Guide_Actions"
import { QuickCoachingGuide_Page, type GradeLevelKey, type QuickGuideType } from "@/features/quick_coaching_guide/pages/Quick_Coaching_Guide_Page"
import { QUICK_COACHING_GUIDE_INITIAL_STEP_ID } from "@/features/quick_coaching_guide/lib/Quick_Coaching_Guide_Data"

const VALID_GRADE_LEVELS: GradeLevelKey[] = ["elementary-lower", "elementary-upper", "middle", "high"]
const VALID_TYPES:        QuickGuideType[] = ["Mind", "Coaching"]

export default async function QuickCoachingGuideRoutePage({
  searchParams,
}: {
  searchParams: Promise<{ gradeLevel?: string; type?: string }>
}) {
  const { gradeLevel: rawGrade, type: rawType } = await searchParams
  const gradeLevel = VALID_GRADE_LEVELS.includes(rawGrade as GradeLevelKey) ? (rawGrade as GradeLevelKey) : null
  const guideType  = VALID_TYPES.includes(rawType as QuickGuideType) ? (rawType as QuickGuideType) : "Mind"

  const initialStep = await getStepData(QUICK_COACHING_GUIDE_INITIAL_STEP_ID, guideType)

  return (
    <QuickCoachingGuide_Page
      initialStep={initialStep}
      presetGradeLevel={gradeLevel}
      guideType={guideType}
    />
  )
}
