// Next.js는 빌드 시점에 페이지를 정적으로 pre-render 하려 하지만 이 페이지는 LF_Guide_Chat_Info()로 DB를 직접 조회하므로 빌드 시점에는 DB 연결 컨텍스트가 없어 prerender 에러가 발생함.
// "force-dynamic"으로 설정하면 빌드 시 정적 생성을 건너뛰고 매 요청 시마다 서버에서 렌더링하여 DB 조회가 정상 동작함.
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
