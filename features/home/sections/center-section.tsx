"use client"

import { cn } from "@/shared/lib/utils"
import {
  landingLayoutTokens,
  landingRadiusTokens,
  landingSectionTokens,
  landingSpaceTokens,
  landingTypeTokens,
} from "@/features/home/styles/landing-tokens"

const CENTER_MAP_IMAGE_URL = "https://img.assesta.com/saram-me/center_map.png"
const CENTER_GALLERY_IMAGES = ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"]

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
          "inline-flex min-w-0 w-full items-center justify-center bg-[#03C75A] text-[#ffffff] transition-colors hover:bg-[#02B351]",
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
          "inline-flex min-w-0 w-full items-center justify-center bg-[#FEE500] text-[#191919] transition-colors hover:bg-[#F2D900]",
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

function OperatingHoursGrid({ className }: { className?: string }) {
  return (
    <div className={cn("mt-[var(--landing-space-chip-y)] grid grid-cols-2 gap-x-6 gap-y-1", landingTypeTokens.stepDescription, className)}>
      <p>· 월~수 : 10 ~19시</p>
      <p>· 목~토: 10시~21시</p>
      <p>· 화 : 휴무</p>
      <p>· 일: 10시~18시</p>
    </div>
  )
}

export function CenterSection() {
  return (
    <section id="center" className={cn("relative overflow-hidden bg-[#FFF7EF]", landingSectionTokens.roomy)}>
      <div className={cn("relative z-10 text-center", landingLayoutTokens.containerNarrow)}>
        <span className={cn("mb-4 inline-flex", landingTypeTokens.eyebrow)}>CENTER GUIDE</span>

        <h2 className={landingTypeTokens.sectionTitle}>
          <span className="text-[#F07C33]">사</span>람의 <span className="text-[#F07C33]">발</span>견을 원하
          <span className="text-[#F07C33]">면</span>
        </h2>

        <p className={cn("mx-auto mt-6 max-w-2xl text-[#3A2F27]", landingTypeTokens.sectionSubtitleRelaxed)}>
          사람의 발견을 지향하는 '사발면' 센터입니다.
        </p>

        <div className="mx-auto mt-8 grid w-full max-w-full min-w-0 gap-[var(--landing-space-grid-md)] md:mt-10 md:max-w-none md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-stretch">
          <div className="w-full min-w-0 md:h-full">
            <a
              href={NAVER_MAP_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="네이버 지도 위치 열기"
              className={cn("group relative block h-[221px] w-full overflow-hidden bg-white md:h-full", landingRadiusTokens.card)}
            >
              <img
                src={CENTER_MAP_IMAGE_URL}
                alt="사발면 센터 지도 이미지"
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.01]"
                loading="lazy"
              />
            </a>
          </div>

          <div className="w-full min-w-0 text-left text-[#2E251E]">
            <div className="space-y-[var(--landing-space-grid-sm)] md:hidden">
              <div className="space-y-[var(--landing-space-chip-y)]">
                <p className={cn(landingTypeTokens.stepDescription, "text-[#1E1611] font-bold")}>운영시간</p>
                <OperatingHoursGrid />
                <p className={cn("mt-[var(--landing-space-grid-sm)]", landingTypeTokens.stepDescription)}>
                  <span className="font-bold">전화상담</span> 051-928-0944
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
                  "bg-[#FFF] shadow-[0_6px_20px_rgba(91,64,44,0.08)]",
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
                  "bg-[#FFF] shadow-[0_6px_20px_rgba(91,64,44,0.08)]",
                  landingRadiusTokens.card,
                  landingSpaceTokens.cardPaddingResponsive
                )}
              >
                <p className={cn(landingTypeTokens.stepDescription, "text-[#1E1611] font-bold")}>운영시간</p>
                <OperatingHoursGrid />
                <p className={cn("mt-[var(--landing-space-grid-sm)]", landingTypeTokens.stepDescription)}>
                  <span className="font-bold">전화상담</span> 051-928-0944
                </p>
              </article>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-8">
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4 md:gap-4">
            {CENTER_GALLERY_IMAGES.map((imageSrc, index) => (
              <div
                key={`center-gallery-${index}`}
                className={cn("relative h-[150px] overflow-hidden bg-[#EFEFEF] sm:h-[170px] md:h-[220px]", landingRadiusTokens.card)}
              >
                <img
                  src={imageSrc}
                  alt={`센터 이미지 더미 ${index + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
