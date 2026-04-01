import { Baby, BookOpen, Smile, Sparkles } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface AgeSummaryItem {
  type: string
  range: string
  title: string
  description: string
  highlights: string[]
  icon: LucideIcon
  tone: {
    ring: string
    iconBg: string
    iconText: string
    bullet: string
  }
}

export const COUNSELING_AGE_DATA: AgeSummaryItem[] = [
  {
    type: "infant",
    range: "0~2세",
    title: "애착과 정서 안정",
    description: "분리 불안, 수면, 양육 스트레스처럼 초기 정서 과제를 상담 중심으로 다룹니다.",
    highlights: ["양육자-영아 상호작용 관찰", "수면/생활 루틴 안정화", "초기 발달 신호 체크"],
    icon: Baby,
    tone: {
      ring: "border-cyan-200",
      iconBg: "bg-cyan-50",
      iconText: "text-cyan-700",
      bullet: "bg-cyan-600",
    },
  },
  {
    type: "preschool",
    range: "3~6세",
    title: "감정 표현과 사회성",
    description: "떼쓰기, 위축, 또래 갈등 등 유아기 행동·정서 이슈를 상담으로 조율합니다.",
    highlights: ["감정 인식 놀이상담", "가정 내 행동 지도 코칭", "또래 관계 어려움 상담"],
    icon: Smile,
    tone: {
      ring: "border-orange-200",
      iconBg: "bg-orange-50",
      iconText: "text-orange-700",
      bullet: "bg-orange-600",
    },
  },
  {
    type: "school-age",
    range: "7~12세",
    title: "학교 적응과 학습 정서",
    description: "학습 불안, 자존감 저하, 집중 어려움을 상담으로 점검하고 회복합니다.",
    highlights: ["학습 스트레스 상담", "자존감 회복 세션", "부모-자녀 갈등 중재"],
    icon: BookOpen,
    tone: {
      ring: "border-emerald-200",
      iconBg: "bg-emerald-50",
      iconText: "text-emerald-700",
      bullet: "bg-emerald-600",
    },
  },
  {
    type: "teen",
    range: "13~18세",
    title: "불안·우울 정서 지원",
    description: "청소년기의 정체성 혼란과 정서 기복을 전문 심리상담으로 지원합니다.",
    highlights: ["정서 위험 신호 조기 점검", "진로·관계 스트레스 상담", "자기이해 심층 인터뷰"],
    icon: Sparkles,
    tone: {
      ring: "border-indigo-200",
      iconBg: "bg-indigo-50",
      iconText: "text-indigo-700",
      bullet: "bg-indigo-600",
    },
  },
]

export const COACHING_AGE_DATA: AgeSummaryItem[] = [
  {
    type: "infant",
    range: "0~2세",
    title: "자극 반응 코칭",
    description: "영아기 감각 반응과 생활 리듬을 기반으로 성장 자극 루틴을 설계합니다.",
    highlights: ["감각 자극 놀이 플랜", "양육자 실습 피드백", "성장 루틴 코칭"],
    icon: Baby,
    tone: {
      ring: "border-cyan-200",
      iconBg: "bg-cyan-50",
      iconText: "text-cyan-700",
      bullet: "bg-cyan-600",
    },
  },
  {
    type: "preschool",
    range: "3~6세",
    title: "기초 습관 코칭",
    description: "유아기의 자율성, 표현력, 기본 생활 습관을 성장 코칭으로 만들어갑니다.",
    highlights: ["자기표현 놀이 코칭", "기초 루틴 정착 훈련", "부모 실천 체크리스트"],
    icon: Smile,
    tone: {
      ring: "border-orange-200",
      iconBg: "bg-orange-50",
      iconText: "text-orange-700",
      bullet: "bg-orange-600",
    },
  },
  {
    type: "school-age",
    range: "7~12세",
    title: "학습 동기 코칭",
    description: "초등기 강점을 발견하고 목표를 작게 쪼개 실행하는 코칭을 제공합니다.",
    highlights: ["학습 습관 루틴 설계", "강점 기반 과제 설계", "자기주도 목표 점검"],
    icon: BookOpen,
    tone: {
      ring: "border-emerald-200",
      iconBg: "bg-emerald-50",
      iconText: "text-emerald-700",
      bullet: "bg-emerald-600",
    },
  },
  {
    type: "teen",
    range: "13~18세",
    title: "진로 실행 코칭",
    description: "관심 분야를 탐색하고 학업·진로 목표를 실행 가능한 단위로 코칭합니다.",
    highlights: ["진로 탐색 로드맵", "실행 습관 트래킹", "자기주도 의사결정 코칭"],
    icon: Sparkles,
    tone: {
      ring: "border-indigo-200",
      iconBg: "bg-indigo-50",
      iconText: "text-indigo-700",
      bullet: "bg-indigo-600",
    },
  },
]
