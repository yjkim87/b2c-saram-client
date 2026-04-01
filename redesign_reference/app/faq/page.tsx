"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, HelpCircle, BookOpen, Lightbulb, Star } from "lucide-react";
import Navbar from "@/components/navbar";

const FAQ_ITEMS = [
  {
    q: "코칭과 상담의 차이가 무엇인가요?",
    a: "코칭은 과거의 문제를 치료하는 것보다 현재의 강점을 기반으로 미래의 목표를 향해 나아가는 데 초점을 맞춥니다. 심리 상담이 정신건강 문제를 치료하는 데 중점을 둔다면, 코칭은 건강한 아이들이 더욱 성장하고 잠재력을 발휘할 수 있도록 지원합니다. 물론 저희는 필요한 경우 전문 심리 치료와 연계도 제공합니다.",
  },
  {
    q: "첫 상담은 어떻게 진행되나요?",
    a: "첫 상담은 약 60분간 진행되며, 부모님과 함께 아이의 발달 현황, 주요 관심사, 코칭 목표를 파악합니다. 필요에 따라 아이와도 간단한 라포(신뢰 관계) 형성 시간을 갖습니다. 이후 전문 코치가 맞춤형 코칭 계획을 제안해 드립니다.",
  },
  {
    q: "코칭 효과는 언제부터 나타나나요?",
    a: "개인차가 있지만, 일반적으로 3-4회기 이후부터 변화가 나타나기 시작합니다. 행동적 변화는 2-3개월 내에, 더 깊은 심리적 변화는 6개월 이상의 꾸준한 코칭을 통해 나타납니다. 부모님의 적극적인 참여와 가정에서의 실천이 효과를 높이는 데 중요합니다.",
  },
  {
    q: "온라인 코칭도 가능한가요?",
    a: "네, 화상 코칭 서비스를 제공합니다. 대면 코칭과 동일한 전문성을 유지하며, 지역에 상관없이 전국 어디서든 코칭을 받으실 수 있습니다. 단, 영아기(0-2세) 코칭과 초기 발달 평가는 대면으로 진행을 권장합니다.",
  },
  {
    q: "부모도 코칭에 참여해야 하나요?",
    a: "코칭의 효과를 극대화하기 위해 부모님의 참여를 권장합니다. 특히 영·유아기(0-6세)의 경우 부모 코칭이 핵심입니다. 아동기 이상에서도 정기적인 부모 피드백 세션을 통해 가정에서도 코칭이 이어질 수 있도록 지원합니다.",
  },
];

function FloatingMenu() {
  return (
    <div className="fixed bottom-8 right-6 z-50 flex flex-col items-end gap-3">
      <a
        href="/#contact"
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
        style={{ background: "oklch(0.48 0.09 165)", color: "white" }}
        title="예약하기"
      >
        <BookOpen className="w-5 h-5" />
      </a>
      <a
        href="https://pf.kakao.com/"
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
        style={{ background: "oklch(0.62 0.09 45)", color: "white" }}
        title="카카오톡 문의"
      >
        <Lightbulb className="w-5 h-5" />
      </a>
      <a
        href="https://instagram.com/"
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
        style={{ background: "oklch(0.55 0.07 200)", color: "white" }}
        title="인스타그램"
      >
        <Star className="w-5 h-5" />
      </a>
    </div>
  );
}

export default function FaqPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenId((prev) => (prev === i ? null : i));
  }

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.99 0.003 80)" }}>
      <Navbar />

      {/* Dark header */}
      <section
        className="pt-28 pb-16 px-4 sm:px-6 lg:px-8"
        style={{ background: "oklch(0.22 0.03 200)" }}
      >
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs mb-6 transition-opacity hover:opacity-70"
            style={{ color: "oklch(0.7 0.05 165)" }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            메인으로 돌아가기
          </Link>
          <h1
            className="font-serif text-4xl sm:text-5xl font-bold mb-4 text-balance"
            style={{ color: "white", wordBreak: "keep-all" }}
          >
            FAQ
          </h1>
          <p
            className="text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.75)", lineHeight: "1.7", wordBreak: "keep-all" }}
          >
            자주 묻는 질문들을 모았습니다. 추가로 궁금한 점은 카카오톡 오픈채널로 문의해 주세요.
          </p>
        </div>
      </section>

      <main className="pb-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">

          {/* FAQ Accordion */}
          <div className="flex flex-col">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openId === i;
              return (
                <div
                  key={i}
                  style={{ borderBottom: "1px solid oklch(0.91 0.01 240)" }}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-start justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3">
                      <HelpCircle
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                        style={{
                          color: isOpen ? "oklch(0.48 0.09 165)" : "oklch(0.65 0.01 240)",
                        }}
                      />
                      <span
                        className="font-semibold text-base"
                        style={{
                          color: isOpen ? "oklch(0.18 0.01 240)" : "oklch(0.28 0.01 240)",
                        }}
                      >
                        {item.q}
                      </span>
                    </div>
                    <ChevronDown
                      className="w-5 h-5 flex-shrink-0 mt-0.5 transition-transform duration-200"
                      style={{
                        color: "oklch(0.55 0.01 240)",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div className="pl-8 pb-5">
                      <p
                        className="text-base leading-relaxed"
                        style={{ color: "oklch(0.38 0.01 240)", lineHeight: "1.75" }}
                      >
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contact CTA */}
          <div
            className="mt-16 rounded-2xl p-8 text-center"
            style={{
              background: "oklch(0.48 0.09 165 / 0.06)",
              border: "1px solid oklch(0.48 0.09 165 / 0.15)",
            }}
          >
            <p
              className="font-semibold text-base mb-2"
              style={{ color: "oklch(0.18 0.01 240)" }}
            >
              원하는 답을 찾지 못하셨나요?
            </p>
            <p className="text-sm mb-5" style={{ color: "oklch(0.45 0.01 240)" }}>
              카카오톡 채널로 직접 도움을 드립니다.
            </p>
            <a
              href="https://pf.kakao.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90"
              style={{ background: "oklch(0.62 0.09 45)", color: "white" }}
            >
              카카오톡으로 문의하기
            </a>
          </div>
        </div>
      </main>
      <FloatingMenu />
    </div>
  );
}
