import type { StepGroup, StepOption } from "@/features/quick-coaching-guide/data/quickGuideData"
import { cn } from "@/shared/lib/utils"
import { GuideCTA } from "./GuideCTA"

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
        <article className="space-y-2 rounded-2xl border border-[#D8CEBC] bg-white p-4">
          <p className="text-sm font-semibold text-[#2F2A23]">핵심 체크포인트</p>
          <ul className="space-y-1">
            {step.checkpoint.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-foreground md:text-base">
                • {item}
              </li>
            ))}
          </ul>
        </article>
      ) : null}

      {step.questions?.length ? (
        <div className="space-y-2">
          {step.questions.map((question, index) => (
            <article key={`${question.label}-${index}`} className="rounded-xl border border-[#DFDFDF] bg-white px-3 py-2.5">
              <p className="text-sm font-semibold text-[#2D486A] md:text-base">{question.label}</p>
              <p className="mt-1 text-sm leading-relaxed whitespace-pre-line text-[#4D6E95] md:text-base">{question.description}</p>
            </article>
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
                    ? "border-[#2F79FF] bg-[#2F79FF] text-white"
                    : "border-[#D9DDE5] bg-white text-[#202940]",
                  isDisabled && !isSelected ? "opacity-70" : "hover:border-[#AFC9F8]",
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

      {step.cta ? <GuideCTA /> : null}
    </div>
  )
}
