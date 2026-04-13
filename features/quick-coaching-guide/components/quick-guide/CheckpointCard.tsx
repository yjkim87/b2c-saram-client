interface CheckpointCardProps {
  items: string[]
}

export function CheckpointCard({ items }: CheckpointCardProps) {
  return (
    <article className="space-y-2 rounded-2xl border border-[#D8CEBC] bg-white p-4">
      <p className="text-sm font-semibold text-[#2F2A23]">핵심 체크포인트</p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className="text-sm leading-relaxed text-foreground md:text-base">
            • {item}
          </li>
        ))}
      </ul>
    </article>
  )
}
