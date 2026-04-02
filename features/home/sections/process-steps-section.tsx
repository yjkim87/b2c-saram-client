"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import type { HomeServiceTab } from "@/features/home/model/home-tab"
import {
  landingLayoutTokens,
  landingRadiusTokens,
  landingSectionTokens,
  landingSpaceTokens,
  landingTypeTokens,
} from "@/features/home/styles/landing-tokens"

interface ProcessStepsSectionProps {
  tab: HomeServiceTab
}

interface ProcessStep {
  num: string
  title: string
  desc: string
}

const COUNSELING_STEPS: ProcessStep[] = [
  {
    num: "1",
    title: "마음 진단",
    desc: "다각적 심리검사를 통한 내면 기질 및 현재 상태 파악",
  },
  {
    num: "2",
    title: "상담 목표 설정",
    desc: "호소 문제의 근본 원인 탐색 및 맞춤형 치료 방향 수립",
  },
  {
    num: "3",
    title: "심층 상담 진행",
    desc: "증상 완화 및 심리적 회복을 위한 전문적 개입 실행",
  },
  {
    num: "4",
    title: "종결 및 사후 관리",
    desc: "변화된 마음의 안정성 확인 및 일상 적응력 유지 지원",
  },
]

const COACHING_STEPS: ProcessStep[] = [
  {
    num: "1",
    title: "강점 진단",
    desc: "강점·흥미·학습 성향을 진단해 성장의 출발점을 찾습니다.",
  },
  {
    num: "2",
    title: "코칭 목표 설정",
    desc: "진단 결과를 바탕으로 실행 가능한 목표와 계획을 설계합니다.",
  },
  {
    num: "3",
    title: "맞춤 코칭 진행",
    desc: "주기적인 1:1 코칭으로 실행 습관과 자기주도성을 강화합니다.",
  },
  {
    num: "4",
    title: "성과 점검 및 확장",
    desc: "성과를 모니터링하고 다음 성장 목표까지 연결합니다.",
  },
]

function MobileStepItem({
  step,
  isLast,
  isActive,
}: {
  step: ProcessStep
  isLast: boolean
  isActive: boolean
}) {
  return (
    <div className="grid grid-cols-[44px_1fr] items-start gap-3.5">
      <div className="relative flex flex-col items-center self-stretch">
        <span
          className={cn(
            "relative z-[1] flex h-8 w-8 items-center justify-center transition-all duration-300",
            landingRadiusTokens.circle,
            landingTypeTokens.stepNumberSm
          )}
          style={{
            background: isActive ? "#05070d" : "#c6ccd5",
            color: isActive ? "#ffffff" : "#596171",
            transform: isActive ? "scale(1.08)" : "scale(1)",
            boxShadow: isActive ? "0 8px 18px rgba(5,7,13,0.24)" : "none",
          }}
        >
          {step.num}
        </span>

        {!isLast && (
          <span
            className="pointer-events-none absolute left-1/2 top-8 block w-px -translate-x-1/2"
            style={{
              bottom: "-1rem",
              background: "repeating-linear-gradient(to bottom, #c5ccd5 0px, #c5ccd5 4px, transparent 4px, transparent 8px)",
            }}
          />
        )}
      </div>

      <article
        className={cn("mb-4 border transition-all duration-300", landingRadiusTokens.card, landingSpaceTokens.cardPaddingResponsive)}
        style={{
          background: isActive ? "#FFFFFF" : "transparent",
          borderColor: isActive ? "#d5deea" : "transparent",
          transform: isActive ? "translateY(-2px)" : "translateY(0)",
          opacity: isActive ? 1 : 0.75,
        }}
      >
        <h3 className={cn("text-[#05070d]", landingTypeTokens.serviceCardTitle)}>{step.title}</h3>
        <p className={cn("mt-2 text-[#111827]", landingTypeTokens.stepDescription)}>{step.desc}</p>
      </article>
    </div>
  )
}

function DesktopStepItem({ step, isActive }: { step: ProcessStep; isActive: boolean }) {
  return (
    <article
      className={cn(
        "grid grid-cols-[84px_1fr] items-start gap-4 border transition-all duration-300",
        landingRadiusTokens.card,
        landingSpaceTokens.cardPadding
      )}
      style={{
        background: isActive ? "#FFFFFF" : "#e8edf3",
        borderColor: isActive ? "#d2dce8" : "#dce3ea",
        boxShadow: isActive ? "0 18px 36px rgba(15,23,42,0.11)" : "none",
        transform: isActive ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div className="flex justify-center">
        <span
          className={cn(
            "flex h-12 w-12 items-center justify-center",
            landingRadiusTokens.circle,
            landingTypeTokens.stepNumberLg
          )}
          style={{
            background: isActive ? "#05070d" : "#c9d0da",
            color: isActive ? "#ffffff" : "#5b6472",
            transition: "all 0.3s ease",
          }}
        >
          {step.num}
        </span>
      </div>

      <div>
        <h3 className={cn("text-[#05070d]", landingTypeTokens.serviceCardTitle)}>{step.title}</h3>
        <p className={cn("mt-2 text-[#111827]", landingTypeTokens.stepDescription)}>{step.desc}</p>
      </div>
    </article>
  )
}

export function ProcessStepsSection({ tab }: ProcessStepsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)

  const steps = tab === "counseling" ? COUNSELING_STEPS : COACHING_STEPS
  const badgeLabel = tab === "counseling" ? "심리상담 프로세스" : "성장코칭 프로세스"
  const headline = tab === "counseling" ? "체계적인 4단계 상담" : "체계적인 4단계 코칭"
  const description =
    tab === "counseling"
      ? "심리 진단에서 사후 관리까지, 전 과정을 책임지는 전문 상담 시스템"
      : "진단부터 성장 모니터링까지, 전 과정을 책임지는 전문 코칭 시스템"

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
    setActiveIndex(0)
  }, [tab])

  useEffect(() => {
    if (!isInView) return

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length)
    }, 1700)

    return () => window.clearInterval(timer)
  }, [isInView, steps.length])

  return (
    <section ref={sectionRef} id="process-steps" className={cn("bg-[#F4FAFF]", landingSectionTokens.base)}>
      <div className={landingLayoutTokens.containerMedium}>
        <div className={cn("text-center", landingLayoutTokens.sectionHeaderGap)}>
          <span className={cn("mb-4 inline-flex", landingTypeTokens.eyebrow)}>{badgeLabel}</span>
          <h2 className={landingTypeTokens.sectionTitle}>{headline}</h2>
          <p className={cn("mx-auto mt-5 max-w-2xl text-[#111827]", landingTypeTokens.body)}>{description}</p>
        </div>

        <div className="md:hidden">
          {steps.map((step, index) => (
            <MobileStepItem
              key={`${tab}-${step.num}`}
              step={step}
              isLast={index === steps.length - 1}
              isActive={index === activeIndex}
            />
          ))}
        </div>

        <div className="hidden grid-cols-2 gap-4 md:grid">
          {steps.map((step, index) => (
            <DesktopStepItem key={`${tab}-pc-${step.num}`} step={step} isActive={index === activeIndex} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/about"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-[#0C0C0C] bg-white px-7 text-base font-semibold text-[#0C0C0C] transition-colors hover:bg-[#0C0C0C] hover:text-white"
          >
            사발면 소개 보러가기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
