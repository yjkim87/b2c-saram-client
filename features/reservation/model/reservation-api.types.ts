export interface ReservationSubmitPayload {
  targetName: string
  targetGender: "male" | "female"
  targetBirthdate: string
  targetEducation: string
  applicantRelation: string
  applicantPhone: string
  attendance: string
  mainConcern: string
  preferredSlots: { date: string; time: string }[]
}

export interface ReservationSubmitResponse {
  success: boolean
  reservationId?: string
  mssqlSeq?: number
  errorCode?: string
  errorMessage?: string
}
