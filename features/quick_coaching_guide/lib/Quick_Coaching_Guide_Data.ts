// ------------------------------------------------------------------------------
// 화 일 명 : Quick_Coaching_Guide_Data.ts
// 용    도 : 로직 / 유틸 모음 (DB에서 받아온 데이터를 화면 컴포넌트가 바로 사용할 수 있는 형태로 변환하는 함수와 공통 상수 모음)
// 작성일시 : 2026-04-13 (김재국)
// 수정일시 : 
// 주의사항 :
//-------------------------------------------------------------------------------

import type {
  QuickCoachingGuideRow,
  StepGroup,
  StepQuestion,
  StepOption,
} from "@/features/quick_coaching_guide/model/Quick_Coaching_Guide_Model"

export const QUICK_COACHING_GUIDE_INITIAL_STEP_ID = "step-concern-root"

// ─────────────────────────────────────────────────────────────────────────────
// 2026-04-13 (김재국) - 퀵코칭가이드 raw 데이터 변환
// ─────────────────────────────────────────────────────────────────────────────
export function transformToStepGroup(
  contents: QuickCoachingGuideRow[],
  buttons:  QuickCoachingGuideRow[],
): StepGroup {
  const stepId = contents[0]?.Step_Id ?? buttons[0]?.Step_Id ?? ""

  const message        = contents.find((r) => r.Content_Type === "message")?.Guide_Content ?? ""
  const checkpointRows = contents.filter((r) => r.Content_Type === "checkpoint")
  const questionLabels = contents.filter((r) => r.Content_Type === "question_label")
  const questionDescs  = contents.filter((r) => r.Content_Type === "question_desc")
  const reservationRow = contents.find((r) => r.Content_Type === "reservation")

  const questions: StepQuestion[] = questionLabels.map((labelRow, i) => ({
    label:       labelRow.Guide_Content,
    description: questionDescs[i]?.Guide_Content ?? "",
  }))

  const options: StepOption[] = buttons.map((r) => ({
    label:    r.Guide_Content,
    nextStep: r.Next_Step_Id ?? "",
  }))

  const stepGroup: StepGroup = { id: stepId, botMessage: message }

  if (checkpointRows.length) stepGroup.checkpoint     = checkpointRows.map((r) => r.Guide_Content)
  if (questions.length)      stepGroup.questions       = questions
  if (options.length)        stepGroup.options         = options
  if (reservationRow)        stepGroup.reservationHref = reservationRow.Guide_Content

  return stepGroup
}
