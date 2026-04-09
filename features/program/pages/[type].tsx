import { notFound } from "next/navigation"
import { PageHeader } from "@/components/common/page-header"
import { PROGRAM_DETAIL_CONTENT, type ProgramDetailType } from "@/features/program/data/program-detail"

interface ProgramDetailPageProps {
  params: Promise<{ type: string }>
}

export async function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  const { type } = await params
  const content = PROGRAM_DETAIL_CONTENT[type as ProgramDetailType]

  if (!content) {
    notFound()
  }

  return (
    <>
      <PageHeader
        label="상담/코칭 프로그램"
        title={content.title}
        description={content.description}
      />

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-[#EDE3D8] bg-[#FFF9F4] p-7 md:p-8">
            <h2 className="text-xl font-bold text-slate-900">핵심 진행 포인트</h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-700">
              {content.focus.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-[#EDE3D8] bg-white p-7 md:p-8">
            <h2 className="text-xl font-bold text-slate-900">기대 변화</h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-700">
              {content.outcome.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </>
  )
}
