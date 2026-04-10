// Ajax_Guide_Chat_Info 대응
import { NextRequest, NextResponse } from "next/server"
import { QuickGuideDao } from "@/features/quickguide/dao/QuickGuideDao"

const quickGuideDao = new QuickGuideDao()

export async function POST(request: NextRequest) {
  try {
    const { Step, Select_Num } = await request.json() as { Step: number; Select_Num: number }
    const { contents, buttons } = await quickGuideDao.LF_Guide_Chat_Info(Step, Select_Num)
    return NextResponse.json({
      guideChat:   contents.map((r) => r.Guide_Content),
      guideButton: buttons.map((r) => r.Guide_Content),
    })
  } catch (e) {
    const err = e as Error
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
