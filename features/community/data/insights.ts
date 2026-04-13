export type InsightGrade = "초등 저학년" | "초등 고학년" | "중학생" | "고등학생"
export type InsightGradeFilter = "전체" | InsightGrade

export const INSIGHT_GRADE_FILTERS: InsightGradeFilter[] = ["전체", "초등 저학년", "초등 고학년", "중학생", "고등학생"]

export const INSIGHT_GRADE_BADGE_TONE: Record<InsightGrade, string> = {
  "초등 저학년": "bg-[#EAF3FF] text-[#3378F6]",
  "초등 고학년": "bg-[#EAFBF2] text-[#12905D]",
  중학생: "bg-[#FFF5E7] text-[#D9821B]",
  고등학생: "bg-[#FFF0F4] text-[#D0527E]",
}

export const DEFAULT_INSIGHT_COVER_IMAGE = "/default-thumbnail.jpg"

export function resolveInsightCoverImage(coverImage: string | null | undefined) {
  const normalizedCoverImage = coverImage?.trim()
  return normalizedCoverImage ? normalizedCoverImage : DEFAULT_INSIGHT_COVER_IMAGE
}

export type InsightHighlightItem = {
  id: string
  grade: InsightGrade
  category: string
  title: string
  summary: string
  author: string
  publishedAt: string
  tags: string[]
  coverImage: string | null
  imageOverlayClass: string
  imagePositionClass: string
}

export type InsightBoardItem = {
  id: string
  grade: InsightGrade
  category: string
  title: string
  summary: string
  author: string
  publishedAt: string
  views: number
  comments: number
  tags: string[]
  coverImage: string | null
}

export type InsightPost = {
  id: string
  grade: InsightGrade
  category: string
  title: string
  summary: string
  author: string
  publishedAt: string
  tags: string[]
  coverImage: string | null
  views?: number
  comments?: number
}

export const INSIGHT_HIGHLIGHT_ITEMS: InsightHighlightItem[] = [
  {
    id: "highlight-1",
    grade: "초등 저학년",
    category: "칼럼 추천",
    title: "초등 저학년 감정 폭발, 부모가 먼저 바꿔야 할 3가지 반응",
    summary:
      "아이의 감정 폭발을 멈추게 하려는 반응보다, 감정을 안전하게 다루도록 돕는 반응이 장기적으로 더 큰 변화를 만듭니다.",
    author: "김지원 전문코치",
    publishedAt: "2026.04.01",
    tags: ["감정코칭", "초등", "부모대화"],
    coverImage: "/placeholder.jpg",
    imageOverlayClass: "bg-[#FDE047]/35",
    imagePositionClass: "object-center",
  },
  {
    id: "highlight-2",
    grade: "초등 고학년",
    category: "인터뷰",
    title: "학습 동기가 떨어진 아이, 무엇부터 점검해야 할까요?",
    summary:
      "동기 저하를 의지 부족으로 보지 않고, 일상 리듬과 성공 경험의 설계 관점에서 다시 읽어내는 현장 전문가 인터뷰입니다.",
    author: "박현우 책임코치",
    publishedAt: "2026.03.29",
    tags: ["학습코칭", "동기", "인터뷰"],
    coverImage: "/placeholder-user.jpg",
    imageOverlayClass: "bg-sky-400/25",
    imagePositionClass: "object-top",
  },
]

export const INSIGHT_BOARD_ITEMS: InsightBoardItem[] = [
  {
    id: "board-1",
    grade: "초등 저학년",
    category: "전문가 칼럼",
    title: "등교 전 매일 실랑이가 반복될 때, 아침 루틴을 재설계하는 방법",
    summary: "시간표보다 감정 흐름을 먼저 정리하면 아침 갈등을 크게 줄일 수 있습니다. 가정에서 바로 적용 가능한 루틴 설계법을 소개합니다.",
    author: "이서연 코치",
    publishedAt: "2026.03.27",
    views: 1824,
    comments: 14,
    tags: ["아침루틴", "등교거부", "실행전략"],
    coverImage: "/placeholder.jpg",
  },
  {
    id: "board-2",
    grade: "초등 고학년",
    category: "인터뷰",
    title: "또래관계에서 자주 위축되는 아이, 부모 피드백은 어떻게 달라져야 하나요",
    summary: "사회성 코칭 현장에서 가장 자주 나오는 질문을 중심으로, 부모의 피드백 언어를 구체적으로 바꾸는 포인트를 정리했습니다.",
    author: "정하늘 상담사",
    publishedAt: "2026.03.24",
    views: 1536,
    comments: 9,
    tags: ["사회성", "또래관계", "부모코칭"],
    coverImage: "/placeholder-user.jpg",
  },
  {
    id: "board-3",
    grade: "중학생",
    category: "전문가 칼럼",
    title: "칭찬을 해도 효과가 없을 때, 결과보다 과정에 초점을 맞추는 대화법",
    summary: "\"잘했어\"를 반복해도 변화가 적다면, 아이가 통제 가능한 과정 행동을 짚어주는 칭찬 구조로 전환해야 합니다.",
    author: "김도윤 전문위원",
    publishedAt: "2026.03.20",
    views: 2142,
    comments: 22,
    tags: ["칭찬법", "자기효능감", "관계대화"],
    coverImage: "/placeholder.jpg",
  },
  {
    id: "board-4",
    grade: "중학생",
    category: "인터뷰",
    title: "사춘기 자녀와의 갈등, 규칙을 세우기 전에 먼저 합의해야 하는 것",
    summary: "규칙 자체보다 \"왜 필요한지\"를 함께 합의하는 과정이 갈등 강도를 낮춥니다. 실제 상담 사례를 바탕으로 설명합니다.",
    author: "최유진 수석코치",
    publishedAt: "2026.03.17",
    views: 1978,
    comments: 18,
    tags: ["사춘기", "가족규칙", "갈등조율"],
    coverImage: "/placeholder-user.jpg",
  },
  {
    id: "board-5",
    grade: "고등학생",
    category: "전문가 칼럼",
    title: "스마트폰 사용 갈등, 통제보다 자기조절을 키우는 2단계 약속 설계",
    summary: "일방적 제한은 반발을 키우기 쉽습니다. 아이가 스스로 지킬 수 있는 최소 약속부터 설계하는 방법을 다룹니다.",
    author: "한지민 코치",
    publishedAt: "2026.03.14",
    views: 1689,
    comments: 11,
    tags: ["미디어사용", "자기조절", "가정규칙"],
    coverImage: "/placeholder.jpg",
  },
  {
    id: "board-6",
    grade: "고등학생",
    category: "인터뷰",
    title: "부모 코칭을 병행하면 아이의 변화 속도가 빨라지는 이유",
    summary: "아이 세션만으로는 유지가 어려운 변화도, 부모의 일상 반응이 함께 바뀌면 더 안정적으로 지속됩니다.",
    author: "윤소민 책임상담사",
    publishedAt: "2026.03.10",
    views: 1420,
    comments: 7,
    tags: ["부모코칭", "변화유지", "사례인터뷰"],
    coverImage: "/placeholder-user.jpg",
  },
]

export function getInsightPostById(id: string): InsightPost | undefined {
  const highlightPost = INSIGHT_HIGHLIGHT_ITEMS.find((item) => item.id === id)
  if (highlightPost) {
    return {
      ...highlightPost,
    }
  }

  const boardPost = INSIGHT_BOARD_ITEMS.find((item) => item.id === id)
  if (!boardPost) {
    return undefined
  }

  return {
    ...boardPost,
  }
}
