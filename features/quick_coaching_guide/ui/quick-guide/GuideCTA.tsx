"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/shared/ui/button"

interface GuideCTAProps {
  href?: string
  label?: string
  resetLabel?: string
  onReset?: () => void
}

export function GuideCTA({
  href = "/reservation",
  label = "상담 예약하기",
  resetLabel = "고민 다시 선택하기",
  onReset,
}: GuideCTAProps) {
  const handleReset = () => {
    if (onReset) {
      onReset()
      return
    }

    window.location.reload()
  }

  return (
    <div className="flex items-center justify-between gap-3 border-t border-[#DFDFDF] pt-3">
      <Button
        type="button"
        variant="ghost"
        onClick={handleReset}
        className="h-10 cursor-pointer rounded-full border border-[#0C0C0C] bg-[#FFFFFF] px-4 text-sm font-semibold text-[#0C0C0C] hover:bg-[#FFFFFF] hover:text-[#0C0C0C]"
      >
        {resetLabel}
      </Button>

      <Button asChild className="h-10 cursor-pointer rounded-full bg-[#0C0C0C] px-5 text-sm font-semibold text-white hover:bg-[#000000]">
        <Link href={href}>
          {label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}
