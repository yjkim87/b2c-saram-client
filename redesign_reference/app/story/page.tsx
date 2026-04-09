"use client";

import Link from "next/link";
import {
  Heart,
  Brain, TrendingUp, CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/navbar";
import SubpageHeader from "@/components/subpage-header";
import { Footer } from "@/components/cta-footer";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const missionValues = [
  {
    icon: Heart,
    title: "아이 중심",
    desc: "아이의 관점에서 생각하고 아이의 목소리에 귀 기울입니다.",
    color: "oklch(0.58 0.14 30)",
    bg: "oklch(0.97 0.02 40)",
    border: "oklch(0.58 0.14 30 / 0.25)",
  },
  {
    icon: Brain,
    title: "근거 기반",
    desc: "검증된 발달심리학 이론과 최신 연구를 코칭에 적용합니다.",
    color: "oklch(0.48 0.09 165)",
    bg: "oklch(0.96 0.02 165)",
    border: "oklch(0.48 0.09 165 / 0.25)",
  },
  {
    icon: TrendingUp,
    title: "강점 중심",
    desc: "아이의 강점을 발견하고 그것을 토대로 성장을 지원합니다.",
    color: "oklch(0.62 0.09 45)",
    bg: "oklch(0.97 0.02 65)",
    border: "oklch(0.62 0.09 45 / 0.25)",
  },
];

const scheduleRows = [
  { day: "월 – 금", time: "10:00 – 20:00" },
  { day: "토요일", time: "10:00 – 17:00" },
  { day: "일 · 공휴일", time: "휴무" },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function MissionSection() {
  return (
    <section id="mission" className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "var(--background)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full" style={{ background: "oklch(0.48 0.09 165 / 0.1)", color: "oklch(0.48 0.09 165)" }}>
            우리의 미션
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-balance" style={{ color: "var(--foreground)" }}>
            모든 아이는 고유한 발달 경로를 가집니다
          </h2>
          <p className="text-sm leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--muted-foreground)" }}>
            사발면 센터는 0세부터 18세까지의 아이들이 자신만의 속도로, 자신만의 방식으로 건강하게 성장할 수 있도록 지원합니다. 우리는 발달심리학의 과학적 근거를 바탕으로, 아이 한 명 한 명의 강점과 가능성을 발견하고 키우는 데 초점을 맞춥니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {missionValues.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="rounded-2xl border p-6 flex flex-col gap-4" style={{ background: v.bg, borderColor: v.border }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "white", border: `1px solid ${v.border}` }}>
                  <Icon className="w-6 h-6" style={{ color: v.color }} />
                </div>
                <h3 className="font-bold text-lg" style={{ color: v.color }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    {
      step: "01",
      title: "신청 및 접수",
      desc: "전화/온라인으로 아이의 연령과 고민 상담 신청. 신청서 작성 및 일정 확정",
      color: "oklch(0.48 0.09 165)",
      icon: "📋",
    },
    {
      step: "02",
      title: "무료 사전 상담",
      desc: "전문가와 오프라인 미팅을 통해 현재 상태 파악 및 최적의 전문가 매칭",
      color: "oklch(0.62 0.09 45)",
      icon: "🗣️",
    },
    {
      step: "03",
      title: "맞춤형 세션 시작",
      desc: "아이에게 맞는 상담/코칭 진행 및 회기별 활동 기록 공유",
      color: "oklch(0.52 0.10 260)",
      icon: "💡",
    },
    {
      step: "04",
      title: "성장 리포트 및 점검",
      desc: "변화 분석 및 부모 피드백을 통한 향후 목표 재설정",
      color: "oklch(0.62 0.09 45)",
      icon: "📊",
    },
    {
      step: "05",
      title: "사후 관리",
      desc: "안정적인 종결 세션 진행 및 3개월 후 Follow-up을 통한 변화 유지 지원",
      color: "oklch(0.48 0.09 165)",
      icon: "🌱",
    },
  ];

  return (
    <section id="process" className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "var(--background)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full" style={{ background: "oklch(0.48 0.09 165 / 0.1)", color: "oklch(0.48 0.09 165)" }}>
            5단계 프로세스
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-balance" style={{ color: "var(--foreground)" }}>
            사발면과 함께하는 성장의 여정
          </h2>
          <p className="text-sm leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--muted-foreground)" }}>
            상담 신청부터 사후 관리까지, 아이의 변화와 성장을 끝까지 지원하는 우리의 체계적인 프로세스를 안내합니다.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="space-y-0">
          {steps.map((s, idx) => (
            <div
              key={s.step}
              className="relative animate-fade-in"
              style={{
                animationDelay: `${idx * 100}ms`,
                animationDuration: "800ms",
              }}
            >
              {/* Timeline line - not on last */}
              {idx < steps.length - 1 && (
                <div
                  className="absolute left-8 top-24 w-1 h-20"
                  style={{ background: s.color }}
                />
              )}

              {/* Card */}
              <div className="flex gap-6 relative pt-8 pb-8">
                {/* Step circle */}
                <div className="flex-shrink-0 relative z-10">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg text-white shadow-lg"
                    style={{ background: s.color }}
                  >
                    {s.step}
                  </div>
                </div>

                {/* Content card */}
                <div className="flex-1 pt-2">
                  <div className="rounded-2xl border p-6 flex flex-col gap-3" style={{ borderColor: s.color + "40", background: s.color + "08" }}>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{s.icon}</span>
                      <h3 className="font-bold text-lg" style={{ color: "var(--foreground)" }}>
                        {s.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                      {s.desc}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: s.color }}>
                      <CheckCircle2 className="w-4 h-4" />
                      이 단계 완료
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all hover:opacity-90 hover:scale-105"
            style={{ background: "oklch(0.48 0.09 165)", color: "white" }}
          >
            무료 상담하기
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8ms ease-out forwards;
        }
      `}</style>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function StoryPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />
      <SubpageHeader title="사발면 소개" subtitle="우리의 미션과 성장 프로세스를 소개합니다" />
      <MissionSection />
      <ProcessSection />
      <Footer />
    </main>
  );
}
