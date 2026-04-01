"use client"

import { useEffect, useRef, useState } from "react"
import { BarChart2, ClipboardList, Map, Mic2 } from "lucide-react"
import type { HomeServiceTab } from "@/features/home/model/home-tab"

interface ProcessStepsSectionProps {
  tab: HomeServiceTab
}

interface ProcessStep {
  num: string
  icon: typeof ClipboardList
  title: string
  desc: string
  detail: string
  accent: string
  bg: string
  border: string
}

const COUNSELING_STEPS: ProcessStep[] = [
  {
    num: "01",
    icon: ClipboardList,
    title: "발달 평가",
    desc: "표준화 도구를 활용해 현재 발달과 정서 상태를 종합적으로 평가합니다.",
    detail: "K-WISC, CBCL 등 기초 평가 결과를 통합해 인지·언어·행동·사회정서 영역을 체계적으로 점검합니다.",
    accent: "oklch(0.48 0.09 165)",
    bg: "oklch(0.48 0.09 165 / 0.08)",
    border: "oklch(0.48 0.09 165 / 0.25)",
  },
  {
    num: "02",
    icon: Map,
    title: "상담 계획 수립",
    desc: "평가 결과를 바탕으로 개인화된 상담 계획과 목표를 설계합니다.",
    detail: "정서 안정과 행동 변화를 위한 단기·중기 목표를 설정하고 보호자와 함께 실천 로드맵을 구성합니다.",
    accent: "oklch(0.62 0.09 45)",
    bg: "oklch(0.62 0.09 45 / 0.08)",
    border: "oklch(0.62 0.09 45 / 0.25)",
  },
  {
    num: "03",
    icon: Mic2,
    title: "맞춤 상담 실행",
    desc: "전문가와 함께하는 1:1 맞춤 상담 세션을 주기적으로 진행합니다.",
    detail: "놀이·대화 기반 개입과 회기별 보호자 피드백을 병행해 일상에서도 변화가 이어지도록 돕습니다.",
    accent: "oklch(0.52 0.08 290)",
    bg: "oklch(0.52 0.08 290 / 0.08)",
    border: "oklch(0.52 0.08 290 / 0.25)",
  },
  {
    num: "04",
    icon: BarChart2,
    title: "변화 모니터링",
    desc: "정기 점검을 통해 변화 흐름을 추적하고 상담 계획을 업데이트합니다.",
    detail: "주기적 리포트로 정서·행동 지표를 확인하고, 목표 달성 이후 유지 프로그램까지 자연스럽게 연결합니다.",
    accent: "oklch(0.55 0.07 200)",
    bg: "oklch(0.55 0.07 200 / 0.08)",
    border: "oklch(0.55 0.07 200 / 0.25)",
  },
]

const COACHING_STEPS: ProcessStep[] = [
  {
    num: "01",
    icon: ClipboardList,
    title: "강점 진단",
    desc: "강점, 흥미, 학습 성향을 진단해 성장의 출발점을 찾습니다.",
    detail: "활동 성향과 동기 패턴을 분석해 코칭에 활용할 핵심 강점 키워드를 도출합니다.",
    accent: "oklch(0.58 0.11 55)",
    bg: "oklch(0.58 0.11 55 / 0.08)",
    border: "oklch(0.58 0.11 55 / 0.25)",
  },
  {
    num: "02",
    icon: Map,
    title: "코칭 계획 수립",
    desc: "진단 결과를 기반으로 실행 가능한 목표와 코칭 계획을 설계합니다.",
    detail: "단기 성취와 장기 성장 목표를 연결해 학업·관계·진로를 아우르는 로드맵을 구성합니다.",
    accent: "oklch(0.53 0.09 250)",
    bg: "oklch(0.53 0.09 250 / 0.08)",
    border: "oklch(0.53 0.09 250 / 0.25)",
  },
  {
    num: "03",
    icon: Mic2,
    title: "맞춤 코칭 실행",
    desc: "주기적인 1:1 코칭 세션으로 실행 습관과 자기주도성을 강화합니다.",
    detail: "실행 점검, 피드백, 동기 강화 루프를 반복해 목표 달성률을 안정적으로 높입니다.",
    accent: "oklch(0.52 0.1 180)",
    bg: "oklch(0.52 0.1 180 / 0.08)",
    border: "oklch(0.52 0.1 180 / 0.25)",
  },
  {
    num: "04",
    icon: BarChart2,
    title: "성장 모니터링",
    desc: "성과를 점검해 다음 성장 목표를 업데이트하고 확장합니다.",
    detail: "월간 성과 리뷰를 통해 실행력·자기주도성·관계 역량 향상 추이를 확인하고 다음 단계로 연결합니다.",
    accent: "oklch(0.6 0.11 35)",
    bg: "oklch(0.6 0.11 35 / 0.08)",
    border: "oklch(0.6 0.11 35 / 0.25)",
  },
]

function MobileTimelineItem({
  step,
  isLast,
}: {
  step: ProcessStep
  isLast: boolean
}) {
  const itemRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const Icon = step.icon

  useEffect(() => {
    const el = itemRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setActive(true)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const line = lineRef.current
    if (!line) return
    line.style.transition = active ? "transform 0.6s ease 0.2s" : "none"
    line.style.transform = active ? "scaleY(1)" : "scaleY(0)"
  }, [active])

  return (
    <div ref={itemRef} className="flex gap-4">
      <div className="flex w-10 flex-shrink-0 flex-col items-center">
        <div
          className="z-10 flex h-10 w-10 items-center justify-center rounded-full"
          style={{
            background: active ? step.bg : "var(--secondary)",
            border: `2px solid ${active ? step.accent : "var(--border)"}`,
            boxShadow: active ? `0 0 0 4px ${step.bg}` : "none",
            transform: active ? "scale(1.12)" : "scale(1)",
            transition: "all 0.4s ease",
          }}
        >
          <Icon
            className="h-4 w-4"
            style={{
              color: active ? step.accent : "var(--muted-foreground)",
              transition: "color 0.3s ease",
            }}
          />
        </div>

        {!isLast && (
          <div className="relative my-1 min-h-10 flex-1 overflow-hidden" style={{ width: 2 }}>
            <div
              className="absolute inset-0"
              style={{
                background: "repeating-linear-gradient(to bottom, var(--border) 0px, var(--border) 4px, transparent 4px, transparent 9px)",
              }}
            />
            <div
              ref={lineRef}
              className="absolute inset-0 origin-top"
              style={{
                transform: "scaleY(0)",
                background: `repeating-linear-gradient(to bottom, ${step.accent} 0px, ${step.accent} 4px, transparent 4px, transparent 9px)`,
              }}
            />
          </div>
        )}
      </div>

      <div
        className={`flex-1 rounded-xl p-3 ${isLast ? "mb-0" : "mb-4"}`}
        style={{
          background: active ? step.bg : "transparent",
          border: `1px solid ${active ? step.border : "transparent"}`,
          transition: "all 0.4s ease",
        }}
      >
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded px-2 py-0.5 text-xs font-bold" style={{ background: step.bg, color: step.accent }}>
            {step.num}
          </span>
          <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            {step.title}
          </h3>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          {step.desc}
        </p>
      </div>
    </div>
  )
}

function DesktopStepRow({
  step,
  index,
  isLast,
  isActive,
  onActivate,
}: {
  step: ProcessStep
  index: number
  isLast: boolean
  isActive: boolean
  onActivate: (i: number) => void
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  const Icon = step.icon

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onActivate(index)
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index, onActivate])

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-[120px_1fr] gap-10 py-14"
      style={{ borderBottom: isLast ? "none" : "1px solid var(--border)" }}
    >
      <div className="flex flex-col items-end justify-start pt-1">
        <span
          className="select-none text-[clamp(3.5rem,6vw,5rem)] font-bold leading-none"
          style={{
            color: isActive ? step.accent : "var(--border)",
            opacity: isActive ? 1 : 0.5,
            transform: isActive ? "scale(1)" : "scale(0.93)",
            transition: "all 0.4s ease",
          }}
        >
          {step.num}
        </span>
        <div
          className="mt-2 h-0.5 w-8 rounded"
          style={{
            background: isActive ? step.accent : "var(--border)",
            opacity: isActive ? 1 : 0.3,
            transition: "all 0.4s ease",
          }}
        />
      </div>

      <div
        className="rounded-2xl border p-6"
        style={{
          background: isActive ? step.bg : "var(--card)",
          borderColor: isActive ? step.border : "var(--border)",
          opacity: isActive ? 1 : 0.45,
          transform: isActive ? "translateY(0)" : "translateY(4px)",
          transition: "all 0.4s ease",
        }}
      >
        <div className="mb-3 flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: step.bg, border: `1px solid ${step.border}` }}
          >
            <Icon className="h-5 w-5" style={{ color: step.accent }} />
          </div>
          <h3 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
            {step.title}
          </h3>
        </div>
        <p className="mb-3 text-sm leading-relaxed" style={{ color: "var(--foreground)", opacity: 0.8 }}>
          {step.desc}
        </p>
        <p
          className="pl-3 text-xs leading-relaxed"
          style={{
            color: "var(--muted-foreground)",
            borderLeft: `2px solid ${step.accent}`,
            opacity: isActive ? 1 : 0,
            transition: "opacity 0.3s ease 0.15s",
          }}
        >
          {step.detail}
        </p>
      </div>
    </div>
  )
}

function DesktopTimeline({ steps }: { steps: ProcessStep[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activateRef = useRef(setActiveIndex)
  activateRef.current = setActiveIndex
  const stableActivate = useRef((i: number) => activateRef.current(i)).current

  return (
    <div className="relative">
      <div className="absolute bottom-0 left-[119px] top-0 w-px" style={{ background: "var(--border)" }} />
      <div>
        {steps.map((step, i) => (
          <DesktopStepRow
            key={step.num}
            step={step}
            index={i}
            isLast={i === steps.length - 1}
            isActive={activeIndex === i}
            onActivate={stableActivate}
          />
        ))}
      </div>
    </div>
  )
}

export function ProcessStepsSection({ tab }: ProcessStepsSectionProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerVisible, setHeaderVisible] = useState(false)

  const steps = tab === "counseling" ? COUNSELING_STEPS : COACHING_STEPS
  const badgeLabel = tab === "counseling" ? "상담 프로세스" : "코칭 프로세스"
  const headline = tab === "counseling" ? "체계적인 4단계 상담" : "체계적인 4단계 코칭"
  const description =
    tab === "counseling"
      ? "과학적 평가에서 변화 모니터링까지, 정서 회복을 위한 전 과정을 체계적으로 진행합니다."
      : "강점 진단에서 성장 모니터링까지, 목표 실행과 성장을 위한 전 과정을 체계적으로 진행합니다."

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="process-steps" className="bg-[var(--background)] px-4 py-20 font-sans sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div
          ref={headerRef}
          className="mb-14 text-center"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span
            className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: tab === "counseling" ? "oklch(0.48 0.09 165 / 0.1)" : "oklch(0.58 0.11 55 / 0.1)",
              color: tab === "counseling" ? "oklch(0.48 0.09 165)" : "oklch(0.58 0.11 55)",
            }}
          >
            {badgeLabel}
          </span>
          <h2 className="mb-3 text-balance text-3xl font-bold sm:text-4xl" style={{ color: "var(--foreground)" }}>
            {headline}
          </h2>
          <p className="mx-auto max-w-md text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            {description}
          </p>
        </div>

        <div key={`process-${tab}`} className="animate-in fade-in duration-200">
          <div className="md:hidden">
            {steps.map((step, i) => (
              <MobileTimelineItem key={`${tab}-${step.num}`} step={step} isLast={i === steps.length - 1} />
            ))}
          </div>

          <div className="hidden md:block">
            <DesktopTimeline key={tab} steps={steps} />
          </div>
        </div>
      </div>
    </section>
  )
}
