// ------------------------------------------------------------------------------
// 화 일 명 : UserMessage.tsx
// 용    도 : 사용자(자녀 학부모) 말풍선 컴포넌트. 버튼 선택 시 우측에 표시된다.
// 작성일시 : 2026-04-13 (김재국)
// 수정일시 :
// 주의사항 :
//-------------------------------------------------------------------------------

interface UserMessageProps {
  content: string
}

export function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="animate-in fade-in-0 slide-in-from-right-4 flex justify-end duration-300">
      <div className="max-w-[85%] rounded-[20px] rounded-tr-[5px] bg-[linear-gradient(144.37deg,#5CCDFF_7.06%,#3E72FF_90.82%)] px-4 py-3 text-white">
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words md:text-base">{content}</p>
      </div>
    </div>
  )
}
