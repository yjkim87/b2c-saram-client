import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface SubpageHeroProps {
  badge: string
  title: string
  description: string
  currentPage: string
}

export function SubpageHero({ badge, title, description, currentPage }: SubpageHeroProps) {
  return (
    <section className="border-b border-[#EDE3D8] bg-[#FFF9F4]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-slate-500">
            <li>
              <Link href="/" className="transition-colors hover:text-slate-700">
                홈
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li className="font-semibold text-slate-700" aria-current="page">
              {currentPage}
            </li>
          </ol>
        </nav>

        <span className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
          {badge}
        </span>
        <h1 className="mobile-auto-phrase text-3xl font-bold leading-tight text-slate-900 md:text-4xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">{description}</p>
      </div>
    </section>
  )
}
