"use client"

import { useReservationFlow } from "../hooks/use-reservation-flow"
import { ReservationFlow } from "../components/flow/reservation-flow"
import { Step4Complete } from "../components/flow/step4-complete"

export function ReservationPage() {
  const flow = useReservationFlow()

  if (flow.isComplete) {
    return <Step4Complete flow={flow} />
  }

  return <ReservationFlow flow={flow} />
}
