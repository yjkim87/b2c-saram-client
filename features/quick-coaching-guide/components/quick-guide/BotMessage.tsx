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
