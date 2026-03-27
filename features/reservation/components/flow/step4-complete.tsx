import type { UseReservationFlowReturn } from "../../hooks/use-reservation-flow"
import { ReservationComplete } from "./reservation-complete"

interface Step4CompleteProps {
  flow: UseReservationFlowReturn
}

export function Step4Complete({ flow }: Step4CompleteProps) {
  return <ReservationComplete flow={flow} />
}
