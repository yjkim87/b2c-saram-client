import { Suspense } from "react"
import { ReservationPage } from "../../features/reservation/pages/reservation-page"

export default function ReservationRoute() {
  return (
    <Suspense>
      <ReservationPage />
    </Suspense>
  )
}
