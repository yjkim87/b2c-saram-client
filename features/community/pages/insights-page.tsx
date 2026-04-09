import Link from "next/link"
import { CalendarDays, Eye, MessageCircle, PenSquare } from "lucide-react"
import { PageHeader } from "@/components/common/page-header"

type InsightHighlight = {
  id: string
  category: string
  title: string
  summary: string
  author: string
  publishedAt: string
  tags: string[]
  imageSrc: string
  imageAlt: string
  imageOverlayClass: string
  imagePositionClass: string
}

type InsightBoardItem = {
  id: string
  category: string
  title: string
  summary: string
  author: string
  publishedAt: string
  views: number
  comments: number
  tags: string[]
}

const HIGHLIGHT_ITEMS: InsightHighlight[] = [
  {
    id: "highlight-1",
    category: "칼럼 추천",
    title: "초등 저학년 감정 폭발, 부모가 먼저 바꿔야 할 3가지 반응",
    summary:
      "아이의 감정 폭발을 멈추게 하려는 반응보다, 감정을 안전하게 다루도록 돕는 반응이 장기적으로 더 큰 변화를 만듭니다.",
    author: "김지원 전문코치",
    publishedAt: "2026.04.01",
    tags: ["감정코칭", "초등", "부모대화"],
    imageSrc: "/placeholder.jpg",
    imageAlt: "칼럼 대표 이미지",
    imageOverlayClass: "bg-[#FDE047]/35",
    imagePositionClass: "object-center",
  },
  {
    id: "highlight-2",
    category: "인터뷰",
    title: "학습 동기가 떨어진 아이, 무엇부터 점검해야 할까요?",
    summary:
      "동기 저하를 의지 부족으로 보지 않고, 일상 리듬과 성공 경험의 설계 관점에서 다시 읽어내는 현장 전문가 인터뷰입니다.",
    author: "박현우 책임코치",
    publishedAt: "2026.03.29",
    tags: ["학습코칭", "동기", "인터뷰"],
    imageSrc: "/placeholder-user.jpg",
    imageAlt: "인터뷰 대표 이미지",
    imageOverlayClass: "bg-sky-400/25",
    imagePositionClass: "object-top",
  },
]

const INSIGHT_BOARD_ITEMS: InsightBoardItem[] = [
  {
    id: "board-1",
    category: "전문가 칼럼",
    title: "등교 전 매일 실랑이가 반복될 때, 아침 루틴을 재설계하는 방법",
    summary: "시간표보다 감정 흐름을 먼저 정리하면 아침 갈등을 크게 줄일 수 있습니다. 가정에서 바로 적용 가능한 루틴 설계법을 소개합니다.",
    author: "이서연 코치",
    publishedAt: "2026.03.27",
    views: 1824,
    comments: 14,
    tags: ["아침루틴", "등교거부", "실행전략"],
  },
  {
    id: "board-2",
    category: "인터뷰",
    title: "또래관계에서 자주 위축되는 아이, 부모 피드백은 어떻게 달라져야 하나요",
    summary: "사회성 코칭 현장에서 가장 자주 나오는 질문을 중심으로, 부모의 피드백 언어를 구체적으로 바꾸는 포인트를 정리했습니다.",
    author: "정하늘 상담사",
    publishedAt: "2026.03.24",
    views: 1536,
    comments: 9,
    tags: ["사회성", "또래관계", "부모코칭"],
  },
  {
    id: "board-3",
    category: "전문가 칼럼",
    title: "칭찬을 해도 효과가 없을 때, 결과보다 과정에 초점을 맞추는 대화법",
    summary: "\"잘했어\"를 반복해도 변화가 적다면, 아이가 통제 가능한 과정 행동을 짚어주는 칭찬 구조로 전환해야 합니다.",
    author: "김도윤 전문위원",
    publishedAt: "2026.03.20",
    views: 2142,
    comments: 22,
    tags: ["칭찬법", "자기효능감", "관계대화"],
  },
  {
    id: "board-4",
    category: "인터뷰",
    title: "사춘기 자녀와의 갈등, 규칙을 세우기 전에 먼저 합의해야 하는 것",
    summary: "규칙 자체보다 \"왜 필요한지\"를 함께 합의하는 과정이 갈등 강도를 낮춥니다. 실제 상담 사례를 바탕으로 설명합니다.",
    author: "최유진 수석코치",
    publishedAt: "2026.03.17",
    views: 1978,
    comments: 18,
    tags: ["사춘기", "가족규칙", "갈등조율"],
  },
  {
    id: "board-5",
    category: "전문가 칼럼",
    title: "스마트폰 사용 갈등, 통제보다 자기조절을 키우는 2단계 약속 설계",
    summary: "일방적 제한은 반발을 키우기 쉽습니다. 아이가 스스로 지킬 수 있는 최소 약속부터 설계하는 방법을 다룹니다.",
    author: "한지민 코치",
    publishedAt: "2026.03.14",
    views: 1689,
    comments: 11,
    tags: ["미디어사용", "자기조절", "가정규칙"],
  },
  {
    id: "board-6",
    category: "인터뷰",
    title: "부모 코칭을 병행하면 아이의 변화 속도가 빨라지는 이유",
    summary: "아이 세션만으로는 유지가 어려운 변화도, 부모의 일상 반응이 함께 바뀌면 더 안정적으로 지속됩니다.",
    author: "윤소민 책임상담사",
    publishedAt: "2026.03.10",
    views: 1420,
    comments: 7,
    tags: ["부모코칭", "변화유지", "사례인터뷰"],
  },
]

function InsightHighlightCard({ item }: { item: InsightHighlight }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[32px] border border-gray-100/60 bg-[#EFEFEF] shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
      <div className="relative h-32 w-full overflow-hidden sm:h-36">
        <img
          src={item.imageSrc}
          alt={item.imageAlt}
          className={`h-full w-full ${item.imagePositionClass} object-cover transition-transform duration-500 group-hover:scale-105`}
        />
        <div className={`pointer-events-none absolute inset-0 ${item.imageOverlayClass}`} />
      </div>

      <div className="flex flex-grow flex-col p-6 sm:p-7">
        <div className="mb-4 flex items-start justify-between gap-4">
          <span className="inline-flex rounded-[10px] bg-white px-3 py-1.5 text-[13px] font-bold tracking-tight text-[#1A73E8]">
            {item.category}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-[#6B7684]">
            <CalendarDays className="h-3.5 w-3.5" />
            {item.publishedAt}
          </span>
        </div>

        <h2 className="mb-3 break-keep text-[22px] font-bold tracking-tight text-[#191F28] transition-colors group-hover:text-blue-600">
          {item.title}
        </h2>
        <p className="mb-6 flex-grow break-keep text-[15px] leading-[1.65] text-[#4E5968]">{item.summary}</p>

        <div className="rounded-[20px] bg-white p-5 transition-colors group-hover:bg-white">
          <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-[#4E5968]">
            <PenSquare className="h-4 w-4" />
            {item.author}
          </div>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={`${item.id}-${tag}`}
                className="rounded-full border border-[#D6E3FF] bg-[#EAF1FF] px-2.5 py-1 text-xs font-medium text-[#245FE6]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

function InsightBoardRow({ item }: { item: InsightBoardItem }) {
  return (
    <li>
      <Link href="#" className="group block rounded-2xl px-3 py-5 transition-colors duration-200 hover:bg-[#F7FAFF]">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#EEF4FF] px-2.5 py-1 text-xs font-semibold text-[#1A73E8]">{item.category}</span>
              <span className="inline-flex items-center gap-1 text-xs text-[#6B7684]">
                <CalendarDays className="h-3.5 w-3.5" />
                {item.publishedAt}
              </span>
            </div>

            <h3 className="break-keep text-[18px] font-bold leading-snug text-[#191F28] transition-colors group-hover:text-blue-600">
              {item.title}
            </h3>
            <p className="mt-2 break-keep text-sm leading-relaxed text-[#4E5968]">{item.summary}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={`${item.id}-${tag}`} className="rounded-full bg-[#F2F4F6] px-2.5 py-1 text-xs font-medium text-[#55606D]">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-4 text-xs font-medium text-[#6B7684] md:pt-1">
            <span className="inline-flex items-center gap-1">
              <PenSquare className="h-3.5 w-3.5" />
              {item.author}
            </span>
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              {item.views.toLocaleString()}
            </span>
            <span className="inline-flex items-center gap-1">
              <MessageCircle className="h-3.5 w-3.5" />
              {item.comments}
            </span>
          </div>
        </div>
      </Link>
    </li>
  )
}

export function CommunityInsightsPage() {
  return (
    <>
      <PageHeader
        label="전문가 칼럼/인터뷰"
        title="전문가 인사이트 리스트"
        description="아이의 성장과 부모 코칭에 도움이 되는 칼럼과 인터뷰를 모았습니다."
      />

      <div className="relative overflow-hidden bg-white pb-20 text-gray-900 selection:bg-blue-100 selection:text-blue-900">
        <section className="relative mx-auto max-w-5xl px-4 pb-12 pt-12 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="mb-3 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              이달의 인사이트
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">현장에서 바로 쓰는 양육 · 코칭 인사이트</h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
              부모님이 실제로 궁금해하는 질문을 중심으로, 칼럼과 인터뷰를 보기 쉽게 정리했습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
            {HIGHLIGHT_ITEMS.map((item) => (
              <InsightHighlightCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="relative mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[28px] border border-gray-100/70 bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] sm:p-5">
            <div className="mb-2 flex flex-wrap items-center gap-2 border-b border-[#EEF2F6] px-2 pb-4 pt-2">
              <span className="inline-flex items-center rounded-full bg-[#E8F0FE] px-3 py-1.5 text-xs font-semibold text-[#1A73E8]">
                전체 글 6건
              </span>
              <span className="inline-flex items-center rounded-full bg-[#F2F4F6] px-3 py-1.5 text-xs font-medium text-[#4E5968]">전문가 칼럼</span>
              <span className="inline-flex items-center rounded-full bg-[#F2F4F6] px-3 py-1.5 text-xs font-medium text-[#4E5968]">인터뷰</span>
              <span className="inline-flex items-center rounded-full bg-[#F2F4F6] px-3 py-1.5 text-xs font-medium text-[#4E5968]">부모 코칭</span>
            </div>

            <ul className="divide-y divide-[#EEF2F6]">
              {INSIGHT_BOARD_ITEMS.map((item) => (
                <InsightBoardRow key={item.id} item={item} />
              ))}
            </ul>
          </div>
        </section>

      </div>
    </>
  )
}
