"use client"

import Link from "next/link"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

import { cn } from "@/shared/lib/utils"
import { landingRadiusTokens } from "@/features/home/styles/landing-tokens"

type FeatureCardKey = "counseling" | "coaching"
type ExpandedCardState = FeatureCardKey | "all" | null

interface AgeAccordionItem {
  key: string
  rangeLabel: string
  question: string
  details: string[]
  quickGuideGradeLevel: "elementary-lower" | "elementary-upper" | "middle" | "high"
}

interface CounselingServiceItem {
  key: string
  badge: string
  headline: ReactNode
  body: string
}

interface FeatureCard {
  key: FeatureCardKey
  eyebrow: string
  title: string
  description: {
    regular: string
    emphasized: string
  }
  ageItems?: AgeAccordionItem[]
  serviceItems?: CounselingServiceItem[]
}

interface CounselingCoachingCardsProps {
  bubbleAlign?: "left" | "center"
  buttonWidth?: "full" | "compact"
  useAgePresetQuickGuide?: boolean
}

interface AnimatedCollapseProps {
  open: boolean
  children: ReactNode
  className?: string
  innerClassName?: string
}

function AnimatedCollapse({ open, children, className, innerClassName }: AnimatedCollapseProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    const element = contentRef.current
    if (!element) return

    const updateHeight = () => setContentHeight(element.scrollHeight)
    updateHeight()

    if (typeof ResizeObserver === "undefined") return

    const observer = new ResizeObserver(() => updateHeight())
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const element = contentRef.current
    if (!element) return

    setContentHeight(element.scrollHeight)
  }, [open, children])

  const animatedStyle: CSSProperties = {
    maxHeight: open ? `${contentHeight}px` : "0px",
    opacity: open ? 1 : 0,
    transform: open ? "translateY(0px)" : "translateY(-8px)",
  }

  return (
    <div
      className={cn(
        "overflow-hidden transition-[max-height,opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        className
      )}
      style={animatedStyle}
      aria-hidden={!open}
    >
      <div ref={contentRef} className={innerClassName}>
        {children}
      </div>
    </div>
  )
}

const AGE_ITEMS: AgeAccordionItem[] = [
  {
    key: "elementary-lower",
    rangeLabel: "7 - 10세 · 초등 저학년",
    question: "내가 잘 하고 있는 건지 모르겠어요",
    quickGuideGradeLevel: "elementary-lower",
    details: [
      "도와주면 의존하고, 혼자 하라니 더 느려지고",
      "매일 같이 있는데 우리 아이가 뭘 좋아하는지 모르겠어요",
      "학원은 다 보내는데, 이게 맞는 건지 모르겠어요",
    ],
  },
  {
    key: "elementary-upper",
    rangeLabel: "11 - 13세 · 초등 고학년",
    question: "아이는 알고 있는데\n내가 모르는 것 같아요",
    quickGuideGradeLevel: "elementary-upper",
    details: [
      "좋아하는 건 알겠는데, 그게 직업이 될 수 있는 건지 모르겠어요",
      "아이가 뭔가 좋아하는 건 있는데, 공부랑 어떻게 연결해야 할지 모르겠어요",
      "어떻게 반응해줬어야 했는데 그냥 넘긴 게 있는 것 같아요",
    ],
  },
  {
    key: "middle-school",
    rangeLabel: "14 - 16세 · 중학생",
    question: "아이와 점점 멀어지는 것 같아요",
    quickGuideGradeLevel: "middle",
    details: [
      "제가 도와주려 하면 간섭이래요. 그렇다고 놔두면 아무것도 안 해요",
      "목표는 생겼는데 어떻게 준비해야 하는지 정보가 없어요",
      "열심히 하는 것 같은데 성적이 안 올라요. 방법이 문제인지 의지가 문제인지",
    ],
  },
  {
    key: "high-school",
    rangeLabel: "17 - 19세 · 고등학생",
    question: "이제 제가 해줄 수 있는 게\n없는 것 같아요",
    quickGuideGradeLevel: "high",
    details: [
      "지금이라도 늦지 않은 건지, 이미 늦은 건지 모르겠어요",
      "제 방식으로 도와주려 하면 아이가 답답해해요",
      "방향은 정한 것 같은데, 그게 정말 맞는 건지 충분히 고민한 건지 모르겠어요",
    ],
  },
]

const COUNSELING_SERVICE_ITEMS: CounselingServiceItem[] = [
  {
    key: "psychological-counseling",
    badge: "심리상담",
    headline: (
      <>
        심리상담은 전 생애주기에 걸친 <strong className="font-extrabold">개인의 심리적 안녕과 관계의 회복을 목표</strong>로 하는 전문적인 조력 과정입니다.
      </>
    ),
    body: "대상별 맞춤형 접근을 통해 개인의 성장을 도모하고 삶의 질을 높이는 통합적인 심리 지원 체계를 제공합니다.",
  },
  {
    key: "psychological-assessment",
    badge: "심리검사",
    headline: (
      <>
        심리검사는 과학적이고 전문적인 도구를 통해 개인의 인지 기능, 정서 상태, 성격 특성 및 대인관계 등 <strong className="font-extrabold">심리적 기능을 다각도로 탐색하는 '마음의 검진' 과정</strong> 입니다.
      </>
    ),
    body: "개인이 가진 지적 잠재력과 심리적 자원을 객관적으로 지표화함으로써, 단순한 진단을 넘어 심화된 자기 이해를 돕고 전문적인 치료 계획 수립이나 법적·의료적 증빙을 위한 공인 보고서로도 활용되는 핵심적인 진단 체계입니다.",
  },
]

const FEATURE_CARDS: readonly FeatureCard[] = [
  {
    key: "counseling",
    eyebrow: "마음의 어려움을 읽고 치유하는 과정",
    title: "심리상담",
    description: {
      regular: "심리적 문제나 감정적 어려움을 전문가와 함께 탐색하고 해결하는 치료적 접근법입니다.",
      emphasized: "아이의 현재 심리 상태를 이해하고 정서적 안정을 회복하는 데 초점을 맞춥니다.",
    },
    serviceItems: COUNSELING_SERVICE_ITEMS,
  },
  {
    key: "coaching",
    eyebrow: "아이의 강점을 깨우고 미래를 설계하는 과정",
    title: "성장코칭",
    description: {
      regular: "아이의 잠재력과 강점에 집중하여 자율성과 성장을 이끌어내는 미래지향적 접근법입니다.",
      emphasized: "아이 스스로 목표를 세우고 달성하는 과정을 지원합니다.",
    },
    ageItems: AGE_ITEMS,
  },
]

export function CounselingCoachingCards({
  bubbleAlign = "center",
  buttonWidth = "compact",
  useAgePresetQuickGuide = false,
}: CounselingCoachingCardsProps = {}) {
  const cardRefs = useRef<Record<FeatureCardKey, HTMLElement | null>>({
    counseling: null,
    coaching: null,
  })
  const [expandedCardKey, setExpandedCardKey] = useState<ExpandedCardState>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [visibleCards, setVisibleCards] = useState<Record<FeatureCardKey, boolean>>({
    counseling: false,
    coaching: false,
  })
  const [openAgeByCard, setOpenAgeByCard] = useState<Record<FeatureCardKey, string | null>>({
    counseling: null,
    coaching: null,
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(min-width: 768px)")
    const updateDesktopState = () => setIsDesktop(mediaQuery.matches)
    updateDesktopState()

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateDesktopState)
      return () => mediaQuery.removeEventListener("change", updateDesktopState)
    }

    mediaQuery.addListener(updateDesktopState)
    return () => mediaQuery.removeListener(updateDesktopState)
  }, [])

  useEffect(() => {
    if (!isDesktop && expandedCardKey === "all") {
      setExpandedCardKey(null)
    }
  }, [expandedCardKey, isDesktop])

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reduceMotionQuery.matches) {
      setVisibleCards({
        counseling: true,
        coaching: true,
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const cardKey = entry.target.getAttribute("data-feature-card") as FeatureCardKey | null
          if (!cardKey) return

          setVisibleCards((prev) => {
            if (prev[cardKey]) return prev
            return { ...prev, [cardKey]: true }
          })

          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.2 }
    )

    ;(["counseling", "coaching"] as const).forEach((cardKey) => {
      const cardElement = cardRefs.current[cardKey]
      if (cardElement) {
        observer.observe(cardElement)
      }
    })

    return () => observer.disconnect()
  }, [])

  const toggleCard = (cardKey: FeatureCardKey) => {
    if (isDesktop) {
      return
    }

    setExpandedCardKey((prev) => {
      if (prev === "all") return cardKey
      return prev === cardKey ? null : cardKey
    })
  }

  const toggleAgeItem = (cardKey: FeatureCardKey, ageKey: string) => {
    setOpenAgeByCard((prev) => ({
      ...prev,
      [cardKey]: prev[cardKey] === ageKey ? null : ageKey,
    }))
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-5">
      {FEATURE_CARDS.map((card) => {
        const isExpanded = isDesktop || expandedCardKey === "all" || expandedCardKey === card.key
        const isVisible = visibleCards[card.key]

        return (
          <article
            key={card.key}
            ref={(element) => {
              cardRefs.current[card.key] = element
            }}
            data-feature-card={card.key}
            className={cn(
              "transform-gpu bg-[#FFF] px-6 py-10 text-[#1E1611] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform sm:px-7 md:px-8 md:py-8",
              landingRadiusTokens.card
            )}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(32px)",
              transitionDelay: "0ms",
            }}
          >
            <div className="md:grid md:grid-cols-[minmax(0,200px)_minmax(0,1fr)] md:items-start md:gap-8 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
              <div>
                <button
                  type="button"
                  onClick={() => {
                    if (!isDesktop) {
                      toggleCard(card.key)
                    }
                  }}
                  className="w-full text-left"
                  aria-expanded={isExpanded}
                >
                  <p className="text-[14px] font-bold leading-tight text-[#FF7A33]">{card.eyebrow}</p>
                  <h3 className="mt-[6px] text-[26px] font-bold leading-tight tracking-[-0.02em] text-[#1B140F]">
                    {card.title}
                  </h3>
                  <p className="mt-6 text-[16px] leading-[1.65] text-[#1E1712]">
                    {card.description.regular}
                    <br />
                    <strong className="font-extrabold">{card.description.emphasized}</strong>
                  </p>
                </button>

                {!isDesktop && !isExpanded ? (
                  <button
                    type="button"
                    onClick={() => toggleCard(card.key)}
                    className="mt-7 inline-flex h-10 items-center gap-1 rounded-full border border-[#CEB196] bg-transparent px-4 text-[14px] font-medium text-[#A87D5E] transition-colors hover:bg-[#EBEBEB]"
                  >
                    자세히 보기
                    <ChevronDown className="h-4 w-4" />
                  </button>
                ) : null}
              </div>

              <AnimatedCollapse open={isExpanded} innerClassName={isDesktop ? "pt-0" : "pt-8"}>
                <div className="space-y-3">
                  {card.serviceItems && card.serviceItems.length > 0
                    ? card.serviceItems.map((item) => (
                        <div key={item.key} className="rounded-2xl bg-[#FFF7EF] px-5 py-7 md:px-6 md:py-8">
                          <p className="inline-flex rounded-lg bg-[#FFFFFF] px-2.5 py-1 text-[12px] font-bold leading-tight text-[#FF7A33]">
                            {item.badge}
                          </p>
                          <p className="mt-5 text-[18px] leading-[1.6] text-[#1E1712]">{item.headline}</p>
                          <p className="mt-4 text-[16px] leading-[1.6] text-[#1E1712]">{item.body}</p>
                          <Link
                            href="/reservation"
                            className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#090909] px-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
                          >
                            빠른상담 예약하기
                          </Link>
                        </div>
                      ))
                    : (card.ageItems ?? []).map((item) => {
                        const isAgeOpen = openAgeByCard[card.key] === item.key
                        const quickGuideHref = useAgePresetQuickGuide
                          ? `/quick_coaching_guide?gradeLevel=${encodeURIComponent(item.quickGuideGradeLevel)}`
                          : `/quick_coaching_guide`
                        const shouldShowCustomConsultButton = card.key !== "counseling"

                        return (
                          <div
                            key={item.key}
                            className="rounded-2xl bg-[#FFF7EF] px-4 py-8 transition-colors duration-200 hover:bg-[#FFEFDF]"
                          >
                            <button
                              type="button"
                              onClick={() => toggleAgeItem(card.key, item.key)}
                              className="flex w-full items-center justify-between gap-4 text-left"
                              aria-expanded={isAgeOpen}
                            >
                              <div>
                                <p className="inline-flex rounded-lg bg-[#FFF] px-2.5 py-1 text-[12px] font-bold leading-tight text-[#F07C33]">
                                  {item.rangeLabel}
                                </p>
                                <p className="mt-[10px] whitespace-pre-line text-[20px] font-bold leading-[1.35] tracking-[-0.01em] text-[#1B140F] md:overflow-hidden md:text-ellipsis md:whitespace-nowrap">
                                  {item.question}
                                </p>
                              </div>
                              {isAgeOpen ? (
                                <ChevronUp className="h-5 w-5 shrink-0 text-[#C49B7C]" />
                              ) : (
                                <ChevronDown className="h-5 w-5 shrink-0 text-[#C49B7C]" />
                              )}
                            </button>

                            <AnimatedCollapse open={isAgeOpen} innerClassName="pt-5">
                              <div className="space-y-5">
                                <div
                                  className={cn(
                                    "flex flex-col space-y-2.5",
                                    bubbleAlign === "left" ? "items-start" : "items-center"
                                  )}
                                >
                                  {item.details.map((detail, detailIndex) => {
                                    const tailGradientId = `bubble-tail-${card.key}-${item.key}-${detailIndex}`

                                    return (
                                      <div key={detail} className="relative inline-block w-fit max-w-full pb-[14px]">
                                        <p className="relative z-10 rounded-[36px] bg-[linear-gradient(90deg,#FFF7EF_0%,#FFE3C7_100%)] px-5 py-3 text-[14px] font-medium leading-[1.5] text-[#7E5F41]">
                                          {detail}
                                        </p>
                                        <svg
                                          aria-hidden="true"
                                          viewBox="0 0 30 18"
                                          className="pointer-events-none absolute -bottom-[1px] left-8 h-[18px] w-[30px]"
                                        >
                                          <defs>
                                            <linearGradient id={tailGradientId} x1="0%" y1="50%" x2="100%" y2="50%">
                                              <stop offset="0%" stopColor="#FFF7EF" />
                                              <stop offset="100%" stopColor="#FFE3C7" />
                                            </linearGradient>
                                          </defs>
                                          <path
                                            d="M1 1H29C22 3 19 8 15 13C11 18 3 18 2 12C1 9 1 5 1 1Z"
                                            fill={`url(#${tailGradientId})`}
                                          />
                                        </svg>
                                      </div>
                                    )
                                  })}
                                </div>

                                <div
                                  className={cn(
                                    buttonWidth === "full" && shouldShowCustomConsultButton
                                      ? "grid grid-cols-1 gap-2.5 md:grid-cols-2"
                                      : "flex flex-col space-y-2.5 items-center"
                                  )}
                                >
                                  <Link
                                    href="/reservation"
                                    className={cn(
                                      "inline-flex h-12 w-full items-center justify-center rounded-full bg-[#090909] px-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90",
                                      buttonWidth === "full" ? "" : "mx-auto max-w-[280px]"
                                    )}
                                  >
                                    빠른상담 예약하기
                                  </Link>
                                  {shouldShowCustomConsultButton ? (
                                    <Link
                                      href={quickGuideHref}
                                      className={cn(
                                        "inline-flex h-12 w-full items-center justify-center rounded-full bg-[#090909] px-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90",
                                        buttonWidth === "full" ? "" : "mx-auto max-w-[280px]"
                                      )}
                                    >
                                      맞춤상담 예약하기
                                    </Link>
                                  ) : null}
                                </div>
                              </div>
                            </AnimatedCollapse>
                          </div>
                        )
                      })}

                  {!isDesktop ? (
                    <div className="flex justify-center pt-1">
                      <button
                        type="button"
                        onClick={() => toggleCard(card.key)}
                        className="inline-flex h-10 items-center gap-1 rounded-full border border-[#CEB196] bg-transparent px-4 text-[14px] font-medium text-[#A87D5E] transition-colors hover:bg-[#EBEBEB]"
                      >
                        접기
                        <ChevronUp className="h-4 w-4" />
                      </button>
                    </div>
                  ) : null}
                </div>
              </AnimatedCollapse>
            </div>
          </article>
        )
      })}
    </div>
  )
}
