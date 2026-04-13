export const dynamic = "force-dynamic";

// GuideChat() 대응 — Server Component
import { QuickGuideDao } from "@/features/quickguide/dao/QuickGuide_Dao"
import { GuideChat_View } from "@/features/quickguide/pages/GuideChat_View"

const quickGuideDao = new QuickGuideDao()

export default async function QuickGuideRoutePage() {
  const { contents, buttons, allButtons } = await quickGuideDao.LF_Guide_Chat_Info(1, 0)

  // ViewBag.Guide_Chat 대응 — Tables[0]
  const guideChat = contents.map((r) => r.Guide_Content)

  // ViewBag.Guide_Button 대응 — Tables[1]
  const guideButton = buttons.map((r) => r.Guide_Content)

  // ViewBag.Default_Guide_Button 대응 — Tables[2], 없으면 빈 문자열 7개
  const defaultGuideButton = allButtons.length > 0
    ? allButtons.map((r) => r.Guide_Content)
    : Array<string>(7).fill("")

  return (
    <GuideChat_View
      guideChat={guideChat}
      guideButton={guideButton}
      defaultGuideButton={defaultGuideButton}
    />
  )
}
