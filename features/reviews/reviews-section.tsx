"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, Quote } from "lucide-react"

type SectionVariant = "preview" | "full"

interface ReviewsSectionProps {
  variant?: SectionVariant
}

interface ReviewItem {
  initial: string
  name: string
  role: string
  text: string
  accent: string
}

const PREVIEW_REVIEWS: ReviewItem[] = [
  {
    initial: "김",
    name: "김○○ 어머니",
    role: "7세 자녀 · 사회성 발달 코칭",
    text: "7살 아이가 친구 사귀기를 너무 어려워했는데, 6개월 코칭 후 반에서 리더 역할을 하게 되었어요. 아이가 스스로 달라졌다는 게 느껴집니다.",
    accent: "oklch(0.48 0.09 165)",
  },
  {
    initial: "박",
    name: "박○○ 아버지",
    role: "14세 자녀 · 청소년 정체성 코칭",
    text: "중2 아들이 무기력하고 학교를 가기 싫어했어요. 코치님이 아이의 이야기를 진심으로 들어주시면서 아이가 다시 활기를 찾았습니다.",
    accent: "oklch(0.62 0.09 45)",
  },
  {
    initial: "이",
    name: "이○○ 어머니",
    role: "3세 자녀 · 언어발달 코칭",
    text: "3살 아이 언어 발달이 느리다는 걱정이 있었는데, 영아 발달 전문가가 부모 코칭도 함께 해주셔서 가정에서도 도움을 줄 수 있었어요.",
    accent: "oklch(0.52 0.08 290)",
  },
]

const FULL_REVIEWS: ReviewItem[] = [
  ...PREVIEW_REVIEWS,
  {
    initial: "최",
    name: "최○○ 어머니",
    role: "초등 4학년 · 학습 습관 코칭",
    text: "매번 공부 시작을 힘들어하던 아이가 스스로 계획을 세우고 실천하게 됐어요. 부모로서 잔소리가 줄어든 점도 큰 변화였습니다.",
    accent: "oklch(0.55 0.1 220)",
  },
  {
    initial: "정",
    name: "정○○ 아버지",
    role: "초등 1학년 · 정서 안정 코칭",
    text: "아이가 사소한 일에도 불안해했는데, 코칭 이후 감정을 표현하는 방법을 배우면서 가족 대화 분위기까지 편안해졌습니다.",
    accent: "oklch(0.58 0.09 20)",
  },
  {
    initial: "한",
    name: "한○○ 어머니",
    role: "유아 · 부모 양육 코칭",
    text: "아이를 어떻게 도와야 할지 막막했는데 부모 코칭을 함께 받으니 방향이 생겼어요. 집에서 실천 가능한 방법들이 특히 좋았습니다.",
    accent: "oklch(0.5 0.1 320)",
  },
]

function useFadeInUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.opacity = "0"
    el.style.transform = "translateY(24px)"

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return ref
}

function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <article className="group flex h-full flex-col gap-4 rounded-2xl border border-[#E6DDD2] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Quote className="h-6 w-6 shrink-0 opacity-30" style={{ color: review.accent }} />
      <p className="flex-1 text-sm leading-relaxed text-slate-700">{review.text}</p>

      <div className="flex items-center gap-3 border-t border-[#ECE3D7] pt-4">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
          style={{ backgroundColor: review.accent.replace(")", " / 0.15)"), color: review.accent }}
        >
          {review.initial}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{review.name}</p>
          <p className="text-xs text-slate-500">{review.role}</p>
        </div>
      </div>
    </article>
  )
}

function MobileReviewCarousel({ items }: { items: ReviewItem[] }) {
  const [index, setIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onScroll = () => {
      const cardWidth = el.offsetWidth * 0.86 + 12
      const rawIndex = Math.round(el.scrollLeft / cardWidth)
      setIndex(Math.max(0, Math.min(items.length - 1, rawIndex)))
    }

    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [items.length])

  const scrollTo = (nextIndex: number) => {
    const el = scrollRef.current
    if (!el) return

    const cardWidth = el.offsetWidth * 0.86 + 12
    el.scrollTo({ left: nextIndex * cardWidth, behavior: "smooth" })
    setIndex(nextIndex)
  }

  const onTouchStart = (event: React.TouchEvent) => {
    startX.current = event.touches[0].clientX
  }

  const onTouchEnd = (event: React.TouchEvent) => {
    const delta = startX.current - event.changedTouches[0].clientX
    if (Math.abs(delta) <= 40) return

    if (delta > 0) {
      scrollTo(Math.min(items.length - 1, index + 1))
      return
    }

    scrollTo(Math.max(0, index - 1))
  }

  return (
    <div>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          paddingLeft: "2px",
          paddingRight: "14%",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {items.map((review) => (
          <div
            key={review.name}
            className="shrink-0"
            style={{ scrollSnapAlign: "start", width: "86%" }}
          >
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-1.5">
        {items.map((_, dotIndex) => (
          <button
            key={`review-dot-${dotIndex}`}
            type="button"
            onClick={() => scrollTo(dotIndex)}
            aria-label={`${dotIndex + 1}번째 후기`}
            className="rounded-full transition-all duration-200"
            style={{
              width: dotIndex === index ? "20px" : "7px",
              height: "7px",
              background: dotIndex === index ? "#0EA5A2" : "#D9D2C8",
            }}
          />
        ))}
      </div>
    </div>
  )
}

function ReviewsSectionPreview() {
  const headerRef = useFadeInUp(0)
  const listRef = useFadeInUp(140)

  return (
    <section id="reviews" className="bg-[#F8F4EE] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="mb-10 text-center">
          <span className="mb-3 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            부모님 후기
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">실제 변화를 경험하셨습니다</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
            아이와 부모가 함께 달라진 경험을 직접 확인해보세요.
          </p>
        </div>

        <div className="block md:hidden">
          <MobileReviewCarousel items={PREVIEW_REVIEWS} />
        </div>

        <div ref={listRef} className="hidden grid-cols-3 gap-6 md:grid">
          {PREVIEW_REVIEWS.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
          >
            후기 전체 보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function ReviewsSectionFull() {
  const headerRef = useFadeInUp(0)
  const listRef = useFadeInUp(140)

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="mb-10 text-center">
          <span className="mb-3 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            Parent Reviews
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">코칭 후 달라진 일상</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
            다양한 연령과 상황에서 실제로 경험한 변화 사례를 모았습니다.
          </p>
        </div>

        <div className="block md:hidden">
          <MobileReviewCarousel items={FULL_REVIEWS} />
        </div>

        <div ref={listRef} className="hidden grid-cols-3 gap-6 md:grid">
          {FULL_REVIEWS.map((review) => (
            <ReviewCard key={`${review.name}-${review.role}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function ReviewsSection({ variant = "full" }: ReviewsSectionProps) {
  if (variant === "preview") {
    return <ReviewsSectionPreview />
  }

  return <ReviewsSectionFull />
}
