import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageHeader } from "@/components/common/page-header"
import { PROGRAM_OVERVIEW_ITEMS } from "@/features/program/data/program-detail"

export function ProgramPage() {
  return (
    <>
      <PageHeader
        label="상담/코칭 프로그램"
        title="프로그램 상세 안내"
        description="랜딩 요약과 분리된 상세 프로그램 페이지입니다. 트랙을 선택해 확인해보세요."
      />

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          {PROGRAM_OVERVIEW_ITEMS.map((item) => (
            <Link
              key={item.type}
              href={`/program/${item.type}`}
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
