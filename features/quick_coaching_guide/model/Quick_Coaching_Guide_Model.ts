// ------------------------------------------------------------------------------
// 화 일 명 : Quick_Coaching_Guide_Model.ts
// 용    도 : 타입 / 인터페이스 모음 (DB 컬럼 구조와 화면 컴포넌트에서 사용하는 데이터 형태를 TypeScript 타입으로 정의)
// 작성일시 : 2026-04-13 (김재국)
// 수정일시 : 
// 주의사항 :
//-------------------------------------------------------------------------------

// ─────────────────────────────────────────────────────────────────────────────
// ContentType 설명:
//   'message'     : 퀵코칭가이드 메시지 본문
//   'button'      : 사용자 선택 버튼 (Next_Step_Id 필수)
//   'reservation' : 상담 예약 (Guide_Content = ''/reservation'')
// ─────────────────────────────────────────────────────────────────────────────
export type ContentType =
  | "message"
  | "button"
  | "reservation"

export interface QuickCoachingGuideRow {
  Seq:           number
  Step_Id:       string
  Guide_Content: string
  Content_Type:  ContentType
  Next_Step_Id:  string | null
  Sort:          number
  Reg_Date:      string
}

export interface QuickCoachingGuideDS {
  contents: QuickCoachingGuideRow[]  // recordsets[0] — Content_Type != 'button'
  buttons:  QuickCoachingGuideRow[]  // recordsets[1] — Content_Type == 'button'
}

// ── UI 모델 타입 (StepGroup) ──────────────────────────────────────────────────
export interface StepOption {
  label:        string
  description?: string
  nextStep:     string
}

export interface StepGroup {
  id:               string
  botMessage:       string
  options?:         StepOption[]
  reservationHref?: string
}
