import type { ReactNode } from "react"
import { SubpageLayout } from "@/shared/layout/subpage-layout"

interface StoryLayoutProps {
  children: ReactNode
}

export default function StoryLayout({ children }: StoryLayoutProps) {
  return <SubpageLayout>{children}</SubpageLayout>
}
