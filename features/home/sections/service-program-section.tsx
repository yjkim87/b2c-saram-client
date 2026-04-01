"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import type { HomeServiceTab } from "@/features/home/model/home-tab"
import { COACHING_PROGRAM_DATA, COUNSELING_PROGRAM_DATA } from "@/features/home/data/program-summary"

interface ServiceProgramSectionProps {
  tab: HomeServiceTab
}

export function ServiceProgramSection({ tab }: ServiceProgramSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [animateCards, setAnimateCards] = useState(false)

  const data = tab === "counseling" ? COUNSELING_PROGRAM_DATA : COACHING_PROGRAM_DATA
  const headingTone = tab === "counseling" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"

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
    <section ref={sectionRef} id="service-program" className="bg-white px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center md:mb-12">
          <span className={cn("mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold", headingTone)}>
            전문 서비스
          </span>
          <h2 className="mobile-auto-phrase text-3xl font-bold text-slate-900 md:text-4xl">과학적 접근, 따뜻한 마음으로</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            발달심리학 이론을 바탕으로 아이 개개인의 특성을 존중하는 맞춤형 코칭을 제공합니다
          </p>
        </div>

        <div key={`program-${tab}`} className="animate-in fade-in duration-200">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {data.map((card, index) => {
              const Icon = card.icon

              return (
                <Link
                  key={`${tab}-${card.type}`}
                  href={`/program/${card.type}`}
                  className={cn(
                    "group flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition-all duration-500 ease-out",
                    "hover:-translate-y-0.5 hover:shadow-md",
                    card.tone.border
                  )}
                  style={{
                    opacity: animateCards && isInView ? 1 : 0,
                    transform: animateCards && isInView ? "translateY(0px)" : "translateY(24px)",
                    transitionDelay: `${index * 90}ms`,
                  }}
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", card.tone.badgeBg, card.tone.badgeText)}>
                        {card.tag}
                      </span>
                      <h3 className="mt-3 text-xl font-bold text-slate-900">{card.title}</h3>
                    </div>
                    <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", card.tone.iconBg)}>
                      <Icon className={cn("h-5 w-5", card.tone.iconText)} />
                    </div>
                  </div>

                  <p className="mb-5 text-sm leading-relaxed text-slate-600">{card.description}</p>

                  <div className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-slate-700 transition-colors group-hover:text-slate-900">
                    프로그램 보기
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
