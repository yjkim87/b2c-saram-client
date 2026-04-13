"use server"

// Ajax_Guide_Chat_Info 대응
import { QuickGuideDao } from "@/features/quickguide/dao/QuickGuide_Dao"

const quickGuideDao = new QuickGuideDao()

export async function getGuideChatInfo(step: number, selectNum: number) {
  try {
    const { contents, buttons } = await quickGuideDao.LF_Guide_Chat_Info(step, selectNum)
    return {
      guideChat:   contents.map((r) => r.Guide_Content),
      guideButton: buttons.map((r) => r.Guide_Content),
    }
  } catch (e) {
    const err = e as Error
    throw new Error(`채팅 정보 조회 오류: ${err.message}`)
  }
}
