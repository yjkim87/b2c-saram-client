"use client";

import Navbar from "@/components/navbar";
import SubpageHeader from "@/components/subpage-header";
import { Footer } from "@/components/cta-footer";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

const columns = [
  {
    type: "칼럼",
    tag: "발달심리",
    title: "아이가 '싫어!'를 반복할 때, 거절의 심리학",
    desc: "만 2~3세 아이의 반복적인 거부 반응은 자아 발달의 신호입니다. 발달심리학적 관점에서 이를 어떻게 이해하고 반응해야 하는지 알아봅니다.",
    author: "김사발 센터장",
    date: "2025.03.15",
    readTime: "5분",
    color: "oklch(0.48 0.09 165)",
  },
  {
    type: "인터뷰",
    tag: "강점 코칭",
    title: "\"아이의 강점을 찾아주는 것이 부모의 역할\" — 이면조 코치 인터뷰",
    desc: "10년 경력의 이면조 코치가 강점 기반 코칭의 핵심 원리와 가정에서 바로 적용할 수 있는 실천 방법에 대해 이야기합니다.",
    author: "사발면 편집팀",
    date: "2025.02.28",
    readTime: "8분",
    color: "oklch(0.62 0.09 45)",
  },
  {
    type: "칼럼",
    tag: "애착",
    title: "안정 애착이 평생 정서 건강을 결정한다",
    desc: "볼비의 애착 이론을 바탕으로, 0~36개월 영유아기에 형성되는 애착 유형이 이후 대인관계와 정서 조절 능력에 미치는 영향을 살펴봅니다.",
    author: "박라면 상담사",
    date: "2025.02.10",
    readTime: "6분",
    color: "oklch(0.52 0.10 260)",
  },
  {
    type: "칼럼",
    tag: "학습 코칭",
    title: "성적보다 중요한 것: 학습 동기와 자기효능감",
    desc: "성적 압박으로 공부에 지친 아이들에게 필요한 건 더 많은 공부 시간이 아닙니다. 내적 동기를 되살리는 코칭 접근법을 소개합니다.",
    author: "이면조 코치",
    date: "2025.01.22",
    readTime: "7분",
    color: "oklch(0.62 0.09 45)",
  },
  {
    type: "인터뷰",
    tag: "ADHD",
    title: "\"ADHD는 장애가 아니라 다른 방식의 뇌\" — 김사발 센터장 인터뷰",
    desc: "ADHD에 대한 오해와 진실, 그리고 사발면 센터가 ADHD 아동과 가족을 지원하는 방식에 대해 김사발 센터장이 솔직하게 이야기합니다.",
    author: "사발면 편집팀",
    date: "2025.01.08",
    readTime: "10분",
    color: "oklch(0.48 0.09 165)",
  },
  {
    type: "칼럼",
    tag: "부모 코칭",
    title: "화내지 않고 단호하게: 일관성 있는 훈육의 기술",
    desc: "아이에게 화가 날 때 감정적으로 반응하지 않으면서도 명확한 경계를 설정하는 방법. 부모의 자기조절이 아이의 자기조절을 만든다.",
    author: "박라면 상담사",
    date: "2024.12.18",
    readTime: "6분",
    color: "oklch(0.52 0.10 260)",
  },
];

export default function ColumnsPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />
      <SubpageHeader title="전문가 칼럼 · 인터뷰" subtitle="발달심리 전문가들이 직접 전하는 육아와 성장 이야기" />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Tag filters */}
          <div className="flex flex-wrap gap-2 mb-12">
            {["전체", "발달심리", "강점 코칭", "애착", "학습 코칭", "ADHD", "부모 코칭"].map((tag) => (
              <button
                key={tag}
                className="px-4 py-1.5 rounded-full text-xs font-semibold border transition-all"
                style={{
                  borderColor: "var(--border)",
                  color: tag === "전체" ? "white" : "var(--foreground)",
                  background: tag === "전체" ? "var(--primary)" : "transparent",
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Article cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {columns.map((c, i) => (
              <article
                key={i}
                className="group rounded-2xl border bg-white p-6 flex flex-col gap-4 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: c.color + "18", color: c.color }}
                  >
                    {c.type}
                  </span>
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {c.tag}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: c.color + "18" }}
                  >
                    <BookOpen className="w-5 h-5" style={{ color: c.color }} />
                  </div>
                  <h3 className="font-bold text-base leading-snug text-balance" style={{ color: "var(--foreground)" }}>
                    {c.title}
                  </h3>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                  {c.desc}
                </p>

                <div
                  className="flex items-center justify-between pt-4 mt-auto"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <div className="flex flex-col gap-0.5">
                    <p className="text-xs font-medium" style={{ color: "var(--foreground)" }}>{c.author}</p>
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                      <span>{c.date}</span>
                      <span>·</span>
                      <Clock className="w-3 h-3" />
                      <span>{c.readTime}</span>
                    </div>
                  </div>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    style={{ color: c.color }}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
