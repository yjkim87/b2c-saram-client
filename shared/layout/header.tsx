"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { cn } from "@/shared/lib/utils"

type HeaderGroup = {
  label: string
  items: Array<{ label: string; href: string }>
}

const NAV_GROUPS: HeaderGroup[] = [
  {
    label: "맞춤형 프로그램",
    items: [
      { label: "연령별 발달 가이드", href: "/age" },
      { label: "상담/코칭 프로그램", href: "/program" },
    ],
  },
  {
    label: "사발면 스토리",
    items: [
      { label: "사발면 소개", href: "/story" },
      { label: "전문가 소개", href: "/experts" },
    ],
  },
  {
    label: "이용 가이드",
    items: [
      { label: "오시는길", href: "/center" },
      { label: "FAQ", href: "/faq" },
    ],
  },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null)

  const toggleMobileGroup = (label: string) => {
    setMobileOpenGroup((prev) => (prev === label ? null : label))
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setMobileOpenGroup(null)
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-[100] border-b border-[#EDE3D8] bg-[#FFF9F4]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:hidden">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tight text-[#0C0C0C]">사발면</span>
          </Link>

          <button
            className="cursor-pointer p-2 text-[#0C0C0C]"
            onClick={() => {
              setMobileMenuOpen((prev) => {
                const next = !prev
                if (!next) {
                  setMobileOpenGroup(null)
                }
                return next
              })
            }}
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div className="hidden h-20 items-center md:flex">
          <Link href="/" className="shrink-0">
            <span className="text-[2.1rem] font-bold tracking-tight text-[#0C0C0C]">사발면</span>
          </Link>

          <div className="ml-auto flex items-center gap-8">
            <nav className="flex items-center gap-6">
              {NAV_GROUPS.map((group) => (
                <div key={group.label} className="group relative">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-[1.05rem] font-semibold text-[#0C0C0C] transition-opacity hover:opacity-70"
                    aria-haspopup="menu"
                  >
                    <span>{group.label}</span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                  </button>

                  <div className="pointer-events-none absolute left-1/2 top-full z-[120] w-56 -translate-x-1/2 translate-y-2 rounded-xl border border-[#EDE3D8] bg-white p-2 opacity-0 shadow-[0_16px_36px_rgba(12,12,12,0.12)] transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <ul className="space-y-1">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-[#FFF4EA] hover:text-slate-900"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </nav>

            <Link href="/reservation">
              <Button
                variant="outline"
                className="cursor-pointer h-10 rounded-full border-[#0C0C0C] bg-white px-7 text-base font-semibold text-[#0C0C0C] shadow-none hover:bg-[#0C0C0C] hover:text-white"
              >
                예약하기
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "absolute left-0 right-0 top-full overflow-hidden border-b border-[#EDE3D8] bg-[#FFF9F4] transition-all duration-300 md:hidden",
          mobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-2 p-4">
          {NAV_GROUPS.map((group) => {
            const isOpen = mobileOpenGroup === group.label

            return (
              <div key={group.label} className="rounded-xl border border-[#EEE2D6] bg-white">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-base font-semibold text-[#0C0C0C]"
                  onClick={() => toggleMobileGroup(group.label)}
                  aria-expanded={isOpen}
                >
                  <span>{group.label}</span>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen ? "rotate-180" : "rotate-0")} />
                </button>

                <div className={cn("overflow-hidden transition-all duration-200", isOpen ? "max-h-64 pb-2" : "max-h-0")}>
                  <ul className="space-y-1 px-3">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-[#FFF4EA]"
                          onClick={closeMobileMenu}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}

          <Link href="/reservation" onClick={closeMobileMenu}>
            <Button
              variant="outline"
              className="cursor-pointer mt-2 w-full rounded-full border-[#0C0C0C] bg-white text-[#0C0C0C] hover:bg-[#0C0C0C] hover:text-white"
            >
              예약하기
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
