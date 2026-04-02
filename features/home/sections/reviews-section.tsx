import Link from "next/link"
import { ArrowRight, Quote } from "lucide-react"

const REVIEW_SUMMARY = [
  {
    name: "김OO 보호자",
    summary: "아이가 감정을 표현하는 방식이 달라졌고, 집에서도 대화가 훨씬 부드러워졌어요.",
  },
  {
    name: "박OO 보호자",
    summary: "목표를 세우고 실행하는 습관이 생기면서 아이가 스스로 해보려는 힘이 커졌습니다.",
  },
  {
    name: "최OO 보호자",
    summary: "상담 이후 아이뿐 아니라 보호자인 저도 대응 방식이 정리돼서 마음이 한결 편해졌어요.",
  },
]

export function ReviewsSection() {
  return (
    <section id="reviews" className="bg-[#F8F4EE] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center md:mb-12">
          <span className="mb-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            보호자 후기
          </span>
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">실제 변화 경험을 확인해보세요</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            랜딩에서는 핵심 후기만 요약해 보여드리고, 전체 후기는 상세 페이지에서 확인할 수 있습니다.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {REVIEW_SUMMARY.map((item) => (
            <article key={item.name} className="rounded-2xl border border-[#E7DDD2] bg-white p-6 shadow-sm">
              <Quote className="h-5 w-5 text-slate-300" />
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{item.summary}</p>
              <p className="mt-4 text-sm font-semibold text-slate-900">{item.name}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/community/reviews"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
          >
            후기 전체 보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

