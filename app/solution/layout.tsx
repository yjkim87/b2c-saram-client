import type { ReactNode } from "react"
import { SubpageLayout } from "@/shared/layout/subpage-layout"

interface SolutionLayoutProps {
  children: ReactNode
}

export default function SolutionLayout({ children }: SolutionLayoutProps) {
  return <SubpageLayout>{children}</SubpageLayout>
}
