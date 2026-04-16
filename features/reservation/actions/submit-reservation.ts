"use server"

import type { ReservationSubmitPayload, ReservationSubmitResponse } from "../model/reservation-api.types"

export async function submitReservation(
  payload: ReservationSubmitPayload
): Promise<ReservationSubmitResponse> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/reservation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        errorCode: data.errorCode || "API_ERROR",
        errorMessage: data.errorMessage || "예약 처리 중 오류가 발생했습니다.",
      }
    }

    return data as ReservationSubmitResponse
  } catch (error) {
    console.error("[submitReservation] Error:", error)
    return {
      success: false,
      errorCode: "NETWORK_ERROR",
      errorMessage: "서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.",
    }
  }
}
