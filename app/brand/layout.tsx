import type { ReactNode } from "react"
import { SubpageLayout } from "@/shared/layout/subpage-layout"

interface BrandLayoutProps {
  children: ReactNode
}

export default function BrandLayout({ children }: BrandLayoutProps) {
  return <SubpageLayout>{children}</SubpageLayout>
}
