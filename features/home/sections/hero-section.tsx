"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/shared/lib/utils"
import { landingLayoutTokens } from "@/features/home/styles/landing-tokens"

const HERO_BG_IMAGE_MOBILE_URL = "https://img.assesta.com/saram-me/main_mw_bg.png"
const HERO_BG_IMAGE_DESKTOP_URL = "https://img.assesta.com/saram-me/main_pc_bg.png"

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
  const indicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const indicator = indicatorRef.current
    if (!indicator) return

    const updateVisibility = () => {
      indicator.classList.toggle("opacity-0", window.scrollY > 50)
      indicator.classList.toggle("invisible", window.scrollY > 50)
      indicator.classList.toggle("pointer-events-none", window.scrollY > 50)
    }

    updateVisibility()
    window.addEventListener("scroll", updateVisibility, { passive: true })

    return () => window.removeEventListener("scroll", updateVisibility)
  }, [])

  const handleScrollIndicatorClick = () => {
    const nextSection = document.getElementById("features")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }

    window.scrollTo({ top: window.innerHeight * 0.9, behavior: "smooth" })
  }

  return (
    <section className="relative h-[500px] overflow-hidden bg-[#F2D8C0] pt-[64px] md:h-[890px] md:pt-[78px]">
      <div className="absolute inset-0">
        <div
          className="h-full w-full pt-[62px] md:hidden"
          aria-hidden="true"
          style={{
            backgroundImage: `url(${HERO_BG_IMAGE_MOBILE_URL})`,
            backgroundPosition: "right 0px bottom -64px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "250%",
          }}
        />

        <div
          className="hidden h-full w-full md:block lg:hidden"
          aria-hidden="true"
          style={{
            backgroundImage: `url(${HERO_BG_IMAGE_DESKTOP_URL})`,
            backgroundPosition: "right -420px bottom 0",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundColor: "#F2D8C0",
          }}
        />

        <div
          className="hidden h-full w-full lg:block"
          aria-hidden="true"
          style={{
            backgroundImage: `url(${HERO_BG_IMAGE_DESKTOP_URL})`,
            backgroundPosition: "right 0px bottom 100%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundColor: "#F2D8C0",
          }}
        />

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
          "relative mx-auto flex h-full w-full items-start",
          landingLayoutTokens.containerWide
        )}
      >
        <div className="w-full px-8 pb-16 pt-[90px] sm:px-10 sm:pt-[90px] md:px-14 md:pb-20 md:pt-[230px] lg:px-16 lg:pt-[230px]">
          <div ref={headingRef} className="max-w-[min(88vw,560px)] md:max-w-[620px]">
            <h1 className="font-landing-title text-[clamp(36px,6vw,56px)] font-[700] leading-[1.16] tracking-[-0.035em] text-[#17120F] md:leading-[1.12] lg:text-[60px]">
              부모의 고민에서,
              <br />
              <span className="text-[#FF7A33]">아이의 발견</span>으로
            </h1>
          </div>

          <div ref={descRef} className="mt-8 max-w-[min(86vw,440px)] md:mt-10 md:max-w-[520px] lg:max-w-[620px]">
            <p className="text-[clamp(18px,2.2vw,24px)] font-medium leading-[1.5] tracking-[-0.01em] text-[#2F251D] lg:text-[22px]">
              초등 저학년부터 고등학생까지
              <br />
              <span className="lg:whitespace-nowrap">
                발달 단계에 맞춘 <span className="font-bold">맞춤형 성장 코칭</span>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div
        ref={indicatorRef}
        className="fixed bottom-8 left-1/2 z-[96] hidden -translate-x-1/2 transition-[opacity,visibility] duration-400 ease-out md:block md:bottom-10"
      >
        <button
          type="button"
          onClick={handleScrollIndicatorClick}
          className="flex cursor-pointer flex-col items-center gap-2"
          aria-label="Scroll down"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 animate-bounce text-[#F18D5C] [animation-duration:1.5s] motion-reduce:animate-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
          <span className="text-[13px] font-medium tracking-[0.05em] text-[#666666]">SCROLL DOWN</span>
        </button>
      </div>
    </section>
  )
}
