"use client";
// cache invalidation: v5 — rebuild all modules
import { useRef, useEffect, useState, type ReactNode } from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import StickyTabBar from "@/components/sticky-tab-bar";
import CenterInfo from "@/components/center-info";
import Testimonials from "@/components/testimonials";
import { CTASection, Footer } from "@/components/cta-footer";
import { TabProvider, useTabContext as useTab } from "@/components/tab-context";
import {
  Baby, Smile, BookOpen, Sparkles,
  Brain, Heart, Shield, Compass, Users, TrendingUp,
  ChevronDown, CheckCircle2, ClipboardList, Map, Mic2, BarChart2, X,
} from "lucide-react";

// Unused but forces Turbopack to invalidate module cache on this file
const _cacheBreak: ReactNode = null;

type TabValue = "counseling" | "coaching";

// ─── THEME SYSTEM: Color mapping per service mode ────────────────────────────
const themeMap: Record<TabValue, { primary: string; accent: string; bg: string; light: string }> = {
  counseling: {
    primary: "oklch(0.48 0.09 165)",      // Forest Green
    accent: "oklch(0.40 0.08 155)",
    bg: "oklch(0.48 0.09 165 / 0.08)",
    light: "oklch(0.48 0.09 165 / 0.15)",
  },
  coaching: {
    primary: "oklch(0.62 0.09 45)",       // Warm Yellow
    accent: "oklch(0.70 0.08 35)",
    bg: "oklch(0.62 0.09 45 / 0.08)",
    light: "oklch(0.62 0.09 45 / 0.15)",
  },
};

// ─── INTEGRATED JOURNEY SECTION ──────────────────────────────────────────────
// Color themes: Counseling (Soft Blue-Green), Coaching (Vibrant Orange-Indigo)
const journeyColors = {
  counseling: {
    primary: "oklch(0.55 0.12 195)",       // Soft Blue-Green
    light: "oklch(0.55 0.12 195 / 0.08)",
    border: "oklch(0.55 0.12 195 / 0.25)",
    gradient: "linear-gradient(135deg, oklch(0.95 0.03 195), oklch(0.92 0.05 175))",
  },
  coaching: {
    primary: "oklch(0.65 0.16 35)",        // Vibrant Orange
    light: "oklch(0.65 0.16 35 / 0.08)",
    border: "oklch(0.65 0.16 35 / 0.25)",
    gradient: "linear-gradient(135deg, oklch(0.96 0.04 35), oklch(0.93 0.07 50))",
  },
};

const frameworkData = [
  {
    stage: "발견",
    icon: Compass,
    counseling: "내면의 원인과 기질적 특성 발견",
    coaching: "숨겨진 강점과 잠재 자원 발견",
  },
  {
    stage: "발달",
    icon: TrendingUp,
    counseling: "자존감 회복 및 정서적 성숙",
    coaching: "자기주도성 및 핵심 역량 발달",
  },
  {
    stage: "발휘",
    icon: Sparkles,
    counseling: "안정된 마음을 바탕으로 한 자기 조절",
    coaching: "목표 달성을 위한 폭발적인 실행력",
  },
];

function ServiceDefinitionSection() {
  const headerRef = useFadeIn(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const AUTO_CYCLE_INTERVAL = 3500;

  // Intersection Observer
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Auto cycle rows
  useEffect(() => {
    if (!isInView || isPaused) return;

    const cycleInterval = setInterval(() => {
      setActiveStage((s) => (s + 1) % frameworkData.length);
    }, AUTO_CYCLE_INTERVAL);

    return () => clearInterval(cycleInterval);
  }, [isInView, isPaused]);

  const handleRowClick = (index: number) => {
    setActiveStage(index);
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8" 
      style={{ background: "oklch(0.99 0.005 260)" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Minimal Header */}
        <div ref={headerRef} className="text-center mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.2em] mb-4" style={{ color: "oklch(0.55 0.06 260)" }}>
            Integrated Solution
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 text-balance leading-relaxed tracking-tight" style={{ color: "oklch(0.20 0.02 260)" }}>
            심리상담으로 단단하게,<br className="sm:hidden" /> 성장코칭으로 당당하게
          </h2>
          <p className="text-sm sm:text-base leading-relaxed max-w-xl mx-auto" style={{ color: "oklch(0.45 0.02 260)" }}>
            전문가와 함께 아이의 현재를 진단하고,<br className="hidden sm:block" />
            가장 필요한 솔루션의 조합을 찾아갑니다.
          </p>
        </div>

        {/* Clean Table Layout */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "white" }}>
          
          {/* Fixed Header Row */}
          <div className="grid grid-cols-[100px_1fr_1fr] sm:grid-cols-[120px_1fr_1fr]">
            <div className="py-4 px-3" />
            <div 
              className="py-4 px-4 sm:px-6 flex items-center justify-center gap-2"
              style={{ borderBottom: "1px solid oklch(0.94 0.02 200)" }}
            >
              <Heart className="w-4 h-4" style={{ color: "oklch(0.50 0.10 200)" }} />
              <span className="text-sm font-semibold" style={{ color: "oklch(0.35 0.06 200)" }}>
                심리상담
              </span>
            </div>
            <div 
              className="py-4 px-4 sm:px-6 flex items-center justify-center gap-2"
              style={{ borderBottom: "1px solid oklch(0.94 0.03 40)" }}
            >
              <TrendingUp className="w-4 h-4" style={{ color: "oklch(0.55 0.12 40)" }} />
              <span className="text-sm font-semibold" style={{ color: "oklch(0.40 0.08 40)" }}>
                성장코칭
              </span>
            </div>
          </div>

          {/* Content Rows */}
          {frameworkData.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeStage === index;
            
            return (
              <div
                key={item.stage}
                onClick={() => handleRowClick(index)}
                className="grid grid-cols-[100px_1fr_1fr] sm:grid-cols-[120px_1fr_1fr] cursor-pointer transition-all duration-[800ms] ease-out"
                style={{
                  background: isActive ? "oklch(0.98 0.01 260)" : "transparent",
                  opacity: isActive ? 1 : 0.45,
                }}
              >
                {/* Stage Label */}
                <div 
                  className="py-5 sm:py-6 px-3 flex flex-col items-center justify-center gap-1.5 transition-all duration-[800ms]"
                  style={{
                    background: isActive ? "oklch(0.96 0.02 260)" : "transparent",
                  }}
                >
                  <Icon 
                    className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-[800ms]" 
                    style={{ color: isActive ? "oklch(0.45 0.10 260)" : "oklch(0.65 0.04 260)" }} 
                  />
                  <span 
                    className="text-xs sm:text-sm font-semibold transition-all duration-[800ms]"
                    style={{ color: isActive ? "oklch(0.25 0.05 260)" : "oklch(0.55 0.02 260)" }}
                  >
                    {item.stage}
                  </span>
                </div>

                {/* Counseling Cell */}
                <div 
                  className="py-5 sm:py-6 px-4 sm:px-6 flex items-center transition-all duration-[800ms]"
                  style={{
                    background: isActive ? "oklch(0.97 0.02 200 / 0.4)" : "transparent",
                    boxShadow: isActive ? "inset 0 0 0 1px oklch(0.90 0.03 200)" : "none",
                  }}
                >
                  <p 
                    className="text-sm leading-relaxed transition-all duration-[800ms]"
                    style={{ color: isActive ? "oklch(0.30 0.04 200)" : "oklch(0.55 0.02 200)" }}
                  >
                    {item.counseling}
                  </p>
                </div>

                {/* Coaching Cell */}
                <div 
                  className="py-5 sm:py-6 px-4 sm:px-6 flex items-center transition-all duration-[800ms]"
                  style={{
                    background: isActive ? "oklch(0.98 0.02 40 / 0.4)" : "transparent",
                    boxShadow: isActive ? "inset 0 0 0 1px oklch(0.92 0.03 40)" : "none",
                  }}
                >
                  <p 
                    className="text-sm leading-relaxed transition-all duration-[800ms]"
                    style={{ color: isActive ? "oklch(0.35 0.05 40)" : "oklch(0.55 0.02 40)" }}
                  >
                    {item.coaching}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resume Button */}
        {isPaused && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleResume}
              className="text-xs font-medium px-4 py-2 rounded-full transition-all duration-300 hover:opacity-80"
              style={{ 
                background: "oklch(0.95 0.02 260)", 
                color: "oklch(0.50 0.06 260)" 
              }}
            >
              자동 재생
            </button>
          </div>
        )}

        {/* Unified CTA */}
        <div className="mt-14 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-white transition-all duration-300 hover:translate-y-[-2px]"
            style={{
              background: "linear-gradient(135deg, oklch(0.50 0.08 260), oklch(0.45 0.10 280))",
              boxShadow: "0 8px 32px oklch(0.50 0.10 260 / 0.20), 0 2px 8px oklch(0.45 0.08 260 / 0.12)",
            }}
          >
            <Compass className="w-5 h-5" />
            <span>우리 아이 맞춤형 여정 상담하기</span>
          </a>
          
          <p className="mt-5 text-xs" style={{ color: "oklch(0.55 0.03 260)" }}>
            상담과 코칭 중 무엇이 최선일지, 전문가와 함께 결정하세요
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── FLOATING ACTION MENU ───────────────────────────────────────────────────────
function FloatingActionMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop floating buttons — right bottom corner */}
      <div className="hidden md:fixed md:flex md:bottom-12 md:right-8 md:flex-col md:gap-4 md:z-40">
        <a
          href="#"
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          style={{ background: "oklch(0.48 0.09 165)", color: "white" }}
          title="예약하기"
        >
          <BookOpen className="w-5 h-5" />
        </a>
        <a
          href="https://pf.kakao.com/"
          target="_blank"
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          style={{ background: "oklch(0.62 0.09 45)", color: "white" }}
          title="카카오톡"
        >
          <Heart className="w-5 h-5" />
        </a>
        <a
          href="https://instagram.com/"
          target="_blank"
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          style={{ background: "oklch(0.55 0.07 200)", color: "white" }}
          title="인스타그램"
        >
          <Users className="w-5 h-5" />
        </a>
      </div>

      {/* Mobile floating button with menu */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setOpen(!open)}
          className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all"
          style={{ background: "oklch(0.48 0.09 165)", color: "white" }}
          aria-label="메뉴"
        >
          {open ? <X className="w-6 h-6" /> : <Brain className="w-6 h-6" />}
        </button>
        {open && (
          <div className="absolute bottom-20 right-0 flex flex-col gap-3">
            <a
              href="#"
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all"
              style={{ background: "oklch(0.48 0.09 165)", color: "white" }}
              onClick={() => setOpen(false)}
              title="예약하기"
            >
              <BookOpen className="w-5 h-5" />
            </a>
            <a
              href="https://pf.kakao.com/"
              target="_blank"
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all"
              style={{ background: "oklch(0.62 0.09 45)", color: "white" }}
              onClick={() => setOpen(false)}
              title="카카오톡"
            >
              <Heart className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all"
              style={{ background: "oklch(0.55 0.07 200)", color: "white" }}
              onClick={() => setOpen(false)}
              title="인스타그램"
            >
              <Users className="w-5 h-5" />
            </a>
          </div>
        )}
      </div>
    </>
  );
}

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.transition = `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        obs.disconnect();
      }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

// ─── AGE ACCORDION DATA ───────────────────────────────────────────────────────
const stages = [
  {
    label: "영아기", range: "0 – 2세", icon: Baby,
    accent: "oklch(0.52 0.12 195)", bg: "oklch(0.52 0.12 195 / 0.08)", border: "oklch(0.52 0.12 195 / 0.28)",
    counseling: ["발달 지연 조기 발견", "부모 상담 및 교육", "정서적 안정 지원"],
    coaching:   ["감각 통합 활동 코칭", "부모-��아 놀이 코칭", "두뇌 발달 자극"],
  },
  {
    label: "유아기", range: "3 – 5세", icon: Smile,
    accent: "oklch(0.60 0.13 45)", bg: "oklch(0.60 0.13 45 / 0.08)", border: "oklch(0.60 0.13 45 / 0.28)",
    counseling: ["분리 불안 상담", "언어 발달 치료 연계", "행동 문제 평가"],
    coaching:   ["강점 기반 놀이 코칭", "창의력��������상상력 계발", "사회성 향상 코칭"],
  },
  {
    label: "아동기", range: "6 – 12세", icon: BookOpen,
    accent: "oklch(0.48 0.10 155)", bg: "oklch(0.48 0.10 155 / 0.08)", border: "oklch(0.48 0.10 155 / 0.28)",
    counseling: ["학습 장애 평가", "ADHD 행동 코칭", "또래 갈등 중재"],
    coaching:   ["학습 동기 강화 코칭", "리더십·자존감 코칭", "진로 흥미 탐색"],
  },
  {
    label: "청소년기", range: "13 – 18세", icon: Sparkles,
    accent: "oklch(0.46 0.10 270)", bg: "oklch(0.46 0.10 270 / 0.08)", border: "oklch(0.46 0.10 270 / 0.28)",
    counseling: ["불안·우울 상담", "자해·자살 위험 평가", "가족 관계 회복"],
    coaching:   ["자기 효능감 코칭", "진로 목표 설정", "스트레스 관리 코칭"],
  },
];

// Each accordion row is its own component → hooks always at top, no conditions
function AccordionRow({
  stage, features, index, isOpen, onToggle,
}: {
  stage: typeof stages[0]; features: string[]; index: number;
  isOpen: boolean; onToggle: () => void;
}) {
  const rowRef = useFadeIn(index * 80);
  const Icon = stage.icon;

  return (
    <div
      ref={rowRef}
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: isOpen ? stage.border : "var(--border)", transition: "border-color 0.3s ease" }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-5 py-4 text-left"
        style={{ background: isOpen ? stage.bg : "var(--card)", transition: "background 0.3s ease" }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: stage.bg, border: `1px solid ${stage.border}` }}
        >
          <Icon className="w-5 h-5" style={{ color: stage.accent }} />
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-bold text-sm" style={{ color: "var(--foreground)" }}>{stage.label}</span>
          <span className="text-xs ml-2" style={{ color: "var(--muted-foreground)" }}>{stage.range}</span>
        </div>
        <ChevronDown
          className="w-4 h-4 flex-shrink-0 transition-transform duration-300"
          style={{ color: stage.accent, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Expandable content */}
      <div
        style={{
          maxHeight: isOpen ? "260px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
      >
        <div className="px-5 pb-5 pt-1 flex flex-col gap-2">
          {features.map((f) => (
            <div key={f} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: stage.accent }} />
              <span className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AgeAccordion({ tabKey }: { tabKey: TabValue }) {
  const [openIndex, setOpenIndex] = useState(0);
  const isCounseling = tabKey === "counseling";

  return (
    <div className="flex flex-col gap-3">
      {stages.map((stage, i) => (
        <AccordionRow
          key={stage.label}
          stage={stage}
          features={isCounseling ? stage.counseling : stage.coaching}
          index={i}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
    </div>
  );
}

// Gradient palette: counseling (greens), coaching (ambers)
// index 0→1→2→3 gets progressively darker
const counselingGrads = [
  "oklch(0.97 0.015 165)", // lightest green
  "oklch(0.91 0.04 165)",
  "oklch(0.82 0.07 165)",
  "oklch(0.68 0.09 165)",  // darkest green
];
const coachingGrads = [
  "oklch(0.97 0.015 80)",  // lightest amber
  "oklch(0.92 0.05 65)",
  "oklch(0.85 0.09 50)",
  "oklch(0.75 0.12 40)",   // darkest amber
];

// ─── PC CARD: each card is its own component so useFadeIn hook is at top ────
function AgeCard({
  stage, features, index, tabKey,
}: {
  stage: typeof stages[0]; features: string[]; index: number; tabKey: TabValue;
}) {
  const cardRef = useFadeIn(index * 90);
  const Icon = stage.icon;
  const grads = tabKey === "counseling" ? counselingGrads : coachingGrads;
  const cardBg = grads[index] ?? grads[grads.length - 1];
  const textColor = index >= 2 ? "white" : "var(--foreground)";
  const mutedColor = index >= 2 ? "rgba(255,255,255,0.75)" : "var(--muted-foreground)";

  return (
    <div
      ref={cardRef}
      className="rounded-2xl border p-6 flex flex-col gap-4 cursor-default"
      style={{
        background: cardBg,
        borderColor: index >= 2 ? "transparent" : "var(--border)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center"
        style={{
          background: index >= 2 ? "rgba(255,255,255,0.2)" : stage.bg,
          border: `1px solid ${index >= 2 ? "rgba(255,255,255,0.3)" : stage.border}`,
        }}
      >
        <Icon className="w-5 h-5" style={{ color: index >= 2 ? "white" : stage.accent }} />
      </div>
      <div>
        <p className="font-bold text-base" style={{ color: textColor }}>{stage.label}</p>
        <p className="text-xs" style={{ color: mutedColor }}>{stage.range}</p>
      </div>
      <div className="flex flex-col gap-2 mt-auto">
        {features.map(f => (
          <div key={f} className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: index >= 2 ? "white" : stage.accent }} />
            <span className="text-xs leading-relaxed" style={{ color: mutedColor }}>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgePcGrid({ tabKey }: { tabKey: TabValue }) {
  const isCounseling = tabKey === "counseling";
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {stages.map((stage, i) => (
        <AgeCard key={stage.label} stage={stage} features={isCounseling ? stage.counseling : stage.coaching} index={i} tabKey={tabKey} />
      ))}
    </div>
  );
}

function AgeSection() {
  const { activeTab } = useTab();
  const theme = themeMap[activeTab];
  const headerRef = useFadeIn(0);

  return (
    <section id="ages" className="py-20 px-4 sm:px-6 lg:px-8 transition-all duration-500" style={{ background: theme.light }}>
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="text-center mb-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full" style={{ background: `${theme.primary}/0.1`, color: theme.primary }}>
            연령별 발달 가이드
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3 text-balance" style={{ color: "var(--foreground)" }}>
            우리 아이 몇 살인가요?
          </h2>
          <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: "var(--muted-foreground)" }}>
            {activeTab === "counseling"
              ? "연령별 발달 특성에 맞는 심리 평가와 상담을 제공합니다"
              : "연령에 맞는 강점 중심 코칭 프로그램을 찾아드립니다"}
          </p>
        </div>
        {/* PC: 4-column grid */}
        <div className="hidden md:block">
          <AgePcGrid key={activeTab} tabKey={activeTab} />
        </div>
        {/* Mobile: accordion */}
        <div className="block md:hidden">
          <AgeAccordion key={activeTab} tabKey={activeTab} />
        </div>
      </div>
    </section>
  );
}

// ─── SERVICE STICKY STACK DATA ────────────────────────────────────────────────
const counselingServices = [
  {
    icon: Brain, title: "심리 평가", tag: "진단",
    desc: "표준화 검사로 아이의 발달 수준과 정서 상태를 종합적으로 평가합니다.",
    detail: "K-WISC, CBCL, BSID 등 국제 표준 도구 활용. 인지·언어·사회정서 전 영역 커버.",
    accent: "oklch(0.48 0.09 165)", bg: "oklch(0.48 0.09 165 / 0.08)", border: "oklch(0.48 0.09 165 / 0.2)",
    cardBg: "oklch(0.97 0.006 165)",
  },
  {
    icon: Heart, title: "정서 상담", tag: "치유",
    desc: "불안, 우울, 분노 등 정서적 어려움을 전문 상담사와 함께 해결합니다.",
    detail: "CBT, DBT, 놀이치료 등 근거 기반 접근. 아이 속도에 맞춰 안전하게 진행.",
    accent: "oklch(0.58 0.14 30)", bg: "oklch(0.58 0.14 30 / 0.08)", border: "oklch(0.58 0.14 30 / 0.2)",
    cardBg: "oklch(0.97 0.006 30)",
  },
  {
    icon: Shield, title: "행동 치료", tag: "치료",
    desc: "ADHD, 틱, 공격성 등 행동 문제에 대한 근거 기반 치료를 제공합니다.",
    detail: "ABA, PCIT 등 행동 개입 프로토콜 적용. 보호자 교육을 병행해 가정에서도 일관성 유지.",
    accent: "oklch(0.50 0.10 240)", bg: "oklch(0.50 0.10 240 / 0.08)", border: "oklch(0.50 0.10 240 / 0.2)",
    cardBg: "oklch(0.97 0.005 240)",
  },
];

const coachingServices = [
  {
    icon: TrendingUp, title: "강점 코칭", tag: "성장",
    desc: "아이만의 고유한 강점을 발견하고 자신감과 자기효능감을 높여드립니다.",
    detail: "VIA 강점 검사 기반. 강점을 일상·학습에 연결하는 실전 액션플랜 제공.",
    accent: "oklch(0.48 0.09 165)", bg: "oklch(0.48 0.09 165 / 0.08)", border: "oklch(0.48 0.09 165 / 0.2)",
    cardBg: "oklch(0.97 0.006 165)",
  },
  {
    icon: Compass, title: "진로 코칭", tag: "탐색",
    desc: "흥미와 적성을 탐색하여 미래 방향성을 스스로 설계하도록 안내합니다.",
    detail: "Holland 직업흥미 검사 + 실전 직업 체험 연계. 단계별 포트폴리오 구성.",
    accent: "oklch(0.58 0.14 30)", bg: "oklch(0.58 0.14 30 / 0.08)", border: "oklch(0.58 0.14 30 / 0.2)",
    cardBg: "oklch(0.97 0.006 30)",
  },
  {
    icon: Users, title: "사회성 코칭", tag: "관계",
    desc: "또래 관계, 리더십, 공감 능력을 체계적 프로그램으로 계발합니다.",
    detail: "소그룹 세션 병행. 역할극·피드백 루프로 실제 상황 적용력을 키웁니다.",
    accent: "oklch(0.50 0.10 240)", bg: "oklch(0.50 0.10 240 / 0.08)", border: "oklch(0.50 0.10 240 / 0.2)",
    cardBg: "oklch(0.97 0.005 240)",
  },
];

// Each sticky card is its own component �� hooks always at top
function StickyServiceCard({
  item, index, total,
}: {
  item: typeof counselingServices[0]; index: number; total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const Icon = item.icon;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="sticky"
      style={{
        top: `${72 + index * 10}px`,
        zIndex: index + 1,
        marginBottom: index < total - 1 ? "1.5rem" : 0,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <div
        className="rounded-2xl border overflow-hidden"
        style={{
          background: item.cardBg,
          borderColor: item.border,
          boxShadow: `0 4px 24px ${item.bg.replace("0.08", "0.18")}`,
        }}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full" style={{ background: item.accent }} />

        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5">
            {/* Icon + tag */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: item.bg, border: `1.5px solid ${item.border}` }}
              >
                <Icon className="w-7 h-7" style={{ color: item.accent }} />
              </div>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: item.bg, color: item.accent, border: `1px solid ${item.border}` }}
              >
                {item.tag}
              </span>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-xl mb-2" style={{ color: "var(--foreground)" }}>{item.title}</h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--foreground)", opacity: 0.85 }}>
                {item.desc}
              </p>
              <div
                className="flex items-start gap-2 text-xs leading-relaxed pl-3 py-0.5"
                style={{ color: "var(--muted-foreground)", borderLeft: `2px solid ${item.accent}` }}
              >
                {item.detail}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceStack({ tabKey }: { tabKey: TabValue }) {
  const services = tabKey === "counseling" ? counselingServices : coachingServices;
  return (
    <div className="relative flex flex-col">
      {services.map((svc, i) => (
        <StickyServiceCard key={svc.title} item={svc} index={i} total={services.length} />
      ))}
      {/* spacer so the last sticky card scrolls out */}
      <div style={{ height: "80px" }} />
    </div>
  );
}

// ─── PC SERVICE CARD ─────────────────────────────────────────────────────────
function ServicePcCard({
  item, index, tabKey,
}: {
  item: typeof counselingServices[0]; index: number; tabKey: TabValue;
}) {
  const cardRef = useFadeIn(index * 100);
  const Icon = item.icon;
  // 3 cards: light → mid → dark
  const svcGrads = tabKey === "counseling"
    ? ["oklch(0.97 0.015 165)", "oklch(0.85 0.07 165)", "oklch(0.62 0.10 165)"]
    : ["oklch(0.97 0.015 65)", "oklch(0.88 0.08 55)", "oklch(0.75 0.12 40)"];
  const cardBg = svcGrads[index] ?? svcGrads[svcGrads.length - 1];
  const isLight = index === 0;
  const textColor = isLight ? "var(--foreground)" : index === 1 ? "oklch(0.2 0.01 0)" : "white";
  const mutedColor = isLight ? "var(--muted-foreground)" : index === 1 ? "oklch(0.35 0.01 0)" : "rgba(255,255,255,0.8)";

  return (
    <div
      ref={cardRef}
      className="rounded-2xl border overflow-hidden flex flex-col"
      style={{
        background: cardBg,
        borderColor: isLight ? "var(--border)" : "transparent",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-5px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 40px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      <div className="h-1 w-full" style={{ background: isLight ? item.accent : "rgba(255,255,255,0.4)" }} />
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: isLight ? item.bg : "rgba(255,255,255,0.2)",
              border: `1px solid ${isLight ? item.border : "rgba(255,255,255,0.3)"}`,
            }}
          >
            <Icon className="w-5 h-5" style={{ color: isLight ? item.accent : "white" }} />
          </div>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{
              background: isLight ? item.bg : "rgba(255,255,255,0.2)",
              color: isLight ? item.accent : "white",
              border: `1px solid ${isLight ? item.border : "rgba(255,255,255,0.3)"}`,
            }}
          >
            {item.tag}
          </span>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2" style={{ color: textColor }}>{item.title}</h3>
          <p className="text-sm leading-relaxed" style={{ color: mutedColor }}>{item.desc}</p>
        </div>
        <div
          className="mt-auto text-xs leading-relaxed pl-3 py-1"
          style={{
            color: mutedColor,
            borderLeft: `2px solid ${isLight ? item.accent : "rgba(255,255,255,0.5)"}`,
          }}
        >
          {item.detail}
        </div>
      </div>
    </div>
  );
}

function ServicePcGrid({ tabKey }: { tabKey: TabValue }) {
  const services = tabKey === "counseling" ? counselingServices : coachingServices;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {services.map((svc, i) => (
        <ServicePcCard key={svc.title} item={svc} index={i} tabKey={tabKey} />
      ))}
    </div>
  );
}

function ServiceSection() {
  const { activeTab } = useTab();
  const theme = themeMap[activeTab];
  const headerRef = useFadeIn(0);

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 transition-all duration-500" style={{ background: "var(--background)" }}>
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="text-center mb-12">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
            style={{
              background: `${theme.primary}/0.1`,
              color: theme.primary,
            }}
          >
            전문 {activeTab === "counseling" ? "상담" : "코칭"} 가이드
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3 text-balance" style={{ color: "var(--foreground)" }}>
            과학적 접근, 따뜻한 마음으로
          </h2>
          <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: "var(--muted-foreground)" }}>
            발달심리학 이론을 바탕으로 아이 개개인의 특성을 존중하는 맞춤형 서비스를 제공합니다
          </p>
        </div>
        {/* PC: 3-column grid with hover lift */}
        <div className="hidden md:block">
          <ServicePcGrid key={activeTab} tabKey={activeTab} />
        </div>
        {/* Mobile: sticky stack */}
        <div className="block md:hidden">
          <ServiceStack key={activeTab} tabKey={activeTab} />
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS DATA ────────────────────────────────────────────────────────────
// 심리상담 프로세스
const counselingProcessSteps = [
  {
    num: "01", icon: ClipboardList, title: "마음 진단",
    desc: "다각적 심리검사를 통한 내면 기질 및 현재 상태 파악",
    detail: "TCI, MMPI-2 등 표준화 검사 실시. 전문가 심층 면담 진행.",
    accent: "oklch(0.48 0.09 165)", bg: "oklch(0.48 0.09 165 / 0.08)", border: "oklch(0.48 0.09 165 / 0.25)",
  },
  {
    num: "02", icon: Map, title: "상담 목표 설정",
    desc: "호소 문제의 근본 원인 탐색 및 맞춤형 치료 방향 수립",
    detail: "내담자 중심의 구체적 변화 목표 설정. 개별 상담 전략 구성.",
    accent: "oklch(0.62 0.09 45)", bg: "oklch(0.62 0.09 45 / 0.08)", border: "oklch(0.62 0.09 45 / 0.25)",
  },
  {
    num: "03", icon: Mic2, title: "심층 상담 진행",
    desc: "증상 완화 및 심리적 회복을 위한 전문적 개입 실행",
    detail: "인지행동(CBT), 놀이/미술 치료 등 맞춤 기법 적용. 정서적 지지망 형성.",
    accent: "oklch(0.52 0.08 290)", bg: "oklch(0.52 0.08 290 / 0.08)", border: "oklch(0.52 0.08 290 / 0.25)",
  },
  {
    num: "04", icon: BarChart2, title: "종결 및 사후 관리",
    desc: "변화된 마음의 안정성 확인 및 일상 적응력 유지 지원",
    detail: "변화 모니터링 및 재발 방지 교육. 종결 후 안정적 자립 가이드 제공.",
    accent: "oklch(0.55 0.07 200)", bg: "oklch(0.55 0.07 200 / 0.08)", border: "oklch(0.55 0.07 200 / 0.25)",
  },
];

// 성장코칭 프로세스
const coachingProcessSteps = [
  {
    num: "01", icon: ClipboardList, title: "발달 평가",
    desc: "표준화 도구를 활용한 종합적 발달 상태 평가 및 강점·약점 분석",
    detail: "K-WISC, CBCL 등 국제 표준 도구. 인지·언어·사회정서 전 영역 측정.",
    accent: "oklch(0.48 0.09 165)", bg: "oklch(0.48 0.09 165 / 0.08)", border: "oklch(0.48 0.09 165 / 0.25)",
  },
  {
    num: "02", icon: Map, title: "코칭 계획 수립",
    desc: "평가 결과 기반 개인화된 발달 지원 계획 수립 및 목표 설정",
    detail: "강점 기반 접근. 보호자와 함께 단기·장기 목표 설정 및 세션 로드맵 구성.",
    accent: "oklch(0.62 0.09 45)", bg: "oklch(0.62 0.09 45 / 0.08)", border: "oklch(0.62 0.09 45 / 0.25)",
  },
  {
    num: "03", icon: Mic2, title: "맞춤 코칭 실행",
    desc: "전문 코치와 함께하는 1:1 맞춤형 코칭 세션 주 1~2회 진행",
    detail: "50분 집중 세션 + 매 회기 후 보호자 피드백. 놀이·활동 기반 개입.",
    accent: "oklch(0.52 0.08 290)", bg: "oklch(0.52 0.08 290 / 0.08)", border: "oklch(0.52 0.08 290 / 0.25)",
  },
  {
    num: "04", icon: BarChart2, title: "성장 모니터링",
    desc: "정기 재평가를 통한 성장 추적 및 코칭 계획 업데이트",
    detail: "3개월마다 공식 재평가. 성장 그래프 및 보고서 제공.",
    accent: "oklch(0.55 0.07 200)", bg: "oklch(0.55 0.07 200 / 0.08)", border: "oklch(0.55 0.07 200 / 0.25)",
  },
];

// 탭에 따라 사용할 프로세스 데이터를 반환하는 함수
const getProcessSteps = (tab: TabValue | undefined) => {
  if (tab === "counseling") return counselingProcessSteps;
  return coachingProcessSteps;
};

// 기본값 (하위 호환성)
const processSteps = coachingProcessSteps;

// Mobile timeline item — independent component so hooks are always at top
function MobileTimelineStep({ step, isLast }: { step: typeof processSteps[0]; isLast: boolean }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const Icon = step.icon;

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); else setActive(false); },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={itemRef} className="flex gap-4">
      {/* Spine */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: 40 }}>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center z-10"
          style={{
            background: active ? step.bg : "var(--secondary)",
            border: `2px solid ${active ? step.accent : "var(--border)"}`,
            boxShadow: active ? `0 0 0 4px ${step.bg}` : "none",
            transform: active ? "scale(1.12)" : "scale(1)",
            transition: "all 0.4s ease",
          }}
        >
          <Icon className="w-4 h-4" style={{ color: active ? step.accent : "var(--muted-foreground)", transition: "color 0.3s" }} />
        </div>
        {!isLast && (
          <div
            className="flex-1 my-1"
            style={{
              width: 2, minHeight: 48,
              background: `repeating-linear-gradient(to bottom, ${active ? step.accent : "var(--border)"} 0px, ${active ? step.accent : "var(--border)"} 4px, transparent 4px, transparent 9px)`,
              transition: "background 0.4s ease",
            }}
          />
        )}
      </div>
      {/* Card */}
      <div
        className={`flex-1 rounded-xl p-4 ${isLast ? "mb-0" : "mb-6"}`}
        style={{
          background: active ? step.bg : "var(--card)",
          border: `1px solid ${active ? step.border : "var(--border)"}`,
          transform: active ? "scale(1.02)" : "scale(1)",
          opacity: active ? 1 : 0.65,
          transition: "all 0.4s ease",
        }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: step.bg, color: step.accent }}>{step.num}</span>
          <h3 className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{step.title}</h3>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{step.desc}</p>
      </div>
    </div>
  );
}

// PC process row — independent component so hooks are always at top
function DesktopProcessRow({
  step, index, isActive, onActivate,
}: {
  step: typeof processSteps[0]; index: number; isActive: boolean; onActivate: (i: number) => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const Icon = step.icon;
  // stable activator stored in ref so useEffect dep never changes
  const activatorRef = useRef(onActivate);
  activatorRef.current = onActivate;

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const stable = (i: number) => activatorRef.current(i);
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) stable(index); },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={rowRef}
      className="grid gap-10 py-10"
      style={{
        gridTemplateColumns: "110px 1fr",
        borderBottom: index < processSteps.length - 1 ? "1px solid var(--border)" : "none",
      }}
    >
      <div className="flex flex-col items-end justify-start pt-1">
        <span
          className="font-serif font-bold leading-none select-none"
          style={{
            fontSize: "clamp(3rem, 5vw, 4.5rem)",
            color: isActive ? step.accent : "var(--border)",
            opacity: isActive ? 1 : 0.5,
            transform: isActive ? "scale(1)" : "scale(0.92)",
            transition: "all 0.4s ease",
            display: "block",
          }}
        >
          {step.num}
        </span>
        <div className="w-7 h-0.5 mt-1.5 rounded" style={{ background: isActive ? step.accent : "var(--border)", opacity: isActive ? 1 : 0.3, transition: "all 0.4s ease" }} />
      </div>
      <div
        className="rounded-2xl border p-5"
        style={{
          background: isActive ? step.bg : "var(--card)",
          borderColor: isActive ? step.border : "var(--border)",
          opacity: isActive ? 1 : 0.45,
          transform: isActive ? "translateY(0)" : "translateY(4px)",
          transition: "all 0.4s ease",
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: step.bg, border: `1px solid ${step.border}` }}>
            <Icon className="w-4 h-4" style={{ color: step.accent }} />
          </div>
          <h3 className="font-bold text-base" style={{ color: "var(--foreground)" }}>{step.title}</h3>
        </div>
        <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--foreground)", opacity: 0.8 }}>{step.desc}</p>
        <p className="text-xs leading-relaxed pl-3" style={{ color: "var(--muted-foreground)", borderLeft: `2px solid ${step.accent}`, opacity: isActive ? 1 : 0, transition: "opacity 0.3s ease 0.1s" }}>{step.detail}</p>
      </div>
    </div>
  );
}

function DesktopProcessTimeline({ steps }: { steps?: typeof processSteps }) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Always use processSteps as fallback - defensive coding
  const safeSteps = processSteps;
  const displaySteps = (steps && Array.isArray(steps) && steps.length > 0) ? steps : safeSteps;
  
  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute left-[109px] top-0 bottom-0 w-px" style={{ background: "var(--border)" }} />
      {displaySteps && displaySteps.map((step, i) => (
        <DesktopProcessRow key={step.num} step={step} index={i} isActive={activeIndex === i} onActivate={setActiveIndex} />
      ))}
    </div>
  );
}

function ProcessSection() {
  const { activeTab } = useTab();
  const theme = themeMap[activeTab] ?? themeMap.counseling;
  const headerRef = useFadeIn(0);
  const steps = getProcessSteps(activeTab) ?? processSteps;

  return (
    <section id="process" className="py-20 px-4 sm:px-6 lg:px-8 transition-all duration-500" style={{ background: theme.light }}>
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="text-center mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full" style={{ background: `${theme.primary}/0.1`, color: theme.primary }}>
            {activeTab === "counseling" ? "심리상담" : "성장코칭"} 프로세스
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3 text-balance" style={{ color: "var(--foreground)" }}>
            체계적인 4단계 {activeTab === "counseling" ? "상담" : "코칭"}
          </h2>
          <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: "var(--muted-foreground)" }}>
            {activeTab === "counseling" 
              ? "심리 진단에서 사후 관리까지, 전 과정을 책임지는 전문 상담 시스템"
              : "과학적 평가에서 성장 모니터링까지, 전 과정을 책임지는 전문 코칭 시스템"}
          </p>
        </div>
        {/* Mobile: vertical timeline */}
        <div className="block md:hidden px-2">
          {steps.map((step, i) => (
            <MobileTimelineStep key={step.num} step={step} isLast={i === steps.length - 1} />
          ))}
        </div>
        {/* PC: number + card 2-col */}
        <div className="hidden md:block">
          <DesktopProcessTimeline steps={steps} />
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────────���─
export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      
      <TabProvider>
        <ServiceDefinitionSection />
        <StickyTabBar />
        <AgeSection />
        <ServiceSection />
        <ProcessSection />
      </TabProvider>
      <CenterInfo />
      <Testimonials />
      <CTASection />
      <Footer />
      
      {/* Floating action menu — PC and mobile */}
      <FloatingActionMenu />
    </main>
  );
}
