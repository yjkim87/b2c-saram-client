import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Home, Lightbulb, Sparkles, Star, Target } from "lucide-react"
import { PageHeader } from "@/components/common/page-header"
import { AGE_DETAIL_CONTENT, AGE_GUIDE_HEADER, type AgeDetailType } from "@/features/age/data/age-detail"

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
        label={AGE_GUIDE_HEADER.label}
        title={AGE_GUIDE_HEADER.title}
        description={AGE_GUIDE_HEADER.description}
      />

      <section className="bg-white px-4 pt-8 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/program/age-guide"
            className="inline-flex items-center gap-2 rounded-full border border-[#EDE3D8] bg-[#FFF9F4] px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#FFF4EA]"
          >
            <ArrowLeft className="h-4 w-4" />
            뒤로가기
          </Link>

          <article className="mt-6 rounded-3xl border border-[#EDE3D8] bg-[#FFF9F4] p-7 md:p-8">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              {content.range}
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">{content.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">{content.description}</p>
          </article>

          <section className="mt-10">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-bold text-slate-900">핵심 발달 이론</h3>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {content.theories.map((theory) => (
                <article key={theory.scholar} className="rounded-3xl border border-[#EDE3D8] bg-white p-6">
                  <h4 className="text-lg font-bold text-slate-900">{theory.scholar}</h4>
                  <span className="mt-2 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {theory.tag}
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">{theory.body}</p>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-700">
                    {theory.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <div className="mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-bold text-slate-900">발달 이정표</h3>
            </div>
            <div className={`grid gap-4 ${content.milestones.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2 xl:grid-cols-4"}`}>
              {content.milestones.map((milestone) => (
                <article key={milestone.period} className="rounded-3xl border border-[#EDE3D8] bg-[#FFF9F4] p-6">
                  <h4 className="text-base font-bold text-primary">{milestone.period}</h4>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
                    {milestone.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <div className="mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-bold text-slate-900">이 시기 주요 관심사</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {content.concerns.map((concern) => (
                <span
                  key={concern}
                  className="inline-flex items-center rounded-full border border-[#EDE3D8] bg-[#FFF9F4] px-3 py-1 text-sm font-semibold text-slate-700"
                >
                  {concern}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <div className="mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-bold text-slate-900">보호자 지원 가이드</h3>
            </div>
            <article className="rounded-3xl border border-[#EDE3D8] bg-white p-7 md:p-8">
              <p className="text-sm leading-relaxed text-slate-700">{content.supportIntro}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {content.supportGuide.map((item) => (
                  <div key={item} className="flex items-start gap-2 rounded-2xl border border-[#EDE3D8] bg-[#FFF9F4] px-4 py-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="text-sm font-medium leading-relaxed text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/program/age-guide"
              className="inline-flex items-center justify-center rounded-full border border-[#0C0C0C] bg-white px-6 py-3 text-sm font-semibold text-[#0C0C0C] transition-colors hover:bg-[#0C0C0C] hover:text-white"
            >
              다른 연령별 확인하기
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 justify-center rounded-full border border-[#E0E0E0] bg-[#F7F7F7] px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200"
            >
              <Home className="h-4 w-4" />
              홈으로 가기
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
