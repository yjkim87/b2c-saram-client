"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import type { HomeServiceTab } from "@/features/home/model/home-tab"
import { COACHING_AGE_DATA, COUNSELING_AGE_DATA, type AgeSummaryItem } from "@/features/home/data/age-summary"
import {
  landingLayoutTokens,
  landingRadiusTokens,
  landingSectionTokens,
  landingSpaceTokens,
  landingTypeTokens,
} from "@/features/home/styles/landing-tokens"

interface AgeCardPreset {
  key: string
  sourceType: AgeSummaryItem["type"]
  routeType: string
  title: string
  range: string
}

interface AgeGuideDisplayCard extends AgeSummaryItem {
  key: string
  routeType: string
}

const AGE_CARD_PRESETS: AgeCardPreset[] = [
  {
    key: "infant",
    sourceType: "infant",
    routeType: "infant",
    title: "\uC601\uC544",
    range: "0-2\uC138",
  },
  {
    key: "preschool",
    sourceType: "preschool",
    routeType: "preschool",
    title: "\uC720\uC544",
    range: "3-6\uC138",
  },
  {
    key: "elementary-lower",
    sourceType: "school-age",
    routeType: "school-age",
    title: "\uCD08\uB4F1\uD559\uAD50(\uC800\uD559\uB144)",
    range: "7-9\uC138",
  },
  {
    key: "elementary-upper",
    sourceType: "school-age",
    routeType: "school-age",
    title: "\uCD08\uB4F1\uD559\uAD50(\uACE0\uD559\uB144)",
    range: "10-12\uC138",
  },
  {
    key: "middle-school",
    sourceType: "teen",
    routeType: "teen",
    title: "\uC911\uD559\uC0DD",
    range: "13-15\uC138",
  },
  {
    key: "high-school",
    sourceType: "teen",
    routeType: "teen",
    title: "\uACE0\uB4F1\uD559\uC0DD",
    range: "16-18\uC138",
  },
]

interface AgeGuideSectionProps {
  tab: HomeServiceTab
  showViewAllButton?: boolean
}

export function AgeGuideSection({ tab, showViewAllButton = true }: AgeGuideSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [animateCards, setAnimateCards] = useState(false)

  const data = tab === "counseling" ? COUNSELING_AGE_DATA : COACHING_AGE_DATA
  const displayCards = AGE_CARD_PRESETS.reduce<AgeGuideDisplayCard[]>((acc, preset) => {
    const sourceCard = data.find((card) => card.type === preset.sourceType)
    if (!sourceCard) return acc

    acc.push({
      ...sourceCard,
      key: preset.key,
      routeType: preset.routeType,
      title: preset.title,
      range: preset.range,
    })

    return acc
  }, [])
  const sectionBgClassName = tab === "counseling" ? "bg-[#F4FAFF]" : "bg-[#FFF7EF]"

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        setIsInView(visible)

        if (visible) {
          setAnimateCards(true)
        }
      },
      { threshold: 0.24 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setAnimateCards(false)

    const frame = window.requestAnimationFrame(() => {
      if (isInView) {
        setAnimateCards(true)
      }
    })

    return () => window.cancelAnimationFrame(frame)
  }, [tab, isInView])

  return (
    <section ref={sectionRef} id="age-guide" className={cn(sectionBgClassName, landingSectionTokens.base)}>
      <div className={landingLayoutTokens.containerWide}>
        <div className={cn("text-center", landingLayoutTokens.sectionHeaderGap)}>
          <span className={cn("mb-4 inline-flex", landingTypeTokens.eyebrow)}>연령별 발달 가이드</span>
          <h2 className={cn("mobile-auto-phrase", landingTypeTokens.sectionTitle)}>
            시기마다 고민은 다르니까
          </h2>
          <p className={cn("mx-auto mt-5 max-w-2xl text-[#111827]", landingTypeTokens.body)}>
            영유아부터 고등학생까지,
            <br />
            지금 우리 아이에게 맞는 고민부터 찾아보세요.
          </p>
        </div>

        <div key={`age-${tab}`} className="animate-in fade-in duration-200">
          <div className={cn("grid grid-cols-2 md:grid-cols-3", landingSpaceTokens.gridGapSmToMd)}>
            {displayCards.map((card, index) => (
              <Link
                key={`${tab}-${card.key}`}
                href={`/age/${card.routeType}`}
                className={cn(
                  "group flex h-full flex-col bg-[#FFFFFF]",
                  landingRadiusTokens.card,
                  landingSpaceTokens.cardPaddingResponsive
                )}
                style={{
                  opacity: animateCards && isInView ? 1 : 0,
                  transform: animateCards && isInView ? "translateY(0px)" : "translateY(24px)",
                  transition: "all 0.5s ease",
                  transitionDelay: `${index * 90}ms`,
                }}
              >
                <div className="mb-3">
                  <span
                    className={cn(
                      "inline-flex bg-[#E6F4FF] text-[#2b66f6]",
                      landingRadiusTokens.pill,
                      landingSpaceTokens.chipPadding,
                      landingTypeTokens.ageRangeLabel
                    )}
                  >
                    {card.range}
                  </span>
                </div>

                <h3 className={cn("text-[#05070d]", landingTypeTokens.ageCardTitle)}>{card.title}</h3>

                <ul className="mt-3 space-y-1.5">
                  {card.highlights.slice(0, 3).map((highlight) => (
                    <li key={highlight} className={cn("font-medium text-[#111827]", landingTypeTokens.bodySm, "text-[15px] md:text-[16px]")}>
                      • {highlight}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 ml-auto inline-flex items-center gap-1 text-sm font-semibold text-[#52a9ff] transition-transform duration-200 group-hover:translate-x-0.5">
                  자세히 보기
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>

          {showViewAllButton ? (
            <div className="mt-8 flex justify-center">
              <Link
                href="/program/age-guide"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-[#0C0C0C] bg-white px-7 text-base font-semibold text-[#0C0C0C] transition-colors hover:bg-[#0C0C0C] hover:text-white"
              >
                전체 연령 가이드 보기
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
