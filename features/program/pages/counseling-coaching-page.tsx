import type { ElementType } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Clock, Heart, Sparkles, Users } from "lucide-react"
import { PageHeader } from "@/components/common/page-header"

type IntroCard = {
  icon: ElementType
  title: string
  subtitle: string
  badge: string
  schedule: string
  description: string
  features: string[]
  theme: keyof typeof THEME_STYLES
}

const THEME_STYLES = {
  emerald: { badge: "bg-[#E6F4EA] text-[#1E8E3E]", iconBg: "bg-[#F2FCEE]", check: "text-[#1E8E3E]" },
  blue: { badge: "bg-[#E8F0FE] text-[#1A73E8]", iconBg: "bg-[#F0F5FF]", check: "text-[#1A73E8]" },
  amber: { badge: "bg-[#FEF7E0] text-[#F9AB00]", iconBg: "bg-[#FFF9EA]", check: "text-[#D18700]" },
  rose: { badge: "bg-[#FCE8E6] text-[#D93025]", iconBg: "bg-[#FFF0F0]", check: "text-[#D93025]" },
} as const

const INTRO_CARDS: IntroCard[] = [
  {
    icon: Heart,
    title: "정서 코칭",
    subtitle: "감정 인식 · 표현 · 조절 능력 향상",
    badge: "대상 3–6세, 7–12세, 13–18세",
    schedule: "주 1회 50분 / 8–12주 / 1:1 개인 코칭",
    description:
      "아이가 자신의 감정을 인식하고, 건강하게 표현하며, 효과적으로 조절하는 능력을 기릅니다. John Gottman 박사의 감정코칭 모델을 기반으로 합니다.",
    features: [
      "감정 인식 및 이름 붙이기 훈련",
      "감정 표현 기술 습득",
      "감정 조절 전략 개발",
      "공감 능력 향상",
      "스트레스 대처 기술",
    ],
    theme: "emerald",
  },
  {
    icon: Users,
    title: "사회성 코칭",
    subtitle: "또래 관계 · 의사소통 · 협동 능력 향상",
    badge: "대상 3–6세, 7–12세, 13–18세",
    schedule: "주 1회 50분 / 12주 / 소그룹 또는 1:1",
    description:
      "또래와의 건강한 관계를 형성하고 유지하는 사회적 기술을 습득합니다. 소외감이나 따돌림으로 어려움을 겪는 아이들을 위한 맞춤형 프로그램입니다.",
    features: [
      "사회적 상황 읽기 능력 향상",
      "대화 시작 및 유지 기술",
      "갈등 해결 전략",
      "협동 및 리더십 역량",
      "학교 적응력 강화",
    ],
    theme: "blue",
  },
  {
    icon: Sparkles,
    title: "학습 코칭",
    subtitle: "학습 동기 · 집중력 · 자기 조절 능력 향상",
    badge: "대상 7–12세, 13–18세",
    schedule: "주 1–2회 50분 / 12–16주 / 1:1 개인 코칭",
    description:
      "학습에 어려움을 겪거나 동기가 저하된 아이들을 위해 개인의 학습 스타일을 파악하고 맞춤형 전략을 개발합니다. 학업 스트레스 감소도 함께 다룹니다.",
    features: [
      "개인 학습 스타일 분석",
      "실행 기능 향상 (계획·집중·관리)",
      "학습 동기 강화 전략",
      "시험 불안 감소",
      "자기 주도 학습 능력 개발",
    ],
    theme: "amber",
  },
  {
    icon: Clock,
    title: "부모 코칭",
    subtitle: "발달 지식 · 양육 기술 · 의사소통 강화",
    badge: "대상 모든 연령 부모님",
    schedule: "격주 1회 60분 / 8주 / 1:1 또는 부부 코칭",
    description:
      "부모가 아이의 발달 단계를 이해하고, 각 단계에 맞는 효과적인 양육 방법을 실천할 수 있도록 지원합니다. 부모의 자기 이해도 함께 다룹니다.",
    features: [
      "발달 단계별 이해와 기대 조정",
      "긍정적 훈육 방법 습득",
      "효과적인 부모-자녀 의사소통",
      "양육 스트레스 관리",
      "부모 자신의 정서 건강 관리",
    ],
    theme: "rose",
  },
]

function IntroStoryCard({ item }: { item: IntroCard }) {
  const styles = THEME_STYLES[item.theme]
  const Icon = item.icon

  return (
    <article className="group flex h-full flex-col rounded-[32px] border border-gray-100/60 bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] sm:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div
          className={`flex h-[60px] w-[60px] items-center justify-center rounded-[22px] shadow-[inset_0_1px_4px_rgba(255,255,255,0.5)] transition-transform duration-300 group-hover:scale-110 ${styles.iconBg}`}
        >
          <Icon className="h-7 w-7 text-[#191F28]" />
        </div>
        <span className={`rounded-[10px] px-3 py-1.5 text-[13px] font-bold tracking-tight ${styles.badge}`}>{item.badge}</span>
      </div>

      <h2 className="mb-1.5 break-keep text-[22px] font-bold tracking-tight text-[#191F28] transition-colors group-hover:text-blue-600">
        {item.title}
      </h2>
      <p className="mb-4 break-keep text-[15px] font-semibold text-[#333D4B]">{item.subtitle}</p>
      <p className="mb-6 flex-grow break-keep text-[15px] leading-[1.6] text-[#4E5968]">{item.description}</p>

      <div className="rounded-[20px] bg-[#F2F4F6] p-5 transition-colors group-hover:bg-[#EBEDF0]">
        <div className="mb-3 flex items-center gap-1.5 text-[13px] font-bold text-[#4E5968]">
          <Clock className="h-4 w-4" />
          {item.schedule}
        </div>
        <ul className="flex flex-col gap-2">
          {item.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-[14px] font-medium text-[#4E5968]">
              <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${styles.check}`} />
              <span className="leading-snug break-keep">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export function CounselingCoachingProgramPage() {
  return (
    <>
      <PageHeader
        label="상담 / 코칭 프로그램"
        title="상담 / 코칭 프로그램"
        description="맞춤형 코칭으로 우리 아이의 성장을 지원합니다"
      />

      <div className="relative overflow-hidden bg-[#fbfbfb] pb-20 text-gray-900 selection:bg-blue-100 selection:text-blue-900">
        {/*
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
        />
        */}

        <section className="relative mx-auto max-w-5xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
            {INTRO_CARDS.map((item) => (
              <IntroStoryCard key={item.title} item={item} />
            ))}
          </div>
        </section>

        <section className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[24px] border border-gray-800 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 px-6 py-16 text-center shadow-2xl sm:px-12 sm:py-20 sm:text-left">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:18px_18px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/20 blur-[80px]"
            />

            <div className="relative z-10 flex flex-col items-center justify-between gap-8 sm:flex-row">
              <div className="max-w-lg">
                <h3 className="mb-3 break-keep text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  어떤 프로그램이 우리 아이에게 맞을까요?
                </h3>
                <p className="break-keep text-[16px] leading-relaxed text-gray-300">
                  전문가와 함께 아이에게 맞는 프로그램을 찾아드립니다.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/reservation"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-[16px] font-bold text-gray-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-[0.98]"
                >
                  무료 초기상담 신청하기
                  <ArrowRight className="h-5 w-5 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-gray-900" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
