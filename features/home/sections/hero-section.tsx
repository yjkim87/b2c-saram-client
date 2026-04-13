"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/shared/lib/utils"
import { landingLayoutTokens } from "@/features/home/styles/landing-tokens"

const HERO_BG_IMAGE_URL = "https://img.assesta.com/saram-me/main_mw_bg.png"

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

  return (
    <section className="relative overflow-hidden bg-[#F2D8C0] pt-[64px] md:pt-[78px]">
      <div className="absolute inset-0">
        <div className="h-full w-full pt-[62px] md:hidden">
          <img
            src={HERO_BG_IMAGE_URL}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="h-full w-full object-cover"
            style={{ objectPosition: "50% 0%" }}
          />
        </div>

        <div className="hidden h-full w-full md:flex">
          <img
            src={HERO_BG_IMAGE_URL}
            alt=""
            aria-hidden="true"
            className="ml-auto h-full w-auto max-w-none object-contain object-right-top"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 md:hidden"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(180deg, rgba(250, 238, 224, 0.12) 0%, rgba(250, 238, 224, 0.05) 44%, rgba(250, 238, 224, 0) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 hidden md:block"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(90deg, rgba(248, 236, 218, 0.82) 0%, rgba(248, 236, 218, 0.64) 34%, rgba(248, 236, 218, 0.22) 58%, rgba(248, 236, 218, 0) 78%)",
          }}
        />
      </div>

      <div
        className={cn(
          "relative mx-auto flex h-[500px] w-full items-start md:h-auto md:min-h-[calc(100vh-4.875rem)]",
          landingLayoutTokens.containerWide
        )}
      >
        <div className="w-full px-8 pb-16 pt-[90px] sm:px-10 sm:pt-[90px] md:px-14 md:pb-20 md:pt-[110px] lg:px-16 lg:pt-[124px]">
          <div ref={headingRef} className="max-w-[min(88vw,560px)] md:max-w-[620px]">
            <h1 className="text-[36px] font-extrabold leading-[1.16] tracking-[-0.035em] text-[#17120F] md:leading-[1.12]">
              부모의 고민에서,
              <br />
              아이의 발견으로
            </h1>
          </div>

          <div ref={descRef} className="mt-8 max-w-[min(86vw,440px)] md:mt-10 md:max-w-[520px]">
            <p className="text-[18px] font-medium leading-[1.5] tracking-[-0.01em] text-[#2F251D]">
              초등 저학년부터 고등학생까지,
              <br />
              발달 단계에 맞춘
            </p>
            <p className="mt-1 text-[18px] font-extrabold leading-[1.35] tracking-[-0.02em] text-[#1F1712]">
              맞춤형 성장 코칭
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
