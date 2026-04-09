import { CenterSection as HomeCenterSection } from "@/features/home/sections/center-section"

type SectionVariant = "preview" | "full"

interface CenterSectionProps {
  variant?: SectionVariant
}

// Deprecated: use features/home/sections/center-section or features/center/pages/center-page.
export function CenterSection({ variant = "full" }: CenterSectionProps) {
  return <HomeCenterSection key={variant} />
}
