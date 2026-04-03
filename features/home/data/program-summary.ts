import { Brain, Compass, Heart, Shield, TrendingUp, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface ProgramSummaryItem {
  type: string
  title: string
  tag: string
  description: string
  icon: LucideIcon
  tone: {
    border: string
    badgeBg: string
    badgeText: string
    iconBg: string
    iconText: string
  }
}

export const COUNSELING_PROGRAM_DATA: ProgramSummaryItem[] = [
  {
    type: "emotion-care",
    title: "강점 코칭",
    tag: "성장",
    description: "아이만의 고유한 강점을 발견하고 자신감과 자기효능감을 높여드립니다.",
    icon: Brain,
    tone: {
      border: "border-rose-200",
      badgeBg: "bg-rose-100",
      badgeText: "text-rose-700",
      iconBg: "bg-rose-50",
      iconText: "text-rose-700",
    },
  },
  {
    type: "behavior-support",
    title: "진로 코칭",
    tag: "탐색",
    description: "흥미와 적성을 탐색하여 미래 방향성을 스스로 설계하도록 안내합니다.",
    icon: Heart,
    tone: {
      border: "border-sky-200",
      badgeBg: "bg-sky-100",
      badgeText: "text-sky-700",
      iconBg: "bg-sky-50",
      iconText: "text-sky-700",
    },
  },
  {
    type: "family-bridge",
    title: "사회성 코칭",
    tag: "관계",
    description: "또래 관계, 리십, 공감 능력을 체계적 프로그램으로 계발합니다.",
    icon: Shield,
    tone: {
      border: "border-emerald-200",
      badgeBg: "bg-emerald-100",
      badgeText: "text-emerald-700",
      iconBg: "bg-emerald-50",
      iconText: "text-emerald-700",
    },
  },
]

export const COACHING_PROGRAM_DATA: ProgramSummaryItem[] = [
  {
    type: "strength-up",
    title: "강점 코칭",
    tag: "성장",
    description: "아이만의 고유한 강점을 발견하고 자신감과 자기효능감을 높여드립니다.",
    icon: TrendingUp,
    tone: {
      border: "border-amber-200",
      badgeBg: "bg-amber-100",
      badgeText: "text-amber-700",
      iconBg: "bg-amber-50",
      iconText: "text-amber-700",
    },
  },
  {
    type: "career-map",
    title: "진로 코칭",
    tag: "탐색",
    description: "흥미와 적성을 탐색하여 미래 방향성을 스스로 설계하도록 안내합니다.",
    icon: Compass,
    tone: {
      border: "border-violet-200",
      badgeBg: "bg-violet-100",
      badgeText: "text-violet-700",
      iconBg: "bg-violet-50",
      iconText: "text-violet-700",
    },
  },
  {
    type: "future-lead",
    title: "사회성 코칭",
    tag: "관계",
    description: "또래 관계, 리더십, 공감 능력을 체계적 프로그램으로 계발합니다.",
    icon: Users,
    tone: {
      border: "border-cyan-200",
      badgeBg: "bg-cyan-100",
      badgeText: "text-cyan-700",
      iconBg: "bg-cyan-50",
      iconText: "text-cyan-700",
    },
  },
]
