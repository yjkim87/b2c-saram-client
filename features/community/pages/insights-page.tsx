"use client"

import Link from "next/link"
import { useState } from "react"
import { CalendarDays, Eye, LayoutGrid, List, PenSquare } from "lucide-react"
import { PageHeader } from "@/components/common/page-header"
import { cn } from "@/shared/lib/utils"
import { InsightCoverImage } from "@/features/community/components/insight-cover-image"
import {
  INSIGHT_BOARD_ITEMS,
  INSIGHT_GRADE_BADGE_TONE,
  INSIGHT_GRADE_FILTERS,
  INSIGHT_HIGHLIGHT_ITEMS,
  type InsightBoardItem,
  type InsightGradeFilter,
  type InsightHighlightItem,
} from "@/features/community/data/insights"

type InsightViewMode = "list" | "gallery"

const getInsightImageAlt = (title: string) => `${title} 대표 이미지`

function InsightHighlightCard({ item }: { item: InsightHighlightItem }) {
  return (
    <Link href={`/community/insights/${item.id}`} className="block h-full">
      <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[32px] border border-gray-100/60 bg-[#EFEFEF] shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
        <div className="relative w-full overflow-hidden">
          <InsightCoverImage
            coverImage={item.coverImage}
            alt={getInsightImageAlt(item.title)}
            className="aspect-[16/4.5] w-full"
            imageClassName={cn(item.imagePositionClass, "transition-transform duration-500 group-hover:scale-105")}
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

          <div className="border-t border-[#D7DEE7]">
            <div className="mt-4 flex flex-wrap gap-2">
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
    </Link>
  )
}

function InsightBoardRow({ item }: { item: InsightBoardItem }) {
  return (
    <li>
      <Link href={`/community/insights/${item.id}`} className="group block rounded-2xl px-3 py-5 transition-colors duration-200 hover:bg-[#F7FAFF]">
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <div className="w-full shrink-0 md:w-56">
            <InsightCoverImage
              coverImage={item.coverImage}
              alt={getInsightImageAlt(item.title)}
              className="aspect-video w-full rounded-xl border border-[#EEF2F6]"
              imageClassName="transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", INSIGHT_GRADE_BADGE_TONE[item.grade])}>
                  {item.grade}
                </span>
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
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

function InsightBoardCard({ item }: { item: InsightBoardItem }) {
  return (
    <li>
      <Link
        href={`/community/insights/${item.id}`}
        className="group block h-full overflow-hidden rounded-2xl border border-[#EEF2F6] bg-white transition-colors duration-200 hover:bg-[#F7FAFF]"
      >
        <InsightCoverImage
          coverImage={item.coverImage}
          alt={getInsightImageAlt(item.title)}
          className="aspect-video w-full"
          imageClassName="transition-transform duration-500 group-hover:scale-105"
        />

        <div className="p-4">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", INSIGHT_GRADE_BADGE_TONE[item.grade])}>
                {item.grade}
              </span>
              <span className="rounded-full bg-[#EEF4FF] px-2.5 py-1 text-xs font-semibold text-[#1A73E8]">{item.category}</span>
            </div>

            <span className="inline-flex items-center gap-2 text-xs text-[#6B7684]">
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                {item.publishedAt}
              </span>
              <span className="inline-flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {item.views.toLocaleString()}
              </span>
            </span>
          </div>

          <h3 className="break-keep text-[17px] font-bold leading-snug text-[#191F28] transition-colors group-hover:text-blue-600">
            {item.title}
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={`${item.id}-${tag}`} className="rounded-full bg-[#F2F4F6] px-2.5 py-1 text-xs font-medium text-[#55606D]">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </li>
  )
}

export function CommunityInsightsPage() {
  const [viewMode, setViewMode] = useState<InsightViewMode>("gallery")
  const [gradeFilter, setGradeFilter] = useState<InsightGradeFilter>("전체")

  const filteredBoardItems =
    gradeFilter === "전체" ? INSIGHT_BOARD_ITEMS : INSIGHT_BOARD_ITEMS.filter((item) => item.grade === gradeFilter)

  return (
    <>
      <PageHeader
        label="양육 코칭 인사이트"
        title="아이를 더 잘 이해하고 싶은 부모님을 위한 이야기"
        description="발달 전문가가 전하는 양육과 코칭 이야기를 담았습니다."
      />

      <div className="relative overflow-hidden bg-white pb-20 text-gray-900 selection:bg-blue-100 selection:text-blue-900">
        <section className="relative mx-auto max-w-6xl px-4 pb-12 pt-12 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="mb-3 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              이달의 인사이트
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
            {INSIGHT_HIGHLIGHT_ITEMS.map((item) => (
              <InsightHighlightCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[28px] border border-gray-100/70 bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] sm:p-5">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3 border-b border-[#EEF2F6] px-2 pb-4 pt-2">
              <div className="flex flex-wrap items-center gap-2">
                {INSIGHT_GRADE_FILTERS.map((grade) => (
                  <button
                    key={grade}
                    type="button"
                    onClick={() => setGradeFilter(grade)}
                    className={cn(
                      "inline-flex h-9 items-center rounded-full border px-4 text-sm font-semibold transition-colors",
                      gradeFilter === grade
                        ? "border-[#05070D] bg-[#05070D] text-white"
                        : "border-[#D7DEE7] bg-white text-[#5B6674] hover:border-[#C7D1DE] hover:bg-[#F8FAFC]"
                    )}
                    aria-pressed={gradeFilter === grade}
                  >
                    {grade}
                  </button>
                ))}
              </div>

              <div className="relative inline-flex items-center rounded-full bg-white p-1">
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute left-1 top-1 h-8 w-8 rounded-full bg-[#E8F0FE] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    viewMode === "gallery" ? "translate-x-0" : "translate-x-8"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setViewMode("gallery")}
                  className={cn(
                    "relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                    viewMode === "gallery" ? "text-[#1A73E8]" : "text-[#6B7684] hover:text-[#4E5968]"
                  )}
                  aria-label="갤러리형 보기"
                  aria-pressed={viewMode === "gallery"}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                    viewMode === "list" ? "text-[#1A73E8]" : "text-[#6B7684] hover:text-[#4E5968]"
                  )}
                  aria-label="리스트형 보기"
                  aria-pressed={viewMode === "list"}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {viewMode === "list" ? (
              <ul className="divide-y divide-[#EEF2F6]">
                {filteredBoardItems.map((item) => (
                  <InsightBoardRow key={item.id} item={item} />
                ))}
              </ul>
            ) : (
              <ul className="grid grid-cols-1 gap-3 p-2 md:grid-cols-3">
                {filteredBoardItems.map((item) => (
                  <InsightBoardCard key={`gallery-${item.id}`} item={item} />
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
