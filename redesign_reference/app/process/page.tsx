"use client";

import Link from "next/link";
import {
  ArrowLeft, ClipboardList, Brain, TrendingUp,
  CheckCircle2, ChevronRight, BookOpen, Lightbulb, Star,
} from "lucide-react";
import Navbar from "@/components/navbar";

// ─── FLOATING MENU ────────────────────────────────────────────────────────────
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

// ─── DATA ─────────────────────────────────────────────────────────────────────
const counselingSteps = [
  {
    step: "01",
    title: "초기 상담 신청",
    desc: "전화 또는 온라인으로 신청서를 작성합니다. 아이의 나이와 주요 고민을 간략히 기재해 주세요.",
    items: ["상담 신청서 작성", "원하는 상담 유형 선택", "일정 협의"],
  },
  {
    step: "02",
    title: "무료 사전 인테이크",
    desc: "전문 상담사와 30분 무료 미팅을 진행합니다. 아이의 현재 상태와 부모님의 질문에 성실하게 답변드립니다.",
    items: ["아이 현재 상태 파악", "상담 방향성 검토", "적합한 상담사 매칭"],
  },
  {
    step: "03",
    title: "상담 시작",
    desc: "주 1회 50분 세션으로 진행됩니다. 아이의 재밌과 상황에 따라 놀이/미술/언어 상담 중 적합한 방식이 선택됩니다.",
    items: ["주 1회 50분 세션", "놀이/미술/언어 상담", "매 회기 기록지 가정 공유"],
  },
  {
    step: "04",
    title: "중간 평가 및 피드백",
    desc: "8회기를 기준으로 변화를 체크하고 부모님과 함께 다음 단계를 지지 놓습니다.",
    items: ["회기록 리뷰", "부모 피드백 미팅", "상담 방향 수정"],
  },
  {
    step: "05",
    title: "종결 및 유지 코칭",
    desc: "무사히 종결하고 필요시 추수 상담으로 연결할 수 있습니다.",
    items: ["종결 세션", "3개월 뒤 추수 콘택트", "마음돌보미 코칭 안내"],
  },
];

const coachingSteps = [
  {
    step: "01",
    title: "코칭 신청 및 매칭",
    desc: "아이의 나이, 관심주제, 원하는 변화를 중심으로 적합한 코치를 매칭합니다.",
    items: ["코칭 신청서 작성", "코치 매칭", "사전 설문지 작성"],
  },
  {
    step: "02",
    title: "강점 발견 세션",
    desc: "다양한 도구를 활용해 아이의 고유한 강점과 흥미 영역을 발견합니다.",
    items: ["강점 발견 도구 활용", "흥미 영역 탐색", "코칭 목표 설정"],
  },
  {
    step: "03",
    title: "맞춤형 코칭 진행",
    desc: "주 1회 50분, 아이 주도의 대화를 통해 스스로 답을 찾아가는 코칭 도구를 주는 방식으로 진행됩니다.",
    items: ["주 1회 50분 세션", "아이 주도형 대화", "성장 일지 작성"],
  },
  {
    step: "04",
    title: "가정 연계 코칭",
    desc: "부모님의 코칭도 병행하여 집에서도 일관된 성장 환경을 만듭니다.",
    items: ["부모 코칭 병행", "가정 점검 미팅", "성장 환경 설계"],
  },
  {
    step: "05",
    title: "성장 목표 달성 확인",
    desc: "설정한 목표를 달성했는지 함께 확인하고 다음 단계 목표를 설정합니다.",
    items: ["목표 달성 확인", "다음 목표 설정", "지속 성장 코칭 안내"],
  },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ProcessPage() {
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
            상담 / 코칭 프로세스
          </h1>
          <p
            className="text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.75)", lineHeight: "1.7", wordBreak: "keep-all" }}
          >
            첫 방문부터 종결까지, 사발면 센터의 모든 과정은 아이의 울림을 중심으로 설계되어 있습니다.
          </p>
        </div>
      </section>

      <main className="pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">

          {/* Counseling Process */}
          <section className="mb-20">
            <div
              className="flex items-center gap-3 mb-10"
              style={{ borderBottom: "2px solid oklch(0.48 0.09 165)", paddingBottom: "12px" }}
            >
              <Brain className="w-5 h-5" style={{ color: "oklch(0.48 0.09 165)" }} />
              <h2 className="font-bold text-2xl" style={{ color: "oklch(0.16 0.01 240)" }}>
                심리상담 프로세스
              </h2>
            </div>
            <div className="flex flex-col gap-0">
              {counselingSteps.map((s, i) => (
                <div key={s.step} className="flex gap-6 relative pb-10">
                  {i < counselingSteps.length - 1 && (
                    <div
                      className="absolute left-5 top-10 bottom-0 w-px"
                      style={{ background: "oklch(0.48 0.09 165 / 0.2)" }}
                    />
                  )}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold z-10"
                    style={{ background: "oklch(0.48 0.09 165)", color: "white" }}
                  >
                    {s.step}
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-bold text-lg mb-2" style={{ color: "oklch(0.18 0.01 240)" }}>
                      {s.title}
                    </h3>
                    <p className="text-base mb-3" style={{ color: "oklch(0.42 0.01 240)", lineHeight: "1.7" }}>
                      {s.desc}
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <CheckCircle2
                            className="w-3.5 h-3.5 flex-shrink-0"
                            style={{ color: "oklch(0.48 0.09 165)" }}
                          />
                          <span className="text-sm" style={{ color: "oklch(0.38 0.01 240)" }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Divider */}
          <div className="my-6 border-t" style={{ borderColor: "oklch(0.90 0.01 240)" }} />

          {/* Coaching Process */}
          <section className="mt-14 mb-20">
            <div
              className="flex items-center gap-3 mb-10"
              style={{ borderBottom: "2px solid oklch(0.62 0.09 45)", paddingBottom: "12px" }}
            >
              <TrendingUp className="w-5 h-5" style={{ color: "oklch(0.62 0.09 45)" }} />
              <h2 className="font-bold text-2xl" style={{ color: "oklch(0.16 0.01 240)" }}>
                성장코칭 프로세스
              </h2>
            </div>
            <div className="flex flex-col gap-0">
              {coachingSteps.map((s, i) => (
                <div key={s.step} className="flex gap-6 relative pb-10">
                  {i < coachingSteps.length - 1 && (
                    <div
                      className="absolute left-5 top-10 bottom-0 w-px"
                      style={{ background: "oklch(0.62 0.09 45 / 0.2)" }}
                    />
                  )}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold z-10"
                    style={{ background: "oklch(0.62 0.09 45)", color: "white" }}
                  >
                    {s.step}
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-bold text-lg mb-2" style={{ color: "oklch(0.18 0.01 240)" }}>
                      {s.title}
                    </h3>
                    <p className="text-base mb-3" style={{ color: "oklch(0.42 0.01 240)", lineHeight: "1.7" }}>
                      {s.desc}
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <CheckCircle2
                            className="w-3.5 h-3.5 flex-shrink-0"
                            style={{ color: "oklch(0.62 0.09 45)" }}
                          />
                          <span className="text-sm" style={{ color: "oklch(0.38 0.01 240)" }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              background: "oklch(0.48 0.09 165 / 0.06)",
              border: "1px solid oklch(0.48 0.09 165 / 0.15)",
            }}
          >
            <h3 className="font-bold text-xl mb-2" style={{ color: "oklch(0.18 0.01 240)" }}>
              먼저 무료로 상담해 보세요
            </h3>
            <p className="text-base mb-5" style={{ color: "oklch(0.42 0.01 240)" }}>
              어떤 서비스가 우리 아이에게 맞는지 함께 확인해 드립니다.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90"
              style={{ background: "oklch(0.48 0.09 165)", color: "white" }}
            >
              <ClipboardList className="w-4 h-4" />
              무료 상담 신청
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <FloatingMenu />
    </div>
  );
}
