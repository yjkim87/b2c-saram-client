"use client"

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
  category: string
  guardian: string
  child: string
  leadPrefix: string
  emphasis: string
  leadSuffix: string
  tail: string
}

const REVIEW_SUMMARY: ReviewItem[] = [
  {
    category: "사회성 발달 코칭",
    guardian: "김OO 어머니",
    child: "7세 자녀",
    leadPrefix: "7살 아이가 친구 사귀기를 너무 어려워했는데, 6개월 코칭 후 반에서 ",
    emphasis: "리더 역할",
    leadSuffix: "을 하게 되었어요.",
    tail: "아이가 스스로 달라졌다는 게 느껴집니다.",
  },
  {
    category: "정서 안정 상담",
    guardian: "박OO 보호자",
    child: "9세 자녀",
    leadPrefix: "감정 기복이 큰 편이었지만 4개월 상담 이후 학교에서 ",
    emphasis: "자기표현",
    leadSuffix: "을 차분히 하게 되었어요.",
    tail: "집에서도 대화가 부드러워지고 갈등이 줄었습니다.",
  },
  {
    category: "학습 태도 코칭",
    guardian: "최OO 아버지",
    child: "12세 자녀",
    leadPrefix: "목표를 세우고 실천하는 습관이 생기면서 스스로 ",
    emphasis: "시간 관리",
    leadSuffix: "를 하기 시작했어요.",
    tail: "성적보다 아이의 자신감이 먼저 올라온 점이 가장 만족스럽습니다.",
  },
]

function ReviewCard({ item }: { item: ReviewItem }) {
  return (
    <article
      className={cn(
        "h-full bg-[#FFFFFF]",
        landingRadiusTokens.cardLg,
        landingSpaceTokens.cardPaddingLarge
      )}
    >
      <span
        className={cn(
          "inline-flex w-fit bg-[#E5E5E5] text-[#777777]",
          landingRadiusTokens.pill,
          landingSpaceTokens.notePadding,
          landingTypeTokens.noteText
        )}
      >
        {item.category}
      </span>

      <p className={cn("mt-[var(--landing-space-grid-sm)] flex flex-wrap items-center gap-[var(--landing-space-chip-y)] text-[#0C0C0C]") }>
        <strong className={landingTypeTokens.serviceCardTitle}>{item.guardian}</strong>
        <span className={cn("text-[#9CA3AF]", landingTypeTokens.stepDescription)}>|</span>
        <strong className={cn("text-[#3391FF]", landingTypeTokens.stepDescription)}>{item.child}</strong>
      </p>

      <p className={cn("mt-[var(--landing-space-grid-md)] text-[#1F2937]", landingTypeTokens.body)}>
        {item.leadPrefix}
        <strong className="font-bold text-[#0C0C0C]">{item.emphasis}</strong>
        {item.leadSuffix}
        <br />
        {item.tail}
      </p>
    </article>
  )
}

export function ReviewsSection() {
  return (
    <section id="reviews" className={cn("bg-[#F4FAFF]", landingSectionTokens.base)}>
      <div className={landingLayoutTokens.containerWide}>
        <div className={cn("text-center", landingLayoutTokens.sectionHeaderGap)}>
          <span className={cn("mb-4 inline-flex", landingTypeTokens.eyebrow)}>부모님 후기</span>
          <h2 className={landingTypeTokens.reviewTitle}>실제 변화를 경험하셨습니다</h2>
          <p className={cn("mx-auto mt-5 max-w-2xl text-[#111827]", landingTypeTokens.body)}>
            심리 진단에서 사후 관리까지,
            <br />
            전 과정을 책임지는 전문 상담 시스템
          </p>
        </div>

        <div className="md:hidden">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1.08}
            spaceBetween={14}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
          >
            {REVIEW_SUMMARY.map((item) => (
              <SwiperSlide key={`${item.guardian}-${item.child}`}>
                <ReviewCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="hidden gap-5 md:grid md:grid-cols-3">
          {REVIEW_SUMMARY.map((item) => (
            <ReviewCard key={`${item.guardian}-${item.child}-desktop`} item={item} />
          ))}
        </div>

      </div>
    </section>
  )
}
