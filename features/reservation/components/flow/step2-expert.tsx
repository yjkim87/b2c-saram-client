import type { ReactNode } from "react"
import type { UseReservationFlowReturn } from "../../hooks/use-reservation-flow"

interface Step2ExpertProps {
  flow: UseReservationFlowReturn
  children: ReactNode
}

export function Step2Expert({ children }: Step2ExpertProps) {
  return <>{children}</>
}
