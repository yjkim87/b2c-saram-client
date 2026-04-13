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
      border: "border-[#E9C9AF]",
      badgeBg: "bg-[#FBE7D6]",
      badgeText: "text-[#D76E2D]",
      iconBg: "bg-[#FDF2E9]",
      iconText: "text-[#D76E2D]",
    },
  },
  {
    type: "behavior-support",
    title: "진로 코칭",
    tag: "탐색",
    description: "흥미와 적성을 탐색하여 미래 방향성을 스스로 설계하도록 안내합니다.",
    icon: Heart,
    tone: {
      border: "border-[#E4CBB5]",
      badgeBg: "bg-[#F7E9DC]",
      badgeText: "text-[#A56840]",
      iconBg: "bg-[#FCF2E8]",
      iconText: "text-[#A56840]",
    },
  },
  {
    type: "family-bridge",
    title: "사회성 코칭",
    tag: "관계",
    description: "또래 관계, 리십, 공감 능력을 체계적 프로그램으로 계발합니다.",
    icon: Shield,
    tone: {
      border: "border-[#DFC4AF]",
      badgeBg: "bg-[#F4E6D8]",
      badgeText: "text-[#7F5338]",
      iconBg: "bg-[#FBF0E6]",
      iconText: "text-[#7F5338]",
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
      border: "border-[#E9C9AF]",
      badgeBg: "bg-[#FBE7D6]",
      badgeText: "text-[#D76E2D]",
      iconBg: "bg-[#FDF2E9]",
      iconText: "text-[#D76E2D]",
    },
  },
  {
    type: "career-map",
    title: "진로 코칭",
    tag: "탐색",
    description: "흥미와 적성을 탐색하여 미래 방향성을 스스로 설계하도록 안내합니다.",
    icon: Compass,
    tone: {
      border: "border-[#E4CBB5]",
      badgeBg: "bg-[#F7E9DC]",
      badgeText: "text-[#A56840]",
      iconBg: "bg-[#FCF2E8]",
      iconText: "text-[#A56840]",
    },
  },
  {
    type: "future-lead",
    title: "사회성 코칭",
    tag: "관계",
    description: "또래 관계, 리더십, 공감 능력을 체계적 프로그램으로 계발합니다.",
    icon: Users,
    tone: {
      border: "border-[#DFC4AF]",
      badgeBg: "bg-[#F4E6D8]",
      badgeText: "text-[#7F5338]",
      iconBg: "bg-[#FBF0E6]",
      iconText: "text-[#7F5338]",
    },
  },
]
