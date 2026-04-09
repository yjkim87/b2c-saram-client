import type { ReactNode } from "react"
import { SubpageLayout } from "@/shared/layout/subpage-layout"

interface AboutLayoutProps {
  children: ReactNode
}

export default function AboutLayout({ children }: AboutLayoutProps) {
  return <SubpageLayout>{children}</SubpageLayout>
}
