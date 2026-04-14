// ------------------------------------------------------------------------------
// 화 일 명 : StepGroupMessage.tsx
// 용    도 : 하나의 Step 전체를 렌더링하는 컴포넌트. 봇 메시지, 체크포인트,
//            질문 카드, 선택 버튼, 상담 예약 CTA를 순서대로 조합하여 표시한다.
// 작성일시 : 2026-04-13 (김재국)
// 수정일시 :
// 주의사항 :
//-------------------------------------------------------------------------------

"use client"

import { cn } from "@/shared/lib/utils"
import { GuideCTA } from "./GuideCTA"
import { CheckpointCard } from "./CheckpointCard"
import { QuestionCard } from "./QuestionCard"
import type { StepGroup, StepOption } from "@/features/quick_coaching_guide/model/Quick_Coaching_Guide_Model"

interface StepGroupMessageProps {
  step: StepGroup
  selectedOption?: string
  isActive: boolean
  onSelectOption: (option: StepOption) => void
}

export function StepGroupMessage({
  step,
  selectedOption,
  isActive,
  onSelectOption,
}: StepGroupMessageProps) {
  const isAnswered = Boolean(selectedOption)

  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed whitespace-pre-line text-foreground md:text-base">{step.botMessage}</p>

      {step.checkpoint?.length ? (
        <CheckpointCard items={step.checkpoint} />
      ) : null}

      {step.questions?.length ? (
        <div className="space-y-2">
          {step.questions.map((question, index) => (
            <QuestionCard
              key={`${question.label}-${index}`}
              title={question.label}
              content={question.description}
            />
          ))}
        </div>
      ) : null}

      {step.options?.length ? (
        <div className="space-y-2">
          {step.options.map((option) => {
            const isSelected = selectedOption === option.label
            const isDisabled = !isActive || isAnswered

            return (
              <button
                key={option.label}
                type="button"
                disabled={isDisabled}
                onClick={() => onSelectOption(option)}
                className={cn(
                  "w-full rounded-2xl border px-4 py-3 text-left transition-colors",
                  option.description ? "space-y-1.5" : "",
                  isSelected
                    ? "border-[#FF7A33] bg-[#FF7A33] text-white"
                    : "border-[#D9DDE5] bg-white text-[#202940]",
                  isDisabled && !isSelected ? "opacity-70" : "hover:border-[#FDC2A3]",
                  isDisabled ? "cursor-default" : "cursor-pointer",
                )}
              >
                <p className="text-sm font-semibold leading-relaxed md:text-base">{option.label}</p>
                {option.description ? (
                  <p className={cn("text-xs leading-relaxed", isSelected ? "text-[#E7F0FF]" : "text-[#5D6783]")}>
                    {option.description}
                  </p>
                ) : null}
              </button>
            )
          })}
        </div>
      ) : null}

      {step.reservationHref && (step.options?.length ? isAnswered : true) ? (
        <GuideCTA href={step.reservationHref} />
      ) : null}
    </div>
  )
}
