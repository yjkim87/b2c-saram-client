"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { ArrowRight, Brain, Compass, ChevronDown } from "lucide-react"

function useFadeInUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.opacity = "0"
    el.style.transform = "translateY(24px)"

    const timer = window.setTimeout(() => {
      el.style.transition = "opacity 0.65s ease, transform 0.65s ease"
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
    }, delay)

    return () => window.clearTimeout(timer)
  }, [delay])

  return ref
}

export function HeroSection() {
  const badgeRef = useFadeInUp(80)
  const headingRef = useFadeInUp(180)
  const descRef = useFadeInUp(280)
  const ctaRef = useFadeInUp(380)

  return (
    <section className="relative min-h-screen bg-[#FFF9F4] pt-20">
      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-[1520px] flex-col justify-center px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="mx-auto w-full max-w-[1080px]">
          <div ref={badgeRef} className="text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FFD8B0] bg-[#FFF2E6] px-4 py-1.5 text-sm font-semibold text-[#FF741D]">
              <Brain className="h-4 w-4" />
              발달심리 전문 상담·코칭
            </span>
          </div>

          <div ref={headingRef} className="text-center md:text-left">
            <h1 className="mt-6 text-[clamp(2.1rem,1.6rem+2.6vw,3.75rem)] font-bold leading-[1.16] tracking-[-0.02em] text-[#0C0C0C]">
              아이의 성장,
              <br />
              <span className="text-[#FF741D]">마음부터</span> 시작합니다
            </h1>
          </div>

          <div ref={descRef} className="text-center md:text-left">
            <p className="mt-8 text-[clamp(1rem,0.9rem+0.5vw,1.375rem)] font-normal leading-[1.6] text-[#0C0C0C] md:mt-10">
              0세부터 18세까지, 발달심리학을 기반으로 한 맞춤 상담·성장코칭으로
              <br className="hidden md:block" />
              아이의 잠재력을 발견하고 안정적인 변화를 함께 만듭니다.
            </p>
          </div>

          <div ref={ctaRef} className="mt-10 flex justify-center md:justify-start">
            <Link
              href="/reservation"
              className="group inline-flex items-center gap-2 rounded-full bg-[#0C0C0C] px-7 py-3 text-base font-semibold text-white shadow-[0_10px_24px_rgba(12,12,12,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1D1D1D]"
            >
              <Compass className="h-4 w-4" />
              우리 아이 맞춤 첫 상담하기
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

      </div>

      <a href="#features" className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-label="아래로 스크롤">
        <ChevronDown className="h-8 w-8 text-muted-foreground md:h-10 md:w-10" />
      </a>
    </section>
  )
}
