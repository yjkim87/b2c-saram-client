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
    <section id="reservation" className={cn("relative overflow-hidden bg-[#FFFFFF]", landingSectionTokens.roomy)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute md:hidden"
        style={{
          width: 921,
          height: 1053,
          left: -22,
          top: 0,
          background:
            "radial-gradient(50% 50% at 50% 50%, #F8D8BD 0%, rgba(255, 255, 255, 0) 100%)",
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
            "radial-gradient(50% 50% at 50% 50%, #F8D8BD 0%, rgba(255, 255, 255, 0) 100%)",
        }}
      />

      <div
        ref={ref}
        className={cn("relative text-center", landingLayoutTokens.containerNarrow)}
      >
        <h2 className={landingTypeTokens.sectionTitle}>
          우리 아이 지금 어떤 시기일까요?
        </h2>

        <p className={cn("mx-auto mt-5 max-w-2xl text-[#3A2F27]", landingTypeTokens.bodyRelaxed)}>
          학년을 알려주시면 발달 단계와 지금 꼭 알아야 할 것들을 바로 확인해드립니다.
        </p>

        <div className="mt-9 flex justify-center">
          <Link
            href="/quick-coaching-guide"
            className={cn(
              "group inline-flex min-w-[250px] items-center justify-center gap-2 bg-[#120C09] text-white shadow-[0_14px_30px_rgba(18,12,9,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#080504]",
              landingRadiusTokens.pill,
              landingSpaceTokens.buttonPadding,
              landingTypeTokens.button
            )}
          >
            학년 맞춤으로 알아보기
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
