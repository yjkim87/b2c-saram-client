"use client";

import { useState, useEffect, useRef } from "react";
import { Baby, Smile, BookOpen, Sparkles, ChevronRight } from "lucide-react";
import { useTabContext } from "./tab-context";

// ── Data ─────────────────────────────────────────────────────────────
const stages = [
  {
    label: "영아기",
    range: "0 – 2세",
    icon: Baby,
    accent: "oklch(0.55 0.12 195)",
    bg: "oklch(0.55 0.12 195 / 0.08)",
    border: "oklch(0.55 0.12 195 / 0.3)",
    counseling: ["발달 지연 조기 발견", "부모 상담 및 교육", "정서적 안정 지원"],
    coaching: ["감각 통합 활동 코칭", "부모-영아 놀이 코칭", "두뇌 발달 자극"],
  },
  {
    label: "유아기",
    range: "3 – 5세",
    icon: Smile,
    accent: "oklch(0.62 0.13 45)",
    bg: "oklch(0.62 0.13 45 / 0.08)",
    border: "oklch(0.62 0.13 45 / 0.3)",
    counseling: ["분리 불안 상담", "언어 발달 치료 연계", "행동 문제 평가"],
    coaching: ["강점 기반 놀이 코칭", "창의력·상상력 계발", "사회성 향상 코칭"],
  },
  {
    label: "아동기",
    range: "6 – 12세",
    icon: BookOpen,
    accent: "oklch(0.5 0.1 155)",
    bg: "oklch(0.5 0.1 155 / 0.08)",
    border: "oklch(0.5 0.1 155 / 0.3)",
    counseling: ["학습 장애 평가", "ADHD 행동 코칭", "또래 갈등 중재"],
    coaching: ["학습 동기 강화 코칭", "리더십·자존감 코칭", "진로 흥미 탐색"],
  },
  {
    label: "청소년기",
    range: "13 – 18세",
    icon: Sparkles,
    accent: "oklch(0.48 0.1 270)",
    bg: "oklch(0.48 0.1 270 / 0.08)",
    border: "oklch(0.48 0.1 270 / 0.3)",
    counseling: ["불안·우울 상담", "자해·자살 위험 평가", "가족 관계 회복"],
    coaching: ["자기 효능감 코칭", "진로 목표 설정", "스트레스 관리 코칭"],
  },
];

// ── Single card — self-contained hook at top, no early return ────────
function StageCard({
  stage,
  features,
  delay,
}: {
  stage: (typeof stages)[0];
  features: string[];
  delay: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const Icon = stage.icon;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const timeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="rounded-2xl border p-5 flex flex-col gap-3 cursor-pointer group"
      style={{
        background: "var(--card)",
        borderColor: stage.border,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, box-shadow 0.25s ease`,
        boxShadow: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px ${stage.bg.replace("0.08", "0.25")}`;
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: stage.bg, border: `1px solid ${stage.border}` }}
        >
          <Icon className="w-5 h-5" style={{ color: stage.accent }} />
        </div>
        <div>
          <p className="font-bold text-sm leading-tight" style={{ color: "var(--foreground)" }}>
            {stage.label}
          </p>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            {stage.range}
          </p>
        </div>
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-1.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <ChevronRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: stage.accent }} />
            <span className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              {f}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Grid panel with key-based remount for tab transitions ────────────
function StageGrid({ tabKey }: { tabKey: string }) {
  const isCounseling = tabKey === "counseling";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stages.map((stage, i) => (
        <StageCard
          key={stage.label}
          stage={stage}
          features={isCounseling ? stage.counseling : stage.coaching}
          delay={i * 100}
        />
      ))}
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────
export default function AgeGrid() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const { activeTab } = useTabContext();

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="ages" className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "var(--secondary)" }}>
      <div className="max-w-6xl mx-auto">
        <div
          ref={headerRef}
          className="text-center mb-10"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
            style={{
              background: activeTab === "counseling" ? "oklch(0.48 0.09 165 / 0.1)" : "oklch(0.62 0.09 45 / 0.1)",
              color: activeTab === "counseling" ? "var(--primary)" : "var(--accent)",
            }}
          >
            연령별 세션
          </span>
          <h2
            className="font-serif text-3xl sm:text-4xl font-bold mb-3 text-balance"
            style={{ color: "var(--foreground)" }}
          >
            우리 아이 몇 살인가요?
          </h2>
          <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: "var(--muted-foreground)" }}>
            {activeTab === "counseling"
              ? "연령별 발달 특성에 맞는 심리 평가와 상담을 제공합니다"
              : "연령에 맞는 강점 중심 코칭 프로그램을 찾아드립니다"}
          </p>
        </div>

        {/* key forces remount → fresh stagger on each tab switch */}
        <StageGrid key={activeTab} tabKey={activeTab} />
      </div>
    </section>
  );
}
