import type { ReactNode } from "react"
import { SubpageLayout } from "@/shared/layout/subpage-layout"

interface CenterLayoutProps {
  children: ReactNode
}

export default function CenterLayout({ children }: CenterLayoutProps) {
  return <SubpageLayout>{children}</SubpageLayout>
}
