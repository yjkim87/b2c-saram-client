"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { cn } from "@/shared/lib/utils"
import { NAVIGATION } from "@/shared/navigation"

const LOGO_IMAGE_URL = "/saramme_logo.png"

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
    <header className="fixed left-0 right-0 top-0 z-[100] border-b border-[#E3D5C7] bg-[#fff]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[64px] items-center justify-between md:hidden">
          <Link href="/" className="flex items-center">
            <img src={LOGO_IMAGE_URL} alt="사람ME 로고" className="h-10 w-auto" />
          </Link>

          <button
            className="cursor-pointer p-2 text-[#1A1410]"
            onClick={() => {
              setMobileMenuOpen((prev) => {
                const next = !prev
                if (!next) {
                  setMobileOpenGroup(null)
                }
                return next
              })
            }}
            aria-label={mobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div className="hidden h-[78px] items-center md:flex">
          <Link href="/" className="shrink-0 flex items-center">
            <img src={LOGO_IMAGE_URL} alt="사람ME 로고" className="h-11 w-auto" />
          </Link>

          <div className="ml-auto flex items-center gap-8">
            <nav className="flex items-center gap-6">
              {NAVIGATION.map((entry) => {
                if (entry.type === "link") {
                  const linkActive = isPathActive(pathname, entry.href)

                  return (
                    <Link
                      key={entry.title}
                      href={entry.href}
                      className={cn(
                        "inline-flex items-center gap-1 text-[1.05rem] font-semibold transition-colors",
                        linkActive ? "text-[#F07C33]" : "text-[#1A1410] hover:opacity-70"
                      )}
                    >
                      {entry.title}
                    </Link>
                  )
                }

                const group = entry
                const groupActive = isGroupActive(group.children)

                return (
                  <div key={group.title} className="group relative">
                    <button
                      type="button"
                      className={cn(
                        "inline-flex items-center gap-1 text-[1.05rem] font-semibold transition-colors",
                        groupActive ? "text-[#F07C33]" : "text-[#1A1410] hover:opacity-70"
                      )}
                      aria-haspopup="menu"
                      aria-expanded={groupActive}
                    >
                      <span>{group.title}</span>
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                    </button>

                    <div className="pointer-events-none absolute left-1/2 top-full z-[120] mt-3 w-56 -translate-x-1/2 translate-y-3 scale-[0.98] rounded-xl border border-[#E3D5C7] bg-[#fff] p-2 opacity-0 shadow-[0_16px_36px_rgba(37,23,15,0.12)] transition-[opacity,transform] duration-200 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100">
                      <ul className="space-y-1">
                        {group.children.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className={cn(
                                "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                isChildActive(item.href)
                                  ? "bg-[#F8E9DB] text-[#1E1611]"
                                  : "text-[#5F4E42] hover:bg-[#F8E9DB] hover:text-[#1E1611]"
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
                className="cursor-pointer h-10 rounded-full border-0 bg-[#F07C33] px-7 text-base font-semibold text-[#FFF] shadow-none hover:bg-[#DA6727]"
              >
                무료 상담 예약
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "absolute left-0 right-0 top-full overflow-hidden border-b border-[#E3D5C7] bg-[#fff] transition-all duration-300 md:hidden",
          mobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-2 p-4">
          {NAVIGATION.map((entry) => {
            if (entry.type === "link") {
              const linkActive = isPathActive(pathname, entry.href)

              return (
                <Link
                  key={entry.title}
                  href={entry.href}
                  className={cn(
                    "rounded-xl border bg-white px-4 py-3 text-base font-semibold transition-colors",
                    linkActive ? "border-[#E3D5C7] text-[#F07C33]" : "border-[#E3D5C7] text-[#1A1410]"
                  )}
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setMobileOpenGroup(null)
                  }}
                >
                  {entry.title}
                </Link>
              )
            }

            const group = entry
            const isOpen = mobileOpenGroup === group.title
            const groupActive = isGroupActive(group.children)

            return (
              <div
                key={group.title}
                className={cn(
                  "rounded-xl border bg-white transition-colors",
                  groupActive ? "border-[#E3D5C7]" : "border-[#E3D5C7]"
                )}
              >
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-3 text-left text-base font-semibold",
                    groupActive ? "text-[#F07C33]" : "text-[#1A1410]"
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
                              ? "bg-[#F8E9DB] text-[#1E1611]"
                              : "text-[#5F4E42] hover:bg-[#F8E9DB]"
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
              className="cursor-pointer mt-2 w-full rounded-full border-0 bg-[#F07C33] text-[#FFF] hover:bg-[#DA6727] hover:text-[#FFF]"
            >
              무료 상담 예약
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
