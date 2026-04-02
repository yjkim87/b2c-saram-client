import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageHeader } from "@/components/common/page-header"
import { AGE_GUIDE_HEADER, AGE_OVERVIEW_ITEMS } from "@/features/age/data/age-detail"

export function AgePage() {
  return (
    <>
      <PageHeader
        label={AGE_GUIDE_HEADER.label}
        title={AGE_GUIDE_HEADER.title}
        description={AGE_GUIDE_HEADER.description}
      />

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          {AGE_OVERVIEW_ITEMS.map((item) => (
            <Link
              key={item.type}
              href={`/age/${item.type}`}
              className="group rounded-2xl border border-[#EDE3D8] bg-[#FFF9F4] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-sm font-semibold text-primary">{item.range}</p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-slate-700 group-hover:text-slate-900">
                자세히 보기
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
