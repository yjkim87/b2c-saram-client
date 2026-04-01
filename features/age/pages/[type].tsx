import { notFound } from "next/navigation"
import { PageHeader } from "@/components/common/page-header"
import { AGE_DETAIL_CONTENT, type AgeDetailType } from "@/features/age/data/age-detail"

interface AgeDetailPageProps {
  params: Promise<{ type: string }>
}

export async function AgeDetailPage({ params }: AgeDetailPageProps) {
  const { type } = await params
  const content = AGE_DETAIL_CONTENT[type as AgeDetailType]

  if (!content) {
    notFound()
  }

  return (
    <>
      <PageHeader
        label="연령별 발달 가이드"
        title={content.title}
        description={content.description}
      />

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-[#EDE3D8] bg-[#FFF9F4] p-7 md:p-8">
            <h2 className="text-xl font-bold text-slate-900">핵심 체크 포인트</h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-700">
              {content.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-[#EDE3D8] bg-white p-7 md:p-8">
            <h2 className="text-xl font-bold text-slate-900">보호자 지원 가이드</h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-700">
              {content.supportGuide.map((item) => (
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
