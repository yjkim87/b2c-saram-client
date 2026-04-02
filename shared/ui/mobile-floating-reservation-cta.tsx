"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

import { cn } from "@/shared/lib/utils"

type CTAEmphasis = "high" | "normal"
const DIRECTION_SHEET_OPEN_ATTR = "data-direction-sheet-open"

interface MobileCTAConfig {
  label: string
  threshold: number
  emphasis: CTAEmphasis
}

function getMobileCTAConfig(pathname: string): MobileCTAConfig | null {
  if (pathname === "/") {
    return {
      label: "\uBB34\uB8CC \uC0C1\uB2F4 \uC608\uC57D\uD558\uAE30",
      threshold: 0.1,
      emphasis: "high",
    }
  }

  if (pathname === "/solution" || pathname.startsWith("/solution/")) {
    return {
      label: "\uC6B0\uB9AC \uC544\uC774 \uB9DE\uCDA4 \uC0C1\uB2F4 \uBC1B\uAE30",
      threshold: 0.1,
      emphasis: "high",
    }
  }

  if (pathname === "/brand" || pathname.startsWith("/brand/")) {
    return {
      label: "\uBB34\uB8CC \uC0C1\uB2F4 \uC608\uC57D\uD558\uAE30",
      threshold: 0.1,
      emphasis: "normal",
    }
  }

  if (
    pathname === "/experts" ||
    pathname.startsWith("/experts/") ||
    pathname === "/about/experts" ||
    pathname.startsWith("/about/experts/")
  ) {
    return {
      label: "\uC0C1\uB2F4 \uC608\uC57D\uD558\uAE30",
      threshold: 0.1,
      emphasis: "normal",
    }
  }

  if (
    pathname === "/center" ||
    pathname.startsWith("/center/") ||
    pathname === "/about/location" ||
    pathname.startsWith("/about/location/")
  ) {
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

  useEffect(() => {
    setScrollProgress(0)
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

  const isVisible = scrollProgress >= config.threshold

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-3 z-[110] flex justify-center px-4 md:hidden",
        "transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-hidden={!isVisible}
    >
      <Link
        href="/reservation"
        className={cn(
          "pointer-events-auto inline-flex h-14 w-[90%] max-w-[420px] items-center justify-center gap-2 rounded-full",
          "bg-[#2B66F6] px-6 text-[15px] font-semibold text-white",
          "shadow-[0_16px_36px_rgba(43,102,246,0.34)]",
          "transition-[transform,box-shadow,background-color] duration-200 ease-out",
          "active:scale-[0.95] active:shadow-[0_10px_26px_rgba(43,102,246,0.3)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B66F6]/40",
          "motion-reduce:transition-none",
          config.emphasis === "high" && "shadow-[0_18px_40px_rgba(43,102,246,0.42)]"
        )}
        aria-label={config.label}
      >
        <span>{config.label}</span>
        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
      </Link>
    </div>
  )
}

