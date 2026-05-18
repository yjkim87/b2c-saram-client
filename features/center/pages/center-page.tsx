import { PageHeader } from "@/components/common/page-header"
import { landingRadiusTokens, landingSpaceTokens, landingTypeTokens } from "@/features/home/styles/landing-tokens"
import { cn } from "@/shared/lib/utils"

const TEXT = {
  headerLabel: "센터 안내",
  headerTitle: "편안한 상담 공간, 사발면 센터",
  headerDescription:
    "랜딩 페이지 센터 안내 구성과 동일한 내용으로 위치 및 운영 정보를 확인할 수 있습니다.",
  centerAddress: "부산광역시 해운대구 센텀동로 99 벽산e센텀클래스원 406호",
  naverMap: "네이버 지도",
  kakaoMap: "카카오맵",
  directions: "오시는 길",
  subway: "동해선 센텀역 2번 출구 도보 10분",
  businessHours: "운영시간",
  phoneConsult: "전화상담",
  phoneNumber: "051-928-0943",
} as const

const CENTER_MAP_IMAGE_URL = "https://img.assesta.com/saram-me/center_map.png"
const BUSINESS_HOURS_ITEMS = [
  "· 월~수 : 10 ~19시",
  "· 목~토: 10시~21시",
  "· 화 : 휴무",
  "· 일: 10시~18시",
] as const

const NAVER_MAP_URL = `https://map.naver.com/p/search/${encodeURIComponent(TEXT.centerAddress)}`
const KAKAO_MAP_URL = `https://map.kakao.com/?q=${encodeURIComponent(TEXT.centerAddress)}`

function MapButtons({ className }: { className?: string }) {
  return (
    <div className={cn("grid min-w-0 grid-cols-2 gap-[var(--landing-space-grid-sm)]", className)}>
      <a
        href={NAVER_MAP_URL}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "inline-flex min-w-0 w-full items-center justify-center bg-[#03C75A] text-[#ffffff] transition-colors hover:bg-[#03C75A]",
          landingRadiusTokens.mapButton,
          landingSpaceTokens.mapButtonHeight,
          landingSpaceTokens.mapButtonPadding,
          landingTypeTokens.mapButton,
          "text-[16px] md:text-[16px]"
        )}
      >
        {TEXT.naverMap}
      </a>
      <a
        href={KAKAO_MAP_URL}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "inline-flex min-w-0 w-full items-center justify-center bg-[#fee500] text-[#181818] transition-colors hover:bg-[#fee500]",
          landingRadiusTokens.mapButton,
          landingSpaceTokens.mapButtonHeight,
          landingSpaceTokens.mapButtonPadding,
          landingTypeTokens.mapButton,
          "text-[16px] md:text-[16px]"
        )}
      >
        {TEXT.kakaoMap}
      </a>
    </div>
  )
}

function OperatingHoursGrid({ className }: { className?: string }) {
  return (
    <div className={cn("mt-[var(--landing-space-chip-y)] grid grid-cols-2 gap-x-6 gap-y-1", landingTypeTokens.stepDescription, className)}>
      {BUSINESS_HOURS_ITEMS.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  )
}

export function CenterPage() {
  return (
    <>
      <PageHeader label={TEXT.headerLabel} title={TEXT.headerTitle} description={TEXT.headerDescription} />

      <section className="bg-[#fff] px-4 py-14 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto grid w-full max-w-[1200px] gap-[var(--landing-space-grid-md)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-stretch">
          <div className="w-full min-w-0">
            <a
              href={NAVER_MAP_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="네이버 지도 위치 열기"
              className={cn(
                "group relative block h-[221px] w-full overflow-hidden bg-white md:h-full md:min-h-[336px]",
                landingRadiusTokens.card
              )}
            >
              <img
                src={CENTER_MAP_IMAGE_URL}
                alt="사발면 센터 지도 이미지"
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.01]"
                loading="lazy"
              />
            </a>
          </div>

          <div className="w-full min-w-0 text-left text-[#111827]">
            <div className="space-y-[var(--landing-space-grid-sm)]">
              <article
                className={cn(
                  "bg-[#f7f7f7]",
                  landingRadiusTokens.card,
                  landingSpaceTokens.cardPaddingResponsive
                )}
              >
                <p className={cn(landingTypeTokens.stepDescription, "font-bold text-[#0C0C0C]")}>{TEXT.directions}</p>
                <p className={cn("mt-[var(--landing-space-chip-y)] break-words", landingTypeTokens.stepDescription)}>
                  {TEXT.centerAddress}
                </p>
                <p
                  className={cn(
                    "mt-[var(--landing-space-chip-y)] inline-block w-fit bg-[#D9EDFF] text-[#365B7C]",
                    landingTypeTokens.noteText,
                    landingRadiusTokens.note,
                    landingSpaceTokens.notePadding
                  )}
                >
                  {TEXT.subway}
                </p>

                <MapButtons className="mt-[var(--landing-space-grid-sm)]" />
              </article>

              <article
                className={cn(
                  "bg-[#f7f7f7]",
                  landingRadiusTokens.card,
                  landingSpaceTokens.cardPaddingResponsive
                )}
              >
                <p className={cn(landingTypeTokens.stepDescription, "font-bold text-[#0C0C0C]")}>{TEXT.businessHours}</p>
                <OperatingHoursGrid />
              </article>

              <article
                className={cn(
                  "bg-[#f7f7f7]",
                  landingRadiusTokens.card,
                  landingSpaceTokens.cardPaddingResponsive
                )}
              >
                <p className={cn(landingTypeTokens.stepDescription, "font-bold text-[#0C0C0C]")}>{TEXT.phoneConsult}</p>
                <p className={cn("mt-[var(--landing-space-chip-y)]", landingTypeTokens.stepDescription)}>{TEXT.phoneNumber}</p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}


