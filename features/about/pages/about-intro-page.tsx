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
    title: "정서 우선 접근",
    subtitle: "문제 해결보다 먼저, 아이의 마음을 이해합니다",
    badge: "핵심 원칙",
    schedule: "개별 상담 + 부모 코칭 연계",
    description:
      "아이의 행동을 교정 대상으로만 보지 않고, 행동 뒤에 있는 감정과 욕구를 함께 해석합니다. 부모가 일상에서 바로 적용할 수 있는 언어와 반응 전략까지 안내합니다.",
    features: [
      "감정 명료화 질문 프레임 제공",
      "가정 내 갈등 상황 대응 시뮬레이션",
      "부모-자녀 대화 스크립트 맞춤 설계",
    ],
    theme: "emerald",
  },
  {
    icon: Users,
    title: "가족 시스템 관점",
    subtitle: "아이 한 명이 아닌 가족 전체를 함께 봅니다",
    badge: "진단 관점",
    schedule: "보호자 인터뷰 + 상황 맥락 분석",
    description:
      "아이의 어려움은 종종 관계 패턴과 생활 리듬 속에서 강화됩니다. 가족의 상호작용 구조를 점검해 변화가 오래 유지될 수 있는 현실적인 개입을 제안합니다.",
    features: [
      "양육 역할과 경계 점검",
      "가족 대화 루틴 재설계",
      "재발 방지 체크리스트 제공",
    ],
    theme: "blue",
  },
  {
    icon: Sparkles,
    title: "발달 단계 맞춤 설계",
    subtitle: "연령과 발달 특성에 따라 개입 난이도를 조정합니다",
    badge: "맞춤 설계",
    schedule: "연령별 목표 설정 + 4주 단위 점검",
    description:
      "같은 문제라도 연령별로 접근 방식은 달라야 합니다. 인지·정서 발달 단계에 맞게 목표를 분해하고, 아이가 실제로 해낼 수 있는 작은 성공 경험부터 만들어 갑니다.",
    features: [
      "연령군별 실행 목표 차등 적용",
      "세션 간 가정 실천 과제 제공",
      "진행도 기반 다음 단계 난이도 조절",
    ],
    theme: "amber",
  },
  {
    icon: Clock,
    title: "지속 가능한 변화",
    subtitle: "상담실 안의 변화가 일상으로 이어지도록 돕습니다",
    badge: "성과 관리",
    schedule: "초기-중간-종결 리포트 공유",
    description:
      "단기 완화에 머무르지 않고, 변화가 가정과 학교에서 반복되도록 구조를 설계합니다. 아이와 부모 모두가 체감할 수 있는 지표를 중심으로 과정을 점검합니다.",
    features: [
      "행동·정서 변화 지표 시각화",
      "보호자 피드백 루프 운영",
      "종결 이후 유지 계획 가이드",
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

export function AboutIntroPage() {
  return (
    <>
      <PageHeader
        label="사발면 소개"
        title="사발면의 철학과 방향성을 소개합니다"
        description="랜딩 요약과 분리된 상세 스토리 페이지입니다."
      />

      <div className="relative overflow-hidden bg-gray-50/50 pb-20 text-gray-900 selection:bg-blue-100 selection:text-blue-900">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
        />

        <section className="relative mx-auto max-w-5xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Link
              href="/about/location"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              오시는길 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about/experts"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              전문가 소개 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

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
                  어떤 방향이 우리 아이에게 맞을지 고민되시나요?
                </h3>
                <p className="break-keep text-[16px] leading-relaxed text-gray-300">
                  전문 코치와의 <span className="font-semibold text-white">15분 무료 전화 상담</span>을 통해
                  <br className="hidden sm:block" />
                  아이의 현재 상태에 가장 적합한 시작점을 안내해 드립니다.
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
