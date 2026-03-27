import type { ReactNode } from "react"
import type { UseReservationFlowReturn } from "../../hooks/use-reservation-flow"

interface Step1ServiceProps {
  flow: UseReservationFlowReturn
  children: ReactNode
}

export function Step1Service({ children }: Step1ServiceProps) {
  return <>{children}</>
}
