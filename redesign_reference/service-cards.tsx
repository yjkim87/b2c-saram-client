"use client";

import { useState, useEffect, useRef } from "react";
import { Brain, Heart, Shield, Compass, Users, TrendingUp } from "lucide-react";
import { useTabContext } from "./tab-context";

// ── Data ─────────────────────────────────────────────────────────────
const counselingServices = [
  {
    icon: Brain,
    title: "심리 평가",
    desc: "표준화 검사로 아이의 발달 수준과 정서 상태를 종합적으로 평가합니다.",
    tag: "진단",
  },
  {
    icon: Heart,
    title: "정서 상담",
    desc: "불안, 우울, 분노 등 정서적 어려움을 전문 상담사와 함께 해결합니다.",
    tag: "치유",
  },
  {
    icon: Shield,
    title: "행동 치료",
    desc: "ADHD, 틱, 공격성 등 행동 문제에 대한 근거 기반 치료를 제공합니다.",
    tag: "치료",
  },
];

const coachingServices = [
  {
    icon: TrendingUp,
    title: "강점 코칭",
    desc: "아이만의 고유한 강점을 발견하고 자신감과 자기효능감을 높여드립니다.",
    tag: "성장",
  },
  {
    icon: Compass,
    title: "진로 코칭",
    desc: "흥미와 적성을 탐색하여 미래 방향성을 스스로 설계하도록 안내합니다.",
    tag: "탐색",
  },
  {
    icon: Users,
    title: "사회성 코칭",
    desc: "또래 관계, 리더십, 공감 능력을 체계적 프로그램으로 계발합니다.",
    tag: "관계",
  },
];

// ── Single service card ───────────────────────────────────────────────
function ServiceCard({
  item,
  accent,
  accentBg,
  delay,
}: {
  item: (typeof counselingServices)[0];
  accent: string;
  accentBg: string;
  delay: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const Icon = item.icon;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const t = setTimeout(() => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      return () => obs.disconnect();
    }, delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="rounded-2xl border p-6 flex flex-col gap-4 group"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, box-shadow 0.2s ease, border-color 0.2s ease`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = "0 8px 28px oklch(0 0 0 / 0.1)";
        el.style.borderColor = accent;
        el.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = "none";
        el.style.borderColor = "var(--border)";
        el.style.transform = "translateY(0)";
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: accentBg }}
        >
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-bold text-base" style={{ color: "var(--foreground)" }}>
              {item.title}
            </h3>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: accentBg, color: accent }}
            >
              {item.tag}
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Cards grid with key-based remount ────────────────────────────────
function CardsGrid({ tabKey }: { tabKey: string }) {
  const isCounseling = tabKey === "counseling";
  const services = isCounseling ? counselingServices : coachingServices;
  const accent = isCounseling ? "var(--primary)" : "var(--accent)";
  const accentBg = isCounseling ? "oklch(0.48 0.09 165 / 0.1)" : "oklch(0.62 0.09 45 / 0.1)";
  const bannerBg = isCounseling ? "oklch(0.48 0.09 165 / 0.06)" : "oklch(0.62 0.09 45 / 0.06)";
  const bannerBorder = isCounseling ? "oklch(0.48 0.09 165 / 0.2)" : "oklch(0.62 0.09 45 / 0.2)";
  const bannerLabel = isCounseling ? "상담심리" : "코칭심리";
  const bannerText = isCounseling
    ? "는 심리적 어려움을 진단·치유하는 데 초점을 두며, 정서 안정과 행동 변화를 목표로 합니다."
    : "는 강점과 가능성에 집중하여 아이의 자율성과 성장을 이끌어내는 미래지향적 접근법입니다.";

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((svc, i) => (
          <ServiceCard key={svc.title} item={svc} accent={accent} accentBg={accentBg} delay={i * 90} />
        ))}
      </div>
      <div
        className="mt-8 p-5 rounded-2xl border text-center text-sm leading-relaxed"
        style={{ background: bannerBg, borderColor: bannerBorder, color: "var(--muted-foreground)" }}
      >
        <span className="font-semibold" style={{ color: accent }}>
          {bannerLabel}
        </span>
        {bannerText}
      </div>
    </>
  );
}

// ── Main export ──────────────────────────────────────────────────────
export default function ServiceCards() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const { activeTab } = useTabContext();

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "var(--background)" }}>
      <div className="max-w-6xl mx-auto">
        <div
          ref={headerRef}
          className="text-center mb-12"
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
            전문 서비스
          </span>
          <h2
            className="font-serif text-3xl sm:text-4xl font-bold mb-3 text-balance"
            style={{ color: "var(--foreground)" }}
          >
            과학적 접근, 따뜻한 마음으로
          </h2>
          <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: "var(--muted-foreground)" }}>
            발달심리학 이론을 바탕으로 아이 개개인의 특성을 존중하는 맞춤형 코칭을 제공합니다
          </p>
        </div>

        <CardsGrid key={activeTab} tabKey={activeTab} />
      </div>
    </section>
  );
}
