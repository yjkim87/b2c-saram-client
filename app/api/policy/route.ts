import { NextRequest, NextResponse } from "next/server"
import { getPolicyByType, isPolicyType } from "@/features/policy/lib/policy.service"

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type")
  const version = request.nextUrl.searchParams.get("version") ?? undefined

  if (!type || !isPolicyType(type)) {
    return NextResponse.json(
      {
        message: "Invalid policy type. Use privacy or terms.",
      },
      { status: 400 }
    )
  }

  try {
    const policy = await getPolicyByType(type, version)

    return NextResponse.json(policy)
  } catch {
    return NextResponse.json(
      {
        message: "Failed to fetch policy data.",
      },
      { status: 500 }
    )
  }
}
