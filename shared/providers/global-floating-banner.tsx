"use client"

import { usePathname } from "next/navigation"
import { FloatingBanner } from "@/features/home/sections/floating-banner"

function isReservationRoute(pathname: string | null) {
  if (!pathname) return false
  return pathname === "/reservation" || pathname.startsWith("/reservation/")
}

export function GlobalFloatingBanner() {
  const pathname = usePathname()

  if (isReservationRoute(pathname)) {
    return null
  }

  return <FloatingBanner />
}
