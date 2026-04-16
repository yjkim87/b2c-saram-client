import { transformToStepGroup } from "@/features/quick_coaching_guide/lib/Quick_Coaching_Guide_Data"
import type { StepGroup, QuickCoachingGuideRow } from "@/features/quick_coaching_guide/model/Quick_Coaching_Guide_Model"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

interface CoachingGuideApiResponse {
  success: boolean
  contents: Array<{
    seq: number
    stepId: string
    guideContent: string
    contentType: string
    nextStepId: string | null
    sort: number
  }>
  buttons: Array<{
    seq: number
    stepId: string
    guideContent: string
    contentType: string
    nextStepId: string | null
    sort: number
  }>
  errorMessage?: string
}

function mapRows(
  items: CoachingGuideApiResponse["contents"]
): QuickCoachingGuideRow[] {
  return items.map((r) => ({
    Seq: r.seq,
    Step_Id: r.stepId,
    Guide_Content: r.guideContent,
    Content_Type: r.contentType as "message" | "button" | "reservation",
    Next_Step_Id: r.nextStepId,
    Sort: r.sort,
    Reg_Date: "",
  }))
}

export async function getStepData(stepId: string, type: string = "Mind"): Promise<StepGroup> {
  const params = new URLSearchParams({ stepId, type })
  const response = await fetch(`${API_URL}/api/coaching-guide/step?${params}`)

  if (!response.ok) {
    throw new Error(`퀵코칭가이드 조회 오류: ${response.status}`)
  }

  const data: CoachingGuideApiResponse = await response.json()

  if (!data.success) {
    throw new Error(`퀵코칭가이드 조회 오류: ${data.errorMessage || "unknown"}`)
  }

  return transformToStepGroup(mapRows(data.contents), mapRows(data.buttons))
}
