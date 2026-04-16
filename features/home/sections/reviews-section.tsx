"use client"

import { useEffect, useRef, useState } from "react"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { cn } from "@/shared/lib/utils"
import {
  landingLayoutTokens,
  landingRadiusTokens,
  landingSectionTokens,
  landingSpaceTokens,
  landingTypeTokens,
} from "@/features/home/styles/landing-tokens"

interface ReviewItem {
  key: string
  ageLabel: string
  name: string
  meta: string
  summary: string
  tone: {
    ageBadge: string
  }
}

const REVIEW_SUMMARY: ReviewItem[] = [
  {
    key: "elementary-lower-parent",
    ageLabel: "초등 저학년",
    name: "박OO 어머니",
    meta: "만 7세 자녀 · 비대면",
    summary:
      "3회 코칭만으로도 아이의 성향 파악이 잘 되었고, 비대면이었지만 충분한 소통이 가능했습니다.",
    tone: {
      ageBadge: "border border-[#3378F6] bg-[#EAF3FF] text-[#3378F6]",
    },
  },
  {
    key: "elementary-upper-student",
    ageLabel: "초등 고학년",
    name: "이OO 학생",
    meta: "만 11세 · 대면",
    summary:
      "진로 상담 선생님이 잘 이끌어주셨습니다. 한 번쯤 이런 경험을 하는 것도 중요하다고 생각해요.",
    tone: {
      ageBadge: "border border-[#12905D] bg-[#EAFBF2] text-[#12905D]",
    },
  },
  {
    key: "middle-parent",
    ageLabel: "중학생",
    name: "김OO 어머니",
    meta: "만 14세 자녀 · 대면",
    summary:
      "직장맘으로 자녀에 대해 많이 무심했던 것 같았는데, 이번 상담을 통해 많은 것을 듣고 자녀를 다시 한번 되돌아보는 시간이었습니다.",
    tone: {
      ageBadge: "border border-[#D9821B] bg-[#FFF5E7] text-[#D9821B]",
    },
  },
  {
    key: "high-student",
    ageLabel: "고등학생",
    name: "김OO 학생",
    meta: "만 18세 · 대면",
    summary:
      "부모님이 아는 나와 내가 생각하는 나의 차이를 알아가며, 미래의 나를 그릴 때 도움을 잘 조율해볼 수 있었습니다.",
    tone: {
      ageBadge: "border border-[#D0527E] bg-[#FFF0F4] text-[#D0527E]",
    },
  },
]

function ReviewCard({
  item,
  cardId,
  index,
  animate,
  mobileMinHeight,
  cardRef,
  enableEntranceAnimation = true,
}: {
  item: ReviewItem
  cardId: string
  index: number
  animate: boolean
  mobileMinHeight?: number | null
  cardRef?: (node: HTMLElement | null) => void
  enableEntranceAnimation?: boolean
}) {
  const shouldAnimateEntrance = enableEntranceAnimation ? animate : true

  return (
    <article
      ref={cardRef}
      data-review-card={cardId}
      className={cn(
        "h-full transform-gpu bg-[#FFF7EF] shadow-[0_1px_0_rgba(57,40,28,0.05)] transition-[transform,box-shadow,opacity] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform md:hover:-translate-y-1.5 md:hover:shadow-[0_16px_30px_rgba(95,67,43,0.16)]",
        landingRadiusTokens.cardLg,
        landingSpaceTokens.cardPaddingLarge
      )}
      style={{
        opacity: shouldAnimateEntrance ? 1 : 0,
        transform: shouldAnimateEntrance ? "translateY(0)" : "translateY(28px)",
        transitionDuration: enableEntranceAnimation ? "620ms" : "0ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: enableEntranceAnimation && animate ? `${index * 110}ms` : "0ms",
        height: mobileMinHeight ? `${mobileMinHeight}px` : undefined,
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "inline-flex w-fit px-3 py-1 text-xs font-bold",
            item.tone.ageBadge,
            landingRadiusTokens.pill
          )}
        >
          {item.ageLabel}
        </span>
        <p
          className="text-[18px] leading-none tracking-[2px] text-[#ffb21f]"
          style={
            enableEntranceAnimation && animate
              ? {
                  animation: `review-star-twinkle 820ms ease ${240 + index * 110}ms 1 both`,
                }
              : undefined
          }
          aria-label="별점 5점"
        >
          ★★★★★
        </p>
      </div>

      <h3 className={cn("mt-4 text-[#1E1611]", landingTypeTokens.serviceCardTitle)}>{item.name}</h3>
      <p className={cn("mt-1 text-[#887361]", landingTypeTokens.bodySm)}>{item.meta}</p>

      <p className={cn("mt-[var(--landing-space-grid-md)] text-[#3A2F27]", landingTypeTokens.body)}>
        {item.summary}
      </p>

    </article>
  )
}

export function ReviewsSection() {
  const reviewCardRefs = useRef<Record<string, HTMLElement | null>>({})
  const observerRef = useRef<IntersectionObserver | null>(null)
  const reduceMotionRef = useRef(false)
  const mobileCardRefs = useRef<Record<string, HTMLElement | null>>({})
  const [visibleCards, setVisibleCards] = useState<Record<string, boolean>>({})
  const [mobileCardMinHeight, setMobileCardMinHeight] = useState<number | null>(null)
  const mobileLoopItems = Array.from(
    { length: REVIEW_SUMMARY.length * 3 },
    (_, index) => REVIEW_SUMMARY[index % REVIEW_SUMMARY.length]
  )

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    reduceMotionRef.current = reduceMotionQuery.matches

    if (reduceMotionRef.current) {
      setVisibleCards((prev) => {
        const next = { ...prev }
        Object.keys(reviewCardRefs.current).forEach((cardId) => {
          next[cardId] = true
        })
        return next
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const cardId = entry.target.getAttribute("data-review-card")
          if (!cardId) return

          setVisibleCards((prev) => {
            if (prev[cardId]) return prev
            return { ...prev, [cardId]: true }
          })

          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.45 }
    )

    observerRef.current = observer
    Object.values(reviewCardRefs.current).forEach((card) => {
      if (card) {
        observer.observe(card)
      }
    })

    return () => {
      observer.disconnect()
      observerRef.current = null
    }
  }, [])

  const setReviewCardRef = (cardId: string, node: HTMLElement | null) => {
    const previousNode = reviewCardRefs.current[cardId]
    if (previousNode && observerRef.current) {
      observerRef.current.unobserve(previousNode)
    }

    if (!node) {
      delete reviewCardRefs.current[cardId]
      return
    }

    reviewCardRefs.current[cardId] = node

    if (reduceMotionRef.current) {
      setVisibleCards((prev) => (prev[cardId] ? prev : { ...prev, [cardId]: true }))
      return
    }

    if (observerRef.current) {
      observerRef.current.observe(node)
    }
  }

  useEffect(() => {
    let rafId = 0

    const measureMobileCardHeight = () => {
      if (window.innerWidth >= 1024) {
        setMobileCardMinHeight(null)
        return
      }

      const cards = Object.values(mobileCardRefs.current).filter((card): card is HTMLElement => Boolean(card))
      if (!cards.length) return

      cards.forEach((card) => {
        card.style.minHeight = "0px"
      })

      const maxHeight = Math.ceil(Math.max(...cards.map((card) => card.getBoundingClientRect().height)))
      setMobileCardMinHeight((prev) => (prev === maxHeight ? prev : maxHeight))
    }

    const scheduleMeasure = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }

      rafId = window.requestAnimationFrame(() => {
        measureMobileCardHeight()
      })
    }

    scheduleMeasure()
    window.addEventListener("resize", scheduleMeasure)

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
      window.removeEventListener("resize", scheduleMeasure)
    }
  }, [])

  return (
    <section id="reviews" className={cn("bg-[#ffff]", landingSectionTokens.base)}>
      <div className={landingLayoutTokens.containerWide}>
        <div className={cn("text-center", landingLayoutTokens.sectionHeaderGap)}>
          <span className={cn("mb-4 inline-flex", landingTypeTokens.eyebrow)}>부모님 · 학생 후기</span>
          <h2 className={landingTypeTokens.reviewTitle}>
            <span className="text-[#FF7A33]">직접</span> 들어보세요
          </h2>
          <p className={cn("mx-auto mt-5 max-w-2xl text-[#3A2F27]", landingTypeTokens.sectionSubtitle)}>
            초등학교부터 고등학교까지,
            <br />
            상담/코칭을 경험한 부모님과 학생들의 이야기입니다.
          </p>
        </div>

        <div className="lg:hidden">
          <Swiper
            className="reviews-swiper-motion"
            modules={[Autoplay]}
            loop
            loopAddBlankSlides
            loopAdditionalSlides={mobileLoopItems.length}
            watchOverflow={false}
            slidesPerGroup={1}
            slidesPerView={1.08}
            spaceBetween={14}
            breakpoints={{
              640: {
                slidesPerView: 1.3,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2.2,
                spaceBetween: 18,
              },
            }}
            speed={520}
            resistanceRatio={0.82}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
          >
            {mobileLoopItems.map((item, index) => {
              const mobileItemKey = `${item.key}-${index}`

              return (
              <SwiperSlide
                key={mobileItemKey}
                style={mobileCardMinHeight ? { height: `${mobileCardMinHeight}px` } : undefined}
              >
                <ReviewCard
                  item={item}
                  cardId={`mobile-${mobileItemKey}`}
                  index={index}
                  animate={true}
                  enableEntranceAnimation={false}
                  mobileMinHeight={mobileCardMinHeight}
                  cardRef={(node) => {
                    mobileCardRefs.current[mobileItemKey] = node
                  }}
                />
              </SwiperSlide>
              )
            })}
          </Swiper>
        </div>

        <div className="hidden gap-5 lg:grid lg:grid-cols-4">
          {REVIEW_SUMMARY.map((item, index) => (
            <ReviewCard
              key={`${item.key}-desktop`}
              item={item}
              cardId={`desktop-${item.key}`}
              index={index}
              animate={Boolean(visibleCards[`desktop-${item.key}`])}
              cardRef={(node) => setReviewCardRef(`desktop-${item.key}`, node)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
