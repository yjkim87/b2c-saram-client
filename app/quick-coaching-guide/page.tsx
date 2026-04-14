import { Suspense } from "react"
import { QuickCoachingGuidePage } from "@/features/quick-coaching-guide/pages/quick-coaching-guide-page"

export default function QuickCoachingGuideRoutePage() {
  return (
    <Suspense>
      <QuickCoachingGuidePage />
    </Suspense>
  )
}
