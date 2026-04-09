"use client";

import Navbar from "@/components/navbar";
import SubpageHeader from "@/components/subpage-header";
import { Footer } from "@/components/cta-footer";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "김OO 어머니",
    child: "7세 아동",
    rating: 5,
    text: "아이가 처음 상담을 시작할 때만 해도 말수가 거의 없었는데, 3개월 후부터는 스스로 감정을 이야기하기 시작했어요. 선생님께서 아이의 속도에 맞춰주신 덕분인 것 같아요.",
    program: "정서 상담",
    color: "oklch(0.48 0.09 165)",
  },
  {
    name: "이OO 아버지",
    child: "13세 중학생",
    rating: 5,
    text: "학교 적응 문제로 많이 힘들어했는데, 강점 코칭을 통해 아이가 자신감을 찾아가는 모습을 보면서 저도 함께 성장한 느낌이에요. 정말 감사합니다.",
    program: "강점 코칭",
    color: "oklch(0.62 0.09 45)",
  },
  {
    name: "박OO 어머니",
    child: "10세 아동",
    rating: 5,
    text: "ADHD 진단 이후 어떻게 도와줘야 할지 막막했는데, 사발면 센터에서 체계적인 계획을 세워주셔서 아이와 저 모두 안심이 되었습니다.",
    program: "발달 평가 및 상담",
    color: "oklch(0.52 0.10 260)",
  },
  {
    name: "최OO 어머니",
    child: "5세 아동",
    rating: 5,
    text: "놀이치료를 통해 아이가 또래 관계를 만들어가는 방법을 배웠어요. 전문가 선생님이 매 회기마다 피드백을 주셔서 가정에서도 연계할 수 있었습니다.",
    program: "놀이치료",
    color: "oklch(0.48 0.09 165)",
  },
  {
    name: "정OO 아버지",
    child: "16세 고등학생",
    rating: 5,
    text: "진로에 대한 고민이 많던 아이가 코칭 후에 스스로 목표를 세우고 실행하는 모습을 보니 정말 뿌듯합니다. 부모와의 소통 방법도 많이 배웠어요.",
    program: "진로 코칭",
    color: "oklch(0.62 0.09 45)",
  },
  {
    name: "한OO 어머니",
    child: "8세 아동",
    rating: 5,
    text: "분리 불안이 심했던 아이가 이제는 학교에 혼자 걸어 들어갑니다. 처음에는 반신반의했지만 지금은 주변 지인들께도 적극 추천하고 있습니다.",
    program: "정서 상담",
    color: "oklch(0.52 0.10 260)",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4"
          fill={i < count ? "oklch(0.62 0.09 45)" : "none"}
          style={{ color: "oklch(0.62 0.09 45)" }}
        />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />
      <SubpageHeader title="고객 후기" subtitle="아이들의 변화를 직접 경험한 부모님들의 이야기" />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Stats bar */}
          <div
            className="grid grid-cols-3 gap-6 mb-16 rounded-2xl p-8"
            style={{ background: "oklch(0.97 0.006 85)", border: "1px solid var(--border)" }}
          >
            {[
              { value: "98%", label: "만족도" },
              { value: "500+", label: "누적 상담 건수" },
              { value: "4.9", label: "평균 별점" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-serif font-bold text-3xl sm:text-4xl mb-1" style={{ color: "var(--primary)" }}>
                  {value}
                </p>
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Review cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="rounded-2xl border p-6 flex flex-col gap-4 bg-white"
                style={{ borderColor: "var(--border)" }}
              >
                <Quote className="w-6 h-6 flex-shrink-0" style={{ color: r.color }} />
                <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--foreground)" }}>
                  {r.text}
                </p>
                <div className="flex flex-col gap-2 mt-auto pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                  <StarRating count={r.rating} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{r.name}</p>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{r.child} · {r.program}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
