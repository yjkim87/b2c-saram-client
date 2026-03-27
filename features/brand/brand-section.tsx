"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, BarChart3, Lightbulb, Users } from "lucide-react"

type SectionVariant = "preview" | "full"

interface BrandSectionProps {
  variant?: SectionVariant
}

const coreValues = [
  {
    icon: BarChart3,
    title: "데이터 기반의 객관적 증명",
    description:
      "50년 이상의 연구 통찰과 어세스타의 검증된 리소스를 통해 막연한 추측이 아닌 숫자와 근거로 개인의 특성을 증명합니다.",
  },
  {
    icon: Users,
    title: "아이와 부모의 새로운 연결",
    description:
      "단순한 검사 결과 제공을 넘어, 부모와 자녀 사이의 기질과 성격적 케미스트리를 분석하여 소통의 온도를 높입니다.",
  },
  {
    icon: Lightbulb,
    title: "전문 코치의 인간적 통찰",
    description:
      "AI가 흉내 낼 수 없는 깊은 교감과 복합적인 변수 분석을 통해 세상에 단 하나뿐인 맞춤형 통합 솔루션을 도출합니다.",
  },
]

const missions = [
  {
    number: "01",
    title: "전생애를 관통하는 성장 로드맵 제시",
    description:
      "유아기 기질 분석부터 고등학생의 진로 설계까지, 아이의 발달 단계에 맞춘 연속성 있는 코칭으로 인생의 선명한 지도를 건넵니다.",
  },
  {
    number: "02",
    title: "부모의 심리적 안정과 양육 효능감 강화",
    description:
      "부모 스스로의 마음 상태를 점검하고 자녀 특성에 맞는 코칭 스킬을 체득하게 함으로써 양육 스트레스를 줄이고 확신 있는 양육 환경을 조성합니다.",
  },
  {
    number: "03",
    title: "자녀의 자기 주도적 삶의 기반 마련",
    description:
      "아이가 자신의 고유한 결을 이해하고 스스로 학습 동기와 미래 방향을 설정할 수 있는 단단한 주춧돌을 세워줍니다.",
  },
]

function BrandSectionPreview() {
  return (
    <section className="relative bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center md:mb-12">
          <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            브랜드스토리
          </span>
          <h2 className="mobile-auto-phrase text-balance text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
            사발면이 걸어온 길,
            <br className="hidden sm:block" />
            <span className="text-primary">신뢰를 쌓아온 이야기</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            데이터 기반의 객관성과 전문가의 인간적 통찰을 결합해 아이와 부모 모두를 위한 성장 로드맵을 제시합니다.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {coreValues.slice(0, 2).map((value) => {
            const Icon = value.icon

            return (
              <article key={value.title} className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </article>
            )
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/brand"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
          >
            브랜드스토리 더보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function BrandSectionFull() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(() => coreValues.map(() => false))
  const [visibleMissions, setVisibleMissions] = useState<boolean[]>(() => missions.map(() => false))
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const missionsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    }

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return
        }

        const index = cardsRef.current.indexOf(entry.target as HTMLDivElement)
        if (index === -1) {
          return
        }

        setTimeout(() => {
          setVisibleCards((prev) => {
            const next = [...prev]
            next[index] = true
            return next
          })
        }, index * 150)
      })
    }, observerOptions)

    const missionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return
        }

        const index = missionsRef.current.indexOf(entry.target as HTMLDivElement)
        if (index === -1) {
          return
        }

        setTimeout(() => {
          setVisibleMissions((prev) => {
            const next = [...prev]
            next[index] = true
            return next
          })
        }, index * 200)
      })
    }, observerOptions)

    cardsRef.current.forEach((ref) => {
      if (ref) {
        cardObserver.observe(ref)
      }
    })

    missionsRef.current.forEach((ref) => {
      if (ref) {
        missionObserver.observe(ref)
      }
    })

    return () => {
      cardObserver.disconnect()
      missionObserver.disconnect()
    }
  }, [])

  return (
    <section className="relative bg-white">
      <div className="bg-white pb-8 pt-16 md:pt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center md:mb-14">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              브랜드스토리
            </span>
            <h2 className="mobile-auto-phrase text-balance text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
              사발면이 걸어온 길,
              <br className="hidden sm:block" />
              <span className="text-primary">신뢰를 쌓아온 이야기</span>
            </h2>
          </div>

          <div className="relative mb-8 rounded-3xl border border-border bg-card p-6 shadow-sm md:mb-12 md:p-10">
            <div className="absolute left-4 top-4 md:left-6 md:top-6">
              <svg className="h-8 w-8 text-primary/20 md:h-12 md:w-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p className="pt-4 text-center text-lg font-medium leading-relaxed text-foreground text-balance md:pt-6 md:text-xl lg:text-2xl">
              50년 이상의 연구 통찰과 전문가의 인간적 교감이 만나,
              <br className="hidden md:block" />
              세상에 단 하나뿐인 성장 로드맵을 그립니다.
            </p>
          </div>

          <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-muted-foreground md:text-base">
            사발면은 단순한 검사 결과 제공을 넘어, 데이터 기반의 객관적 증명과 전문 코치의 깊은 통찰로
            아이와 부모 모두의 삶에 선명한 방향을 제시합니다.
          </p>
        </div>
      </div>

      <div className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-sm font-medium tracking-widest text-primary uppercase">
              Core Values
            </span>
            <h3 className="text-2xl font-semibold text-foreground lg:text-3xl">핵심 가치</h3>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {coreValues.map((value, index) => {
              const IconComponent = value.icon

              return (
                <div
                  key={value.title}
                  ref={(el) => {
                    cardsRef.current[index] = el
                  }}
                  className={`group rounded-2xl border border-border/50 bg-card p-8 text-center transition-all duration-700 hover:border-primary/30 hover:shadow-lg ${
                    visibleCards[index] ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/15">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>

                  <h3 className="mb-4 text-lg font-semibold text-foreground">{value.title}</h3>

                  <p className="text-base leading-relaxed text-muted-foreground md:text-sm">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="bg-white pb-20 lg:pb-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-3xl bg-gradient-to-br from-primary/5 via-secondary to-accent/5 p-8 lg:p-14">
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block text-sm font-medium tracking-widest text-primary uppercase">
                Our Mission
              </span>
              <h2 className="mobile-auto-phrase text-3xl font-semibold text-foreground lg:text-4xl">우리의 미션</h2>
            </div>

            <div className="flex flex-col gap-8">
              {missions.map((mission, index) => (
                <div
                  key={mission.number}
                  ref={(el) => {
                    missionsRef.current[index] = el
                  }}
                  className={`relative flex gap-6 transition-all duration-700 lg:gap-10 ${
                    visibleMissions[index] ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm lg:h-16 lg:w-16">
                      <span className="text-xl font-bold text-primary lg:text-2xl">{mission.number}</span>
                    </div>
                    {index < missions.length - 1 && <div className="mx-auto mt-2 h-full w-px bg-border/50" />}
                  </div>

                  <div className="flex-1 pb-2">
                    <h3 className="mb-3 text-lg font-semibold text-foreground lg:text-xl">{mission.title}</h3>
                    <p className="text-base leading-relaxed text-muted-foreground md:text-sm lg:text-base">{mission.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function BrandSection({ variant = "full" }: BrandSectionProps) {
  if (variant === "preview") {
    return <BrandSectionPreview />
  }

  return <BrandSectionFull />
}
