"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/shared/lib/utils"
import { MessageCircle, Calendar, Sparkles } from "lucide-react"
import { ReservationCTAButton } from "@/shared/ui/reservation-cta-button"

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="reservation" 
      className="py-20 md:py-28 bg-gradient-to-b from-background via-primary/5 to-background"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={cn(
            "relative bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-border overflow-hidden transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-40 h-40 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-accent rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                무료 상담 예약
              </span>
            </div>

            {/* Title */}
            <h2 className="mobile-auto-phrase text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center leading-tight mb-4 text-balance">
              우리 아이의 가능성을
              <br />
              지금 바로 발견해보세요
            </h2>

            {/* Subtitle */}
            <p className="text-muted-foreground text-center text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed text-pretty">
              전문가와의 1:1 맞춤 상담을 통해 아이의 타고난 기질과 잠재력을 분석하고,
              부모님과 자녀 모두를 위한 성장 로드맵을 함께 설계합니다.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="flex items-center gap-3 p-4 bg-background/50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">대화형 예약</p>
                  <p className="text-xs text-muted-foreground">친절한 챗봇 안내</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-background/50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">유연한 일정</p>
                  <p className="text-xs text-muted-foreground">희망 시간대 선택</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-background/50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">맞춤 매칭</p>
                  <p className="text-xs text-muted-foreground">전문가 자동 연결</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <ReservationCTAButton className="mx-auto" />
              <p className="mt-4 text-xs text-muted-foreground">
                예약 후 카카오톡 알림톡으로 확정 안내를 보내드립니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
