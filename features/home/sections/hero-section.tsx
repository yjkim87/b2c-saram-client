"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { cn } from "@/shared/lib/utils"
import {
  landingLayoutTokens,
  landingRadiusTokens,
  landingSectionTokens,
  landingSpaceTokens,
  landingTypeTokens,
} from "@/features/home/styles/landing-tokens"

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
  const headingRef = useFadeInUp(140)
  const descRef = useFadeInUp(240)
  const ctaRef = useFadeInUp(340)

  return (
    <section
      className="relative overflow-hidden pt-20"
      style={{
        background:
          "linear-gradient(180deg, #bfd4e7 0%, #c7d7e8 28%, #d9ccdc 58%, #d5e9e3 100%)",
      }}
    >
      <div
        className={cn(
          "relative flex min-h-[calc(100vh-5rem)] w-full items-center justify-center",
          landingLayoutTokens.containerWide,
          landingSectionTokens.base
        )}
      >
        <div className="mx-auto w-full max-w-[760px] text-center">
          <div ref={headingRef}>
            <h1 className={cn(landingTypeTokens.heroTitle, "text-[#080A11]")}>
              부모의 고민에서,
              <br />
              아이의 발견으로
            </h1>
          </div>

          <div ref={descRef}>
            <p className={cn("mx-auto mt-8 max-w-[640px] text-[#0E1726] md:mt-9", landingTypeTokens.body)}>
              0세부터 18세까지, 발달 단계에 맞춘 맞춤형 성장 코칭
            </p>
          </div>

          <div ref={ctaRef} className="mt-12 flex justify-center">
            <Link
              href="/reservation"
              className={cn(
                "inline-flex min-w-[260px] items-center justify-center bg-[#05070D] text-white shadow-[0_14px_30px_rgba(5,7,13,0.26)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0f1119]",
                landingRadiusTokens.pill,
                landingSpaceTokens.buttonPaddingLg,
                landingTypeTokens.buttonLg
              )}
            >
              무료 상담 시작하기
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
