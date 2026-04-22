import { PageHeader } from "@/components/common/page-header"
import { landingRadiusTokens, landingSpaceTokens, landingTypeTokens } from "@/features/home/styles/landing-tokens"
import { cn } from "@/shared/lib/utils"

const TEXT = {
  headerLabel: "\uC13C\uD130 \uC548\uB0B4",
  headerTitle: "\uD3B8\uC548\uD55C \uC0C1\uB2F4 \uACF5\uAC04, \uC0AC\uBC1C\uBA74 \uC13C\uD130",
  headerDescription:
    "\uB79C\uB529 \uD398\uC774\uC9C0 \uC13C\uD130 \uC548\uB0B4 \uAD6C\uC131\uACFC \uB3D9\uC77C\uD55C \uB0B4\uC6A9\uC73C\uB85C \uC704\uCE58 \uBC0F \uC6B4\uC601 \uC815\uBCF4\uB97C \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
  centerAddress: "\uBD80\uC0B0\uC2DC \uD574\uC6B4\uB300\uAD6C \uC13C\uD140\uB3D9\uB85C 99, \uBC31\uC0B0\uC13C\uD140\uD074\uB798\uC2A4\uC6D0(1\uCC28) 406\uD638",
  naverMap: "\uB124\uC774\uBC84 \uC9C0\uB3C4",
  kakaoMap: "\uCE74\uCE74\uC624\uB9F5",
  directions: "\uC624\uC2DC\uB294 \uAE38",
  subway: "\uB3D9\uD574\uC120 \uC13C\uD140\uC5ED 2\uBC88 \uCD9C\uAD6C \uB3C4\uBCF4 10\uBD84",
  businessHours: "\uC6B4\uC601\uC2DC\uAC04",
  phoneConsult: "\uC804\uD654\uC0C1\uB2F4",
  phoneNumber: "051-928-0944",
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


