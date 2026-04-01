"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Compass, Heart, Sparkles, TrendingUp } from "lucide-react"

const FRAMEWORK_DATA = [
  {
    stage: "발견",
    icon: Compass,
    counseling: "내면의 원인과 기질적 특성 발견",
    coaching: "숨겨진 강점과 잠재 자원 발견",
  },
  {
    stage: "발달",
    icon: TrendingUp,
    counseling: "자존감 회복 및 정서적 성숙",
    coaching: "자기주도성 및 핵심 역량 발달",
  },
  {
    stage: "발휘",
    icon: Sparkles,
    counseling: "안정된 마음을 바탕으로 한 자기 조절",
    coaching: "목표 달성을 위한 폭발적인 실행력",
  },
] as const

const AUTO_CYCLE_INTERVAL = 3500

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"

    const timer = window.setTimeout(() => {
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
    }, delay)

    return () => window.clearTimeout(timer)
  }, [delay])

  return ref
}

export function FeaturesSection() {
  const headerRef = useFadeIn(0)
  const sectionRef = useRef<HTMLElement>(null)
  const [activeStage, setActiveStage] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.3 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView || isPaused) return

    const cycleInterval = window.setInterval(() => {
      setActiveStage((prev) => (prev + 1) % FRAMEWORK_DATA.length)
    }, AUTO_CYCLE_INTERVAL)

    return () => window.clearInterval(cycleInterval)
  }, [isInView, isPaused])

  const handleRowClick = (index: number) => {
    setActiveStage(index)
    setIsPaused(true)
  }

  const handleResume = () => {
    setIsPaused(false)
  }

  return (
    <section ref={sectionRef} id="features" className="bg-[#FFFFFF] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div ref={headerRef} className="mb-10 text-center md:mb-12">
          <span className="mb-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Integrated Solution</span>
          <h2 className="mobile-auto-phrase text-3xl font-bold text-slate-900 md:text-4xl">
            심리상담으로 단단하게,
            <br className="sm:hidden" /> 성장코칭으로 당당하게
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            전문가와 함께 아이의 현재를 진단하고,
            <br className="hidden sm:block" /> 가장 필요한 솔루션의 조합을 찾아갑니다.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#E8DED3] bg-white shadow-sm">
          <div className="grid grid-cols-[92px_1fr_1fr] sm:grid-cols-[120px_1fr_1fr]">
            <div className="px-3 py-4" />

            <div className="flex items-center justify-center gap-2 border-b border-[#E7EEF2] px-4 py-4 sm:px-6">
              <Heart className="h-4 w-4 text-sky-600" />
              <span className="text-sm font-semibold text-sky-800">심리상담</span>
            </div>

            <div className="flex items-center justify-center gap-2 border-b border-[#EFE8DD] px-4 py-4 sm:px-6">
              <TrendingUp className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-800">성장코칭</span>
            </div>
          </div>

          {FRAMEWORK_DATA.map((item, index) => {
            const Icon = item.icon
            const isActive = activeStage === index

            return (
              <div
                key={item.stage}
                onClick={() => handleRowClick(index)}
                className="grid cursor-pointer grid-cols-[92px_1fr_1fr] transition-all duration-700 ease-out sm:grid-cols-[120px_1fr_1fr]"
                style={{
                  background: isActive ? "#F9F7F2" : "transparent",
                  opacity: isActive ? 1 : 0.46,
                }}
              >
                <div
                  className="flex flex-col items-center justify-center gap-1.5 px-3 py-5 transition-all duration-700 sm:py-6"
                  style={{ background: isActive ? "#F4EFE7" : "transparent" }}
                >
                  <Icon className="h-4 w-4 transition-all duration-700 sm:h-5 sm:w-5" style={{ color: isActive ? "#1F3D5D" : "#8B98A8" }} />
                  <span className="text-xs font-semibold transition-all duration-700 sm:text-sm" style={{ color: isActive ? "#1E293B" : "#64748B" }}>
                    {item.stage}
                  </span>
                </div>

                <div
                  className="flex items-center px-4 py-5 transition-all duration-700 sm:px-6 sm:py-6"
                  style={{
                    background: isActive ? "#F1F8FC" : "transparent",
                    boxShadow: isActive ? "inset 0 0 0 1px #DCECF7" : "none",
                  }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: isActive ? "#1E3A5F" : "#64748B" }}>
                    {item.counseling}
                  </p>
                </div>

                <div
                  className="flex items-center px-4 py-5 transition-all duration-700 sm:px-6 sm:py-6"
                  style={{
                    background: isActive ? "#FFF8ED" : "transparent",
                    boxShadow: isActive ? "inset 0 0 0 1px #F4E4CA" : "none",
                  }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: isActive ? "#5B3A1A" : "#64748B" }}>
                    {item.coaching}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {isPaused && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={handleResume}
              className="rounded-full border border-[#E8DED3] bg-white px-4 py-2 text-xs font-medium text-slate-600 transition-colors duration-200 hover:bg-[#F8F4EE]"
            >
              자동 재생
            </button>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/reservation"
            className="inline-flex items-center gap-2 rounded-full bg-[#0C0C0C] px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1D1D1D]"
          >
            <Compass className="h-4 w-4" />
            우리 아이 맞춤형 여정 상담하기
          </Link>
          <p className="mt-4 text-xs text-slate-500">상담과 코칭 중 무엇이 최선일지, 전문가와 함께 결정하세요</p>
        </div>
      </div>
    </section>
  )
}
