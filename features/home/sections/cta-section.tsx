"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    el.style.opacity = "0"
    el.style.transform = "translateY(24px)"
    observer.observe(el)

    return () => observer.disconnect()
  }, [delay])

  return ref
}

export function CTASection() {
  const ref = useFadeInUp(0)

  return (
    <section id="reservation" className={cn("relative overflow-hidden bg-white", landingSectionTokens.roomy)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute md:hidden"
        style={{
          width: 921,
          height: 1053,
          left: -22,
          top: 0,
          background:
            "radial-gradient(50% 50% at 50% 50%, #FFD9C4 0%, rgba(255, 255, 255, 0) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute hidden md:block"
        style={{
          width: 1320,
          height: 1260,
          left: -240,
          top: -180,
          background:
            "radial-gradient(50% 50% at 50% 50%, #FFD9C4 0%, rgba(255, 255, 255, 0) 100%)",
        }}
      />

      <div
        ref={ref}
        className={cn("relative text-center", landingLayoutTokens.containerNarrow)}
      >
        <h2 className={landingTypeTokens.sectionTitle}>
          우리 아이에게 맞는
          <br />
          여정을 찾아드립니다
        </h2>

        <p className={cn("mx-auto mt-5 max-w-2xl text-[#111827]", landingTypeTokens.bodyRelaxed)}>
          아이의 발달에 대한 궁금증이나 걱정이 있으신가요?
          <br />
          전문가가 친절하게 답변드립니다.
        </p>

        <div className="mt-9 flex justify-center">
          <Link
            href="/reservation"
            className={cn(
              "group inline-flex min-w-[250px] items-center justify-center gap-2 bg-[#05070d] text-white shadow-[0_14px_30px_rgba(5,7,13,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0f1119]",
              landingRadiusTokens.pill,
              landingSpaceTokens.buttonPadding,
              landingTypeTokens.button
            )}
          >
            무료 상담 시작하기
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
