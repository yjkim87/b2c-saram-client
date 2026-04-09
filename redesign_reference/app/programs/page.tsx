"use client";

// Force rebuild
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Heart, Users, Brain, CheckCircle2, UserCircle2, ChevronDown, Clock, Star,
} from "lucide-react";
import Navbar from "@/components/navbar";
import SubpageHeader from "@/components/subpage-header";
import { Footer } from "@/components/cta-footer";

// ─── THEME ────────────────────────────────────────────────────────────────────
const GREEN = "oklch(0.48 0.09 165)";
const AMBER = "oklch(0.62 0.09 45)";

// ─── DATA ─────────────────────────────────────────────────────────────────────
type Program = {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  ages: string;
  schedule: string;
  desc: string;
  features: string[];
  bg: string;
  iconColor: string;
};

const coachingPrograms: Program[] = [
  {
    icon: Heart,
    title: "정서 코칭",
    subtitle: "감정 인식 · 표현 · 조절 능력 향상",
    ages: "3–6세, 7–12세, 13–18세",
    schedule: "주 1회 50분 / 8–12주 / 1:1 개인 코칭",
    desc: "아이가 자신의 감정을 인식하고, 건강하게 표현하며, 효과적으로 조절하는 능력을 기릅니다. John Gottman 박사의 감정코칭 모델을 기반으로 합니다.",
    features: [
      "감정 인식 및 이름 붙이기 훈련",
      "감정 표현 기술 습득",
      "감정 조절 전략 개발",
      "공감 능력 향상",
      "스트레스 대처 기술",
    ],
    bg: "oklch(0.97 0.01 140)",
    iconColor: GREEN,
  },
  {
    icon: Users,
    title: "사회성 코칭",
    subtitle: "또래 관계 · 의사소통 · 협동 능력 향상",
    ages: "3–6세, 7–12세, 13–18세",
    schedule: "주 1회 50분 / 12주 / 소그룹 또는 1:1",
    desc: "또래와의 건강한 관계를 형성하고 유지하는 사회적 기술을 습득합니다. 소외감이나 따돌림으로 어려움을 겪는 아이들을 위한 맞춤형 프로그램입니다.",
    features: [
      "사회적 상황 읽기 능력 향상",
      "대화 시작 및 유지 기술",
      "갈등 해결 전략",
      "협동 및 리더십 역량",
      "학교 적응력 강화",
    ],
    bg: "oklch(0.97 0.01 200)",
    iconColor: "oklch(0.50 0.10 200)",
  },
  {
    icon: Brain,
    title: "학습 코칭",
    subtitle: "학습 동기 · 집중력 · 자기 조절 능력 향상",
    ages: "7–12세, 13–18세",
    schedule: "주 1–2회 50분 / 12–16주 / 1:1 개인 코칭",
    desc: "학습에 어려움을 겪거나 동기가 저하된 아이들을 위해 개인의 학습 스타일을 파악하고 맞춤형 전략을 개발합니다. 학업 스트레스 감소도 함께 다룹니다.",
    features: [
      "개인 학습 스타일 분석",
      "실행 기능 향상 (계획·집중·관리)",
      "학습 동기 강화 전략",
      "시험 불안 감소",
      "자기 주도 학습 능력 개발",
    ],
    bg: "oklch(0.97 0.012 165)",
    iconColor: GREEN,
  },
  {
    icon: UserCircle2,
    title: "부모 코칭",
    subtitle: "발달 지식 · 양육 기술 · 의사소통 강화",
    ages: "모든 연령 부모님",
    schedule: "격주 1회 60분 / 8주 / 1:1 또는 부부 코칭",
    desc: "부모가 아이의 발달 단계를 이해하고, 각 단계에 맞는 효과적인 양육 방법을 실천할 수 있도록 지원합니다. 부모의 자기 이해도 함께 다룹니다.",
    features: [
      "발달 단계별 이해와 기대 조정",
      "긍정적 훈육 방법 습득",
      "효과적인 부모-자녀 의사소통",
      "양육 스트레스 관리",
      "부모 자신의 정서 건강 관리",
    ],
    bg: "oklch(0.97 0.015 60)",
    iconColor: AMBER,
  },
];

const counselingPrograms: Program[] = [
  {
    icon: Heart,
    title: "불안·우울 상담",
    subtitle: "정서적 어려움 해결과 심리 안정",
    ages: "7–12세, 13–18세",
    schedule: "주 1–2회 50분 / 12–24주 / 1:1 개인 상담",
    desc: "만성적인 불안, 우울 증상으로 일상생활에 어려움을 겪는 아이들을 위한 전문 심리 상담입니다. 인지행동치료(CBT) 기반으로 진행됩니다.",
    features: [
      "불안·우울 증상 완화",
      "부정적 사고 패턴 개선",
      "정서 조절 기술 습득",
      "자존감 회복",
      "일상 복귀 지원",
    ],
    bg: "oklch(0.97 0.01 280)",
    iconColor: "oklch(0.52 0.12 280)",
  },
  {
    icon: Users,
    title: "대인관계 상담",
    subtitle: "관계 트라우마와 사회적 회피 개선",
    ages: "7–12세, 13–18세",
    schedule: "주 1회 50분 / 16–20주 / 1:1 또는 소그룹",
    desc: "또래 따돌림, 관계 트라우마, 사회적 고립 등으로 어려움을 겪는 아이들을 위한 전문 상담 프로그램입니다.",
    features: [
      "관계 트라우마 치유",
      "사회적 불안 감소",
      "신뢰 관계 회복",
      "경계 설정 기술",
      "자기주장 훈련",
    ],
    bg: "oklch(0.97 0.01 320)",
    iconColor: "oklch(0.48 0.10 320)",
  },
  {
    icon: Brain,
    title: "ADHD·학습장애 상담",
    subtitle: "주의력 및 학습 어려움 전문 지원",
    ages: "7–12세, 13–18세",
    schedule: "주 2회 50분 / 24주 이상 / 1:1 개인 상담",
    desc: "ADHD, 난독증, 학습장애 진단을 받았거나 의심되는 아이들을 위한 전문 심리 상담 및 행동 개입 프로그램입니다.",
    features: [
      "주의력 향상 훈련",
      "충동 조절 전략",
      "학습 전략 개발",
      "약물 치료 병행 상담",
      "가족 교육 및 지원",
    ],
    bg: "oklch(0.97 0.012 220)",
    iconColor: "oklch(0.45 0.11 220)",
  },
  {
    icon: UserCircle2,
    title: "부모 상담",
    subtitle: "양육 스트레스와 가족 관계 회복",
    ages: "모든 연령 부모님",
    schedule: "격주 1회 60분 / 12주 / 1:1 또는 부부 상담",
    desc: "양육 스트레스, 부부 갈등, 자녀와의 관계 어려움 등으로 힘든 부모님을 위한 전문 심리 상담입니다.",
    features: [
      "양육 스트레스 해소",
      "부부 관계 회복",
      "자녀 이해 증진",
      "효과적인 의사소통",
      "부모 자신의 치유",
    ],
    bg: "oklch(0.97 0.015 30)",
    iconColor: "oklch(0.55 0.13 30)",
  },
];

// Section backgrounds per tab theme
const SECTION_BG = {
  counseling: ["oklch(0.98 0.008 165)", "white"],
  coaching:   ["oklch(0.99 0.006 55)", "white"],
} as const;

// ─── MAGAZINE ROW ──────────────────────────────────────────────────────────────
function ProgramRow({ item, index, tab }: { item: Program; index: number; tab: "counseling" | "coaching" }) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;
  const isReversed = index % 2 === 1;

  return (
    <div
      className="py-16 md:py-20 px-4 sm:px-6 lg:px-8"
      style={{ background: SECTION_BG[tab][index % 2] }}
    >
      <div className="max-w-5xl mx-auto">
        <div
          className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${
            isReversed ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Illustration Panel — compact on mobile, large on desktop */}
          <div
            className="w-full h-44 md:h-auto md:w-[45%] md:min-h-[360px] flex-shrink-0 flex items-center justify-center rounded-2xl md:rounded-3xl overflow-hidden"
            style={{ background: item.bg }}
          >
            <div className="flex flex-col items-center justify-center gap-4 md:gap-8 py-6 md:py-16 px-8 md:px-12 w-full h-full">
              <div
                className="w-16 h-16 md:w-36 md:h-36 rounded-2xl md:rounded-[2rem] flex items-center justify-center shadow-lg md:shadow-xl"
                style={{ background: "white" }}
              >
                <Icon className="w-8 h-8 md:w-20 md:h-20" style={{ color: item.iconColor }} />
              </div>
              <div
                className="w-12 md:w-20 h-0.5 md:h-1 rounded-full opacity-30"
                style={{ background: item.iconColor }}
              />
            </div>
          </div>

          {/* Text Panel */}
          <div className="flex-1 flex flex-col justify-center gap-4 md:gap-6 py-0 md:py-4">
            {/* Always-visible: title, subtitle, chips */}
            <div className="flex flex-wrap gap-2">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: item.bg, color: item.iconColor, wordBreak: "keep-all" }}
              >
                대상 {item.ages}
              </span>
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: item.bg, color: item.iconColor, wordBreak: "keep-all" }}
              >
                <Clock className="w-3 h-3" />
                {item.schedule}
              </span>
            </div>
            <div>
              <h3
                className="font-serif text-2xl sm:text-3xl font-bold mb-1.5 text-balance"
                style={{ color: "oklch(0.16 0.01 240)", wordBreak: "keep-all" }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm font-semibold"
                style={{ color: item.iconColor, wordBreak: "keep-all" }}
              >
                {item.subtitle}
              </p>
            </div>

            {/* Mobile accordion — desc + features hidden until tapped */}
            <div>
              <button
                onClick={() => setOpen((v) => !v)}
                className="md:hidden flex items-center gap-1.5 text-sm font-semibold mb-0 transition-opacity hover:opacity-70"
                style={{ color: item.iconColor }}
                aria-expanded={open}
              >
                상세 내용 보기
                <ChevronDown
                  className="w-4 h-4 transition-transform duration-200"
                  style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>

              {/* Desc: hidden on mobile until open, always visible on desktop */}
              <p
                className={`text-base leading-relaxed mt-3 ${open ? "block" : "hidden"} md:block`}
                style={{ color: "oklch(0.38 0.01 240)", lineHeight: "1.8", wordBreak: "keep-all" }}
              >
                {item.desc}
              </p>

              {/* Feature bullets: hidden on mobile until open, always on desktop */}
              <ul className={`flex-col gap-2 mt-3 ${open ? "flex" : "hidden"} md:flex`}>
                {item.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "oklch(0.32 0.01 240)", wordBreak: "keep-all" }}
                  >
                    <CheckCircle2
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: item.iconColor }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── THEME COLORS PER TAB ─────────────────────────────────────────────────────
const TAB_THEME = {
  counseling: { active: "#2D754E", label: "심리상담" },
  coaching:   { active: "#A36856", label: "성장코칭" },
} as const;

// ─── PAGE ──────────────────────────────────────────────────────────────────────
export default function ProgramsPage() {
  const [activeTab, setActiveTab] = useState<"counseling" | "coaching">("counseling");
  const [isSticky, setIsSticky] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const themeColor = TAB_THEME[activeTab].active;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />
      <SubpageHeader title="상담 / 코칭 프로그램" subtitle="맞춤형 코칭으로 우리 아이의 성장을 지원합니다" />

      {/* Sentinel for sticky detection */}
      <div ref={sentinelRef} aria-hidden="true" />

      {/* Sticky Tab Toggle */}
      <div
        ref={toggleRef}
        className="z-40 transition-shadow duration-200"
        style={
          isSticky
            ? {
                position: "sticky",
                top: "64px",
                background: "rgba(253, 252, 250, 0.95)",
                backdropFilter: "blur(10px)",
                borderBottom: "1px solid oklch(0.91 0.01 240)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }
            : {
                background: "oklch(0.99 0.003 80)",
                borderBottom: "1px solid oklch(0.93 0.01 240)",
              }
        }
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-center">
          <div
            className="inline-flex rounded-full p-1 gap-1"
            style={{ background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.08)" }}
          >
            {(Object.entries(TAB_THEME) as [keyof typeof TAB_THEME, typeof TAB_THEME[keyof typeof TAB_THEME]][]).map(
              ([key, { active, label }]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className="px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={
                  activeTab === key
                    ? { background: active, color: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.18)" }
                    : { background: "transparent", color: "oklch(0.45 0.01 240)" }
                }
                aria-pressed={activeTab === key}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Magazine Content */}
      <main>
        {activeTab === "counseling"
          ? counselingPrograms.map((item, i) => <ProgramRow key={item.title} item={item} index={i} tab="counseling" />)
          : coachingPrograms.map((item, i) => <ProgramRow key={item.title} item={item} index={i} tab="coaching" />)}
      </main>

      {/* CTA Banner */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ background: "oklch(0.22 0.03 200)" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <Star className="w-8 h-8 mx-auto mb-5" style={{ color: "oklch(0.75 0.1 165)" }} />
          <h3
            className="font-serif text-2xl sm:text-3xl font-bold mb-3 text-balance"
            style={{ color: "white", wordBreak: "keep-all" }}
          >
            어떤 프로그램이 우리 아이에게 맞을까요?
          </h3>
          <p
            className="text-sm leading-relaxed mb-8"
            style={{ color: "oklch(0.75 0.02 200)", wordBreak: "keep-all" }}
          >
            전문가와 함께 아이에게 맞는 프로그램을 찾아드립니다.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-4 rounded-full font-semibold text-sm transition-all hover:scale-105 hover:opacity-95"
            style={{ background: themeColor, color: "white" }}
          >
            우리 아이 맞춤형 여정 상담하기
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
