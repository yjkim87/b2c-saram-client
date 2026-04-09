"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"
import { cn } from "@/shared/lib/utils"
import type { HomeServiceTab } from "@/features/home/model/home-tab"
import { COACHING_PROGRAM_DATA, COUNSELING_PROGRAM_DATA } from "@/features/home/data/program-summary"
import {
  landingLayoutTokens,
  landingRadiusTokens,
  landingSectionTokens,
  landingSpaceTokens,
  landingTypeTokens,
} from "@/features/home/styles/landing-tokens"

interface ServiceProgramSectionProps {
  tab: HomeServiceTab
}

export function ServiceProgramSection({ tab }: ServiceProgramSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const mobileSwiperRef = useRef<SwiperType | null>(null)
  const [isInView, setIsInView] = useState(false)
  const [animateCards, setAnimateCards] = useState(false)
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0)

  const data = tab === "counseling" ? COUNSELING_PROGRAM_DATA : COACHING_PROGRAM_DATA
  const counselingDetailNoteByType: Record<string, string> = {
    "emotion-care":
      "* VIA 강점 검사 기반. 강점을 일상·학습에 연결하는 실전 액션플랜 제공",
    "behavior-support":
      "* Holland 직업흥미 검사 + 실전 직업 체험 연계. 단계별 포트폴리오 구성",
    "family-bridge":
      "* 소그룹 세션 병행. 역할극·피드백 루프로 실제 상황 적용력을 키웁니다",
  }

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
    setMobileActiveIndex(0)

    const frame = window.requestAnimationFrame(() => {
      if (isInView) {
        setAnimateCards(true)
      }
    })

    return () => window.cancelAnimationFrame(frame)
  }, [tab, isInView])

  return (
    <section
      ref={sectionRef}
      id="service-program"
      className={cn("relative overflow-hidden bg-white", landingSectionTokens.base)}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[320px] overflow-hidden md:hidden">
        <div
          className="absolute"
          style={{
            width: 931,
            height: 684,
            left: -650,
            top: -400,
            background:
              "radial-gradient(50% 50%, rgb(188, 219, 255) 0%, rgba(255, 255, 255, 0) 100%)",
          }}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute hidden md:block"
        style={{
          width: 1420,
          height: 1240,
          left: -920,
          top: -470,
          background:
            "radial-gradient(50% 50% at 50% 50%, #BCDBFF 0%, rgba(255, 255, 255, 0) 100%)",
        }}
      />

      <div className={cn("relative z-10", landingLayoutTokens.containerWide)}>
        <div className={cn("text-center", landingLayoutTokens.sectionHeaderGap)}>
          <span className={cn("mb-4 inline-flex", landingTypeTokens.eyebrow)}>전문 상담 가이드</span>
          <h2 className={cn("mobile-auto-phrase", landingTypeTokens.sectionTitle)}>
            과학적 접근, 따뜻한 마음으로
          </h2>
          <p className={cn("mx-auto mt-5 max-w-2xl text-[#111827]", landingTypeTokens.body)}>
            발달심리학 이론을 바탕으로 아이 개개인의 특성을 존중하는 맞춤형 서비스를 제공합니다.
          </p>
        </div>

        <div className="md:hidden">
          <div className="relative">
            <Swiper
              key={`program-mobile-${tab}`}
              slidesPerView={1.03}
              spaceBetween={14}
              onSwiper={(swiper) => {
                mobileSwiperRef.current = swiper
                setMobileActiveIndex(swiper.realIndex ?? 0)
              }}
              onSlideChange={(swiper) => {
                setMobileActiveIndex(swiper.realIndex ?? 0)
              }}
            >
              {data.map((card) => {
                const detailNote = counselingDetailNoteByType[card.type]

                return (
                  <SwiperSlide key={`${tab}-${card.type}`}>
                    <article
                      className={cn(
                        "block transform-gpu will-change-transform transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#DCEBFF] hover:scale-[1.02]",
                        "bg-[#F4FAFF]",
                        landingRadiusTokens.card,
                        landingSpaceTokens.cardPadding
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex border",
                          landingRadiusTokens.pill,
                          landingSpaceTokens.chipPadding,
                          landingTypeTokens.chip,
                          card.tone.badgeText,
                          card.tone.badgeBg,
                          card.tone.border
                        )}
                      >
                        {card.tag}
                      </span>

                      <h3 className={cn("mt-4 text-[#0C0C0C]", landingTypeTokens.serviceCardTitle)}>{card.title}</h3>

                      <p className={cn("mt-4 text-[#111827]", landingTypeTokens.body)}>{card.description}</p>

                      {detailNote ? <p className={cn("mt-5", landingTypeTokens.serviceCardNote)}>{detailNote}</p> : null}
                    </article>
                  </SwiperSlide>
                )
              })}
            </Swiper>

            <div className="absolute right-6 top-6 z-20 inline-flex items-center gap-2">
              {data.map((_, dotIndex) => (
                <button
                  key={`fixed-dot-${dotIndex}`}
                  type="button"
                  aria-label={`${dotIndex + 1}번 카드로 이동`}
                  onClick={() => mobileSwiperRef.current?.slideToLoop(dotIndex)}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-colors duration-200",
                    mobileActiveIndex === dotIndex ? "bg-[#2B66F6]" : "bg-[#B8C8DA]"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div key={`program-pc-${tab}`} className="hidden md:grid md:grid-cols-3 md:gap-5">
          {data.map((card, index) => {
            const detailNote = counselingDetailNoteByType[card.type]

            return (
              <div
                key={`${tab}-${card.type}`}
                style={{
                  opacity: animateCards && isInView ? 1 : 0,
                  transform: animateCards && isInView ? "translateY(0px)" : "translateY(24px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                  transitionDelay: `${index * 90}ms`,
                }}
              >
                <article
                  className={cn(
                    "group flex h-full flex-col transform-gpu will-change-transform bg-[#F4FAFF] transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#DCEBFF] hover:scale-[1.02]",
                    landingRadiusTokens.card,
                    landingSpaceTokens.cardPadding
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex w-fit border",
                      landingRadiusTokens.pill,
                      landingSpaceTokens.chipPadding,
                      landingTypeTokens.chip,
                      card.tone.badgeText,
                      card.tone.badgeBg,
                      card.tone.border
                    )}
                  >
                    {card.tag}
                  </span>

                  <h3 className={cn("mt-4 text-[#0C0C0C]", landingTypeTokens.serviceCardTitle)}>{card.title}</h3>

                  <p className={cn("mt-4 text-[#111827]", landingTypeTokens.body)}>{card.description}</p>

                  {detailNote ? <p className={cn("mt-5", landingTypeTokens.serviceCardNote)}>{detailNote}</p> : null}
                </article>
              </div>
            )
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/program"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-[#0C0C0C] bg-white px-7 text-base font-semibold text-[#0C0C0C] transition-colors hover:bg-[#0C0C0C] hover:text-white"
          >
            상담/코칭 프로그램 보러가기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
