"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

import { cn } from "@/shared/lib/utils"

type CTAEmphasis = "high" | "normal"
const DIRECTION_SHEET_OPEN_ATTR = "data-direction-sheet-open"
const HOME_CENTER_RESERVATION_CTA_SELECTOR = "[data-home-center-reservation-cta]"

interface MobileCTAConfig {
  label: string
  threshold: number
  emphasis: CTAEmphasis
}

const DEFAULT_MENU_CTA_CONFIG: MobileCTAConfig = {
  label: "무료 상담 예약하기",
  threshold: 0.1,
  emphasis: "high",
}

function matchesPath(pathname: string, basePath: string): boolean {
  return pathname === basePath || pathname.startsWith(`${basePath}/`)
}

function isMenuDetailPath(pathname: string): boolean {
  return matchesPath(pathname, "/program") || matchesPath(pathname, "/about") || matchesPath(pathname, "/community")
}

function getMobileCTAConfig(pathname: string): MobileCTAConfig | null {
  if (pathname === "/") {
    return null
  }

  if (isMenuDetailPath(pathname)) {
    return null
  }

  if (pathname === "/solution" || pathname.startsWith("/solution/")) {
    return {
      label: "우리 아이 맞춤 상담 받기",
      threshold: 0.1,
      emphasis: "high",
    }
  }

  if (pathname === "/brand" || pathname.startsWith("/brand/")) {
    return DEFAULT_MENU_CTA_CONFIG
  }

  if (
    pathname === "/experts" ||
    pathname.startsWith("/experts/") ||
    pathname === "/about/experts" ||
    pathname.startsWith("/about/experts/")
  ) {
    return {
      label: "상담 예약하기",
      threshold: 0.1,
      emphasis: "normal",
    }
  }

  if (pathname === "/center" || pathname.startsWith("/center/")) {
    return null
  }

  if (pathname === "/reservation" || pathname.startsWith("/reservation/")) {
    return null
  }

  return null
}

function getScrollProgress(): number {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight

  if (scrollableHeight <= 0) {
    return 1
  }

  return Math.min(1, Math.max(0, window.scrollY / scrollableHeight))
}

export function MobileFloatingReservationCTA() {
  const pathname = usePathname()
  const config = useMemo(() => getMobileCTAConfig(pathname), [pathname])
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isBlockedByDirectionSheet, setIsBlockedByDirectionSheet] = useState(false)
  const [isCTASectionInView, setIsCTASectionInView] = useState(false)
  const [isCenterSectionCTAInView, setIsCenterSectionCTAInView] = useState(false)

  useEffect(() => {
    setScrollProgress(0)
  }, [pathname])

  useEffect(() => {
    setIsCTASectionInView(false)

    if (pathname !== "/") {
      return
    }

    let intersectionObserver: IntersectionObserver | null = null
    let mutationObserver: MutationObserver | null = null

    const connectObserver = () => {
      if (intersectionObserver) {
        return true
      }

      const target = document.getElementById("reservation")
      if (!target) {
        return false
      }

      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          setIsCTASectionInView(entry.isIntersecting)
        },
        { threshold: 0.12 }
      )

      intersectionObserver.observe(target)
      return true
    }

    if (!connectObserver()) {
      mutationObserver = new MutationObserver(() => {
        if (connectObserver() && mutationObserver) {
          mutationObserver.disconnect()
          mutationObserver = null
        }
      })

      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      })
    }

    return () => {
      if (intersectionObserver) {
        intersectionObserver.disconnect()
      }

      if (mutationObserver) {
        mutationObserver.disconnect()
      }
    }
  }, [pathname])

  useEffect(() => {
    setIsCenterSectionCTAInView(false)

    if (pathname !== "/") {
      return
    }

    let intersectionObserver: IntersectionObserver | null = null
    let mutationObserver: MutationObserver | null = null

    const connectObserver = () => {
      if (intersectionObserver) {
        return true
      }

      const target = document.querySelector(HOME_CENTER_RESERVATION_CTA_SELECTOR)
      if (!target) {
        return false
      }

      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          setIsCenterSectionCTAInView(entry.isIntersecting)
        },
        { threshold: 0.65 }
      )

      intersectionObserver.observe(target)
      return true
    }

    if (!connectObserver()) {
      mutationObserver = new MutationObserver(() => {
        if (connectObserver() && mutationObserver) {
          mutationObserver.disconnect()
          mutationObserver = null
        }
      })

      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      })
    }

    return () => {
      if (intersectionObserver) {
        intersectionObserver.disconnect()
      }

      if (mutationObserver) {
        mutationObserver.disconnect()
      }
    }
  }, [pathname])

  useEffect(() => {
    if (!config) {
      return
    }

    let frameId = 0

    const updateProgress = () => {
      setScrollProgress(getScrollProgress())
      frameId = 0
    }

    const requestUpdate = () => {
      if (frameId !== 0) {
        return
      }

      frameId = window.requestAnimationFrame(updateProgress)
    }

    requestUpdate()
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)

    return () => {
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [config])

  useEffect(() => {
    const updateBlockedState = () => {
      setIsBlockedByDirectionSheet(document.body.hasAttribute(DIRECTION_SHEET_OPEN_ATTR))
    }

    updateBlockedState()

    const observer = new MutationObserver(updateBlockedState)
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: [DIRECTION_SHEET_OPEN_ATTR],
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  if (!config || isBlockedByDirectionSheet) {
    return null
  }

  const isVisible = scrollProgress >= config.threshold && !isCTASectionInView && !isCenterSectionCTAInView

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-3 z-[110] flex justify-center px-4 md:hidden",
        "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        isVisible ? "translate-y-0" : "translate-y-[140%]"
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-hidden={!isVisible}
    >
      <Link
        href="/reservation"
        className={cn(
          "pointer-events-auto inline-flex h-14 w-[90%] max-w-[420px] items-center justify-center gap-2 rounded-full",
          "bg-[#F07C33] px-6 text-[15px] font-semibold text-white",
          "shadow-[0_16px_36px_rgba(240,124,51,0.34)]",
          "transition-[transform,box-shadow,background-color] duration-200 ease-out",
          "active:scale-[0.95] active:shadow-[0_10px_26px_rgba(240,124,51,0.3)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F07C33]/40",
          "motion-reduce:transition-none",
          config.emphasis === "high" && "shadow-[0_18px_40px_rgba(240,124,51,0.42)]"
        )}
        aria-label={config.label}
      >
        <span>{config.label}</span>
        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
      </Link>
    </div>
  )
}

