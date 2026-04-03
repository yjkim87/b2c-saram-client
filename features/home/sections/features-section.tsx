"use client"

import { useEffect, useRef } from "react"
import { Check } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import {
  landingLayoutTokens,
  landingRadiusTokens,
  landingSectionTokens,
  landingSpaceTokens,
  landingTypeTokens,
} from "@/features/home/styles/landing-tokens"

const FEATURE_CARDS = [
  {
    key: "counseling",
    eyebrow: "마음의 어려움을 믿고 치유하는 과정",
    title: "심리상담·성장코칭",
    description:
      "심리적 문제나 감정적 어려움을 전문가와 함께 탐색하고 해결하는 치료적 접근법입니다. 아이의 현재 심리 상태를 이해하고 정서적 안정을 회복하는 데 초점을 맞춥니다.",
    chips: ["문제 진단 및 평가", "감정 표현과 이해", "행동 변화 지원", "정서적 안정화"],
    cardClassName: "bg-[#EFF6FF]",
    eyebrowClassName: "text-[#2b66f6]",
    iconClassName: "text-[#2b66f6]",
  },
  {
    key: "coaching",
    eyebrow: "아이의 강점을 깨우고 미래를 설계하는 과정",
    title: "성장코칭",
    description:
      "아이의 잠재력과 강점에 집중하여 자율성과 성장을 이끌어내는 미래지향적 접근법입니다. 아이 스스로 목표를 세우고 달성하는 과정을 지원합니다.",
    chips: ["문제 진단 및 평가", "감정 표현과 이해", "행동 변화 지원", "정서적 안정화"],
    cardClassName: "bg-[#FFF7EF]",
    eyebrowClassName: "text-[#ff7f32]",
    iconClassName: "text-[#ff7f32]",
  },
] as const

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"

    const timer = window.setTimeout(() => {
      el.style.transition = "opacity 0.55s ease, transform 0.55s ease"
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
    }, delay)

    return () => window.clearTimeout(timer)
  }, [delay])

  return ref
}

export function FeaturesSection() {
  const headerRef = useFadeIn(0)
  const cardsRef = useFadeIn(100)
  const visibleCards = FEATURE_CARDS.filter((card) => card.key !== "coaching")
  const isSingleCard = visibleCards.length === 1

  return (
    <section id="features" className={cn("bg-[#FFFFFF]", landingSectionTokens.base)}>
      <div className={landingLayoutTokens.containerWide}>
        <div ref={headerRef} className={cn("text-center", landingLayoutTokens.sectionHeaderGap)}>
          <span className={cn("mb-4 inline-flex uppercase", landingTypeTokens.eyebrow)}>
            INTEGRATED SOLUTION
          </span>
          <h2 className={cn("mobile-auto-phrase", landingTypeTokens.sectionTitle)}>
            심리상담으로 단단하게,
            <br />
            성장코칭으로 당당하게
          </h2>
          <p className={cn("mx-auto mt-5 max-w-2xl text-[#131a27]", landingTypeTokens.body)}>
            아이의 성장 단계와 필요에 따라 심리상담과 성장코칭의 차이를 확인해보세요.
            <br className="hidden sm:block" />
            아래 탭에서 원하는 항목을 선택하면 자세한 내용을 확인할 수 있습니다.
          </p>
        </div>

        <div
          ref={cardsRef}
          className={cn(
            "grid",
            isSingleCard ? "mx-auto w-full max-w-3xl" : "md:grid-cols-2",
            landingSpaceTokens.gridGap
          )}
        >
          {visibleCards.map((card) => (
            <article
              key={card.key}
              className={cn(
                "w-full",
                landingRadiusTokens.card,
                landingSpaceTokens.cardPaddingResponsive,
                card.cardClassName
              )}
            >
              <p className={cn("text-sm font-bold", card.eyebrowClassName)}>{card.eyebrow}</p>
              <h3 className={cn("mt-2 text-[#05070d]", landingTypeTokens.cardTitle)}>{card.title}</h3>
              <p className={cn("mt-5 font-medium text-[#05070d]", landingTypeTokens.body)}>{card.description}</p>

              <ul className="mt-6 grid grid-cols-2 gap-2.5">
                {card.chips.map((chip) => (
                  <li
                    key={chip}
                    className={cn(
                      "inline-flex min-h-[42px] items-center gap-1.5 bg-white/88 text-[#141a25]",
                      landingRadiusTokens.pill,
                      landingSpaceTokens.chipPadding,
                      landingTypeTokens.chip
                    )}
                  >
                    <Check className={cn("h-4 w-4", card.iconClassName)} />
                    <span>{chip}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
