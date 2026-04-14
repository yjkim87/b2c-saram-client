import Link from "next/link"
import { ChevronRight } from "lucide-react"

type PageHeaderProps = {
  label: string
  title: string
  description: string
}

export function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <section className="border-b border-[#e6ebf7] bg-[#FFF7EF]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <li>
              <Link href="/" className="transition-colors hover:text-slate-700">
                홈
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li className="font-semibold text-slate-700" aria-current="page">
              {label}
            </li>
          </ol>
        </nav>

        <span className="mb-4 inline-flex items-center rounded-full bg-[#ffc5a0] px-4 py-1.5 text-sm font-semibold text-[#7b401b]">
          {label}
        </span>
        <h1 className="mobile-auto-phrase text-3xl font-bold leading-tight text-slate-900 md:text-4xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">{description}</p>
      </div>
    </section>
  )
}
