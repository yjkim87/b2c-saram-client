"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/shared/lib/utils"
import type { HomeServiceTab } from "@/features/home/model/home-tab"
import {
  landingLayoutTokens,
  landingRadiusTokens,
  landingSectionTokens,
  landingSpaceTokens,
  landingTypeTokens,
} from "@/features/home/styles/landing-tokens"

interface AgeGuideCard {
  key: string
  routeType: string
  title: string
  range: string
  mainQuote: string
  quotes: string[]
  tone: {
    badge: string
    mainQuote: string
    hoverBorder: string
  }
}

const AGE_GUIDE_CARDS: AgeGuideCard[] = [
  {
    key: "elementary-lower",
    routeType: "school-age",
    title: "초등 저학년",
    range: "7-9세",
    mainQuote: "내가 잘 하고 있는 건지 모르겠어요",
    quotes: [
      "도와주면 의존하고, 혼자 하라니 더 느려지고",
      "매일 같이 있는데 우리 아이가 뭘 좋아하는지 모르겠어요",
      "학원은 다 보내는데, 이게 맞는 건지 모르겠어요",
    ],
    tone: {
      badge: "bg-[#F8E8DA] text-[#F07C33]",
      mainQuote: "text-[#1B140F]",
      hoverBorder: "hover:border-[#DDBB9A]",
    },
  },
  {
    key: "elementary-upper",
    routeType: "school-age",
    title: "초등 고학년",
    range: "10-12세",
    mainQuote: "아이는 알고 있는데 내가 모르는 것 같아요",
    quotes: [
      "좋아하는 건 알겠는데, 그게 직업이 될 수 있는 건지 모르겠어요",
      "아이가 뭔가 좋아하는 건 있는데, 공부랑 어떻게 연결해야 할지 모르겠어요",
      "어떻게 반응해줬어야 했는데 그냥 넘긴 게 있는 것 같아요",
    ],
    tone: {
      badge: "bg-[#F8E8DA] text-[#F07C33]",
      mainQuote: "text-[#1B140F]",
      hoverBorder: "hover:border-[#DDBB9A]",
    },
  },
  {
    key: "middle-school",
    routeType: "teen",
    title: "중학생",
    range: "13-15세",
    mainQuote: "아이와 점점 멀어지는 것 같아요",
    quotes: [
      "제가 도와주려 하면 간섭이래요. 그렇다고 놔두면 아무것도 안 해요",
      "목표는 생겼는데 어떻게 준비해야 하는지 정보가 없어요",
      "열심히 하는 것 같은데 성적이 안 올라요. 방법이 문제인지 의지가 문제인지",
    ],
    tone: {
      badge: "bg-[#F8E8DA] text-[#F07C33]",
      mainQuote: "text-[#1B140F]",
      hoverBorder: "hover:border-[#DDBB9A]",
    },
  },
  {
    key: "high-school",
    routeType: "teen",
    title: "고등학생",
    range: "16-18세",
    mainQuote: "이제 제가 해줄 수 있는 게 없는 것 같아요",
    quotes: [
      "지금이라도 늦지 않은 건지, 이미 늦은 건지 모르겠어요",
      "제 방식으로 도와주려 하면 아이가 답답해해요",
      "방향은 정한 것 같은데, 그게 정말 맞는 건지 충분히 고민한 건지 모르겠어요",
    ],
    tone: {
      badge: "bg-[#F8E8DA] text-[#F07C33]",
      mainQuote: "text-[#1B140F]",
      hoverBorder: "hover:border-[#DDBB9A]",
    },
  },
]

interface AgeGuideSectionProps {
  tab: HomeServiceTab
}

export function AgeGuideSection({ tab }: AgeGuideSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [animateCards, setAnimateCards] = useState(false)

  const sectionBgClassName = "bg-[#FFF7EF]"

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
          <span className={cn("mb-4 inline-flex", landingTypeTokens.eyebrow)}>부모님의 마음</span>
          <h2 className={cn("mobile-auto-phrase", landingTypeTokens.sectionTitle)}>
            이런 고민, 혼자 하고 계셨나요?
          </h2>
          <p className={cn("mx-auto mt-5 max-w-2xl text-[#3A2F27]", landingTypeTokens.body)}>
            연령대별로 부모님들이 가장 많이 하시는 고민들입니다.
          </p>
        </div>

        <div key={`age-${tab}`} className="animate-in fade-in duration-200">
          <div className={cn("grid grid-cols-1 md:grid-cols-2", landingSpaceTokens.gridGapSmToMd)}>
            {AGE_GUIDE_CARDS.map((card, index) => (
              <div
                key={`${tab}-${card.key}`}
                className={cn(
                  "flex h-full flex-col border border-[#DCCEC0] bg-[#F5EEE7] transition-colors duration-200",
                  card.tone.hoverBorder,
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
                <div className="mb-4 flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex",
                      card.tone.badge,
                      landingRadiusTokens.pill,
                      landingSpaceTokens.chipPadding,
                      landingTypeTokens.ageRangeLabel
                    )}
                  >
                    {card.title}
                  </span>
                  <span className="text-sm font-semibold text-[#907865]">{card.range}</span>
                </div>

                <h3 className={cn("text-balance text-[20px] font-semibold leading-[1.5] md:text-[24px]", card.tone.mainQuote)}>
                  {card.mainQuote}
                </h3>

                <ul className="mt-4 space-y-2.5">
                  {card.quotes.map((quote) => (
                    <li key={quote} className={cn("text-[#5C4D42] italic", landingTypeTokens.bodySm)}>
                      "{quote}"
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2 border-t border-[#E7DACE] pt-5">
                  <Link
                    href="/quick-coaching-guide"
                    className="inline-flex items-center justify-center rounded-full bg-[#F07C33] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#DA6727]"
                  >
                    퀵코칭상담
                  </Link>
                  <Link
                    href="/reservation"
                    className="inline-flex items-center justify-center rounded-full border border-[#F07C33] px-4 py-2 text-sm font-semibold text-[#D46728] transition-colors hover:bg-[#FBEADD]"
                  >
                    빠른상담예약
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
