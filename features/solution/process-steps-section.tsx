"use client"

import { useEffect, useRef, useState } from "react"
import { ClipboardList, Map, Mic2, BarChart2 } from "lucide-react"

const steps = [
  {
    num: "01",
    icon: ClipboardList,
    title: "발달 평가",
    desc: "표준화 도구를 활용한 종합적인 발달 상태 평가 및 강점·약점 분석을 진행합니다.",
    detail: "K-WISC, CBCL 등 표준화 평가 도구 활용. 인지·언어·운동·사회정서 전 영역을 체계적으로 측정합니다.",
    accent: "oklch(0.48 0.09 165)",
    bg: "oklch(0.48 0.09 165 / 0.08)",
    border: "oklch(0.48 0.09 165 / 0.25)",
  },
  {
    num: "02",
    icon: Map,
    title: "코칭 계획 수립",
    desc: "평가 결과를 기반으로 개인화된 발달 지원 계획을 수립하고 목표를 설정합니다.",
    detail: "강점 기반 접근으로 아이의 가능성에 집중. 보호자와 함께 단기·장기 목표를 설정하고 세션 로드맵을 구성합니다.",
    accent: "oklch(0.62 0.09 45)",
    bg: "oklch(0.62 0.09 45 / 0.08)",
    border: "oklch(0.62 0.09 45 / 0.25)",
  },
  {
    num: "03",
    icon: Mic2,
    title: "맞춤 코칭 실행",
    desc: "전문 코치와 함께하는 1:1 맞춤형 코칭 세션을 주 1~2회 진행합니다.",
    detail: "50분 집중 세션 + 매 회기 후 보호자 피드백 공유. 놀이·활동 기반 개입으로 아이가 즐겁게 참여합니다.",
    accent: "oklch(0.52 0.08 290)",
    bg: "oklch(0.52 0.08 290 / 0.08)",
    border: "oklch(0.52 0.08 290 / 0.25)",
  },
  {
    num: "04",
    icon: BarChart2,
    title: "성장 모니터링",
    desc: "정기적인 재평가를 통한 성장을 추적하고 코칭 계획을 업데이트합니다.",
    detail: "3개월마다 공식 재평가. 성장 그래프 및 보고서 제공. 목표 달성 후 유지 프로그램으로 연계합니다.",
    accent: "oklch(0.55 0.07 200)",
    bg: "oklch(0.55 0.07 200 / 0.08)",
    border: "oklch(0.55 0.07 200 / 0.25)",
  },
]

function MobileTimelineItem({
  step,
  isLast,
}: {
  step: (typeof steps)[0]
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
  isActive,
  onActivate,
}: {
  step: (typeof steps)[0]
  index: number
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
      style={{ borderBottom: index < steps.length - 1 ? "1px solid var(--border)" : "none" }}
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

function DesktopTimeline() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activateRef = useRef(setActiveIndex)
  activateRef.current = setActiveIndex
  const stableActivate = useRef((i: number) => activateRef.current(i)).current

  return (
    <div className="relative">
      <div className="absolute bottom-0 left-[119px] top-0 w-px" style={{ background: "var(--border)" }} />
      <div>
        {steps.map((step, i) => (
          <DesktopStepRow key={step.num} step={step} index={i} isActive={activeIndex === i} onActivate={stableActivate} />
        ))}
      </div>
    </div>
  )
}

export function ProcessStepsSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerVisible, setHeaderVisible] = useState(false)

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
    <section id="process" className="bg-[var(--background)] px-4 py-20 font-sans sm:px-6 lg:px-8">
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
            style={{ background: "oklch(0.48 0.09 165 / 0.1)", color: "var(--primary)" }}
          >
            코칭 프로세스
          </span>
          <h2 className="mb-3 text-balance text-3xl font-bold sm:text-4xl" style={{ color: "var(--foreground)" }}>
            체계적인 4단계 코칭
          </h2>
          <p className="mx-auto max-w-md text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            과학적 평가에서 성장 모니터링까지, 전 과정을 책임지는 전문 코칭 시스템
          </p>
        </div>

        <div className="md:hidden">
          {steps.map((step, i) => (
            <MobileTimelineItem key={step.num} step={step} isLast={i === steps.length - 1} />
          ))}
        </div>

        <div className="hidden md:block">
          <DesktopTimeline />
        </div>
      </div>
    </section>
  )
}
