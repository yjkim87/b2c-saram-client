"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { ReservationCTAButton } from "@/shared/ui/reservation-cta-button"

type SectionVariant = "preview" | "full"

interface SolutionSectionProps {
  variant?: SectionVariant
}

const ageGroups = [
  { id: "infant", label: "영유아 / 미취학", emoji: "👶" },
  { id: "elementary", label: "초등학생", emoji: "🎒" },
  { id: "middle", label: "중학생", emoji: "📘" },
  { id: "high", label: "고등학생", emoji: "🎓" },
] as const

type AgeGroupId = (typeof ageGroups)[number]["id"]

interface SolutionCard {
  title: string
  needs: string
  solution: string
  keywords: string[]
}

const solutionData: Record<AgeGroupId, { slogan: string; intro: string; cards: SolutionCard[] }> = {
  infant: {
    slogan: "아이의 고유한 결을 발견할 때, 서툰 첫 양육이 가장 선명한 행복이 됩니다.",
    intro:
      "이 시기 부모님은 훈육보다는 아이의 타고난 특성을 이해하고, 그에 적합한 상호작용 방식을 익혀 안정적인 양육 환경을 만드는 데 집중합니다.",
    cards: [
      {
        title: "기질 맞춤 양육",
        needs:
          "아이의 타고난 기질을 분석하여 부모와 아이의 기질적 차이를 이해하고, 이에 최적화된 양육 솔루션을 찾고자 합니다.",
        solution:
          "\"나와는 너무 다른 아이, 도대체 어떻게 맞춰줘야 할까요? 타고난 기질을 데이터로 이해하면 갈등은 줄고 소통의 온도는 높아집니다.\"",
        keywords: ["기질", "양육 솔루션", "데이터"],
      },
      {
        title: "애착 형성 및 상호작용",
        needs:
          "아이와 정서적으로 안정된 애착을 형성하고, 아이의 특성에 맞게 소통의 온도를 높이는 구체적인 상호작용 가이드를 필요로 합니다.",
        solution:
          "\"아이의 마음을 다치게 하지 않으면서도 단단한 애착을 쌓고 싶으신가요? 우리 아이의 특성에 딱 맞는 '세상에 단 하나뿐인 상호작용 가이드'를 건넵니다.\"",
        keywords: ["애착", "상호작용 가이드", "소통"],
      },
      {
        title: "부모 자기 돌봄",
        needs:
          "육아 스트레스를 관리하고 자녀의 성장을 효과적으로 돕기 위해 부모 스스로의 마음 상태를 점검하고 코칭 스킬을 배우고 싶어 합니다.",
        solution:
          "\"좋은 부모가 되고 싶은 마음 뒤에 숨겨진 육아 스트레스, 혼자 견디지 마세요. 부모님의 마음을 먼저 돌보아야 아이의 성장을 웃으며 응원할 수 있습니다.\"",
        keywords: ["육아 스트레스", "코칭 스킬", "자기 돌봄"],
      },
    ],
  },
  elementary: {
    slogan: "남들을 따라가는 속도가 아니라, 우리 아이만의 고유한 방향을 찾습니다.",
    intro: "본격적인 학습이 시작되는 시기로, 잠재력 발견과 자기주도적 습관 형성이 주요 관심사입니다.",
    cards: [
      {
        title: "자기주도학습 형성",
        needs:
          "잔소리 없이 아이 스스로 공부하는 습관과 학습 동기를 만들어주는 인지·동기·행동 전략을 원합니다.",
        solution:
          "\"매번 반복되는 공부 잔소리에 지치셨나요? 아이의 뇌가 즐거워하는 인지·동기·행동 전략으로 스스로 책상에 앉는 기적을 설계합니다.\"",
        keywords: ["자기주도학습", "학습 동기", "인지·동기·행동 전략"],
      },
      {
        title: "강점 및 적성 발견",
        needs:
          "아이만의 고유한 재능과 강점을 데이터로 확인하고, 미래 진로에 대한 기초적인 탐색과 방향 설정을 시작하고자 합니다.",
        solution:
          "\"남들 다 하는 교육 말고, 우리 아이가 진짜 빛날 수 있는 곳은 어디일까요? 30년 연구 통찰이 담긴 데이터로 아이의 숨겨진 잠재력을 발견해 드립니다.\"",
        keywords: ["강점", "적성", "잠재력", "진로"],
      },
      {
        title: "학교 적응 및 사회성",
        needs:
          "학교생활에서의 적응력과 또래 관계에서 겪을 수 있는 갈등을 예방하고 건강한 교우 관계를 지원하고 싶어 합니다.",
        solution:
          "\"새로운 환경과 친구 관계에서 아이가 상처받을까 걱정되시죠? 건강한 교우 관계를 지원하는 든든한 조력자가 되어주세요.\"",
        keywords: ["학교 적응", "사회성", "교우 관계"],
      },
      {
        title: "자존감 및 정서 코칭",
        needs:
          "쉽게 포기하지 않는 마음과 건강한 자아존중감을 키워주기 위해 부모와 자녀 간의 건강한 대화법을 찾습니다.",
        solution:
          "\"작은 시련에도 쉽게 포기하는 아이, 마음의 근육이 필요합니다. 자존감을 높이는 올바른 대화법이 아이의 평생을 지탱하는 힘이 됩니다.\"",
        keywords: ["자존감", "정서 코칭", "자아존중감", "대화법"],
      },
    ],
  },
  middle: {
    slogan: "사춘기라는 폭풍 속에서도, 아이와 부모를 잇는 대화의 끈은 더 단단해질 수 있습니다.",
    intro:
      "사춘기에 진입하며 나타나는 급격한 변화에 대응하여, 관계 회복과 내적 학습 동기를 찾는 것이 핵심입니다.",
    cards: [
      {
        title: "사춘기 소통 및 갈등 회복",
        needs:
          "변화하는 자녀와 다시 가까워지기 위한 소통 방식을 익히고, 정서적 갈등을 해소하여 관계를 회복하고자 합니다.",
        solution:
          "\"입을 꾹 닫아버린 사춘기 자녀, 예전처럼 다시 가까워질 수 있을까요? 전문가의 1:1 코칭을 통해 갈등을 넘어 깊은 교감을 다시 시작합니다.\"",
        keywords: ["사춘기", "소통", "갈등 회복", "1:1 코칭"],
      },
      {
        title: "학습 동기 및 목표 설정",
        needs:
          "학업 의욕이 정체되는 시기에 아이의 내적 동기를 자극하고, 스스로 움직일 수 있는 학습 목표를 찾아주고 싶어 합니다.",
        solution:
          "\"공부 의욕이 뚝 떨어진 시기, 억지로 시키는 공부는 답이 아닙니다. 아이 스스로 움직이게 만드는 '내적 동기'의 불씨를 찾아줍니다.\"",
        keywords: ["학습 동기", "내적 동기", "목표 설정"],
      },
      {
        title: "자기 이해 및 정체성",
        needs:
          "CATiII 등을 통해 자신의 성격을 깊이 있게 이해하고, 건강한 자아 정체성을 확립해가는 과정을 조력하고자 합니다.",
        solution:
          "\"우리 아이는 어떤 사람으로 살아가고 싶어 할까요? 객관적인 진단을 통해 아이가 스스로의 정체성을 찾아가는 여정을 함께합니다.\"",
        keywords: ["자기 이해", "정체성", "CATiII"],
      },
      {
        title: "사회성 및 멘탈 관리",
        needs:
          "예민한 또래 관계에서 오는 스트레스를 관리하고 건강한 자아 정체성을 확립하도록 지원합니다.",
        solution:
          "\"복잡한 또래 관계 속에서 흔들리는 아이의 마음, 건강한 사회성과 단단한 멘탈을 함께 세워갑니다.\"",
        keywords: ["사회성", "멘탈 관리", "또래 관계"],
      },
    ],
  },
  high: {
    slogan: "입시라는 긴 터널을 지나는 아이에게, 가장 선명한 인생의 지도를 건넵니다.",
    intro:
      "대입과 미래 설계를 앞둔 시기로, 변화하는 교육 환경에 맞춘 구체적인 로드맵과 멘탈 관리가 주된 목적입니다.",
    cards: [
      {
        title: "진로 및 전공 설계",
        needs:
          "변화하는 교육 정책을 고려하여 대학 전공 선택 등 데이터 기반의 현실적이고 구체적인 진로 로드맵을 설계하고자 합니다.",
        solution:
          "\"변화하는 교육 정책 속에서 우리 아이에게 맞는 최선의 선택은 무엇일까요? 데이터가 증명하는 현실적이고 구체적인 진로 로드맵을 제안합니다.\"",
        keywords: ["진로", "전공 설계", "진로 로드맵"],
      },
      {
        title: "학업 스트레스 및 불안 관리",
        needs:
          "수험 생활에서 오는 극심한 학업 스트레스와 시험 불안을 이겨낼 수 있도록 아이의 멘탈을 관리하고 심리적 안정을 돕고 싶어 합니다.",
        solution:
          "\"시험 때마다 불안해하는 아이를 보며 부모님의 마음도 타들어 갑니다. 수험 생활의 압박을 이겨낼 수 있는 탄탄한 멘탈 관리 솔루션을 제공합니다.\"",
        keywords: ["학업 스트레스", "불안 관리", "멘탈 관리"],
      },
      {
        title: "강점 기반 커리어 설계",
        needs:
          "자신의 강점을 기반으로 미래 커리어를 설계하며, 성인기로 넘어가기 전 자기 주도적인 삶의 기반을 단단히 다지길 원합니다.",
        solution:
          "\"대학 합격이 끝이 아닙니다. 자신의 강점을 기반으로 세상에 나갈 준비를 마친 '자기 주도적 성인'으로 성장을 돕습니다.\"",
        keywords: ["강점", "커리어 설계", "자기 주도적"],
      },
      {
        title: "입시 대비 부모 코칭",
        needs:
          "입시 준비 과정에서 자녀를 효과적으로 지지하고 조력할 수 있는 부모만의 전문적인 코칭 스킬을 배우고자 합니다.",
        solution:
          "\"가장 예민한 시기의 자녀를 효과적으로 지지하는 방법, 전문가와 함께 준비하세요. 당신은 아이의 가장 훌륭한 조력자가 될 수 있습니다.\"",
        keywords: ["입시 대비", "부모 코칭", "조력자"],
      },
    ],
  },
}

const cardEmojiStyles = [
  { emoji: "💗", bg: "bg-pink-50", text: "text-pink-600" },
  { emoji: "🧩", bg: "bg-green-50", text: "text-green-600" },
  { emoji: "🧭", bg: "bg-orange-50", text: "text-orange-600" },
  { emoji: "⭐", bg: "bg-blue-50", text: "text-blue-600" },
] as const

function SolutionSectionPreview() {
  const previewCards = solutionData.infant.cards.slice(0, 2)

  return (
    <section className="bg-[#F4F6F9] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
            <span aria-hidden="true">💡</span>
            <span className="text-xs font-bold text-slate-700">솔루션</span>
          </div>
          <h2 className="mobile-auto-phrase mb-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 text-balance md:text-[40px]">
            아이의 성장 단계에 맞는
            <br className="hidden sm:block" />
            <span className="text-[#2B66F6]"> 전문적인 솔루션</span>을 제공합니다
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-slate-500">
            대표 솔루션 일부만 먼저 보여드려요. 더 다양한 성장 단계별 맞춤 코칭은 상세 페이지에서 확인해보세요.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-4">
          {previewCards.map((card, index) => {
            const style = cardEmojiStyles[index % cardEmojiStyles.length]
            return (
              <article key={card.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <span className={cn("inline-flex h-10 w-10 items-center justify-center rounded-xl text-xl", style.bg, style.text)}>
                    {style.emoji}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
                </div>
                <p className="mb-3 text-sm leading-relaxed text-slate-600">{card.needs}</p>
                <div className="flex flex-wrap gap-1.5">
                  {card.keywords.map((keyword) => (
                    <span key={keyword} className="rounded-md bg-blue-50 px-2 py-1 text-xs font-bold text-[#2B66F6]">
                      #{keyword}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/solution"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
          >
            솔루션 더보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function SolutionSectionFull() {
  const [activeTab, setActiveTab] = useState<AgeGroupId>("infant")
  const tabScrollRef = useRef<HTMLDivElement | null>(null)
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, ready: false })
  const currentData = solutionData[activeTab]

  const updateIndicator = useCallback(() => {
    const activeIndex = ageGroups.findIndex((group) => group.id === activeTab)
    const activeButton = tabButtonRefs.current[activeIndex]
    if (!activeButton) return

    setIndicatorStyle({
      left: activeButton.offsetLeft,
      width: activeButton.offsetWidth,
      ready: true,
    })
  }, [activeTab])

  useEffect(() => {
    updateIndicator()
  }, [updateIndicator])

  useEffect(() => {
    const handleResize = () => updateIndicator()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [updateIndicator])

  const handleTabChange = (nextTab: AgeGroupId, index: number) => {
    setActiveTab(nextTab)
    if (window.innerWidth >= 768) return

    const container = tabScrollRef.current
    const targetButton = tabButtonRefs.current[index]

    if (container && targetButton) {
      const maxScrollLeft = container.scrollWidth - container.clientWidth

      let targetScrollLeft = 0
      if (index === 0) {
        targetScrollLeft = 0
      } else if (index === ageGroups.length - 1) {
        targetScrollLeft = maxScrollLeft
      } else {
        targetScrollLeft = targetButton.offsetLeft - (container.clientWidth - targetButton.offsetWidth) / 2
      }

      const clampedScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScrollLeft))
      container.scrollTo({ left: clampedScrollLeft, behavior: "smooth" })
    }

    requestAnimationFrame(() => {
      const cardElement = document.getElementById("solution-content-card")
      if (!cardElement) return
      const y = cardElement.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top: y, behavior: "smooth" })
    })
  }

  return (
    <section className="bg-[#F4F6F9] py-16 md:py-24">
      <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
        <div className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
            <span aria-hidden="true">💡</span>
            <span className="text-xs font-bold text-slate-700">솔루션</span>
          </div>
          <h2 className="mobile-auto-phrase mb-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 text-balance md:text-[40px]">
            아이의 성장 단계에 맞는
            <br className="hidden sm:block" />
            <span className="text-[#2B66F6]"> 전문적인 솔루션</span>을 제공합니다
          </h2>
        </div>

        <div className="pointer-events-none sticky top-[74px] z-40 mb-12 flex justify-center px-4 md:top-[90px] md:mb-16">
          <div className="pointer-events-auto relative w-full max-w-full md:w-auto">
            <div
              ref={tabScrollRef}
              className="w-full overflow-x-auto snap-x snap-mandatory rounded-full border border-white/50 bg-[#EEF1F6]/85 p-1.5 pr-8 shadow-sm backdrop-blur-md md:w-auto md:pr-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="relative inline-flex min-w-max items-center gap-1 md:justify-center">
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-0 z-0 h-full rounded-full bg-[#2B66F6] shadow-md shadow-blue-500/20 transition-all duration-300 ease-out",
                    indicatorStyle.ready ? "opacity-100" : "opacity-0"
                  )}
                  style={{
                    left: indicatorStyle.left,
                    width: indicatorStyle.width,
                  }}
                />

                {ageGroups.map((group, index) => {
                  const isActive = activeTab === group.id
                  return (
                    <button
                      key={group.id}
                      ref={(element) => {
                        tabButtonRefs.current[index] = element
                      }}
                      onClick={() => handleTabChange(group.id, index)}
                      className={cn(
                        "relative z-10 shrink-0 snap-start whitespace-nowrap rounded-full px-5 py-2.5 text-[14px] font-bold transition-colors duration-300 md:px-6 md:text-[15px]",
                        isActive ? "text-white" : "text-slate-500 hover:text-slate-800"
                      )}
                    >
                      <span className="mr-1.5 hidden align-middle md:inline" aria-hidden="true">
                        {group.emoji}
                      </span>
                      <span className="align-middle">{group.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-10 rounded-r-full bg-gradient-to-l from-[#EEF1F6] to-transparent md:hidden"
            />
          </div>
        </div>

        <div
          id="solution-content-card"
          key={`card-${activeTab}`}
          className="animate-in fade-in slide-in-from-bottom-8 relative rounded-[32px] border border-white bg-white px-0 py-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] duration-700 md:rounded-[40px]"
        >
          <div className="mb-10 text-center">
            <h3 className="mb-3 break-keep text-xl font-bold text-slate-800 md:text-2xl">
              "{currentData.slogan}"
            </h3>
            <p className="mx-auto max-w-2xl break-keep text-base font-medium text-slate-500 md:text-base">
              {currentData.intro}
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-4">
            {currentData.cards.map((card, index) => {
              const style = cardEmojiStyles[index % cardEmojiStyles.length]
              return (
                <div
                  key={index}
                  className={cn(
                    "group flex flex-col gap-5 rounded-none border-0 p-6 transition-all duration-300 hover:shadow-md md:flex-row md:rounded-2xl md:border md:border-slate-200 md:bg-white md:hover:border-[#2B66F6]/45",
                    index % 2 === 0 ? "bg-white" : "bg-slate-50"
                  )}
                >
                  <div className="flex shrink-0 justify-center md:justify-start">
                    <div
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition-transform duration-300 group-hover:scale-110",
                        style.bg,
                        style.text
                      )}
                      aria-hidden="true"
                    >
                      {style.emoji}
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <h4 className="text-lg font-bold text-slate-900 md:text-xl">{card.title}</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {card.keywords.map((keyword) => (
                          <span
                            key={keyword}
                            className="rounded-md bg-blue-50 px-2 py-1 text-[13px] font-bold text-[#2B66F6]"
                          >
                            #{keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="mb-4 break-keep text-[15px] leading-relaxed text-slate-500">{card.needs}</p>

                    <div className="rounded-xl border border-slate-200 bg-[#F2F4F8] p-4 transition-colors group-hover:bg-blue-50/50">
                      <p className="mb-2 text-xs font-bold text-[#6D4BFF]">
                        <span className="mr-1" aria-hidden="true">
                          💡
                        </span>
                        사발면 솔루션
                      </p>
                      <p className="break-keep text-base font-medium italic leading-relaxed text-slate-700 md:text-[15px]">
                        {card.solution}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-12 pt-8 text-center">
            <p className="mb-6 text-base font-medium text-slate-500 md:text-base">
              우리 아이에게 맞는 솔루션이 궁금하신가요?
            </p>

            <ReservationCTAButton className="mx-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function SolutionSection({ variant = "full" }: SolutionSectionProps) {
  if (variant === "preview") {
    return <SolutionSectionPreview />
  }

  return <SolutionSectionFull />
}
