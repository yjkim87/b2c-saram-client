"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { cn } from "@/shared/lib/utils"
import { NAVIGATION } from "@/shared/navigation"

function isPathActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

function getGroupBasePath(href: string) {
  const [, segment] = href.split("/")
  return segment ? `/${segment}` : "/"
}

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null)

  const toggleMobileGroup = (title: string) => {
    setMobileOpenGroup((prev) => (prev === title ? null : title))
  }

  const isChildActive = (href: string) => {
    return isPathActive(pathname, href)
  }

  const isGroupActive = (children: Array<{ href: string }>) => {
    if (children.some((item) => isPathActive(pathname, item.href))) {
      return true
    }

    const firstChild = children[0]
    if (!firstChild) {
      return false
    }

    const basePath = getGroupBasePath(firstChild.href)
    return pathname === basePath || pathname.startsWith(`${basePath}/`)
  }

  useEffect(() => {
    setMobileMenuOpen(false)
    setMobileOpenGroup(null)
  }, [pathname])

  return (
    <header className="fixed left-0 right-0 top-0 z-[100] border-b border-[#e6ebf7] bg-[#ffffff]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:hidden">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tight text-[#0C0C0C]">LOGO</span>
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
            aria-label={mobileMenuOpen ? "硫붾돱 ?リ린" : "硫붾돱 ?닿린"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div className="hidden h-20 items-center md:flex">
          <Link href="/" className="shrink-0">
            <span className="text-[2.1rem] font-bold tracking-tight text-[#0C0C0C]">LOGO</span>
          </Link>

          <div className="ml-auto flex items-center gap-8">
            <nav className="flex items-center gap-6">
              {NAVIGATION.map((group) => {
                const groupActive = isGroupActive(group.children)

                return (
                  <div key={group.title} className="group relative">
                    <button
                      type="button"
                      className={cn(
                        "inline-flex items-center gap-1 text-[1.05rem] font-semibold transition-colors",
                        groupActive ? "text-[#2b66f6]" : "text-[#0C0C0C] hover:opacity-70"
                      )}
                      aria-haspopup="menu"
                      aria-expanded={groupActive}
                    >
                      <span>{group.title}</span>
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                    </button>

                    <div className="pointer-events-none absolute left-1/2 top-full z-[120] w-56 -translate-x-1/2 translate-y-2 scale-[0.98] rounded-xl border border-[#e6ebf7] bg-white p-2 opacity-0 shadow-[0_16px_36px_rgba(12,12,12,0.12)] transition-[opacity,transform] duration-200 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100">
                      <ul className="space-y-1">
                        {group.children.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className={cn(
                                "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                isChildActive(item.href)
                                  ? "bg-[#eff6ff] text-slate-900"
                                  : "text-slate-700 hover:bg-[#eff6ff] hover:text-slate-900"
                              )}
                            >
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </nav>

            <Link href="/reservation">
              <Button
                className="cursor-pointer h-10 rounded-full border-0 bg-[#3391FF] px-7 text-base font-semibold text-[#FFF] shadow-none hover:bg-[#2b7de0]"
              >
                무료 상담 예약
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "absolute left-0 right-0 top-full overflow-hidden border-b border-[#e6ebf7] bg-[#ffffff] transition-all duration-300 md:hidden",
          mobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-2 p-4">
          {NAVIGATION.map((group) => {
            const isOpen = mobileOpenGroup === group.title
            const groupActive = isGroupActive(group.children)

            return (
              <div
                key={group.title}
                className={cn(
                  "rounded-xl border bg-white transition-colors",
                  groupActive ? "border-[#e6ebf7]" : "border-[#e6ebf7]"
                )}
              >
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-3 text-left text-base font-semibold",
                    groupActive ? "text-[#2b66f6]" : "text-[#0C0C0C]"
                  )}
                  onClick={() => toggleMobileGroup(group.title)}
                  aria-expanded={isOpen}
                >
                  <span>{group.title}</span>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen ? "rotate-180" : "rotate-0")} />
                </button>

                <div className={cn("overflow-hidden transition-all duration-200", isOpen ? "max-h-64 pb-2" : "max-h-0")}>
                  <ul className="space-y-1 px-3">
                    {group.children.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                            isChildActive(item.href)
                              ? "bg-[#eff6ff] text-slate-900"
                              : "text-slate-700 hover:bg-[#eff6ff]"
                          )}
                          onClick={() => {
                            setMobileMenuOpen(false)
                            setMobileOpenGroup(null)
                          }}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}

          <Link
            href="/reservation"
            onClick={() => {
              setMobileMenuOpen(false)
              setMobileOpenGroup(null)
            }}
          >
            <Button
              className="cursor-pointer mt-2 w-full rounded-full border-0 bg-[#3391FF] text-[#FFF] hover:bg-[#2b7de0] hover:text-[#FFF]"
            >
              무료 상담 예약
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
