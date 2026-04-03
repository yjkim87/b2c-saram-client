"use client"

import Link from "next/link"
import { useState } from "react"
import { Plus, X } from "lucide-react"
import { cn } from "@/shared/lib/utils"

type SnsItem = {
  id: "kakao" | "naver-blog" | "instagram" | "youtube"
  label: string
  ariaLabel: string
  href: string
  viewBox: string
  path: string
  buttonClassName: string
  iconWrapClassName: string
  iconClassName: string
}

const SNS_ITEMS: SnsItem[] = [
  {
    id: "kakao",
    label: "카카오 채널",
    ariaLabel: "카카오톡 채널 바로가기",
    href: "#",
    viewBox: "0 0 24 24",
    path: "M12 3C6.477 3 2 6.582 2 11c0 2.843 1.874 5.336 4.694 6.751l-1.17 4.282c-.1.37.325.664.655.45l5.106-3.313c.235.022.474.033.715.033 5.523 0 10-3.582 10-8.001C22 6.582 17.523 3 12 3z",
    buttonClassName: "bg-[#FEE500] text-[#2B1A0E] hover:bg-[#f6de00]",
    iconWrapClassName: "bg-[#2B1A0E]/10",
    iconClassName: "text-[#2B1A0E]",
  },
  {
    id: "naver-blog",
    label: "네이버블로그",
    ariaLabel: "네이버블로그 바로가기",
    href: "https://blog.naver.com/",
    viewBox: "0 0 24 24",
    path: "M5.25 2A3.25 3.25 0 0 0 2 5.25v13.5A3.25 3.25 0 0 0 5.25 22h13.5A3.25 3.25 0 0 0 22 18.75V5.25A3.25 3.25 0 0 0 18.75 2H5.25zm4.1 4.5h3.52c1.9 0 3.08.98 3.08 2.58 0 .92-.4 1.58-1.12 1.95.97.3 1.58 1.1 1.58 2.24 0 1.8-1.26 2.98-3.26 2.98H9.35V6.5zm2.35 3.78h.94c.7 0 1.1-.35 1.1-.93 0-.57-.4-.9-1.08-.9h-.96v1.83zm0 4.01h1.12c.76 0 1.2-.38 1.2-1.04 0-.64-.44-1-1.2-1H11.7v2.04z",
    buttonClassName: "bg-[#03C75A] text-white hover:bg-[#02b651]",
    iconWrapClassName: "bg-white/20",
    iconClassName: "text-white",
  },
  {
    id: "instagram",
    label: "인스타그램",
    ariaLabel: "인스타그램 바로가기",
    href: "#",
    viewBox: "0 0 24 24",
    path: "M7.75 2C4.575 2 2 4.575 2 7.75v8.5C2 19.425 4.575 22 7.75 22h8.5C19.425 22 22 19.425 22 16.25v-8.5C22 4.575 19.425 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0 1 20 7.75v8.5A3.75 3.75 0 0 1 16.25 20h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5A3.75 3.75 0 0 1 7.75 4zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.25-3.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z",
    buttonClassName: "bg-gradient-to-r from-[#FD1D1D] via-[#C13584] to-[#FCAF45] text-white hover:opacity-90",
    iconWrapClassName: "bg-white/20",
    iconClassName: "text-white",
  },
  {
    id: "youtube",
    label: "유튜브",
    ariaLabel: "유튜브 바로가기",
    href: "#",
    viewBox: "0 0 24 24",
    path: "M23.498 6.186a2.997 2.997 0 0 0-2.11-2.122C19.54 3.545 12 3.545 12 3.545s-7.54 0-9.388.519A2.997 2.997 0 0 0 .502 6.186 31.84 31.84 0 0 0 0 12a31.84 31.84 0 0 0 .502 5.814 2.997 2.997 0 0 0 2.11 2.122c1.848.519 9.388.519 9.388.519s7.54 0 9.388-.519a2.997 2.997 0 0 0 2.11-2.122A31.84 31.84 0 0 0 24 12a31.84 31.84 0 0 0-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    buttonClassName: "bg-[#FF0000] text-white hover:bg-[#e10000]",
    iconWrapClassName: "bg-white/20",
    iconClassName: "text-white",
  },
]

const MOBILE_STAGGER_MS = 70

function SnsLogo({ item, className }: { item: SnsItem; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox={item.viewBox} className={className} fill="currentColor">
      <path d={item.path} />
    </svg>
  )
}

export function FloatingBanner() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-10 right-5 z-[95] hidden flex-col gap-3 md:flex">
        {SNS_ITEMS.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            aria-label={item.ariaLabel}
            className={cn(
              "group inline-flex min-w-[162px] items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold shadow-[0_12px_24px_rgba(12,12,12,0.18)] transition-all duration-200 hover:-translate-y-0.5",
              item.buttonClassName
            )}
          >
            <span className={cn("inline-flex h-6 w-6 items-center justify-center rounded-full", item.iconWrapClassName)}>
              <SnsLogo item={item} className={cn("h-4 w-4", item.iconClassName)} />
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="fixed bottom-20 right-4 z-[95] md:hidden">
        <div className="pointer-events-none absolute bottom-12 right-0 flex flex-col items-end gap-2">
          {SNS_ITEMS.map((item, index) => (
            <Link
              key={`mobile-${item.id}`}
              href={item.href}
              aria-label={item.ariaLabel}
              onClick={() => setOpen(false)}
              className={cn(
                "pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full shadow-md transition-all duration-300 ease-in-out",
                item.buttonClassName,
                open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-2 scale-95 opacity-0"
              )}
              style={{ transitionDelay: `${index * MOBILE_STAGGER_MS}ms` }}
            >
              <SnsLogo item={item} className={cn("h-4 w-4", item.iconClassName)} />
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "플로팅 메뉴 닫기" : "플로팅 메뉴 열기"}
          className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white shadow-[0_10px_24px_rgba(12,12,12,0.28)] transition-colors hover:bg-slate-800"
        >
          <span className="relative h-4 w-4">
            <Plus
              className={cn(
                "absolute inset-0 h-4 w-4 transform-gpu transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                open ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
              )}
            />
            <X
              className={cn(
                "absolute inset-0 h-4 w-4 transform-gpu transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"
              )}
            />
          </span>
        </button>
      </div>
    </>
  )
}
