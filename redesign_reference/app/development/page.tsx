"use client";

// Force rebuild
import { useState, useRef, useEffect } from "react";
import {
  Baby, Smile, BookOpen, Compass,
  Brain, TrendingUp, ChevronDown, ChevronRight,
  CheckCircle2, Target, BookMarked, Star, Lightbulb,
} from "lucide-react";
import Navbar from "@/components/navbar";
import SubpageHeader from "@/components/subpage-header";
import { Footer } from "@/components/cta-footer";

// ─── Types ────────────────────────────────────────────────────────────────────
type Mode = "counseling" | "coaching";

// ─── Theme ────────────────────────────────────────────────────────────────────
const THEME = {
  counseling: {
    primary: "oklch(0.48 0.09 165)",
    light: "oklch(0.97 0.015 158)",
    mid: "oklch(0.88 0.05 160)",
    tag: "oklch(0.92 0.03 160)",
    tagText: "oklch(0.35 0.07 160)",
    cardBg: "oklch(0.96 0.02 158)",
    btnBg: "oklch(0.48 0.09 165)",
  },
  coaching: {
    primary: "oklch(0.60 0.10 48)",
    light: "oklch(0.97 0.02 75)",
    mid: "oklch(0.90 0.06 65)",
    tag: "oklch(0.93 0.04 70)",
    tagText: "oklch(0.40 0.08 50)",
    cardBg: "oklch(0.96 0.02 72)",
    btnBg: "oklch(0.60 0.10 48)",
  },
} as const;

// ─── Data ─────────────────────────────────────────────────────────────────────
const STAGES = [
  {
    id: "infant",
    label: "영아기",
    range: "0 – 2세",
    Icon: Baby,
    desc: "출생 후 첫 2년은 뇌 발달이 가장 활발한 시기입니다. 안정적인 애착 형성과 감각 자극이 이후 모든 발달의 기초가 됩니다.",
    theories: [
      {
        scholar: "에릭슨의 심리사회발달",
        tag: "신뢰 vs. 불신",
        body: "양육자와의 일관된 상호작용을 통해 세상에 대한 기본적 신뢰감을 형성합니다. 이 신뢰는 이후 모든 관계의 기초가 됩니다.",
        points: ["일관된 수유·수면·달래기가 핵심", "불신이 지배하면 불안과 두려움 심화", "희망(hope)이 이 단계에서 출현"],
      },
      {
        scholar: "피아제의 인지발달",
        tag: "감각운동기 (0-2세)",
        body: "감각과 운동 활동을 통해 세상을 탐색합니다. 8-12개월경 대상영속성(눈에 보이지 않아도 존재한다는 인식)이 발달합니다.",
        points: ["반사 반응 → 의도적 행동으로 발전", "8-12개월: 대상영속성 출현", "18-24개월: 정신적 표상·지연 모방 가능"],
      },
      {
        scholar: "볼비의 애착이론",
        tag: "애착 형성기",
        body: "생후 6-18개월이 애착 형성의 결정적 시기입니다. 안정 애착은 탐색 행동과 사회적 발달의 기반이 됩니다.",
        points: ["안정(B) / 회피(A) / 저항(C) / 혼란(D) 4유형", "민감한 반응성이 안정 애착의 핵심 변수", "낯선 상황 절차(SSP)로 측정"],
      },
    ],
    milestones: [
      { period: "0-3개월", items: ["눈 맞춤", "사회적 미소", "소리에 반응", "목 가누기"] },
      { period: "4-6개월", items: ["뒤집기", "옹알이 시작", "손 뻗기", "얼굴 인식"] },
      { period: "7-12개월", items: ["낯가림", "기기", "이름에 반응", "간단한 행동 모방"] },
      { period: "12-24개월", items: ["걷기", "첫 단어", "애착 대상에 집착", "가리키기 시작"] },
    ],
    concerns: ["애착 불안", "언어 발달 지연", "수면 문제", "감각 처리 어려움", "발달 이정표 지연"],
    approach: {
      counseling: {
        intro: "부모-영아 상호작용 코칭을 중심으로 가정 환경에서의 발달 지원에 초점을 맞춥니다.",
        items: ["놀이 중심 상호작용 훈련", "반응적 돌봄 코칭", "감각 자극 프로그램", "수면·식사 루틴 형성"],
      },
      coaching: {
        intro: "부모-영아 상호작용 코칭을 중심으로 가정 환경에서의 발달 지원에 초점을 맞춥니다.",
        items: ["놀이 중심 상호작용 훈련", "반응적 돌봄 코칭", "감각 자극 프로그램", "수면·식사 루틴 형성"],
      },
    },
  },
  {
    id: "toddler",
    label: "유아기",
    range: "3 – 6세",
    Icon: Smile,
    desc: "언어가 폭발적으로 발달하고 사회적 관계가 시작되는 시기입니다. 풍부한 놀이 경험이 창의성과 사회정서 발달의 기반이 됩니다.",
    theories: [
      {
        scholar: "에릭슨의 심리사회발달",
        tag: "자율성 vs. 수치심 → 주도성 vs. 죄책감",
        body: "자신이 선택하고 시도하는 경험을 통해 자율성과 주도성을 발달시킵니다. 과도한 통제는 수치심과 죄책감을 유발할 수 있습니다.",
        points: ["스스로 선택하는 경험이 핵심", "과도한 통제는 수치심 유발", "의지(will)가 이 단계의 덕목"],
      },
      {
        scholar: "피아제의 인지발달",
        tag: "전조작기 (2-7세)",
        body: "상징적 사고와 언어가 발달하지만, 자기중심적 사고가 강합니다. 역할놀이와 상상놀이가 활발해집니다.",
        points: ["상징적 사고·언어 발달", "자기중심적 사고가 우세", "역할놀이·상상놀이 활발"],
      },
      {
        scholar: "비고츠키의 ZPD",
        tag: "근접발달영역 이론",
        body: "현재 혼자 할 수 있는 수준과 도움을 받아 할 수 있는 수준 사이에서 성장이 일어납니다. 적절한 비계(scaffolding)가 중요합니다.",
        points: ["혼자 가능한 수준 + 도움받아 가능한 수준 사이에서 성장", "적절한 비계(scaffolding)가 핵심", "또래 협력 학습의 효과"],
      },
    ],
    milestones: [
      { period: "3세", items: ["3-4단어 문장", "트라이사이클 타기", "또래와 병행 놀이", "간단한 규칙 이해"] },
      { period: "4세", items: ["복잡한 문장 구사", "가위 사용", "협동 놀이", "수 개념 발달"] },
      { period: "5세", items: ["읽기 준비", "규칙 게임", "감정 표현 다양화", "글자 쓰기 시작"] },
      { period: "6세", items: ["기초 읽기·쓰기", "논리적 사고", "규칙 이해", "친구 관계 중요시"] },
    ],
    concerns: ["분리 불안", "언어 발달 지연", "공격적 행동", "또래 관계 어려움", "과잉 행동"],
    approach: {
      counseling: {
        intro: "놀이 기반 접근으로 아이의 자연스러운 발달을 촉진하며, 부모 코칭을 병행합니다.",
        items: ["치료적 놀이", "언어발달 촉진 활동", "사회정서 학습(SEL) 프로그램", "부모-아동 놀이 코칭"],
      },
      coaching: {
        intro: "놀이 기반 접근으로 아이의 자연스러운 발달을 촉진하며, 부모 코칭을 병행합니다.",
        items: ["치료적 놀이", "언어발달 촉진 활동", "사회정서 학습(SEL) 프로그램", "부모-아동 놀이 코칭"],
      },
    },
  },
  {
    id: "child",
    label: "아동기",
    range: "7 – 12세",
    Icon: BookOpen,
    desc: "학교생활이 시작되며 지적 능력과 사회적 역량이 크게 발달합니다. 또래 관계와 학업 성취가 자아개념 형성에 중요한 역할을 합니다.",
    theories: [
      {
        scholar: "에릭슨의 심리사회발달",
        tag: "근면성 vs. 열등감 (6-12세)",
        body: "다양한 영역에서 능력을 발휘하고 인정받는 경험이 근면성을 키웁니다. 실패 경험이 반복되면 열등감이 형성될 수 있습니다.",
        points: ["성공 경험이 근면성의 토대", "반복된 실패 → 열등감 형성", "유능감(competence)이 이 단계의 덕목"],
      },
      {
        scholar: "피아제의 인지발달",
        tag: "구체적 조작기 (7-12세)",
        body: "논리적 사고가 가능해지지만, 구체적인 대상에 한정됩니다. 보존 개념, 분류, 계열화 능력이 발달합니다.",
        points: ["보존 개념·분류·계열화 능력 발달", "논리적 사고 가능 (구체 대상 한정)", "추상적 사고는 아직 제한적"],
      },
      {
        scholar: "콜버그의 도덕 발달",
        tag: "관습 수준 도덕성",
        body: "사회적 규칙과 타인의 기대에 맞추려는 도덕성이 발달합니다. 규칙의 중요성을 이해하고 준수하려 합니다.",
        points: ["타인의 기대에 맞추려는 도덕성", "규칙의 중요성을 이해하고 준수", "착한 아이 지향성(stage 3)"],
      },
    ],
    milestones: [
      { period: "7-8세", items: ["읽기 능숙", "논리적 사고", "규칙 놀이", "책임감 발달"] },
      { period: "9-10세", items: ["추상적 사고 시작", "또래 집단 중요", "특기 개발", "자기 평가 발달"] },
      { period: "11-12세", items: ["논리적 추론", "정체성 탐색 시작", "친밀한 우정", "학업 성취 중요시"] },
    ],
    concerns: ["학습 부진", "또래 따돌림", "낮은 자존감", "ADHD 가능성", "학교 거부", "과도한 경쟁 스트레스"],
    approach: {
      counseling: {
        intro: "강점 기반 접근으로 자기효능감을 높이고, 학교 환경 적응을 체계적으로 지원합니다.",
        items: ["학습 전략 코칭", "또래 관계 사회기술 훈련", "자존감 강화 프로그램", "스트레스 관리 기법"],
      },
      coaching: {
        intro: "강점 기반 접근으로 자기효능감을 높이고, 학교 환경 적응을 체계적으로 지원합니다.",
        items: ["학습 전략 코칭", "또래 관계 사회기술 훈련", "자존감 강화 프로그램", "스트레스 관리 기법"],
      },
    },
  },
  {
    id: "teen",
    label: "청소년기",
    range: "13 – 18세",
    Icon: Compass,
    desc: '"나는 누구인가?"를 탐색하는 정체성의 시기입니다. 급격한 신체 변화와 함께 심리적 독립을 추구하며, 또래 관계가 가장 중요해집니다.',
    theories: [
      {
        scholar: "에릭슨의 심리사회발달",
        tag: "정체성 vs. 역할 혼미 (12-18세)",
        body: "다양한 역할을 탐색하며 일관된 자아 정체성을 확립합니다. 이 과정에서의 혼란은 자연스러운 발달 현상입니다.",
        points: ["다양한 역할 탐색이 핵심", "혼란은 자연스러운 발달 현상", "충성(fidelity)이 이 단계의 덕목"],
      },
      {
        scholar: "마샤의 정체성 지위",
        tag: "4가지 정체성 지위",
        body: "정체성 성취, 유예, 유실, 혼미의 4단계를 통해 청소년은 다양한 경로로 자신의 정체성을 형성해 나갑니다.",
        points: ["성취: 탐색 후 헌신", "유예: 탐색 중, 미결정", "유실: 탐색 없이 헌신 / 혼미: 탐색·헌신 모두 없��"],
      },
      {
        scholar: "피아제의 인지발달",
        tag: "형식적 조작기 (12세 이상)",
        body: "추상적·가설적 사고가 가능해집니다. 도덕적 추론, 미래 계획, 반성적 사고가 발달합니다.",
        points: ["추상적·가설적 사고 가능", "도덕적 추론·미래 계획 발달", "반성적 자기 인식 심화"],
      },
    ],
    milestones: [
      { period: "13-14세", items: ["추상적 사고", "이상주의적 사고", "또래 집단 중심화", "부모 권위에 도전"] },
      { period: "15-16세", items: ["자아 정체성 탐색", "진로 관심", "이성 관계", "독립 욕구 강화"] },
      { period: "17-18세", items: ["정체성 확립", "미래 계획", "가치관 형성", "자기 이해 심화"] },
    ],
    concerns: ["정체성 혼란", "우울·불안", "학업 스트레스", "진로 고민", "가족 갈등", "사이버 문제", "자해·자살 위험"],
    approach: {
      counseling: {
        intro: "청소년의 자율성을 존중하며 자기 탐색을 지원합니다. 청소년 중심의 상담 관계를 형성합니다.",
        items: ["강점 기반 진로 코칭", "정서 조절 훈련 (DBT 기반)", "정체성 탐색 프로그램", "부모-자녀 소통 코칭"],
      },
      coaching: {
        intro: "청소년의 자율성을 존중하며 자기 탐색을 지원합니다. 청소년 중심의 코칭 관계를 형성합니다.",
        items: ["강점 기반 진로 코칭", "정서 조절 훈련 (DBT 기반)", "정체성 탐색 프로그램", "부모-자녀 소통 코칭"],
      },
    },
  },
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────
function TheoryCard({
  theory,
  t,
}: {
  theory: { scholar: string; tag: string; body: string; points: readonly string[] };
  t: typeof THEME.counseling;
}) {
  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden" style={{ borderTop: `4px solid ${t.primary}`, background: "oklch(0.99 0.003 80)" }}>
      <div className="p-5 flex flex-col gap-4 flex-1">
        <div>
          <p className="font-bold text-lg leading-snug" style={{ color: t.primary }}>
            {theory.scholar}
          </p>
          <span
            className="inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: t.tag, color: t.tagText }}
          >
            {theory.tag}
          </span>
        </div>
        <p className="text-base" style={{ color: "oklch(0.35 0.01 240)", lineHeight: "1.75" }}>
          {theory.body}
        </p>
        <ul className="flex flex-col gap-2 mt-auto">
          {theory.points.map((pt) => (
            <li key={pt} className="flex items-start gap-2">
              <span
                className="mt-1 w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: t.primary }}
              />
              <span className="text-sm" style={{ color: "oklch(0.38 0.01 240)", lineHeight: "1.65" }}>
                {pt}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Stepped backgrounds: index 0→3 gets progressively richer
const COUNSELING_STEPS = [
  "oklch(0.97 0.015 160)",
  "oklch(0.93 0.035 160)",
  "oklch(0.87 0.06 162)",
  "oklch(0.80 0.09 164)",
];
const COACHING_STEPS = [
  "oklch(0.97 0.015 75)",
  "oklch(0.94 0.04 68)",
  "oklch(0.89 0.07 58)",
  "oklch(0.82 0.10 48)",
];

function MilestoneCard({
  ms,
  index,
  mode,
  t,
}: {
  ms: { period: string; items: readonly string[] };
  index: number;
  mode: Mode;
  t: typeof THEME.counseling;
}) {
  const steps = mode === "counseling" ? COUNSELING_STEPS : COACHING_STEPS;
  const bg = steps[index % steps.length];
  const isDark = index >= 2;
  const textColor = isDark ? "oklch(0.15 0.01 240)" : "oklch(0.30 0.01 240)";

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-3"
      style={{ background: bg }}
    >
      <p className="font-bold text-base" style={{ color: isDark ? "oklch(0.22 0.06 160)" : t.primary }}>
        {ms.period}
      </p>
      <ul className="flex flex-col gap-2.5">
        {ms.items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: isDark ? "oklch(0.35 0.08 160)" : t.primary }} />
            <span className="text-base" style={{ color: textColor, lineHeight: "1.65" }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Mobile horizontal scroll strip — next card peeks at edge, scrollbar hidden
function HScroll({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="md:hidden -mx-4 px-4 flex gap-3 pb-3 snap-x snap-mandatory"
      style={{ overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

function StageBody({
  stage,
  mode,
  t,
}: {
  stage: (typeof STAGES)[number];
  mode: Mode;
  t: typeof THEME.counseling;
}) {
  const approach = stage.approach[mode];

  return (
    <div className="flex flex-col gap-14">
      {/* ── 핵심 발달 이론 ── */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <BookMarked className="w-5 h-5" style={{ color: t.primary }} />
          <h3 className="font-bold text-lg" style={{ color: "oklch(0.18 0.01 240)" }}>
            핵심 발달 이론
          </h3>
        </div>
        {/* PC: 3-col */}
        <div className="hidden md:grid grid-cols-3 gap-5">
          {stage.theories.map((th) => (
            <TheoryCard key={th.scholar} theory={th} t={t} />
          ))}
        </div>
        {/* Mobile: h-scroll, next card peeks */}
        <HScroll>
          {stage.theories.map((th) => (
            <div key={th.scholar} className="snap-start flex-shrink-0" style={{ width: "85vw", maxWidth: "340px", wordBreak: "keep-all" }}>
              <TheoryCard theory={th} t={t} />
            </div>
          ))}
        </HScroll>
      </div>

      {/* ── 발달 이정표 ── */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <Target className="w-5 h-5" style={{ color: t.primary }} />
          <h3 className="font-bold text-lg" style={{ color: "oklch(0.18 0.01 240)" }}>
            발달 이정표
          </h3>
        </div>
        {/* PC: 4-col (or 3-col for teen) */}
        <div
          className={`hidden md:grid gap-5 ${
            stage.milestones.length === 3 ? "grid-cols-3" : "grid-cols-4"
          }`}
        >
          {stage.milestones.map((ms, i) => (
            <MilestoneCard key={ms.period} ms={ms} index={i} mode={mode} t={t} />
          ))}
        </div>
        {/* Mobile: h-scroll, next card peeks */}
        <HScroll>
          {stage.milestones.map((ms, i) => (
            <div key={ms.period} className="snap-start flex-shrink-0" style={{ width: "85vw", maxWidth: "300px", wordBreak: "keep-all" }}>
              <MilestoneCard ms={ms} index={i} mode={mode} t={t} />
            </div>
          ))}
        </HScroll>
      </div>

      {/* ── 주요 관심사 ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5" style={{ color: t.primary }} />
          <h3 className="font-bold text-lg" style={{ color: "oklch(0.18 0.01 240)" }}>
            이 시기 주요 관심사
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {stage.concerns.map((c) => (
            <span
              key={c}
              className="text-sm font-medium px-3.5 py-1.5 rounded-full"
              style={{ background: t.tag, color: t.tagText }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* ── 접근 방법 ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5" style={{ color: t.primary }} />
          <h3 className="font-bold text-lg" style={{ color: "oklch(0.18 0.01 240)" }}>
            {mode === "counseling" ? "심리상담" : "성장코칭"} 접근 방법
          </h3>
        </div>
        <div
          className="py-6 border-l-4 pl-6"
          style={{ borderColor: t.primary, background: "transparent" }}
        >
          <p
            className="mb-5 text-base"
            style={{ color: "oklch(0.35 0.01 240)", lineHeight: "1.75" }}
          >
            {approach.intro}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {approach.items.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{ background: "white" }}
              >
                <ChevronRight
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: t.primary }}
                />
                <span
                  className="text-base font-medium"
                  style={{ color: "oklch(0.28 0.01 240)" }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Accordion item ───────────────────────────────────────────────────────────
function AccordionItem({
  stage,
  isOpen,
  onToggle,
  mode,
  t,
}: {
  stage: (typeof STAGES)[number];
  isOpen: boolean;
  onToggle: () => void;
  mode: Mode;
  t: typeof THEME.counseling;
}) {
  const { Icon } = stage;

  return (
    <div
      className="overflow-hidden transition-all duration-300"
      style={{
        background: "transparent",
        borderBottom: `1px solid ${isOpen ? t.mid : "oklch(0.91 0.01 240)"}`,
      }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-0 py-6 text-left transition-colors duration-200"
        style={{
          background: "transparent",
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
            style={{ background: isOpen ? t.primary : "var(--secondary)" }}
          >
            <Icon
              className="w-6 h-6"
              style={{ color: isOpen ? "white" : "var(--muted-foreground)" }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: t.tag, color: t.tagText }}
              >
                {stage.range}
              </span>
            </div>
            <p
              className="font-bold text-xl mt-0.5"
              style={{ color: isOpen ? t.primary : "oklch(0.18 0.01 240)" }}
            >
              {stage.label} 발달
            </p>
            {!isOpen && (
              <p
                className="text-sm mt-0.5 line-clamp-1 hidden sm:block"
                style={{ color: "var(--muted-foreground)" }}
              >
                {stage.desc}
              </p>
            )}
          </div>
        </div>
        <ChevronDown
          className="w-5 h-5 flex-shrink-0 transition-transform duration-300"
          style={{
            color: isOpen ? t.primary : "var(--muted-foreground)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {/* Body — animated open/close */}
      <div
        style={{
          maxHeight: isOpen ? "9999px" : "0",
          overflow: "hidden",
          transition: "max-height 0.45s ease",
        }}
      >
        <div className="px-0 pb-14 pt-2 flex flex-col gap-2">
          <p
            className="text-base mb-8"
            style={{ color: "oklch(0.38 0.01 240)", lineHeight: "1.7" }}
          >
            {stage.desc}
          </p>
          <StageBody stage={stage} mode={mode} t={t} />
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DevelopmentPage() {
  const [mode, setMode] = useState<Mode>("counseling");
  const [openId, setOpenId] = useState<string>("");
  const [isSticky, setIsSticky] = useState(false);
  const toggleBarRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const t = THEME[mode];

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

  function handleToggle(id: string) {
    setOpenId((prev) => (prev === id ? "" : id));
  }

  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />
      <SubpageHeader title="우리 아이 발달 단계" subtitle="연령대별 발달 이론과 적절한 지원 방법" />

      {/* Sentinel for sticky detection */}
      <div ref={sentinelRef} aria-hidden="true" />

      {/* Sticky floating pill toggle */}
      <div
        ref={toggleBarRef}
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
          <button
            onClick={() => setMode("counseling")}
            aria-pressed={mode === "counseling"}
            className="flex items-center gap-1.5 rounded-full font-semibold transition-all duration-200 px-5 py-2 text-sm"
            style={
              mode === "counseling"
                ? { background: "#2D754E", color: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.18)" }
                : { background: "transparent", color: "oklch(0.45 0.01 240)" }
            }
          >
            <Brain className="w-4 h-4" />
            심리상담
          </button>
          <button
            onClick={() => setMode("coaching")}
            aria-pressed={mode === "coaching"}
            className="flex items-center gap-1.5 rounded-full font-semibold transition-all duration-200 px-5 py-2 text-sm"
            style={
              mode === "coaching"
                ? { background: "#A36856", color: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.18)" }
                : { background: "transparent", color: "oklch(0.45 0.01 240)" }
            }
          >
            <TrendingUp className="w-4 h-4" />
            성장코칭
          </button>
        </div>
        </div>
      </div>

      {/* Accordion */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20 flex flex-col gap-4">
        {STAGES.map((stage) => (
          <AccordionItem
            key={stage.id}
            stage={stage}
            isOpen={openId === stage.id}
            onToggle={() => handleToggle(stage.id)}
            mode={mode}
            t={t}
          />
        ))}
      </div>
      <Footer />
    </main>
  );
}
