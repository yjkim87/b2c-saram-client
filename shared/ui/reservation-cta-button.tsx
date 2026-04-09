import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { cn } from "@/shared/lib/utils"

interface ReservationCTAButtonProps {
  className?: string
  onClick?: () => void
}

export function ReservationCTAButton({ className, onClick }: ReservationCTAButtonProps) {
  return (
    <Link
      href="/reservation"
      onClick={onClick}
      className={cn(
        "group inline-flex w-full max-w-[270px] items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:w-auto sm:max-w-none",
        className
      )}
    >
      <span>무료 예약 상담하기</span>
      <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  )
}
