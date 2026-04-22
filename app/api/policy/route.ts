import { NextRequest, NextResponse } from "next/server"
import { getPolicyByType, isPolicyType } from "@/features/policy/lib/policy.service"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const MISSING_TYPE_MESSAGE = "\uC815\uCC45 \uD0C0\uC785(type) \uD30C\uB77C\uBBF8\uD130\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4."
const INVALID_TYPE_MESSAGE = "\uC720\uD6A8\uD558\uC9C0 \uC54A\uC740 \uC815\uCC45 \uD0C0\uC785\uC785\uB2C8\uB2E4."
const INTERNAL_ERROR_MESSAGE = "\uC815\uCC45 \uC815\uBCF4\uB97C \uBD88\uB7EC\uC624\uB294 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4."

function badRequest(message: string) {
  return NextResponse.json(
    { message },
    {
      status: 400,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  )
}

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type")
  const version = request.nextUrl.searchParams.get("version") ?? undefined

  if (!type) {
    return badRequest(MISSING_TYPE_MESSAGE)
  }

  if (!isPolicyType(type)) {
    return badRequest(INVALID_TYPE_MESSAGE)
  }

  try {
    const payload = await getPolicyByType(type, version)

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    })
  } catch (error) {
    console.error("[policy-api] failed to fetch policy document", error)

    return NextResponse.json(
      {
        message: INTERNAL_ERROR_MESSAGE,
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    )
  }
}
