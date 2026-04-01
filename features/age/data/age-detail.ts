export type AgeDetailType = "infant" | "preschool" | "school-age" | "teen"

export interface AgeOverviewItem {
  type: AgeDetailType
  title: string
  description: string
}

export interface AgeDetailContent {
  title: string
  description: string
  highlights: string[]
  supportGuide: string[]
}

export const AGE_OVERVIEW_ITEMS: AgeOverviewItem[] = [
  { type: "infant", title: "0~2세", description: "애착 형성과 생활 리듬 지원" },
  { type: "preschool", title: "3~6세", description: "감정 표현과 사회성 성장" },
  { type: "school-age", title: "7~12세", description: "학습 정서와 관계 적응" },
  { type: "teen", title: "13~18세", description: "정체성·진로 의사결정 확장" },
]

export const AGE_DETAIL_CONTENT: Record<AgeDetailType, AgeDetailContent> = {
  infant: {
    title: "0~2세 상세 가이드",
    description: "애착 형성, 수면 루틴, 초기 정서 신호 관찰을 중심으로 구성됩니다.",
    highlights: [
      "양육자-영아 상호작용 관찰 포인트",
      "낮잠/야간 수면 안정화 체크리스트",
      "분리 불안과 초기 울음 신호 해석",
    ],
    supportGuide: [
      "가정 내 안정 루틴 설계",
      "양육자 피드백 세션",
      "초기 발달 모니터링 가이드",
    ],
  },
  preschool: {
    title: "3~6세 상세 가이드",
    description: "유아기 감정 조절, 놀이 상호작용, 사회성 과제를 다룹니다.",
    highlights: [
      "떼쓰기/위축 행동의 원인 점검",
      "놀이 기반 감정 인식 훈련",
      "또래 관계 갈등 대응 가이드",
    ],
    supportGuide: [
      "가정 내 언어·표현 코칭",
      "행동 지도 루틴 설계",
      "보호자-교사 협업 포인트",
    ],
  },
  "school-age": {
    title: "7~12세 상세 가이드",
    description: "학습 스트레스, 자존감, 학교 적응을 회복 중심으로 안내합니다.",
    highlights: [
      "학습 회피/불안 신호 분석",
      "자기조절 습관 점검",
      "친구 관계 갈등 중재 포인트",
    ],
    supportGuide: [
      "주간 루틴 리디자인",
      "부모 피드백 대화 스크립트",
      "학습-정서 균형 계획",
    ],
  },
  teen: {
    title: "13~18세 상세 가이드",
    description: "청소년기 정체성, 감정 기복, 진로 고민을 통합적으로 다룹니다.",
    highlights: [
      "불안·우울 위험 신호 조기 점검",
      "자기이해 기반 진로 탐색 질문",
      "가족 대화 갈등 완화 전략",
    ],
    supportGuide: [
      "개인 목표 설정 코칭",
      "관계 스트레스 관리 루틴",
      "월간 점검 리포트 가이드",
    ],
  },
}
