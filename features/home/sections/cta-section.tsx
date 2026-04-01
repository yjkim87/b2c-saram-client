"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { ArrowRight, MessageCircle } from "lucide-react"
import { Button } from "@/shared/ui/button"

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
    el.style.transform = "translateY(28px)"
    observer.observe(el)

    return () => observer.disconnect()
  }, [delay])

  return ref
}

export function CTASection() {
  const ref = useFadeInUp(0)

  return (
    <section
      id="reservation"
      className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      style={{
        background:
          "linear-gradient(108deg, oklch(0.22 0.06 206) 0%, oklch(0.2 0.08 197) 46%, oklch(0.18 0.07 187) 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, oklch(0.48 0.08 165 / 0.26), transparent 48%), radial-gradient(circle at 88% 80%, oklch(0.48 0.06 220 / 0.2), transparent 42%)",
          }}
        />
      </div>

      <div ref={ref} className="relative mx-auto max-w-4xl text-center">
        <div
          className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border"
          style={{
            background: "oklch(0.28 0.06 182 / 0.58)",
            borderColor: "oklch(0.45 0.07 170 / 0.26)",
          }}
        >
          <MessageCircle className="h-8 w-8" style={{ color: "oklch(0.74 0.11 167)" }} />
        </div>

        <h2
          className="mb-5 text-balance font-sans text-[clamp(2.1rem,1.6rem+2.6vw,3.75rem)] font-bold leading-[1.16] tracking-[-0.02em]"
          style={{ color: "oklch(0.97 0.01 80)" }}
        >
          우리 아이에게 맞는 여정을 찾아드립니다
        </h2>

        <p
          className="mx-auto mb-10 max-w-2xl text-base leading-[1.75] sm:text-xl"
          style={{ color: "oklch(0.8 0.02 230)" }}
        >
          아이의 발달에 대한 궁금증이나 걱정이 있으신가요? 전문가가 친절하게 답변드립니다.
        </p>

        <div className="flex items-center justify-center">
          <Button
            size="lg"
            asChild
            className="group h-12 min-w-[230px] cursor-pointer rounded-xl border-0 px-8 text-[1.05rem] font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            style={{ background: "oklch(0.69 0.13 160)", color: "oklch(0.98 0.005 85)" }}
          >
            <Link href="/reservation">
              우리 아이 맞춤형 여정 상담하기
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
