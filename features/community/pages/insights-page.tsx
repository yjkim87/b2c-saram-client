import { PageHeader } from "@/components/common/page-header"

type InsightItem = {
  id: string
  category: string
  title: string
  summary: string
  expert: string
  publishedAt: string
  tags: string[]
}

const INSIGHT_ITEMS: InsightItem[] = [
  {
    id: "insight-1",
    category: "\uC804\uBB38\uAC00 \uCE7C\uB7FC",
    title: "Supporting Emotional Regulation in Early Elementary Years",
    summary:
      "A practical framework for helping children name feelings, pause, and recover during stressful moments at home.",
    expert: "Jiyoon Kim",
    publishedAt: "2026.03.28",
    tags: ["emotion", "elementary", "parenting"],
  },
  {
    id: "insight-2",
    category: "\uC778\uD130\uBD70",
    title: "Where to Start When Motivation Drops",
    summary:
      "An interview about identifying root causes behind low motivation and rebuilding confidence with small weekly wins.",
    expert: "Hyunwoo Park",
    publishedAt: "2026.03.21",
    tags: ["motivation", "coaching", "interview"],
  },
  {
    id: "insight-3",
    category: "\uC804\uBB38\uAC00 \uCE7C\uB7FC",
    title: "Conflict Conversations for Teenagers",
    summary:
      "How collaborative rule-setting improves both relationship quality and follow-through during adolescence.",
    expert: "Seoyeon Lee",
    publishedAt: "2026.03.15",
    tags: ["teen", "family", "communication"],
  },
  {
    id: "insight-4",
    category: "\uC778\uD130\uBD70",
    title: "How a Tailored Coaching Plan Is Built",
    summary:
      "A behind-the-scenes walkthrough of assessment, goal design, and iterative feedback in a customized coaching program.",
    expert: "Wantsaram Coaching Team",
    publishedAt: "2026.03.07",
    tags: ["program", "process", "case"],
  },
]

export function CommunityInsightsPage() {
  return (
    <>
      <PageHeader
        label="\uC804\uBB38\uAC00 \uCE7C\uB7FC/\uC778\uD130\uBD70"
        title="\uC804\uBB38\uAC00 \uC778\uC0AC\uC774\uD2B8 \uB9AC\uC2A4\uD2B8"
        description="\uC544\uC774\uC758 \uC131\uC7A5\uACFC \uBD80\uBAA8 \uCF54\uCE6D\uC5D0 \uB3C4\uC6C0\uC774 \uB418\uB294 \uCE7C\uB7FC\uACFC \uC778\uD130\uBD70\uB97C \uBAA8\uC558\uC2B5\uB2C8\uB2E4."
      />

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          {INSIGHT_ITEMS.map((item) => (
            <article
              key={item.id}
              className="group flex h-full flex-col rounded-2xl border border-[#EDE3D8] bg-[#FFF9F4] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {item.category}
                </span>
                <span className="text-xs text-slate-500">{item.publishedAt}</span>
              </div>

              <h2 className="mt-4 text-xl font-bold text-slate-900">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.summary}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={`${item.id}-${tag}`} className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-6 text-sm font-semibold text-slate-700">\uAE30\uACE0\uC790 - {item.expert}</div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
