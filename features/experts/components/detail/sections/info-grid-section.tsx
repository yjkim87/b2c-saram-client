import { detailTokens } from "../design-tokens"
import type { InfoCardSectionData } from "@/features/experts/lib/types"

interface InfoGridSectionProps {
  cards: InfoCardSectionData[]
}

export function InfoGridSection({ cards }: InfoGridSectionProps) {
  return (
    <section className={`${detailTokens.sectionSpacing}`}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card) => {
          const isCertification = card.tone === "emerald"

          return (
            <article
              key={card.id}
              className={`${detailTokens.card} relative flex flex-col overflow-hidden p-6 md:p-8 ${
                isCertification ? "border-emerald-100/50" : ""
              }`}
            >
              {isCertification && (
                <div className="absolute right-0 top-0 z-0 h-32 w-32 rounded-bl-full bg-emerald-50 opacity-50" />
              )}

              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${
                      isCertification ? "bg-emerald-50" : "bg-slate-50"
                    }`}
                  >
                    {card.icon}
                  </div>

                  <h3 className="font-extrabold text-slate-900">{card.title}</h3>
                </div>

                <ul className="flex-grow space-y-3">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start text-base leading-snug ${
                        isCertification ? "font-medium text-slate-700" : "text-slate-600"
                      }`}
                    >
                      {card.useCheckIcon ? (
                        <span className="mr-2 mt-0.5 shrink-0 text-[13px]">✅</span>
                      ) : (
                        <span className="mr-2 mt-0.5 text-slate-300">&bull;</span>
                      )}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
