"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import type { HomeServiceTab } from "@/features/home/model/home-tab"
import { COACHING_AGE_DATA, COUNSELING_AGE_DATA } from "@/features/home/data/age-summary"

interface AgeGuideSectionProps {
  tab: HomeServiceTab
}

export function AgeGuideSection({ tab }: AgeGuideSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [animateCards, setAnimateCards] = useState(false)

  const data = tab === "counseling" ? COUNSELING_AGE_DATA : COACHING_AGE_DATA
  const headingTone = tab === "counseling" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
  const description =
    tab === "counseling"
      ? "연령마다 다른 심리 신호를 먼저 읽고, 안정적으로 회복하는 상담 경로를 제안합니다."
      : "연령별 성장 과제를 기준으로 실행 가능한 코칭 루틴을 설계합니다."

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
      { threshold: 0.25 }
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
    <section ref={sectionRef} id="age-guide" className="bg-[#F7F2EB] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center md:mb-12">
          <span className={cn("mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold", headingTone)}>
            연령별 발달 가이드
          </span>
          <h2 className="mobile-auto-phrase text-3xl font-bold text-slate-900 md:text-4xl">아이의 발달 단계에 맞춘 요약 가이드</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">{description}</p>
          <div className="mt-6">
            <Link
              href="/program/age-guide"
              className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 transition-colors hover:text-slate-900"
            >
              더보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div key={`age-${tab}`} className="animate-in fade-in duration-200">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {data.map((card, index) => {
              const Icon = card.icon

              return (
                <Link
                  key={`${tab}-${card.type}`}
                  href={`/age/${card.type}`}
                  className={cn(
                    "group flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition-all duration-500 ease-out",
                    "hover:-translate-y-0.5 hover:shadow-md",
                    card.tone.ring
                  )}
                  style={{
                    opacity: animateCards && isInView ? 1 : 0,
                    transform: animateCards && isInView ? "translateY(0px)" : "translateY(24px)",
                    transitionDelay: `${index * 90}ms`,
                  }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", card.tone.iconBg)}>
                      <Icon className={cn("h-5 w-5", card.tone.iconText)} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-500">{card.range}</p>
                      <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
                    </div>
                  </div>

                  <p className="mb-4 text-sm leading-relaxed text-slate-600">{card.description}</p>

                  <ul className="mb-5 space-y-2">
                    {card.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2 text-xs leading-relaxed text-slate-600">
                        <span className={cn("mt-0.5 h-1.5 w-1.5 rounded-full", card.tone.bullet)} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-slate-700 transition-colors group-hover:text-slate-900">
                    자세히 보기
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
