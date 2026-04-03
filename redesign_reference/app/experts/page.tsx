"use client";

import Navbar from "@/components/navbar";
import SubpageHeader from "@/components/subpage-header";
import { Footer } from "@/components/cta-footer";
import { Award } from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
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

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function ExpertGridSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "var(--background)" }}>
      <div className="max-w-5xl mx-auto">
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

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ExpertsPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />
      <SubpageHeader title="전문가 소개" subtitle="아이의 성장을 함께할 전문가들" />
      <ExpertGridSection />
      <Footer />
    </main>
  );
}
