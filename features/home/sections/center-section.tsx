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
    background: "linear-gradient(140deg, #dcecff 0%, #c2d8ff 100%)",
  },
  {
    key: "center-temp-2",
    label: "임시 센터 이미지 02",
    background: "linear-gradient(140deg, #e8f3ff 0%, #d3e8ff 100%)",
  },
  {
    key: "center-temp-3",
    label: "임시 센터 이미지 03",
    background: "linear-gradient(140deg, #d9e8ff 0%, #b8d3ff 100%)",
  },
  {
    key: "center-temp-4",
    label: "임시 센터 이미지 04",
    background: "linear-gradient(140deg, #e7f1ff 0%, #c9ddff 100%)",
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
          "inline-flex min-w-0 w-full items-center justify-center bg-[#53C67C] text-[#ffffff] transition-colors hover:bg-[#46b36e]",
          landingRadiusTokens.mapButton,
          landingSpaceTokens.mapButtonHeight,
          landingSpaceTokens.mapButtonPadding,
          landingTypeTokens.mapButton
        )}
      >
        네이버 지도
      </a>
      <a
        href={KAKAO_MAP_URL}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "inline-flex min-w-0 w-full items-center justify-center bg-[#E8E64A] text-[#181818] transition-colors hover:bg-[#dbd93f]",
          landingRadiusTokens.mapButton,
          landingSpaceTokens.mapButtonHeight,
          landingSpaceTokens.mapButtonPadding,
          landingTypeTokens.mapButton
        )}
      >
        카카오 맵
      </a>
    </div>
  )
}

export function CenterSection() {
  return (
    <section id="center" className={cn("relative overflow-hidden bg-white", landingSectionTokens.roomy)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[320px] overflow-hidden md:hidden">
        <div
          className="absolute"
          style={{
            width: 931,
            height: 684,
            left: -650,
            top: -400,
            background: "radial-gradient(50% 50%, rgb(188, 219, 255) 0%, rgba(255, 255, 255, 0) 100%)",
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
          background: "radial-gradient(50% 50% at 50% 50%, #BCDBFF 0%, rgba(255, 255, 255, 0) 100%)",
        }}
      />

      <div className={cn("relative z-10 text-center", landingLayoutTokens.containerNarrow)}>
        <span className={cn("mb-4 inline-flex", landingTypeTokens.eyebrow)}>CENTER GUIDE</span>

        <h2 className={landingTypeTokens.sectionTitle}>
          <span className="text-[#3391FF]">사</span>람의 <span className="text-[#3391FF]">발</span>견을 원하
          <span className="text-[#3391FF]">면</span>
        </h2>

        <p className={cn("mx-auto mt-6 max-w-2xl text-[#111827]", landingTypeTokens.bodyRelaxed)}>
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
                    <span className={cn("relative z-10 text-[#1f2f4f]", landingTypeTokens.stepDescription)}>
                      {image.label}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="w-full min-w-0 text-left text-[#111827]">
            <div className="space-y-[var(--landing-space-grid-sm)] md:hidden">
              <div className="space-y-[var(--landing-space-chip-y)]">
                <p className={cn(landingTypeTokens.stepDescription, "text-[#0C0C0C] font-bold")}>운영시간</p>
                <p className={landingTypeTokens.stepDescription}>평일 09:00 ~ 20:00, 주말 09:00 ~ 17:00</p>
                <p
                  className={cn(
                    "inline-block w-fit bg-[#ECECEC] text-[#111827]",
                    landingTypeTokens.noteText,
                    landingRadiusTokens.note,
                    landingSpaceTokens.notePadding
                  )}
                >
                  * 일요일은 휴무이며, 사전 예약제 운영됩니다.
                </p>
              </div>

              <div className="h-px bg-[#DDE3EC]" />

              <div className="space-y-[var(--landing-space-chip-y)]">
                <p className={cn(landingTypeTokens.stepDescription, "text-[#0C0C0C] font-bold")}>오시는 길</p>
                <p className={cn("break-words", landingTypeTokens.stepDescription)}>
                  부산시 해운대구 센텀동로 99, 백산센텀클래스원(1차) 406호
                </p>
                <p
                  className={cn(
                    "inline-block w-fit bg-[#D9EDFF] text-[#365B7C]",
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
                  "border border-[#E4E8EE] bg-white shadow-[0_6px_20px_rgba(15,23,42,0.06)]",
                  landingRadiusTokens.card,
                  landingSpaceTokens.cardPaddingResponsive
                )}
              >
                <p className={cn(landingTypeTokens.stepDescription, "text-[#0C0C0C] font-bold")}>오시는 길</p>
                <p className={cn("mt-[var(--landing-space-chip-y)] break-words", landingTypeTokens.stepDescription)}>
                  부산시 해운대구 센텀동로 99, 백산센텀클래스원(1차) 406호
                </p>
                <p
                  className={cn(
                    "mt-[var(--landing-space-chip-y)] inline-block w-fit bg-[#D9EDFF] text-[#365B7C]",
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
                  "border border-[#E4E8EE] bg-white shadow-[0_6px_20px_rgba(15,23,42,0.06)]",
                  landingRadiusTokens.card,
                  landingSpaceTokens.cardPaddingResponsive
                )}
              >
                <p className={cn(landingTypeTokens.stepDescription, "text-[#0C0C0C] font-bold")}>운영시간</p>
                <p className={cn("mt-[var(--landing-space-chip-y)]", landingTypeTokens.stepDescription)}>
                  평일 09:00 ~ 20:00, 주말 09:00 ~ 17:00
                </p>
                <p
                  className={cn(
                    "mt-[var(--landing-space-chip-y)] inline-block w-fit bg-[#ECECEC] text-[#111827]",
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
              "inline-flex min-w-[280px] items-center justify-center bg-[#05070d] text-white shadow-[0_14px_30px_rgba(5,7,13,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0f1119]",
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
