import type { ReactNode } from "react"
import { SubpageLayout } from "@/shared/layout/subpage-layout"

interface ReviewsLayoutProps {
  children: ReactNode
}

export default function ReviewsLayout({ children }: ReviewsLayoutProps) {
  return <SubpageLayout>{children}</SubpageLayout>
}
