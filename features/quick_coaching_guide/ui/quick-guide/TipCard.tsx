// ------------------------------------------------------------------------------
// 화 일 명 : TipCard.tsx
// 용    도 : 팁 항목(제목 + 본문)을 카드 형태로 렌더링하는 컴포넌트.
// 작성일시 : 2026-04-13 (김재국)
// 수정일시 :
// 주의사항 :
//-------------------------------------------------------------------------------

interface TipCardProps {
  title: string
  content: string
}

export function TipCard({ title, content }: TipCardProps) {
  return (
    <article className="rounded-xl border border-[#CFE0F6] bg-white px-3 py-2.5">
      <p className="text-sm font-semibold text-[#2D486A] md:text-base">{title}</p>
      <p className="mt-1 text-sm leading-relaxed whitespace-pre-line text-[#4D6E95] md:text-base">{content}</p>
    </article>
  )
}
