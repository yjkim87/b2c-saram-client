export type ProgramDetailType =
  | "emotion-care"
  | "behavior-support"
  | "family-bridge"
  | "strength-up"
  | "career-map"
  | "future-lead"

export interface ProgramOverviewItem {
  type: ProgramDetailType
  title: string
  description: string
}

export interface ProgramDetailContent {
  title: string
  description: string
  focus: string[]
  outcome: string[]
}

export const PROGRAM_OVERVIEW_ITEMS: ProgramOverviewItem[] = [
  { type: "emotion-care", title: "정서 안정", description: "감정 조절과 회복 루틴 설계" },
  { type: "behavior-support", title: "행동 지원", description: "행동 패턴 분석과 개입 전략" },
  { type: "family-bridge", title: "가족 관계", description: "부모-자녀 소통 구조 재설계" },
  { type: "strength-up", title: "강점 성장", description: "강점 기반 목표 실행 코칭" },
  { type: "career-map", title: "진로 탐색", description: "흥미·적성 기반 방향 설정" },
  { type: "future-lead", title: "미래 역량", description: "자기주도·협업·리더십 강화" },
]

export const PROGRAM_DETAIL_CONTENT: Record<ProgramDetailType, ProgramDetailContent> = {
  "emotion-care": {
    title: "정서 안정 프로그램 상세",
    description: "불안, 우울, 분노 등 정서 이슈를 회복 중심으로 다루는 상담 트랙입니다.",
    focus: ["감정 인식 및 표현 훈련", "일상 회복 루틴 설계", "보호자 피드백 세션"],
    outcome: ["감정 폭발 빈도 완화", "생활 리듬 안정화", "가정 내 갈등 감소"],
  },
  "behavior-support": {
    title: "행동 지원 프로그램 상세",
    description: "행동 문제의 배경 요인을 분석해 환경 조정과 대체 행동을 설계합니다.",
    focus: ["행동 패턴 관찰", "유발 상황 분석", "가정/학교 적용 가이드"],
    outcome: ["반복 행동 감소", "자기조절 향상", "보호자 대응 자신감 강화"],
  },
  "family-bridge": {
    title: "가족 관계 프로그램 상세",
    description: "가족 내 대화 흐름을 재구성해 정서적 연결을 회복하는 프로그램입니다.",
    focus: ["의사소통 패턴 진단", "갈등 장면 리프레이밍", "가족 공동 실천 과제"],
    outcome: ["대화 빈도·질 개선", "관계 긴장 완화", "상호 신뢰 회복"],
  },
  "strength-up": {
    title: "강점 성장 프로그램 상세",
    description: "강점 기반 목표를 수립하고 작은 성취 루프를 확장하는 코칭 트랙입니다.",
    focus: ["강점 탐색 인터뷰", "단기 목표 설계", "주간 실행 점검"],
    outcome: ["자기효능감 향상", "실행 지속성 강화", "성취 경험 축적"],
  },
  "career-map": {
    title: "진로 탐색 프로그램 상세",
    description: "적성·흥미 기반으로 현실 가능한 진로 경로를 설계합니다.",
    focus: ["진로 관심사 구조화", "경로별 정보 리서치", "실행 일정 설계"],
    outcome: ["진로 선택 명확화", "목표 우선순위 정리", "실행 계획 구체화"],
  },
  "future-lead": {
    title: "미래 역량 프로그램 상세",
    description: "자기주도성, 협업, 커뮤니케이션을 실전 과제 중심으로 강화합니다.",
    focus: ["프로젝트 기반 코칭", "협업 피드백 루프", "리더십 행동 실습"],
    outcome: ["문제해결 역량 강화", "협업 태도 개선", "자기주도 실행력 향상"],
  },
}
