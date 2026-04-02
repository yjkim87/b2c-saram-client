import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageHeader } from "@/components/common/page-header"

export function StoryPage() {
  return (
    <>
      <PageHeader
        label="사발면 소개"
        title="사발면의 철학과 방향성을 소개합니다"
        description="랜딩 요약과 분리된 상세 스토리 페이지입니다."
      />

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-[#EDE3D8] bg-[#FFF9F4] p-8 md:p-10">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">스토리 상세 콘텐츠 준비 중</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
            랜딩에서는 핵심 요약을 제공하고, 이 페이지에서는 브랜드 철학과 코칭 접근을 더 깊게 안내합니다.
            현재는 정보 구조와 라우팅을 우선 반영한 상태입니다.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/about/location"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              오시는길 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about/experts"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              전문가 소개 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
