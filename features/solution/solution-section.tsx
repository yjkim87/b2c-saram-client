"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import {
  ArrowRight,
  Baby,
  BookOpen,
  Brain,
  CheckCircle2,
  Compass,
  Heart,
  Shield,
  Smile,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { ReservationCTAButton } from "@/shared/ui/reservation-cta-button"

type SectionVariant = "preview" | "full"
type SolutionTab = "counseling" | "coaching"

interface SolutionSectionProps {
  variant?: SectionVariant
}

interface StageItem {
  label: string
  range: string
  icon: LucideIcon
  tone: {
    iconBg: string
    iconText: string
    border: string
    bullet: string
  }
  counseling: string[]
  coaching: string[]
}

interface SolutionCardItem {
  icon: LucideIcon
  category: string
  title: string
  description: string
  color: {
    bar: string
    iconBg: string
    iconText: string
    chipBg: string
    chipText: string
  }
}

interface SolutionTabData {
  cards: SolutionCardItem[]
}

const SOLUTION_TABS: Array<{ id: SolutionTab; label: string; icon: string }> = [
  { id: "counseling", label: "상담심리", icon: "🧠" },
  { id: "coaching", label: "코칭심리", icon: "📈" },
]

const AGE_STAGES: StageItem[] = [
  {
    label: "영아기",
    range: "0 - 2세",
    icon: Baby,
    tone: {
      iconBg: "bg-cyan-50",
      iconText: "text-cyan-700",
      border: "border-cyan-200",
      bullet: "text-cyan-700",
    },
    counseling: ["발달 지연 조기 발견", "부모 상담 및 교육", "정서적 안정 지원"],
    coaching: ["감각 통합 활동 코칭", "부모-영아 상호작용 코칭", "기초 발달 놀이 코칭"],
  },
  {
    label: "유아기",
    range: "3 - 5세",
    icon: Smile,
    tone: {
      iconBg: "bg-orange-50",
      iconText: "text-orange-700",
      border: "border-orange-200",
      bullet: "text-orange-700",
    },
    counseling: ["분리 불안 상담", "언어 발달 치료 연계", "행동 문제 평가"],
    coaching: ["강점 기반 부모 코칭", "창의·사고력 프로그램", "사회성 기초 코칭"],
  },
  {
    label: "아동기",
    range: "6 - 12세",
    icon: BookOpen,
    tone: {
      iconBg: "bg-emerald-50",
      iconText: "text-emerald-700",
      border: "border-emerald-200",
      bullet: "text-emerald-700",
    },
    counseling: ["학습 장애 평가", "ADHD 행동 코칭", "또래 갈등 중재"],
    coaching: ["학습 동기 강화 코칭", "리더십·자존감 코칭", "진로 탐색 코칭"],
  },
  {
    label: "청소년기",
    range: "13 - 18세",
    icon: Sparkles,
    tone: {
      iconBg: "bg-indigo-50",
      iconText: "text-indigo-700",
      border: "border-indigo-200",
      bullet: "text-indigo-700",
    },
    counseling: ["불안·우울 상담", "자해·자살 위험 평가", "가족 관계 회복"],
    coaching: ["자기효능감 코칭", "진로 목표 설정", "스트레스 관리 코칭"],
  },
]

const SOLUTION_DATA: Record<SolutionTab, SolutionTabData> = {
  counseling: {
    cards: [
      {
        icon: Brain,
        category: "진단",
        title: "심리 평가",
        description: "표준화 검사를 통해 아이의 발달 수준과 정서 상태를 종합적으로 평가합니다.",
        color: {
          bar: "bg-emerald-500",
          iconBg: "bg-emerald-50",
          iconText: "text-emerald-600",
          chipBg: "bg-emerald-50",
          chipText: "text-emerald-700",
        },
      },
      {
        icon: Heart,
        category: "치유",
        title: "정서 상담",
        description: "불안, 우울, 분노 같은 정서적 어려움을 전문 상담사가 함께 다룹니다.",
        color: {
          bar: "bg-orange-500",
          iconBg: "bg-orange-50",
          iconText: "text-orange-600",
          chipBg: "bg-orange-50",
          chipText: "text-orange-700",
        },
      },
      {
        icon: Shield,
        category: "치료",
        title: "행동 치료",
        description: "ADHD, 틱, 공격성 등 행동 문제에 대해 근거 기반 개입을 제공합니다.",
        color: {
          bar: "bg-sky-500",
          iconBg: "bg-sky-50",
          iconText: "text-sky-600",
          chipBg: "bg-sky-50",
          chipText: "text-sky-700",
        },
      },
    ],
  },
  coaching: {
    cards: [
      {
        icon: TrendingUp,
        category: "성장",
        title: "강점 코칭",
        description: "아이 고유의 강점을 발견하고, 자신감과 자기효능감을 키울 수 있도록 돕습니다.",
        color: {
          bar: "bg-emerald-500",
          iconBg: "bg-emerald-50",
          iconText: "text-emerald-600",
          chipBg: "bg-emerald-50",
          chipText: "text-emerald-700",
        },
      },
      {
        icon: Compass,
        category: "탐색",
        title: "진로 코칭",
        description: "흥미와 적성을 탐색해 미래의 방향성을 스스로 설계할 수 있게 안내합니다.",
        color: {
          bar: "bg-orange-500",
          iconBg: "bg-orange-50",
          iconText: "text-orange-600",
          chipBg: "bg-orange-50",
          chipText: "text-orange-700",
        },
      },
      {
        icon: Users,
        category: "관계",
        title: "사회성 코칭",
        description: "또래 관계, 공감, 협력 같은 핵심 사회성 역량을 단계적으로 훈련합니다.",
        color: {
          bar: "bg-sky-500",
          iconBg: "bg-sky-50",
          iconText: "text-sky-600",
          chipBg: "bg-sky-50",
          chipText: "text-sky-700",
        },
      },
    ],
  },
}

function SolutionTabs({
  activeTab,
  onChange,
}: {
  activeTab: SolutionTab
  onChange: (tab: SolutionTab) => void
}) {
  const tabButtonRefs = useRef<Record<SolutionTab, HTMLButtonElement | null>>({
    counseling: null,
    coaching: null,
  })
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false })

  const updateIndicator = useCallback(() => {
    const activeButton = tabButtonRefs.current[activeTab]
    if (!activeButton) return

    setIndicator({
      left: activeButton.offsetLeft,
      width: activeButton.offsetWidth,
      ready: true,
    })
  }, [activeTab])

  useEffect(() => {
    updateIndicator()
  }, [updateIndicator])

  useEffect(() => {
    const handleResize = () => updateIndicator()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [updateIndicator])

  const handleClick = (tab: SolutionTab) => {
    onChange(tab)

    const button = tabButtonRefs.current[tab]
    if (!button) return

    button.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
  }

  return (
    <div className="relative w-full max-w-full md:w-auto">
      <div className="w-full rounded-full border border-white/50 bg-[#EEF1F6]/85 p-1.5 shadow-sm backdrop-blur-md md:w-auto">
        <div className="relative flex w-full items-center gap-1 md:w-auto">
          {/* [변경] indicator 애니메이션 코드: active 탭 기준 left/width pill 슬라이드 이동 */}
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute left-0 top-0 z-0 h-full rounded-full bg-[#2B66F6] shadow-md shadow-blue-500/20 transition-all duration-300 ease-out",
              indicator.ready ? "opacity-100" : "opacity-0"
            )}
            style={{
              left: indicator.left,
              width: indicator.width,
            }}
          />

          {SOLUTION_TABS.map((tab) => {
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabButtonRefs.current[tab.id] = el
                }}
                type="button"
                onClick={() => handleClick(tab.id)}
                className={cn(
                  "relative z-10 inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-full px-5 py-2.5 text-[14px] font-bold transition-colors duration-300 md:flex-none md:px-6 md:text-[15px]",
                  isActive ? "text-white" : "text-slate-500 hover:text-slate-800"
                )}
                aria-pressed={isActive}
              >
                <span className="mr-1.5 hidden align-middle md:inline" aria-hidden="true">
                  {tab.icon}
                </span>
                <span className="align-middle">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function AnimatedReveal({
  children,
  delay,
  durationMs = 520,
}: {
  children: ReactNode
  delay: number
  durationMs?: number
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    // [변경] Intersection Observer: 스크롤로 카드가 화면에 들어올 때 애니메이션 실행
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className="will-change-transform"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0px)" : "translateY(24px)",
        transitionProperty: "opacity, transform",
        transitionDuration: `${durationMs}ms`,
        transitionTimingFunction: "ease-out",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function AgeStageCard({ stage, activeTab }: { stage: StageItem; activeTab: SolutionTab }) {
  const Icon = stage.icon
  const features = activeTab === "counseling" ? stage.counseling : stage.coaching

  return (
    <article className={cn("rounded-2xl border bg-white p-6 shadow-sm", stage.tone.border)}>
      <div className="mb-5 flex items-center gap-3">
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", stage.tone.iconBg)}>
          <Icon className={cn("h-5 w-5", stage.tone.iconText)} />
        </div>
        <div>
          <p className="text-2xl font-bold tracking-tight text-slate-900">{stage.label}</p>
          <p className="text-sm text-slate-500">{stage.range}</p>
        </div>
      </div>

      <ul className="space-y-2">
        {features.map((feature) => (
          <li key={`${stage.label}-${feature}`} className="flex items-start gap-2 text-sm text-slate-600">
            <CheckCircle2 className={cn("mt-0.5 h-4 w-4 shrink-0", stage.tone.bullet)} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

function SolutionCard({ card }: { card: SolutionCardItem }) {
  const Icon = card.icon

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className={cn("h-1 w-full", card.color.bar)} />

      <div className="flex h-full flex-col gap-4 p-6">
        <div className="flex items-start gap-4">
          <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", card.color.iconBg)}>
            <Icon className={cn("h-5 w-5", card.color.iconText)} />
          </div>

          <div className="min-w-0 flex-1">
            <span
              className={cn(
                "mb-2 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold",
                card.color.chipBg,
                card.color.chipText
              )}
            >
              {card.category}
            </span>
            <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-slate-600">{card.description}</p>
      </div>
    </article>
  )
}

function SolutionSectionContent({ variant }: { variant: SectionVariant }) {
  const [activeTab, setActiveTab] = useState<SolutionTab>("counseling")

  const activeCards = useMemo(() => SOLUTION_DATA[activeTab].cards, [activeTab])
  const ageDescription =
    activeTab === "counseling"
      ? "연령별 발달 특성에 맞는 심리 평가와 상담을 제공합니다"
      : "연령별 성장 단계에 맞는 코칭 프로그램을 제공합니다"

  return (
    <section id="solution">
      {/* [변경] sticky 적용 위치: 탭만 sticky, 부모 wrapper(아래 div) 범위 내에서만 유지 */}
      <div className="relative">
        <div className="pointer-events-none sticky top-[74px] z-40 mb-12 flex justify-center px-4 md:top-[90px] md:mb-16">
          <div className="pointer-events-auto relative w-full max-w-full md:w-auto">
            <SolutionTabs activeTab={activeTab} onChange={setActiveTab} />
          </div>
        </div>

        <div className="bg-[#F2EFE8] pb-16 pt-6 md:pb-20 md:pt-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center md:mb-12">
              <div className="mb-4 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                연령별 세션
              </div>
              <h2 className="mb-3 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-[44px]">
                우리 아이 몇 살인가요?
              </h2>
              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">{ageDescription}</p>
            </div>

            {/* [변경] 탭 변경 시 key 리마운트 -> 카드 애니메이션 상태 초기화 후 재실행 */}
            <div key={`age-${activeTab}`}>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                {AGE_STAGES.map((stage, index) => (
                  <AnimatedReveal key={`${activeTab}-age-${stage.label}`} delay={index * 140} durationMs={700}>
                    <AgeStageCard stage={stage} activeTab={activeTab} />
                  </AnimatedReveal>
                ))}
              </div>
            </div>

            {variant === "preview" && (
              <div className="mt-10 flex justify-center">
                <Link
                  href="/solution"
                  className="inline-flex items-center gap-2 rounded-full border border-[#B9C8E1] bg-[#EEF1F6] px-7 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-[#E7EDF7]"
                >
                  솔루션 자세히 보기
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className={cn(variant === "preview" ? "py-16 md:py-20" : "py-16 md:py-24")}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center md:mb-12">
              <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                <span className="text-xs font-bold text-slate-700">전문 서비스</span>
              </div>

              <h2 className="mobile-auto-phrase mb-3 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-[40px]">
                과학적 접근, 따뜻한 마음으로
              </h2>

              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-500 md:text-base">
                발달심리학 이론을 바탕으로 아이 개개인의 특성을 고려하는 맞춤형 상담/코칭을 제공합니다.
              </p>
            </div>

            {/* [변경] 탭 변경 시 key 리마운트 -> 카드 애니메이션 상태 초기화 후 재실행 */}
            <div key={`service-${activeTab}`}>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {activeCards.map((card, index) => (
                  <AnimatedReveal key={`${activeTab}-service-${card.title}`} delay={index * 100}>
                    <SolutionCard card={card} />
                  </AnimatedReveal>
                ))}
              </div>
            </div>

            {variant === "preview" ? (
              <div className="mt-10 flex justify-center">
                <Link
                  href="/solution"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
                >
                  솔루션 자세히 보기
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="mt-12 text-center">
                <p className="mb-6 text-base font-medium text-slate-500">우리 아이에게 맞는 솔루션이 궁금하신가요?</p>
                <ReservationCTAButton className="mx-auto" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export function SolutionSection({ variant = "full" }: SolutionSectionProps) {
  return <SolutionSectionContent variant={variant} />
}
