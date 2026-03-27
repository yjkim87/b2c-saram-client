"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { cn } from "@/shared/lib/utils"

const navItems = [
  { label: "브랜드 스토리", href: "/brand" },
  { label: "솔루션", href: "/solution" },
  { label: "전문가 소개", href: "/experts" },
  { label: "센터 소개", href: "/center" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActivePath = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] border-b border-[#EDE3D8] bg-[#FFF9F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:hidden">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tight text-[#0C0C0C]">사발면</span>
          </Link>

          <button
            className="cursor-pointer p-2 text-[#0C0C0C]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
            <nav className="flex items-center gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "text-[1.1rem] font-semibold text-[#0C0C0C] transition-opacity hover:opacity-70",
                    isActivePath(item.href) && "text-primary"
                  )}
                >
                  {item.label}
                </Link>
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
          "absolute top-full left-0 right-0 overflow-hidden border-b border-[#EDE3D8] bg-[#FFF9F4] transition-all duration-300 md:hidden",
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col p-4 gap-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "py-2 text-base font-semibold text-[#0C0C0C] transition-opacity hover:opacity-70",
                isActivePath(item.href) && "text-primary"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/reservation" onClick={() => setMobileMenuOpen(false)}>
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
