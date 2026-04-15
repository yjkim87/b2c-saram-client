"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/shared/ui/input"
import {
  EXPERT_FALLBACK_IMAGE,
  experts,
  getExpertCardMeta,
  getLandingExpertItems,
  type ExpertBadge,
  type ExpertProfile,
} from "@/features/experts/lib/experts"

type SectionVariant = "preview" | "full"

interface ExpertsSectionProps {
  variant?: SectionVariant
}

type ExpertCardItem = {
  id: string
  slug: string
  name: string
  specialty: string
  intro: string
  searchTags: string[]
  visibleTags: string[]
  extraTagCount: number
  avatar: string
  badge?: ExpertBadge
}

const landingExperts = getLandingExpertItems(3)

function clampSingleLine(text: string, max = 30) {
  const normalized = text.trim().replace(/\s+/g, " ")
  if (normalized.length <= max) {
    return normalized
  }

  return `${normalized.slice(0, max)}…`
}

function toCardItem(expert: ExpertProfile): ExpertCardItem {
  const meta = getExpertCardMeta(expert.id)

  return {
    id: expert.id,
    slug: expert.slug,
    name: expert.name,
    specialty: expert.specialty,
    intro: clampSingleLine(expert.shortIntro),
    searchTags: expert.tags,
    visibleTags: expert.tags.slice(0, 2).map((tag) => `#${tag}`),
    extraTagCount: Math.max(expert.tags.length - 2, 0),
    avatar: meta.avatar,
    badge: meta.badge,
  }
}

function ExpertsSectionPreview() {
  return (
    <section className="overflow-hidden bg-[#EEF2F6] py-16 font-sans selection:bg-blue-100 selection:text-blue-900 md:px-12 md:py-12">
      <div className="relative z-10 mx-auto w-full max-w-6xl py-8 md:py-12">
        <div className="mb-10 text-center md:mb-16">
          <div className="mb-4 inline-flex items-center space-x-2 rounded-full border border-slate-200/60 bg-white px-3 py-1.5 shadow-sm md:mb-6 md:px-4 md:py-2">
            <span className="text-xs md:text-sm">🎖️</span>
            <span className="text-xs font-bold tracking-wide text-slate-700 md:text-sm">전문가 소개</span>
          </div>

          <h2 className="mobile-auto-phrase mb-4 px-2 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl md:mb-2 md:text-5xl">
            우리 아이와 나를 위한 완벽한 매칭
          </h2>

          <p className="mx-auto max-w-2xl px-4 text-base font-medium leading-relaxed text-slate-500 md:text-lg">
            검증된 전문가 프로필 일부를 먼저 만나보세요.
          </p>
        </div>

        <div className="mb-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-8 pl-4 pr-4 scroll-pl-4 scroll-pr-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:p-0 md:pb-0 md:[-ms-overflow-style:auto] md:[scrollbar-width:auto]">
          {landingExperts.map((expert) => (
            <Link
              key={expert.id}
              href={`/experts/${expert.slug}?from=landing`}
              className="group h-full basis-[calc(100%-3.5rem)] shrink-0 snap-start cursor-pointer sm:basis-[320px] md:basis-auto md:min-w-0 md:shrink"
            >
              <article className="flex h-full flex-col rounded-[1.5rem] border border-slate-200/60 bg-white p-4 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-blue-200/80 hover:shadow-[0_15px_35px_-10px_rgba(37,99,235,0.15)] active:scale-[0.98] md:rounded-[2rem] md:active:scale-100">
                <div className="relative mb-5 aspect-[4/3] w-full overflow-hidden rounded-[1rem] bg-slate-100 md:mb-6 md:rounded-[1.5rem]">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    onError={(event) => {
                      const image = event.currentTarget
                      image.onerror = null
                      image.src = EXPERT_FALLBACK_IMAGE
                    }}
                  />

                  <div className="absolute left-3 top-3 flex items-center space-x-1.5 rounded-2xl bg-white/95 px-2.5 py-1.5 shadow-sm backdrop-blur-md md:px-3 md:py-1.5">
                    <span className="text-xs leading-none md:text-sm">{expert.emoji}</span>
                    <span className="text-[13px] font-bold text-slate-800 md:text-[13px]">{expert.category}</span>
                  </div>
                </div>

                <div className="flex flex-grow flex-col px-1 md:px-3">
                  <div className="mb-3 md:mb-4">
                    <p className="mb-1.5 text-[13px] font-bold text-blue-600 md:text-[13px]">{expert.credentials}</p>

                    <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1.5">
                      <h3 className="whitespace-nowrap text-xl font-extrabold text-slate-900 md:text-2xl">{expert.name}</h3>

                      <span
                        className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-md border border-slate-200/70 bg-slate-50 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-tight text-slate-600 shadow-sm md:text-[10px]"
                        title="Assesta 공식 검증 완료"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="shrink-0 text-blue-500 md:h-[14px] md:w-[14px]"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 11.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="mt-[1px]">Assesta Certified</span>
                      </span>
                    </div>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {expert.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className={`rounded-md px-2 py-1 text-[10px] font-bold md:text-[13px] ${expert.themeBg} ${expert.themeColor}`}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>

                  <p className="mb-6 h-[4.5rem] overflow-hidden text-base leading-relaxed text-slate-500 md:mb-8 md:h-auto md:flex-grow md:text-[15px]">
                    {expert.description}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-slate-100/80 px-1 pb-1 pt-4 transition-colors duration-300 group-hover:border-blue-100 md:px-3 md:pb-2 md:pt-5">
                  <span className="text-[14px] font-bold text-slate-600 transition-colors duration-300 group-hover:text-blue-600 md:text-[15px]">
                    프로필 자세히 보기
                  </span>

                  <span className="rounded-full bg-slate-50 p-2 text-slate-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-blue-50 group-hover:text-blue-600 md:p-2.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="md:h-[18px] md:w-[18px]"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="flex justify-center md:mt-4">
          <Link
            href="/experts"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-300/70 bg-white px-6 py-3 text-base font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-[0_12px_28px_-14px_rgba(37,99,235,0.5)] active:translate-y-0 md:text-lg"
          >
            <span>더 많은 전문가 찾아보기</span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-base leading-none text-slate-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-blue-100 group-hover:text-blue-600 md:h-8 md:w-8 md:text-lg">
              ✨
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

function ExpertsSectionFull() {
  const [query, setQuery] = useState("")

  const filteredExperts = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    const cardItems = experts.map(toCardItem)

    if (!keyword) {
      return cardItems
    }

    return cardItems.filter((expert) => {
      return (
        expert.name.toLowerCase().includes(keyword) ||
        expert.specialty.toLowerCase().includes(keyword) ||
        expert.searchTags.some((tag) => tag.toLowerCase().includes(keyword))
      )
    })
  }, [query])

  return (
    <section className="min-h-screen bg-[#fffcfc] py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <div className="max-w-md">
          <label htmlFor="expert-search" className="text-sm font-medium text-slate-700">
            검색
          </label>
          <div className="relative mt-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="expert-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="예) 김명준 박사, 아동 발달"
              className="h-11 border-slate-300 bg-white pl-9 text-slate-700 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {filteredExperts.map((expert) => (
            <article
              key={expert.id}
              className="flex h-full flex-col rounded-[1rem] border border-slate-200/70 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={expert.avatar}
                    alt={expert.name}
                    className="h-12 w-12 shrink-0 rounded-full object-cover"
                    onError={(event) => {
                      const image = event.currentTarget
                      image.onerror = null
                      image.src = EXPERT_FALLBACK_IMAGE
                    }}
                  />

                  <div className="min-w-0">
                    <h2 className="truncate text-[15px] font-bold text-slate-900 md:text-base">{expert.name}</h2>
                  </div>
                </div>

                {expert.badge && (
                  <span className="shrink-0 rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-700">
                    {expert.badge}
                  </span>
                )}
              </div>

              <p className="mt-4 truncate text-sm text-slate-700" title={expert.intro}>
                {expert.intro}
              </p>

              <div className="mt-4 flex min-h-7 items-center gap-1.5">
                {expert.visibleTags.map((tag) => (
                  <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                    {tag}
                  </span>
                ))}

                {expert.extraTagCount > 0 && (
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500">
                    +{expert.extraTagCount}
                  </span>
                )}
              </div>

              <Link
                href={`/experts/${expert.slug}?from=experts`}
                className="mt-5 inline-flex w-full items-center justify-center rounded-lg border border-[#292828] bg-[#292828] px-3 py-2.5 text-sm font-semibold text-[#fff] transition-colors hover:bg-[#1f1f1f]"
              >
                프로필 보기
              </Link>
            </article>
          ))}
        </div>

        {filteredExperts.length === 0 && (
          <p className="mt-10 text-sm text-slate-500">검색 결과가 없습니다. 다른 이름 또는 분야로 다시 검색해 주세요.</p>
        )}
      </div>
    </section>
  )
}

export function ExpertsSection({ variant = "full" }: ExpertsSectionProps) {
  if (variant === "preview") {
    return <ExpertsSectionPreview />
  }

  return <ExpertsSectionFull />
}
