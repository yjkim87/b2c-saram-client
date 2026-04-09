import type { ReactNode } from "react"
import { SubpageLayout } from "@/shared/layout/subpage-layout"

interface ExpertsLayoutProps {
  children: ReactNode
}

export default function ExpertsLayout({ children }: ExpertsLayoutProps) {
  return <SubpageLayout>{children}</SubpageLayout>
}
