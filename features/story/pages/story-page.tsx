"use client"

import type { ElementType, ReactNode, RefObject } from "react"
import { useEffect, useRef, useState } from "react"
import { Compass, Heart, Quote, Users } from "lucide-react"
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

type ServiceValue = {
  icon: ElementType
  category: string
  title: string
  target: string
  desc: string
  colorClass: string
  bgClass: string
  borderClass: string
  ringClass: string
}

type ServiceCardProps = {
  value: ServiceValue
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

const serviceValues: ServiceValue[] = [
  {
    icon: Heart,
    category: "마음 발견",
    title: "사발면 1:1 심리상담",
    target: "심리적 어려움을 겪는 개인 및 아동청소년",
    desc: "전문 상담사가 심리검사 도구를 활용해 내담자의 호소문제 별로 스트레스 원인을 분석합니다. 세계적으로 검증된 심리검사들을 통해 '나의 심리적 특성을 발견하고 치유하는 고품격 심리상담 서비스'입니다.",
    colorClass: "text-rose-500",
    bgClass: "bg-rose-50",
    borderClass: "border-rose-100",
    ringClass: "ring-rose-50",
  },
  {
    icon: Compass,
    category: "진로 발견",
    title: "자녀의 미래항로(Course) 발견",
    target: "진로 결정에 어려움을 겪는 중·고등학생 및 부모",
    desc: "정식 MBTI로 성격적 강점을 찾고, Strong 흥미 검사로 구체적인 시대의 맞는 미래의 직업을 연결합니다. 단순한 검사 프로파일 해석이 아닌 '자녀 맞춤형 미래 포트폴리오'를 사발면 커리어 코치와 함께 1:1로 그려 갑니다.",
    colorClass: "text-indigo-500",
    bgClass: "bg-indigo-50",
    borderClass: "border-indigo-100",
    ringClass: "ring-indigo-50",
  },
  {
    icon: Users,
    category: "부모 발견",
    title: "아이와 말이 통하는, 부모 코칭",
    target: "자녀의 심리적 성장을 위해 자녀의 잠재력을 깨워주고 싶은 부모",
    desc: "부모와 자녀의 정식 MBTI 결과를 바탕으로 '소통의 온도 차'를 발견합니다. 아이의 성격에 맞는 학습법과 미래설계를 위해 부모에게 동기부여 방식을 코칭하여 가족의 상호작용을 긍정화합니다.",
    colorClass: "text-amber-500",
    bgClass: "bg-amber-50",
    borderClass: "border-amber-100",
    ringClass: "ring-amber-50",
  },
]

function IntroSection() {
  return (
    <section className="relative bg-white px-6 pb-10 pt-20 md:pb-14 md:pt-24">
      <div className="mx-auto max-w-5xl">
        <FadeInBlock className="rounded-3xl bg-white p-7 text-center md:p-10">
          <h2 className="mb-6 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
            <span className="text-[#ff7a33]">보석</span>을 만드는 전문가의 손길,
            <br />
            <span className="text-[#ff7a33]">발견하면 달라</span>집니다.
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-slate-700 md:text-lg md:leading-8">
            <p>아무리 귀한 구슬이라도 전문가의 안목으로 꿰어지지 않으면 보석이 될 수 없습니다.</p>
            <p>
              사발면(사람의 발견을 원하면)은 세계에서 가장 많이 사용되는 마음발견 검사인 정식 MBTI와 불확실한
              미래의 직업을 발견하는 검사인 Strong 흥미검사를 도구 삼아, 자녀의 내면에 숨겨진 원석을 발견합니다.
              사발면의 상담사와 코치들은 단순한 결과 수치를 넘어, 아이의 고유한 강점들을 정교하게 연결하여 단
              하나뿐인 &apos;진로 설계도&apos;를 완성합니다.
            </p>
            <p>우리는 부모님께 아이의 마음을 읽는 법을 알려드리고, 아이에게는 스스로의 미래를 결정할 확신을 선물합니다.</p>
          </div>
        </FadeInBlock>
      </div>
    </section>
  )
}

function QuoteSection() {
  return (
    <section className="bg-[#F8FAFC] px-6 py-14 md:py-20">
      <div className="mx-auto max-w-5xl">
        <FadeInBlock threshold={0.2}>
          <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white px-7 py-8 shadow-[0_10px_24px_rgba(15,23,42,0.06)] md:px-12 md:py-11">
            <Quote className="absolute left-6 top-5 h-10 w-10 text-slate-100 md:left-8 md:top-7 md:h-14 md:w-14" />
            <div className="relative z-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-8">
              <div className="shrink-0 text-left">
                <h3 className="text-[2.75rem] font-bold leading-none text-slate-900 md:text-[2.75rem] md:leading-none">
                  <span className="text-[#ff7a33]">발</span>견하면
                  <br />
                  <span className="text-[#ff7a33]">달</span>라집니다.
                </h3>
              </div>
              <div className="hidden h-24 w-px bg-slate-200 md:block" />
              <p className="text-lg leading-relaxed text-slate-700 md:text-2xl md:leading-9">
                자기자신을 온전히 받아들이는 것이야말로 세상에서 가장 어렵고 두려운 일이지만, 그것이 곧 진정한{" "}
                <span className="font-semibold text-[#ff7a33]">자기변화의 시작</span>이됩니다.
              </p>
            </div>
          </div>
        </FadeInBlock>
      </div>
    </section>
  )
}

function ServiceCard({ value, threshold, isMobile }: ServiceCardProps) {
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
      <p className={`mb-2 text-sm font-bold tracking-[0.14em] ${value.colorClass}`}>[{value.category}]</p>
      <h3 className="mb-4 text-xl font-bold text-slate-900">{value.title}</h3>
      <div className="mb-5">
        <p className="mb-2 text-sm font-semibold text-slate-400">대상</p>
        <div className="rounded-xl bg-slate-50 px-4 py-3">
          <p className="text-sm leading-relaxed text-slate-800 md:text-base">{value.target}</p>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-slate-400">내용</p>
        <p className="text-sm leading-relaxed text-slate-600 md:text-base">{value.desc}</p>
      </div>
    </div>
  )
}

function ServicesSection() {
  const isMobile = useIsMobile()

  return (
    <section className="relative z-10 bg-white px-6 pb-20 pt-10 md:pb-24 md:pt-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {serviceValues.map((value, idx) => {
            return (
              <ServiceCard
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

export function StoryPage() {
  return (
    <main className="bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <IntroSection />
      <QuoteSection />
      <ServicesSection />
    </main>
  )
}
