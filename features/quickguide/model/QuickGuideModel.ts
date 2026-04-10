// ─────────────────────────────────────────────────────────────────────────────
// QuickGuideModel.ts
// USP_Guide_Chat_Info_S00 SP 결과 컬럼을 타입으로 정의
// ─────────────────────────────────────────────────────────────────────────────

// 3개 결과셋 모두 동일한 컬럼 구조
export interface GuideChatInfoRow {
  Seq:           number
  Guide_Content: string
  Step:          number
  Sort:          number
  Select_Num:    number
  Button_Yn:     string   // "Y" | "N"
  Reg_Date:      string
}

// ExcDS 반환값을 결과셋별로 명칭으로 구분 (C#의 DataSet.Tables[n] 대응)
export interface GuideChatInfoDS {
  contents:   GuideChatInfoRow[]  // recordsets[0] — 본문   (Button_Yn = 'N')
  buttons:    GuideChatInfoRow[]  // recordsets[1] — 버튼   (Button_Yn = 'Y')
  allButtons: GuideChatInfoRow[]  // recordsets[2] — 전체버튼 (Step 1,2,4)
}
