interface UserMessageProps {
  content: string
}

export function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="animate-in fade-in-0 slide-in-from-right-4 flex justify-end duration-300">
      <div className="max-w-[85%] rounded-[20px] rounded-tr-[5px] bg-[linear-gradient(144.37deg,#FFB836_7.06%,#F57220_90.82%)] px-4 py-3 text-white">
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words md:text-base">{content}</p>
      </div>
    </div>
  )
}
