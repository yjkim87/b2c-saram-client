import type { ReactNode } from "react"
import { SubpageLayout } from "@/shared/layout/subpage-layout"

interface FaqLayoutProps {
  children: ReactNode
}

export default function FaqLayout({ children }: FaqLayoutProps) {
  return <SubpageLayout>{children}</SubpageLayout>
}
