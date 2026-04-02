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
    range: "0-2세",
    title: "영아기",
    description: "초기 발달 신호를 점검하고 안정적인 애착 형성을 돕습니다.",
    highlights: ["발달 지연 조기 발견", "부모 상담 및 교육", "정서적 안정 지원"],
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
    range: "3-5세",
    title: "유아기",
    description: "감정 표현과 사회성 이슈를 안정적으로 다루는 시기입니다.",
    highlights: ["분리 불안 상담", "언어 발달 치료 연계", "행동 문제 평가"],
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
    range: "6-12세",
    title: "아동기",
    description: "학습 및 또래 관계의 어려움을 객관적으로 평가하고 개입합니다.",
    highlights: ["학습 장애 평가", "ADHD 행동 코칭", "또래 갈등 중재"],
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
    range: "13-18세",
    title: "청소년기",
    description: "정체성 변화와 정서 기복을 전문적으로 지원합니다.",
    highlights: ["불안·우울 상담", "자해·자살 위험 평가", "가족 관계 회복"],
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
    range: "0-2세",
    title: "영아기",
    description: "생활 리듬과 감각 반응을 기반으로 초기 성장 루틴을 만듭니다.",
    highlights: ["감각 자극 놀이 코칭", "부모-영아 상호작용 코칭", "두뇌 발달 자극"],
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
    range: "3-5세",
    title: "유아기",
    description: "자율성과 표현력을 키우는 기초 성장 루틴을 설계합니다.",
    highlights: ["강점 기반 놀이 코칭", "창의·상상력 코칭", "사회성 향상 코칭"],
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
    range: "6-12세",
    title: "아동기",
    description: "학습 동기와 자기주도 실행력을 키우는 시기입니다.",
    highlights: ["학습 동기 강화 코칭", "리더십·자존감 코칭", "진로 흥미 탐색"],
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
    range: "13-18세",
    title: "청소년기",
    description: "진로 탐색과 실행 목표를 구조화해 성장의 방향을 잡습니다.",
    highlights: ["자기 효능감 코칭", "진로 목표 설정", "스트레스 관리 코칭"],
    icon: Sparkles,
    tone: {
      ring: "border-indigo-200",
      iconBg: "bg-indigo-50",
      iconText: "text-indigo-700",
      bullet: "bg-indigo-600",
    },
  },
]
