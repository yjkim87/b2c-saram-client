import type { ReactNode } from "react"
import type { UseReservationFlowReturn } from "../../hooks/use-reservation-flow"

interface Step3ScheduleProps {
  flow: UseReservationFlowReturn
  children: ReactNode
}

export function Step3Schedule({ children }: Step3ScheduleProps) {
  return <>{children}</>
}
