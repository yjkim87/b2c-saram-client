"use client"

import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { cn } from "@/shared/lib/utils"
import {
  landingLayoutTokens,
  landingRadiusTokens,
  landingSectionTokens,
  landingSpaceTokens,
  landingTypeTokens,
} from "@/features/home/styles/landing-tokens"

const CENTER_IMAGE_PLACEHOLDERS = [
  {
    key: "center-temp-1",
    label: "임시 센터 이미지 01",
    background: "linear-gradient(140deg, #F2DFCC 0%, #E8C8AE 100%)",
  },
  {
    key: "center-temp-2",
    label: "임시 센터 이미지 02",
    background: "linear-gradient(140deg, #F4E6D8 0%, #E9D1BA 100%)",
  },
  {
    key: "center-temp-3",
    label: "임시 센터 이미지 03",
    background: "linear-gradient(140deg, #EEDCCB 0%, #E2C1A5 100%)",
  },
  {
    key: "center-temp-4",
    label: "임시 센터 이미지 04",
    background: "linear-gradient(140deg, #F5E7DA 0%, #E7CCB4 100%)",
  },
] as const

const CENTER_ADDRESS_QUERY = "부산시 해운대구 센텀동로 99, 백산센텀클래스원(1차) 406호"
const NAVER_MAP_URL = `https://map.naver.com/p/search/${encodeURIComponent(CENTER_ADDRESS_QUERY)}`
const KAKAO_MAP_URL = `https://map.kakao.com/?q=${encodeURIComponent(CENTER_ADDRESS_QUERY)}`

function MapButtons({ className }: { className?: string }) {
  return (
    <div className={cn("grid min-w-0 grid-cols-2 gap-[var(--landing-space-grid-sm)]", className)}>
      <a
        href={NAVER_MAP_URL}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "inline-flex min-w-0 w-full items-center justify-center bg-[#F07C33] text-[#ffffff] transition-colors hover:bg-[#DA6727]",
          landingRadiusTokens.mapButton,
          landingSpaceTokens.mapButtonHeight,
          landingSpaceTokens.mapButtonPadding,
          landingTypeTokens.mapButton,
          "text-[16px] md:text-[16px]"
        )}
      >
        네이버 지도
      </a>
      <a
        href={KAKAO_MAP_URL}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "inline-flex min-w-0 w-full items-center justify-center bg-[#F7E3D1] text-[#6E4A32] transition-colors hover:bg-[#ECD4BD]",
          landingRadiusTokens.mapButton,
          landingSpaceTokens.mapButtonHeight,
          landingSpaceTokens.mapButtonPadding,
          landingTypeTokens.mapButton,
          "text-[16px] md:text-[16px]"
        )}
      >
        카카오맵
      </a>
    </div>
  )
}

export function CenterSection() {
  return (
    <section id="center" className={cn("relative overflow-hidden bg-[#FFFFFF]", landingSectionTokens.roomy)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[320px] overflow-hidden md:hidden">
        <div
          className="absolute"
          style={{
            width: 931,
            height: 684,
            left: -650,
            top: -400,
            background: "radial-gradient(50% 50%, rgb(249, 219, 191) 0%, rgba(255, 255, 255, 0) 100%)",
          }}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute hidden md:block"
        style={{
          width: 1420,
          height: 1240,
          left: -920,
          top: -470,
          background: "radial-gradient(50% 50% at 50% 50%, #F9DBBF 0%, rgba(255, 255, 255, 0) 100%)",
        }}
      />

      <div className={cn("relative z-10 text-center", landingLayoutTokens.containerNarrow)}>
        <span className={cn("mb-4 inline-flex", landingTypeTokens.eyebrow)}>CENTER GUIDE</span>

        <h2 className={landingTypeTokens.sectionTitle}>
          <span className="text-[#F07C33]">사</span>람의 <span className="text-[#F07C33]">발</span>견을 원하
          <span className="text-[#F07C33]">면</span>
        </h2>

        <p className={cn("mx-auto mt-6 max-w-2xl text-[#3A2F27]", landingTypeTokens.bodyRelaxed)}>
          사람의 발견을 지향하는 '사발면' 센터입니다.
        </p>

        <div className="mx-auto mt-8 grid w-full max-w-full min-w-0 gap-[var(--landing-space-grid-md)] md:mt-10 md:max-w-none md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:items-stretch">
          <div className="w-full min-w-0 md:h-full">
            <Swiper
              slidesPerView={1}
              spaceBetween={12}
              pagination={false}
              className={cn("overflow-hidden md:h-full [&_.swiper-pagination]:hidden", landingRadiusTokens.card)}
            >
              {CENTER_IMAGE_PLACEHOLDERS.map((image) => (
                <SwiperSlide key={image.key} className="!h-full">
                  <div
                    className={cn(
                      "relative flex h-[221px] w-full items-center justify-center overflow-hidden md:h-full",
                      landingRadiusTokens.card
                    )}
                    style={{ background: image.background }}
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(65% 65% at 20% 20%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)",
                      }}
                    />
                    <span className={cn("relative z-10 text-[#714D36]", landingTypeTokens.stepDescription)}>
                      {image.label}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="w-full min-w-0 text-left text-[#2E251E]">
            <div className="space-y-[var(--landing-space-grid-sm)] md:hidden">
              <div className="space-y-[var(--landing-space-chip-y)]">
                <p className={cn(landingTypeTokens.stepDescription, "text-[#1E1611] font-bold")}>운영시간</p>
                <p className={landingTypeTokens.stepDescription}>평일 09:00 ~ 20:00, 주말 09:00 ~ 17:00</p>
                <p
                  className={cn(
                    "inline-block w-fit bg-[#F1E4D8] text-[#5A4433]",
                    landingTypeTokens.noteText,
                    landingRadiusTokens.note,
                    landingSpaceTokens.notePadding
                  )}
                >
                  * 일요일은 휴무이며, 사전 예약제 운영됩니다.
                </p>
              </div>

              <div className="h-px bg-[#D8C8B8]" />

              <div className="space-y-[var(--landing-space-chip-y)]">
                <p className={cn(landingTypeTokens.stepDescription, "text-[#1E1611] font-bold")}>오시는 길</p>
                <p className={cn("break-words", landingTypeTokens.stepDescription)}>
                  부산시 해운대구 센텀동로 99, 백산센텀클래스원(1차) 406호
                </p>
                <p
                  className={cn(
                    "inline-block w-fit bg-[#F8E5D2] text-[#8A5A3C]",
                    landingTypeTokens.noteText,
                    landingRadiusTokens.note,
                    landingSpaceTokens.notePadding
                  )}
                >
                  동해선 센텀역 2번 출구 도보 10분
                </p>
                <MapButtons className="pt-[var(--landing-space-chip-y)]" />
              </div>
            </div>

            <div className="hidden space-y-[var(--landing-space-grid-sm)] md:block">
              <article
                className={cn(
                  "border border-[#DDCEBF] bg-[#F7F1EB] shadow-[0_6px_20px_rgba(91,64,44,0.08)]",
                  landingRadiusTokens.card,
                  landingSpaceTokens.cardPaddingResponsive
                )}
              >
                <p className={cn(landingTypeTokens.stepDescription, "text-[#1E1611] font-bold")}>오시는 길</p>
                <p className={cn("mt-[var(--landing-space-chip-y)] break-words", landingTypeTokens.stepDescription)}>
                  부산시 해운대구 센텀동로 99, 백산센텀클래스원(1차) 406호
                </p>
                <p
                  className={cn(
                    "mt-[var(--landing-space-chip-y)] inline-block w-fit bg-[#F8E5D2] text-[#8A5A3C]",
                    landingTypeTokens.noteText,
                    landingRadiusTokens.note,
                    landingSpaceTokens.notePadding
                  )}
                >
                  동해선 센텀역 2번 출구 도보 10분
                </p>

                <MapButtons className="mt-[var(--landing-space-grid-sm)]" />
              </article>

              <article
                className={cn(
                  "border border-[#DDCEBF] bg-[#F7F1EB] shadow-[0_6px_20px_rgba(91,64,44,0.08)]",
                  landingRadiusTokens.card,
                  landingSpaceTokens.cardPaddingResponsive
                )}
              >
                <p className={cn(landingTypeTokens.stepDescription, "text-[#1E1611] font-bold")}>운영시간</p>
                <p className={cn("mt-[var(--landing-space-chip-y)]", landingTypeTokens.stepDescription)}>
                  평일 09:00 ~ 20:00, 주말 09:00 ~ 17:00
                </p>
                <p
                  className={cn(
                    "mt-[var(--landing-space-chip-y)] inline-block w-fit bg-[#F1E4D8] text-[#5A4433]",
                    landingTypeTokens.noteText,
                    landingRadiusTokens.note,
                    landingSpaceTokens.notePadding
                  )}
                >
                  * 일요일은 휴무이며, 사전 예약제 운영됩니다.
                </p>
              </article>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <Link
            href="/center"
            className={cn(
              "inline-flex min-w-[280px] items-center justify-center bg-[#25170F] text-white shadow-[0_14px_30px_rgba(37,23,15,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1B110B]",
              landingRadiusTokens.pill,
              landingSpaceTokens.buttonPaddingLg,
              landingTypeTokens.buttonLg
            )}
          >
            센터 안내 자세히 보기
          </Link>
        </div>
      </div>
    </section>
  )
}
