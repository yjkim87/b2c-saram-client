"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import type { HomeServiceTab } from "@/features/home/model/home-tab"
import { COACHING_AGE_DATA, COUNSELING_AGE_DATA } from "@/features/home/data/age-summary"
import {
  landingLayoutTokens,
  landingRadiusTokens,
  landingSectionTokens,
  landingSpaceTokens,
  landingTypeTokens,
} from "@/features/home/styles/landing-tokens"

interface AgeGuideSectionProps {
  tab: HomeServiceTab
}

export function AgeGuideSection({ tab }: AgeGuideSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [animateCards, setAnimateCards] = useState(false)

  const data = tab === "counseling" ? COUNSELING_AGE_DATA : COACHING_AGE_DATA
  const sectionBgClassName = tab === "counseling" ? "bg-[#F4FAFF]" : "bg-[#FFF7EF]"
  const description =
    tab === "counseling"
      ? "연령별 발달 특성에 맞는 심리 평가와 상담을 제공합니다."
      : "연령별 발달 특성에 맞는 성장 루틴과 실행 코칭을 제공합니다."

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
            우리 아이, 몇 살인가요?
          </h2>
          <p className={cn("mx-auto mt-5 max-w-2xl text-[#111827]", landingTypeTokens.body)}>{description}</p>
        </div>

        <div key={`age-${tab}`} className="animate-in fade-in duration-200">
          <div className={cn("grid grid-cols-2 md:grid-cols-4", landingSpaceTokens.gridGapSmToMd)}>
            {data.map((card, index) => (
              <Link
                key={`${tab}-${card.type}`}
                href={`/age/${card.type}`}
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
                    {card.range.replace("~", " - ")}
                  </span>
                </div>

                <h3 className={cn("text-[#05070d]", landingTypeTokens.ageCardTitle)}>{card.title}</h3>

                <ul className="mt-3 space-y-1.5">
                  {card.highlights.slice(0, 3).map((highlight) => (
                    <li key={highlight} className={cn("font-medium text-[#111827]", landingTypeTokens.bodySm)}>
                      • {highlight}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/program/age-guide"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[#0C0C0C] bg-white px-7 text-base font-semibold text-[#0C0C0C] transition-colors hover:bg-[#0C0C0C] hover:text-white"
            >
              전체 연령 가이드 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
