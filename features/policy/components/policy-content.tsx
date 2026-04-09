import type { RefObject } from "react"

type PolicyContentProps = {
  title: string
  updatedAt?: string
  html: string
  contentRef: RefObject<HTMLElement | null>
}

function formatUpdatedAt(updatedAt?: string) {
  if (!updatedAt) {
    return null
  }

  const parsedDate = new Date(updatedAt)

  if (Number.isNaN(parsedDate.getTime())) {
    return updatedAt
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(parsedDate)
}

export function PolicyContent({ title, updatedAt, html, contentRef }: PolicyContentProps) {
  const formattedDate = formatUpdatedAt(updatedAt)

  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
      <header className="border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
        {formattedDate && (
          <p className="mt-3 text-sm font-medium text-slate-500">최종 업데이트: {formattedDate}</p>
        )}
      </header>

      <article
        ref={contentRef}
        className="mt-8 min-w-0 text-[15px] leading-[1.9] text-slate-700 [overflow-wrap:anywhere] sm:text-base [&_h2]:mt-12 [&_h2]:scroll-mt-28 [&_h2]:text-[1.35rem] [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-slate-900 [&_h3]:mt-8 [&_h3]:scroll-mt-28 [&_h3]:text-[1.1rem] [&_h3]:font-semibold [&_h3]:text-slate-900 [&_li]:mt-2 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mt-4 [&_strong]:font-semibold [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_.policy-table-wrap]:mt-6 [&_.policy-table-wrap]:w-full [&_.policy-table-wrap]:max-w-full [&_.policy-table-wrap]:overflow-x-auto [&_.policy-table-wrap]:overscroll-x-contain [&_.policy-table-wrap]:pb-1 md:[&_.policy-table-wrap]:overflow-x-visible [&_.policy-table-wrap]:[-webkit-overflow-scrolling:touch] [&_.policy-table]:min-w-[680px] [&_.policy-table]:w-full [&_.policy-table]:border-collapse md:[&_.policy-table]:min-w-0 [&_.policy-table]:border-t-2 [&_.policy-table]:border-t-slate-700 [&_.policy-table]:text-center [&_.policy-table_th]:bg-[#f2f2f2] [&_.policy-table_th]:px-5 [&_.policy-table_th]:py-4 [&_.policy-table_th]:text-base [&_.policy-table_th]:font-bold [&_.policy-table_th]:text-slate-900 [&_.policy-table_th]:border [&_.policy-table_th]:border-slate-300 [&_.policy-table_td]:bg-white [&_.policy-table_td]:px-5 [&_.policy-table_td]:py-5 [&_.policy-table_td]:align-middle [&_.policy-table_td]:text-[15px] [&_.policy-table_td]:text-slate-700 [&_.policy-table_td]:border [&_.policy-table_td]:border-slate-300"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  )
}
