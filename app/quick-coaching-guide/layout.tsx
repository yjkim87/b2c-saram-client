import type { ReactNode } from "react"
import { SubpageLayout } from "@/shared/layout/subpage-layout"

interface QuickCoachingGuideLayoutProps {
  children: ReactNode
}

export default function QuickCoachingGuideLayout({ children }: QuickCoachingGuideLayoutProps) {
  return <SubpageLayout>{children}</SubpageLayout>
}
