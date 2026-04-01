import { ExpertsSection } from "@/features/experts/experts-section"

type SectionVariant = "preview" | "full"

interface ExpertListProps {
  variant?: SectionVariant
}

export function ExpertList({ variant = "full" }: ExpertListProps) {
  return <ExpertsSection variant={variant} />
}
