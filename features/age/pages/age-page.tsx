import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageHeader } from "@/components/common/page-header"
import { AGE_OVERVIEW_ITEMS } from "@/features/age/data/age-detail"

export function AgePage() {
  return (
    <>
      <PageHeader
        label="연령별 발달 가이드"
        title="연령별 상세 가이드"
        description="랜딩 요약과 분리된 상세 콘텐츠입니다. 연령대를 선택해 자세히 확인해보세요."
      />

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          {AGE_OVERVIEW_ITEMS.map((item) => (
            <Link
              key={item.type}
              href={`/age/${item.type}`}
              className="group rounded-2xl border border-[#EDE3D8] bg-[#FFF9F4] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-sm font-semibold text-primary">{item.title}</p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">{item.description}</h2>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-slate-700 group-hover:text-slate-900">
                상세 보기
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
