import type { ReactNode } from "react"
import { Header } from "@/shared/layout/header"
import { Footer } from "@/shared/layout/footer"

interface SubpageLayoutProps {
  children: ReactNode
}

export function SubpageLayout({ children }: SubpageLayoutProps) {
  return (
    <>
      <Header />
      <div className="pt-[64px] md:pt-[78px]">{children}</div>
      <Footer />
    </>
  )
}
