"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { getStepData } from "@/features/quick_coaching_guide/actions/Quick_Coaching_Guide_Actions"
import { QuickCoachingGuide_Page, type GradeLevelKey, type QuickGuideType } from "@/features/quick_coaching_guide/pages/Quick_Coaching_Guide_Page"
import { QUICK_COACHING_GUIDE_INITIAL_STEP_ID } from "@/features/quick_coaching_guide/lib/Quick_Coaching_Guide_Data"
import type { StepGroup } from "@/features/quick_coaching_guide/model/Quick_Coaching_Guide_Model"

const VALID_GRADE_LEVELS: GradeLevelKey[] = ["elementary-lower", "elementary-upper", "middle", "high"]
const VALID_TYPES: QuickGuideType[] = ["Mind", "Coaching"]

function QuickCoachingGuideInner() {
  const searchParams = useSearchParams()
  const [initialStep, setInitialStep] = useState<StepGroup | null>(null)
  const [error, setError] = useState<string | null>(null)

  const rawGrade = searchParams.get("gradeLevel")
  const rawType = searchParams.get("type")
  const gradeLevel = VALID_GRADE_LEVELS.includes(rawGrade as GradeLevelKey) ? (rawGrade as GradeLevelKey) : null
  const guideType = VALID_TYPES.includes(rawType as QuickGuideType) ? (rawType as QuickGuideType) : "Mind"

  useEffect(() => {
    getStepData(QUICK_COACHING_GUIDE_INITIAL_STEP_ID, guideType)
      .then(setInitialStep)
      .catch((e) => setError(e.message))
  }, [guideType])

  if (error) {
    return (
      <section className="bg-white px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center text-red-600">{error}</div>
      </section>
    )
  }

  if (!initialStep) {
    return (
      <section className="bg-white px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center text-gray-500">로딩 중...</div>
      </section>
    )
  }

  return (
    <QuickCoachingGuide_Page
      initialStep={initialStep}
      presetGradeLevel={gradeLevel}
      guideType={guideType}
    />
  )
}

export default function QuickCoachingGuideRoutePage() {
  return (
    <Suspense>
      <QuickCoachingGuideInner />
    </Suspense>
  )
}
