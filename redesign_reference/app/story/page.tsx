"use client";

import Link from "next/link";
import {
  Heart, Star, MapPin, Phone, Mail, Clock,
  Brain, TrendingUp, Award, ArrowLeft,
} from "lucide-react";
import Navbar from "@/components/navbar";
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

const experts = [
  {
    name: "김사발",
    role: "센터장 · 발달심리 전문가",
    career: "15년 경력",
    desc: "아동 발달심리학 박사. 한국발달심리학회 정회원. WISC 공인 검사자.",
    specialties: ["발달 평가", "ADHD", "애착 치료"],
    color: "oklch(0.48 0.09 165)",
  },
  {
    name: "이면조",
    role: "수석 코치 · 강점 코칭 전문가",
    career: "10년 경력",
    desc: "긍정심리학 석사. ICF 인증 코치. VIA 강점 검사 전문 강사.",
    specialties: ["강점 코칭", "진로 탐색", "리더십"],
    color: "oklch(0.62 0.09 45)",
  },
  {
    name: "박라면",
    role: "상담사 · 정서 상담 전문가",
    career: "8년 경력",
    desc: "상담심리 석사. CBT·DBT 전문 수련. 놀이치료 자격증 보유.",
    specialties: ["정서 상담", "불안·우울", "놀이치료"],
    color: "oklch(0.52 0.10 260)",
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

function ExpertSection() {
  return (
    <section id="experts" className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "oklch(0.97 0.006 85)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full" style={{ background: "oklch(0.62 0.09 45 / 0.1)", color: "oklch(0.62 0.09 45)" }}>
            전문가 소개
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-balance" style={{ color: "var(--foreground)" }}>
            아이의 성장을 함께할 전문가들
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experts.map((e) => (
            <div key={e.name} className="rounded-2xl border bg-white p-6 flex flex-col gap-4" style={{ borderColor: "var(--border)" }}>
              {/* Avatar placeholder */}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-serif font-bold text-xl" style={{ background: `${e.color.slice(0, -1)} / 0.1)`, color: e.color }}>
                {e.name[0]}
              </div>
              <div>
                <h3 className="font-bold text-base" style={{ color: "var(--foreground)" }}>{e.name}</h3>
                <p className="text-xs" style={{ color: e.color }}>{e.role}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 flex-shrink-0" style={{ color: e.color }} />
                <span className="text-xs font-semibold" style={{ color: e.color }}>{e.career}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{e.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {e.specialties.map((s) => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${e.color.slice(0, -1)} / 0.1)`, color: e.color }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DirectionsSection() {
  return (
    <section id="directions" className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "var(--background)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full" style={{ background: "oklch(0.52 0.10 260 / 0.1)", color: "oklch(0.52 0.10 260)" }}>
            오시는 길
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-balance" style={{ color: "var(--foreground)" }}>
            사발면 센터 찾아오기
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map placeholder */}
          <div
            className="rounded-2xl overflow-hidden flex items-center justify-center min-h-64"
            style={{ background: "oklch(0.93 0.01 200)", border: "1px solid var(--border)" }}
          >
            <div className="text-center">
              <MapPin className="w-10 h-10 mx-auto mb-2" style={{ color: "oklch(0.48 0.09 165)" }} />
              <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>지도 영역</p>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>서울특별시 강남구 사발면로 123</p>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            {[
              { icon: MapPin, label: "주소", value: "서울특별시 강남구 사발면로 123, 4층", color: "oklch(0.48 0.09 165)" },
              { icon: Phone, label: "전화", value: "02-000-0000", color: "oklch(0.62 0.09 45)" },
              { icon: Mail, label: "이메일", value: "hello@sabalmyeon.co.kr", color: "oklch(0.52 0.10 260)" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color.slice(0, -1)} / 0.1)`, border: `1px solid ${color.slice(0, -1)} / 0.2)` }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <div>
                  <p className="text-xs font-semibold mb-0.5" style={{ color }}>{label}</p>
                  <p className="text-sm" style={{ color: "var(--foreground)" }}>{value}</p>
                </div>
              </div>
            ))}

            {/* Hours */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "oklch(0.55 0.07 200 / 0.1)", border: "1px solid oklch(0.55 0.07 200 / 0.2)" }}>
                <Clock className="w-4 h-4" style={{ color: "oklch(0.55 0.07 200)" }} />
              </div>
              <div>
                <p className="text-xs font-semibold mb-1.5" style={{ color: "oklch(0.55 0.07 200)" }}>운영 시간</p>
                <table className="text-xs border-collapse">
                  <tbody>
                    {scheduleRows.map((r) => (
                      <tr key={r.day}>
                        <td className="pr-4 py-0.5 font-medium" style={{ color: "var(--foreground)" }}>{r.day}</td>
                        <td className="py-0.5" style={{ color: "var(--muted-foreground)" }}>{r.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Subway guide */}
            <div className="rounded-xl border p-4" style={{ background: "oklch(0.97 0.006 85)", borderColor: "var(--border)" }}>
              <p className="text-xs font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>교통 안내</p>
              <ul className="flex flex-col gap-1">
                {["2호선 강남역 3번 출구 도보 5분", "3호선 신사역 2번 출구 도보 8분", "버스 146, 360, 740번 사발면센터 앞 정류장"].map((t) => (
                  <li key={t} className="flex items-start gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                    <Star className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: "oklch(0.48 0.09 165)" }} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function StoryPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8" style={{ background: "oklch(0.22 0.03 200)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs mb-6 transition-colors"
            style={{ color: "oklch(0.7 0.05 165)" }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            메인으로
          </Link>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4 text-balance" style={{ color: "white" }}>
            사발면 스토리
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "oklch(0.78 0.02 200)" }}>
            우리의 미션, 전문가 팀, 그리고 찾아오시는 길을 소개합니다.
          </p>

          {/* In-page nav */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { href: "#mission", label: "미션 & 가치" },
              { href: "#experts", label: "전문가 소개" },
              { href: "#directions", label: "오시는 길" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all border"
                style={{ color: "white", borderColor: "oklch(0.5 0.05 200 / 0.5)", background: "oklch(0.30 0.04 200 / 0.5)" }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <MissionSection />
      <ExpertSection />
      <DirectionsSection />

      <Footer />
    </main>
  );
}
