// ------------------------------------------------------------------------------
// 화 일 명 : GuideCTA.tsx
// 용    도 : 상담 예약 유도 버튼 컴포넌트. 가이드 흐름 마지막에 표시되며
//            예약 페이지로 이동하는 링크를 제공한다.
// 작성일시 : 2026-04-13 (김재국)
// 수정일시 :
// 주의사항 :
//-------------------------------------------------------------------------------

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/shared/ui/button"

interface GuideCTAProps {
  description?: string
  href?: string
  label?: string
}

const DEFAULT_DESCRIPTION = "우리 아이에게 맞는 방법, 같이 찾아드릴게요."

export function GuideCTA({
  description = DEFAULT_DESCRIPTION,
  href = "/reservation",
  label = "상담 예약하기",
}: GuideCTAProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#DFDFDF] pt-3">
      <p className="text-sm leading-relaxed text-[#4E5D90]">{description}</p>
      <Button asChild className="h-10 cursor-pointer rounded-full bg-[#0C0C0C] px-5 text-sm font-semibold text-white hover:bg-[#000000]">
        <Link href={href}>
          {label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}
