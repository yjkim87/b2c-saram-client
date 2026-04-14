// ------------------------------------------------------------------------------
// 화 일 명 : Quick_Coaching_Guide_Page.tsx
// 용    도 : 퀵코칭가이드 채팅 페이지 (버튼 클릭 시 Server Action을 호출하여 다음 Step 데이터를 가져오고 상태(state)를 업데이트하여 화면을 순차적으로 렌더링)
// 작성일시 : 2026-04-13 (김재국)
// 수정일시 : 
// 주의사항 :
//-------------------------------------------------------------------------------

"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import { BotMessage, StepGroupMessage, UserMessage } from "@/features/quick_coaching_guide/ui"
import { getStepData } from "@/features/quick_coaching_guide/actions/Quick_Coaching_Guide_Actions"
import { QUICK_COACHING_GUIDE_INITIAL_STEP_ID } from "@/features/quick_coaching_guide/lib/Quick_Coaching_Guide_Data"
import type { StepGroup, StepOption } from "@/features/quick_coaching_guide/model/Quick_Coaching_Guide_Model"

const TYPING_DELAY_MS = 850

interface QuickCoachingGuidePageProps {
  initialStep: StepGroup
}

export function QuickCoachingGuide_Page({ initialStep }: QuickCoachingGuidePageProps) {
  const [stepCache, setStepCache]             = useState<Record<string, StepGroup>>({ [initialStep.id]: initialStep })
  const [currentStepId, setCurrentStepId]     = useState(QUICK_COACHING_GUIDE_INITIAL_STEP_ID)
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [visibleStepIds, setVisibleStepIds]    = useState<string[]>([])
  const [selectedAnswers, setSelectedAnswers]  = useState<string[]>([])
  const [isTyping, setIsTyping]                = useState(true)
  const chatEndRef                             = useRef<HTMLDivElement | null>(null)
  const selectedAnswerRefs                     = useRef<Array<HTMLDivElement | null>>([])
  const typingTimeoutRef                       = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const isMobileView = window.innerWidth < 1024

    if (isMobileView && selectedAnswers.length > 0) {
      const lastSelectedAnswerEl = selectedAnswerRefs.current[selectedAnswers.length - 1]
      if (lastSelectedAnswerEl) {
        const headerOffset = 94
        const nextTop = lastSelectedAnswerEl.getBoundingClientRect().top + window.scrollY - headerOffset
        window.scrollTo({ top: Math.max(0, nextTop), behavior: "smooth" })
        return
      }
    }

    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [visibleStepIds, selectedAnswers, isTyping])

  // 첫 스텝 타이핑 애니메이션
  useEffect(() => {
    typingTimeoutRef.current = setTimeout(() => {
      setVisibleStepIds([QUICK_COACHING_GUIDE_INITIAL_STEP_ID])
      setCurrentStepIndex(0)
      setCurrentStepId(QUICK_COACHING_GUIDE_INITIAL_STEP_ID)
      setIsTyping(false)
      typingTimeoutRef.current = null
    }, TYPING_DELAY_MS)

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
        typingTimeoutRef.current = null
      }
    }
  }, [])

  const handleSelectOption = async (stepIndex: number, stepId: string, option: StepOption) => {
    if (isTyping || stepId !== currentStepId) return
    if (selectedAnswers[stepIndex]) return

    setSelectedAnswers((prev) => [...prev, option.label])
    setIsTyping(true)

    try {
      let nextStep = stepCache[option.nextStep]
      if (!nextStep) {
        nextStep = await getStepData(option.nextStep)
        setStepCache((prev) => ({ ...prev, [option.nextStep]: nextStep! }))
      }

      setVisibleStepIds((prev) => {
        if (prev.includes(option.nextStep)) return prev
        return [...prev, option.nextStep]
      })
      setCurrentStepIndex((prev) => prev + 1)
      setCurrentStepId(option.nextStep)
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <section className="bg-white px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-10">
          <h1 className="text-[30px] font-bold text-[#1F1F1F]">퀵코칭가이드</h1>
          <p className="mt-2 text-[18px] font-normal text-[#3D372F]">현재 자녀의 학년과 고민 맥락을 바탕으로 코칭 가이드를 채팅 흐름으로 확인해보세요.</p>
        </section>

        <div className="mx-auto max-w-5xl min-w-0 space-y-4">
          {visibleStepIds.slice(0, currentStepIndex + 1).map((stepId, stepIndex) => {
            const step = stepCache[stepId]
            if (!step) return null

            const selectedAnswer = selectedAnswers[stepIndex]

            return (
              <Fragment key={`${stepId}-${stepIndex}`}>
                <BotMessage
                  content={
                    <StepGroupMessage
                      step={step}
                      selectedOption={selectedAnswer}
                      isActive={step.id === currentStepId && !isTyping}
                      onSelectOption={(option) => handleSelectOption(stepIndex, step.id, option)}
                    />
                  }
                />
                {selectedAnswer ? (
                  <div
                    ref={(el) => {
                      selectedAnswerRefs.current[stepIndex] = el
                    }}
                  >
                    <UserMessage content={selectedAnswer} />
                  </div>
                ) : null}
              </Fragment>
            )
          })}
          {isTyping ? <BotMessage isTyping /> : null}
          <div ref={chatEndRef} />
        </div>
      </div>
    </section>
  )
}
