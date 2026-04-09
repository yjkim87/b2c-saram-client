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
      <div className="pt-16 md:pt-20">{children}</div>
      <Footer />
    </>
  )
}
