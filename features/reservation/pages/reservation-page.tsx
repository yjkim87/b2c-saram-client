"use client"

import { useSearchParams } from "next/navigation"
import type { UseReservationFlowReturn } from "../hooks/use-reservation-flow"
import { useReservationFlow } from "../hooks/use-reservation-flow"
import { ReservationFlow } from "../components/flow/reservation-flow"
import { Step4Complete } from "../components/flow/step4-complete"

const COMPLETE_PREVIEW_FLOW = {
  ageGroup: "elementary",
  userInfo: {
    name: "홍길동",
    relationship: "자녀",
    birthdate: "2016-04-24",
    gender: "남성",
  },
  attendance: "both",
  selectedSchedules: [
    { date: "2026-04-24", time: "19:00" },
    { date: "2026-04-24", time: "20:00" },
  ],
  concernTheme: "아이가 학습 계획을 자주 미루고, 부모와 대화할 때 감정 충돌이 반복됩니다.",
  phoneNumber: "010-1234-5678",
  getAgeGroupLabel: (ageGroup: "infant" | "elementary" | "middle" | "high" | "adult") => {
    const labels = {
      infant: "영유아·미취학",
      elementary: "초등학생",
      middle: "중학생",
      high: "고등학생",
      adult: "성인",
    } as const
    return labels[ageGroup]
  },
  formatScheduleDisplay: (schedule: { date: string; time: string }) => {
    const [, month, day] = schedule.date.split("-")
    return `${parseInt(month, 10)}/${parseInt(day, 10)} ${schedule.time}`
  },
} as unknown as UseReservationFlowReturn

export function ReservationPage() {
  const flow = useReservationFlow()
  const searchParams = useSearchParams()
  const isCompletePreview = process.env.NODE_ENV === "development" && searchParams.get("preview") === "complete"

  if (isCompletePreview) {
    return <Step4Complete flow={COMPLETE_PREVIEW_FLOW} />
  }

  if (flow.isComplete) {
    return <Step4Complete flow={flow} />
  }

  return <ReservationFlow flow={flow} />
}
