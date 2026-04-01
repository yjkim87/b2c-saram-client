import type { ReactNode } from "react"
import { SubpageLayout } from "@/shared/layout/subpage-layout"

interface ProgramLayoutProps {
  children: ReactNode
}

export default function ProgramLayout({ children }: ProgramLayoutProps) {
  return <SubpageLayout>{children}</SubpageLayout>
}
