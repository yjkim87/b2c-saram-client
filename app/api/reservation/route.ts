import { NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.B2C_API_URL || "http://localhost:5000"

interface PreferredSlot {
  date: string
  time: string
}

interface ReservationPayload {
  targetName: string
  targetGender: string
  targetBirthdate: string
  targetEducation: string
  applicantRelation: string
  applicantPhone: string
  attendance: string
  mainConcern: string
  preferredSlots: PreferredSlot[]
}

export async function POST(request: NextRequest) {
  try {
    const body: ReservationPayload = await request.json()

    if (!body.targetName?.trim()) {
      return NextResponse.json(
        { success: false, errorCode: "VALIDATION", errorMessage: "이름을 입력해주세요." },
        { status: 400 }
      )
    }

    if (!body.applicantPhone?.trim()) {
      return NextResponse.json(
        { success: false, errorCode: "VALIDATION", errorMessage: "연락처를 입력해주세요." },
        { status: 400 }
      )
    }

    if (!body.preferredSlots || body.preferredSlots.length < 2) {
      return NextResponse.json(
        { success: false, errorCode: "VALIDATION", errorMessage: "희망 일시를 2개 이상 선택해주세요." },
        { status: 400 }
      )
    }

    const apiPayload = {
      targetName: body.targetName.trim(),
      targetGender: body.targetGender,
      targetBirthdate: body.targetBirthdate,
      targetEducation: body.targetEducation,
      applicantRelation: body.applicantRelation,
      applicantPhone: body.applicantPhone.replace(/-/g, ""),
      attendance: body.attendance,
      mainConcern: body.mainConcern,
      preferredSlots: body.preferredSlots.map((s) => ({
        date: s.date,
        time: s.time,
      })),
    }

    const response = await fetch(`${API_BASE_URL}/api/reservation/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiPayload),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          errorCode: data.errorCode || "API_ERROR",
          errorMessage: data.errorMessage || "예약 처리 중 오류가 발생했습니다.",
        },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("[reservation/route] Error:", error)
    return NextResponse.json(
      {
        success: false,
        errorCode: "NETWORK_ERROR",
        errorMessage: "서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.",
      },
      { status: 500 }
    )
  }
}
