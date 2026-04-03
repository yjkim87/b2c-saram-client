"use client"

import type { ReactNode, RefObject } from "react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  Brain,
  ClipboardList,
  Heart,
  Leaf,
  Lightbulb,
  LineChart,
  MessageCircle,
  TrendingUp,
} from "lucide-react"
import { useIsMobile } from "@/shared/hooks/use-mobile"

type FadeInHookResult = {
  ref: RefObject<HTMLDivElement | null>
  isVisible: boolean
}

type CenterFocusHookResult = {
  ref: RefObject<HTMLDivElement | null>
  isFocused: boolean
}

type FadeInBlockProps = {
  children: ReactNode
  className?: string
  threshold?: number
}

type MissionValue = {
  icon: typeof Heart
  title: string
  desc: string
  colorClass: string
  bgClass: string
  borderClass: string
  ringClass: string
}

type ProcessStep = {
  step: string
  title: string
  desc: string
  icon: typeof ClipboardList
  colorClass: string
  bgClass: string
}

type MissionCardProps = {
  value: MissionValue
  threshold: number
  isMobile: boolean
}

function useFadeInOnScroll(threshold = 0.12): FadeInHookResult {
  const domRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = domRef.current
    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  return {
    ref: domRef,
    isVisible,
  }
}

function useCenteredInViewport(enabled: boolean, bandRatio = 0.24): CenterFocusHookResult {
  const domRef = useRef<HTMLDivElement | null>(null)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const element = domRef.current
    if (!enabled || !element) {
      setIsFocused(false)
      return
    }

    const checkCentered = () => {
      const rect = element.getBoundingClientRect()
      const cardCenterY = rect.top + rect.height / 2
      const viewportCenterY = window.innerHeight / 2
      const centerBand = window.innerHeight * bandRatio
      setIsFocused(Math.abs(cardCenterY - viewportCenterY) <= centerBand / 2)
    }

    checkCentered()
    window.addEventListener("scroll", checkCentered, { passive: true })
    window.addEventListener("resize", checkCentered)

    return () => {
      window.removeEventListener("scroll", checkCentered)
      window.removeEventListener("resize", checkCentered)
    }
  }, [enabled, bandRatio])

  return {
    ref: domRef,
    isFocused,
  }
}

function FadeInBlock({ children, className = "", threshold = 0.12 }: FadeInBlockProps) {
  const { ref, isVisible } = useFadeInOnScroll(threshold)

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  )
}

function MissionCard({ value, threshold, isMobile }: MissionCardProps) {
  const { ref: fadeRef, isVisible } = useFadeInOnScroll(threshold)
  const { ref: focusRef, isFocused } = useCenteredInViewport(isMobile)
  const Icon = value.icon

  const setCardRef = (node: HTMLDivElement | null) => {
    fadeRef.current = node
    focusRef.current = node
  }

  const decorationScaleClass = isMobile
    ? isFocused
      ? "scale-125"
      : "scale-100"
    : "group-hover:scale-125"

  return (
    <div
      ref={setCardRef}
      className={`group relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div
        className={`absolute right-0 top-0 h-24 w-24 origin-top-right rounded-bl-full opacity-25 transition-transform duration-300 ${decorationScaleClass} ${value.bgClass}`}
      />
      <div
        className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border ring-4 transition-all ${value.bgClass} ${value.borderClass} ${value.colorClass} ${value.ringClass}`}
      >
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mb-3 text-xl font-bold text-slate-900">{value.title}</h3>
      <p className="text-sm leading-relaxed text-slate-600 md:text-base">{value.desc}</p>
    </div>
  )
}

const missionValues: MissionValue[] = [
  {
    icon: Heart,
    title: "아이 중심",
    desc: "아이의 관점에서 생각하고 아이의 목소리에 귀 기울입니다.",
    colorClass: "text-rose-500",
    bgClass: "bg-rose-50",
    borderClass: "border-rose-100",
    ringClass: "ring-rose-50",
  },
  {
    icon: Brain,
    title: "근거 기반",
    desc: "검증된 발달심리학 이론과 최신 연구를 코칭에 적용합니다.",
    colorClass: "text-indigo-500",
    bgClass: "bg-indigo-50",
    borderClass: "border-indigo-100",
    ringClass: "ring-indigo-50",
  },
  {
    icon: TrendingUp,
    title: "강점 중심",
    desc: "아이의 강점을 발견하고 그것을 토대로 성장을 지원합니다.",
    colorClass: "text-amber-500",
    bgClass: "bg-amber-50",
    borderClass: "border-amber-100",
    ringClass: "ring-amber-50",
  },
]

const steps: ProcessStep[] = [
  {
    step: "01",
    title: "신청 및 접수",
    desc: "전화/온라인으로 아이의 연령과 고민 상담 신청. 신청서 작성 및 일정 확정",
    icon: ClipboardList,
    colorClass: "text-slate-700",
    bgClass: "bg-slate-100",
  },
  {
    step: "02",
    title: "무료 사전 상담",
    desc: "전문가와 오프라인 미팅을 통해 현재 상태 파악 및 최적의 전문가 매칭",
    icon: MessageCircle,
    colorClass: "text-blue-600",
    bgClass: "bg-blue-100",
  },
  {
    step: "03",
    title: "맞춤형 세션 시작",
    desc: "아이에게 맞는 상담/코칭 진행 및 회기별 활동 기록 공유",
    icon: Lightbulb,
    colorClass: "text-indigo-600",
    bgClass: "bg-indigo-100",
  },
  {
    step: "04",
    title: "성장 리포트 및 점검",
    desc: "변화 분석 및 부모 피드백을 통한 향후 목표 재설정",
    icon: LineChart,
    colorClass: "text-emerald-600",
    bgClass: "bg-emerald-100",
  },
  {
    step: "05",
    title: "사후 관리",
    desc: "안정적인 종결 세션 진행 및 3개월 후 Follow-up을 통한 변화 유지 지원",
    icon: Leaf,
    colorClass: "text-teal-600",
    bgClass: "bg-teal-100",
  },
]

function MissionSection() {
  const isMobile = useIsMobile()

  return (
    <section className="relative z-10 bg-white px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <FadeInBlock className="mb-14 text-center md:mb-20">
          <span className="mb-4 inline-block rounded-full bg-indigo-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600">
            우리의 미션
          </span>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            모든 아이는 고유한 발달 경로를 가집니다
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-slate-500 md:text-lg">
            사발면 센터는 0세부터 18세까지의 아이들이 자신만의 속도로, 자신만의 방식으로 건강하게 성장할 수
            있도록 지원합니다. 우리는 발달심리학의 과학적 근거를 바탕으로, 아이 한 명 한 명의 강점과 가능성을
            발견하고 키우는 데 초점을 맞춥니다.
          </p>
        </FadeInBlock>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {missionValues.map((value, idx) => {
            return (
              <MissionCard
                key={value.title}
                value={value}
                threshold={0.1 + idx * 0.08}
                isMobile={isMobile}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section className="overflow-hidden border-t border-slate-100 bg-slate-50 px-6 py-20 md:py-24">
      <div className="mx-auto max-w-3xl">
        <FadeInBlock className="mb-16 text-center md:mb-20">
          <span className="mb-4 inline-block rounded-full bg-indigo-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600">
            5단계 프로세스
          </span>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">사발면과 함께하는 성장의 여정</h2>
          <p className="text-base text-slate-500 md:text-lg">
            상담 신청부터 사후 관리까지, 아이의 변화와 성장을 끝까지 지원하는 우리의 체계적인 프로세스를
            안내합니다.
          </p>
        </FadeInBlock>

        <div className="relative pl-2 md:pl-0">
          <div className="absolute bottom-8 left-[27px] top-4 w-0.5 rounded-full bg-slate-200 md:left-[39px]" />
          <div className="space-y-12 md:space-y-16">
            {steps.map((step, idx) => {
              const Icon = step.icon

              return (
                <FadeInBlock
                  key={step.step}
                  threshold={0.1 + idx * 0.08}
                  className="group relative flex items-start"
                >
                  <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-4 border-slate-50 bg-white shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:border-indigo-50 md:h-20 md:w-20">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full md:h-14 md:w-14 ${step.bgClass} ${step.colorClass}`}
                    >
                      <Icon className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                  </div>

                  <div className="ml-6 flex-1 pt-2 md:ml-10 md:pt-4">
                    <div className="mb-3 flex flex-col gap-1 md:flex-row md:items-baseline md:gap-4">
                      <span className="select-none text-3xl font-black text-slate-200 transition-colors group-hover:text-indigo-200 md:text-4xl">
                        {step.step}
                      </span>
                      <h3 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">{step.title}</h3>
                    </div>
                    <p className="max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">{step.desc}</p>
                  </div>
                </FadeInBlock>
              )
            })}
          </div>
        </div>

        <FadeInBlock threshold={0.22} className="mt-14 text-center">
          <Link
            href="/reservation"
            className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:bg-indigo-600 active:scale-95"
          >
            무료 상담하기
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeInBlock>
      </div>
    </section>
  )
}

export function StoryPage() {
  return (
    <main className="bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <MissionSection />
      <ProcessSection />
    </main>
  )
}
