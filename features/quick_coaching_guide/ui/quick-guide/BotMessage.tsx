// ------------------------------------------------------------------------------
// 화 일 명 : BotMessage.tsx
// 용    도 : 봇(코칭가이드) 말풍선 컴포넌트. 타이핑 중일 때는 점 애니메이션을 표시하고
//            내용이 있을 때는 말풍선 안에 전달받은 콘텐츠를 렌더링한다.
// 작성일시 : 2026-04-13 (김재국)
// 수정일시 :
// 주의사항 :
//-------------------------------------------------------------------------------

import type { ReactNode } from "react"
import { Sprout } from "lucide-react"

interface BotMessageProps {
  content?: ReactNode
  isTyping?: boolean
}

function BotAvatar() {
  return (
    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(144.37deg,#5CCDFF_7.06%,#3E72FF_90.82%)]">
      <Sprout className="h-4 w-4 text-white" />
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex w-fit items-center gap-1 rounded-[20px] rounded-tl-[5px] bg-[#F4FAFF] px-4 py-3">
      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "0ms" }} />
      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "150ms" }} />
      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "300ms" }} />
    </div>
  )
}

export function BotMessage({ content, isTyping = false }: BotMessageProps) {
  if (isTyping) {
    return (
      <div className="animate-in fade-in-0 slide-in-from-left-4 duration-300">
        <div className="flex items-start gap-2.5">
          <BotAvatar />
          <TypingIndicator />
        </div>
      </div>
    )
  }

  return (
    <div className="animate-in fade-in-0 slide-in-from-left-4 duration-300">
      <div className="flex items-start gap-2.5">
        <BotAvatar />
        <div className="w-fit max-w-[calc(100%-3.25rem)] rounded-[20px] rounded-tl-[5px] bg-[#F4FAFF] px-4 py-3 sm:max-w-[85%]">
          {typeof content === "string" ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words text-foreground md:text-base">{content}</p>
          ) : (
            content
          )}
        </div>
      </div>
    </div>
  )
}
