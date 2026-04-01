// v12 — all strings inlined as unicode, aria-label ASCII, hover bridge via padding-top
"use client";

import { useState, useEffect } from "react";
import { Brain, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type NavMenu = {
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
};

const NAV_MENUS: NavMenu[] = [
  {
    label: "맞춤형 프로그램",
    href: "#",
    subItems: [
      { label: "연령별 발달 가이드", href: "/development" },
      { label: "상담/코칭 프로그램", href: "/programs" },
    ],
  },
  {
    label: "사발면 스토리",
    href: "/story",
  },
  {
    label: "이용 가이드",
    href: "#",
    subItems: [
      { label: "상담/코칭 프로세스", href: "/process" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setMenuOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function toggleDropdown(label: string) {
    setDropdownOpen((prev) => (prev === label ? null : label));
  }

  function closeAll() {
    setMenuOpen(false);
    setDropdownOpen(null);
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "oklch(0.22 0.03 200 / 0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid oklch(0.35 0.02 200 / 0.3)",
      }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "oklch(0.48 0.09 165 / 0.3)" }}
          >
            <Brain className="w-4 h-4" style={{ color: "oklch(0.75 0.1 165)" }} />
          </div>
          <span className="font-serif font-bold text-lg" style={{ color: "oklch(0.96 0.005 80)" }}>
            {"\uc0ac\ubc1c\uba74"}
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {NAV_MENUS.map((menu) => (
            <li key={menu.label} className="relative group">
              {menu.subItems ? (
                <>
                  <button
                    type="button"
                    className="text-sm font-medium flex items-center gap-1 bg-transparent border-0 cursor-pointer transition-colors duration-150"
                    style={{ color: "oklch(0.78 0.01 220)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(0.96 0.005 80)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(0.78 0.01 220)"; }}
                  >
                    {menu.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {/* Dropdown with invisible 12px bridge to prevent hover gap */}
                  <div className="absolute hidden group-hover:block top-full left-0 min-w-[180px] pt-3">
                    <div
                      className="rounded-lg shadow-lg p-2"
                      style={{
                        background: "oklch(0.97 0.005 80)",
                        border: "1px solid oklch(0.88 0.01 80)",
                      }}
                    >
                      {menu.subItems.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block text-sm px-3 py-2 rounded transition-colors"
                          style={{ color: "oklch(0.3 0.01 240)" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.93 0.01 80)"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={menu.href}
                  className="text-sm font-medium transition-colors duration-150"
                  style={{ color: "oklch(0.78 0.01 220)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(0.96 0.005 80)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(0.78 0.01 220)"; }}
                >
                  {menu.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block flex-shrink-0">
          <Button
            size="sm"
            className="text-sm px-5 font-semibold hover:scale-105 transition-transform"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            asChild
          >
            <Link href="/#contact">{"\ubb34\ub8cc \uc0c1\ub2f4"}</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg"
          style={{ color: "oklch(0.85 0.005 80)" }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div
          className="md:hidden px-4 pb-5 pt-2 flex flex-col gap-1"
          style={{ background: "oklch(0.22 0.03 200 / 0.97)" }}
        >
          {NAV_MENUS.map((menu) => (
            <div key={menu.label}>
              {menu.subItems ? (
                <>
                  <button
                    type="button"
                    className="w-full text-left text-sm font-medium py-2.5 flex items-center justify-between bg-transparent border-0 cursor-pointer"
                    style={{ color: "oklch(0.82 0.01 220)" }}
                    onClick={() => toggleDropdown(menu.label)}
                  >
                    {menu.label}
                    <ChevronDown
                      className="w-4 h-4 transition-transform duration-200"
                      style={{ transform: dropdownOpen === menu.label ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>
                  {dropdownOpen === menu.label && (
                    <div className="flex flex-col gap-1 pl-4 pb-2">
                      {menu.subItems.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block text-xs py-2"
                          style={{ color: "oklch(0.7 0.01 220)" }}
                          onClick={closeAll}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={menu.href}
                  className="block text-sm font-medium py-2.5"
                  style={{ color: "oklch(0.82 0.01 220)" }}
                  onClick={closeAll}
                >
                  {menu.label}
                </Link>
              )}
            </div>
          ))}
          <Button
            size="sm"
            className="w-full mt-3 font-semibold"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            asChild
          >
            <Link href="/#contact" onClick={closeAll}>
              {"\ubb34\ub8cc \uc0c1\ub2f4"}
            </Link>
          </Button>
        </div>
      )}
    </header>
  );
}
