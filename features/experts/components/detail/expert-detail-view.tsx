import Link from "next/link"
import { ArrowLeft, BadgeCheck } from "lucide-react"
import { detailTokens } from "./design-tokens"
import type { ExpertProfileData } from "@/features/experts/lib/types"

interface ExpertDetailViewProps {
  backHref: string
  profileData: ExpertProfileData
}

export function ExpertDetailView({ backHref, profileData }: ExpertDetailViewProps) {
  const { header, quote, historyTitle, historyItems, bio, philosophy } = profileData

  return (
    <main className={detailTokens.page}>
      <div className={detailTokens.container}>
        <Link
          href={backHref}
          className="group mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-slate-900 md:mb-10 md:text-base"
        >
          <span className="inline-flex rounded-full border border-slate-200 bg-white p-1.5 shadow-sm transition-all group-hover:bg-slate-50">
            <ArrowLeft className="h-5 w-5" />
          </span>
          {`목록으로`}
        </Link>

        <section className="grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start lg:gap-20">
          <article className="relative rounded-[30px] bg-[#FFF7EF] px-7 pb-8 pt-10 md:px-10 md:pb-10 md:pt-11">
            <span className="absolute left-7 top-0 inline-flex -translate-y-1/2 items-center gap-1.5 rounded-full border border-[#4D98FF] bg-[#FFF] px-5 py-1.5 text-[14px] font-semibold text-[#4D98FF] md:left-10">
              <BadgeCheck className="h-4 w-4" />
              {header.certificationLabel}
            </span>

            <div className="mx-auto mt-6 h-[200px] w-[200px] overflow-hidden rounded-full bg-[#D9D9D9]">
              <img src={header.imageUrl} alt={header.name} className="h-full w-full object-cover object-top" />
            </div>

            <p className="mt-8 text-[12px] font-semibold text-[#F07C33]">{header.specialty}</p>
            <h1 className="mt-2 text-[24px] font-bold leading-tight text-[#111827]">{header.name}</h1>

            <ul className="mt-6 flex flex-wrap gap-2">
              {header.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-[#957453] bg-[#FFF] px-3 py-1.5 text-xs font-semibold text-[#957453]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </article>

          <div className="pt-2 md:pt-8 lg:pt-14">
            <div className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-6 -top-8 text-[140px] leading-none text-[#FFF7EF] md:-left-10 md:-top-12 md:text-[190px]"
                style={{
                  fontFamily:
                    '"HancomMalrangmalrang","Pretendard Variable","Pretendard","Apple SD Gothic Neo","Malgun Gothic",sans-serif',
                }}
              >
                “
              </span>

              <h2 className="relative max-w-[850px] text-[28px] font-bold leading-[1.3] text-[#111827]">
                <span className="block">{quote.lead}</span>
                <span className="block">
                  <span className="text-[#F07C33]">{quote.highlight}</span>
                  {quote.trailing}
                </span>
              </h2>
            </div>

            <div className="mt-12 md:mt-16">
              <h3 className="text-[16px] font-bold leading-tight text-[#FF7A33]">{historyTitle}</h3>

              <ul className="mt-6 space-y-1.5">
                {historyItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-base leading-relaxed text-[#111827]">
                    <span className="shrink-0 font-semibold leading-none text-[#111827]">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-14 space-y-12 md:mt-20 md:space-y-14">
          <article>
            <h3 className="text-[16px] font-bold leading-tight text-[#FF7A33]">{bio.title}</h3>
            <p className={`${detailTokens.body} mt-5 whitespace-pre-line`}>{bio.description}</p>
          </article>

          <article>
            <h3 className="text-[16px] font-bold leading-tight text-[#FF7A33]">{philosophy.title}</h3>
            <p className={`${detailTokens.body} mt-5 whitespace-pre-line`}>{philosophy.description}</p>
          </article>
        </section>
      </div>
    </main>
  )
}

