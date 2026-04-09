import type { ReactNode } from "react"
import { SubpageLayout } from "@/shared/layout/subpage-layout"

interface AgeLayoutProps {
  children: ReactNode
}

export default function AgeLayout({ children }: AgeLayoutProps) {
  return <SubpageLayout>{children}</SubpageLayout>
}
