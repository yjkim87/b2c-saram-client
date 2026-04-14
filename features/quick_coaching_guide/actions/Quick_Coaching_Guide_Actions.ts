// ------------------------------------------------------------------------------
// 화 일 명 : Quick_Coaching_Guide_Actions.ts
// 용    도 : Server Action + 비즈니스 로직 (DB 조회(DAO)를 호출하고 결과를 화면에 맞는 형태로 가공하여 반환)
// 작성일시 : 2026-04-13 (김재국)
// 수정일시 : 
// 주의사항 :
//-------------------------------------------------------------------------------

"use server"

import { QuickCoachingGuideDao } from "@/features/quick_coaching_guide/dao/Quick_Coaching_Guide_Dao"
import { transformToStepGroup } from "@/features/quick_coaching_guide/lib/Quick_Coaching_Guide_Data"
import type { StepGroup } from "@/features/quick_coaching_guide/model/Quick_Coaching_Guide_Model"

const dao = new QuickCoachingGuideDao()

// ─────────────────────────────────────────────────────────────────────────────
// 2026-04-13 (김재국) - 퀵코칭가이드 정보 조회
// ─────────────────────────────────────────────────────────────────────────────
export async function getStepData(stepId: string): Promise<StepGroup> {
  try {
    const { contents, buttons } = await dao.LF_Quick_Coaching_Guide_Info(stepId)
    return transformToStepGroup(contents, buttons)
  } catch (e) {
    const err = e as Error
    throw new Error(`퀵코칭가이드 조회 오류: ${err.message}`)
  }
}
