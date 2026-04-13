"use client"

import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import { BotMessage, StepGroupMessage, UserMessage } from "@/features/quick-coaching-guide/components/quick-guide"
import {
  QUICK_GUIDE_DATA,
  QUICK_GUIDE_INITIAL_STEP_ID,
  QUICK_GUIDE_PAGE_CONTENT,
  type StepGroup,
  type StepOption,
} from "@/features/quick-coaching-guide/data/quickGuideData"

const TYPING_DELAY_MS = 850

export function QuickCoachingGuidePage() {
  const stepGroupById = useMemo(
    () => Object.fromEntries(QUICK_GUIDE_DATA.map((group) => [group.id, group])) as Record<string, StepGroup>,
    [],
  )

  const [currentStepId, setCurrentStepId] = useState(QUICK_GUIDE_INITIAL_STEP_ID)
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [visibleStepIds, setVisibleStepIds] = useState<string[]>([])
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(true)
  const chatEndRef = useRef<HTMLDivElement | null>(null)
  const selectedAnswerRefs = useRef<Array<HTMLDivElement | null>>([])
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const currentStep = stepGroupById[currentStepId]

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

  useEffect(() => {
    if (!stepGroupById[QUICK_GUIDE_INITIAL_STEP_ID]) {
      setIsTyping(false)
      return
    }

    typingTimeoutRef.current = setTimeout(() => {
      setVisibleStepIds([QUICK_GUIDE_INITIAL_STEP_ID])
      setCurrentStepIndex(0)
      setCurrentStepId(QUICK_GUIDE_INITIAL_STEP_ID)
      setIsTyping(false)
      typingTimeoutRef.current = null
    }, TYPING_DELAY_MS)

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
        typingTimeoutRef.current = null
      }
    }
  }, [stepGroupById])

  const handleSelectOption = (stepIndex: number, stepId: string, option: StepOption) => {
    if (isTyping || !currentStep || stepId !== currentStepId) {
      return
    }

    if (selectedAnswers[stepIndex]) {
      return
    }

    if (!stepGroupById[option.nextStep]) {
      return
    }

    setSelectedAnswers((prev) => [...prev, option.label])
    setIsTyping(true)

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      setVisibleStepIds((prev) => {
        if (prev.includes(option.nextStep)) {
          return prev
        }
        return [...prev, option.nextStep]
      })
      setCurrentStepIndex((prev) => prev + 1)
      setCurrentStepId(option.nextStep)
      setIsTyping(false)
      typingTimeoutRef.current = null
    }, TYPING_DELAY_MS)
  }

  return (
    <section className="bg-white px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-10">
          <h1 className="text-[30px] font-bold text-[#1F1F1F]">{QUICK_GUIDE_PAGE_CONTENT.title}</h1>
          <p className="mt-2 text-[18px] font-normal text-[#3D372F]">{QUICK_GUIDE_PAGE_CONTENT.description}</p>
        </section>

        <div className="mx-auto max-w-5xl min-w-0 space-y-4">
          {visibleStepIds.slice(0, currentStepIndex + 1).map((stepId, stepIndex) => {
            const step = stepGroupById[stepId]
            if (!step) {
              return null
            }

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
