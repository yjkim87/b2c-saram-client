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
  tempImage: "\uC784\uC2DC \uC13C\uD130 \uC774\uBBF8\uC9C0 01",
  directions: "\uC624\uC2DC\uB294 \uAE38",
  subway: "\uB3D9\uD574\uC120 \uC13C\uD140\uC5ED 2\uBC88 \uCD9C\uAD6C \uB3C4\uBCF4 10\uBD84",
  businessHours: "\uC6B4\uC601\uC2DC\uAC04",
  businessHoursValue: "\uD3C9\uC77C 09:00 ~ 20:00, \uC8FC\uB9D0 09:00 ~ 17:00",
  closedNote: "* \uC77C\uC694\uC77C\uC740 \uD734\uBB34\uC774\uBA70, \uC0AC\uC804 \uC608\uC57D\uC81C \uC6B4\uC601\uB429\uB2C8\uB2E4.",
} as const

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

export function CenterPage() {
  return (
    <>
      <PageHeader label={TEXT.headerLabel} title={TEXT.headerTitle} description={TEXT.headerDescription} />

      <section className="bg-[#fafafa] px-4 py-10 sm:px-6 md:py-12 lg:px-8">
        <div className="mx-auto grid w-full max-w-[1200px] gap-[var(--landing-space-grid-md)] md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:items-stretch">
          <div className="w-full min-w-0">
            <div
              className={cn(
                "relative flex h-[221px] w-full items-center justify-center overflow-hidden md:h-full md:min-h-[336px]",
                landingRadiusTokens.card
              )}
              style={{ background: "linear-gradient(140deg, #dcecff 0%, #c2d8ff 100%)" }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "radial-gradient(65% 65% at 20% 20%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 100%)",
                }}
              />
              <span className={cn("relative z-10 text-[#1f2f4f]", landingTypeTokens.stepDescription)}>{TEXT.tempImage}</span>
            </div>
          </div>

          <div className="w-full min-w-0 text-left text-[#111827]">
            <div className="space-y-[var(--landing-space-grid-sm)]">
              <article
                className={cn(
                  "border border-[#E4E8EE] bg-white shadow-[0_6px_20px_rgba(15,23,42,0.06)]",
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
                  "border border-[#E4E8EE] bg-white shadow-[0_6px_20px_rgba(15,23,42,0.06)]",
                  landingRadiusTokens.card,
                  landingSpaceTokens.cardPaddingResponsive
                )}
              >
                <p className={cn(landingTypeTokens.stepDescription, "font-bold text-[#0C0C0C]")}>{TEXT.businessHours}</p>
                <p className={cn("mt-[var(--landing-space-chip-y)]", landingTypeTokens.stepDescription)}>
                  {TEXT.businessHoursValue}
                </p>
                <p
                  className={cn(
                    "mt-[var(--landing-space-chip-y)] inline-block w-fit bg-[#ECECEC] text-[#111827]",
                    landingTypeTokens.noteText,
                    landingRadiusTokens.note,
                    landingSpaceTokens.notePadding
                  )}
                >
                  {TEXT.closedNote}
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
