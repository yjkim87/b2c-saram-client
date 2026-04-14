"use client"

import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { BotMessage, StepGroupMessage, UserMessage } from "@/features/quick-coaching-guide/components/quick-guide"
import {
  QUICK_GUIDE_DATA,
  QUICK_GUIDE_INITIAL_STEP_ID,
  QUICK_GUIDE_PAGE_CONTENT,
  getQuickGuideGradeDetailStepId,
  type QuickGuideGradeLevelKey,
  type StepGroup,
  type StepOption,
} from "@/features/quick-coaching-guide/data/quickGuideData"

const TYPING_DELAY_MS = 850

export function QuickCoachingGuidePage() {
  const searchParams = useSearchParams()
  const stepGroupById = useMemo(
    () => Object.fromEntries(QUICK_GUIDE_DATA.map((group) => [group.id, group])) as Record<string, StepGroup>,
    [],
  )
  const presetGradeLevel = useMemo(() => {
    const raw = searchParams.get("gradeLevel")
    if (!raw) return null

    if (raw === "elementary-lower" || raw === "elementary-upper" || raw === "middle" || raw === "high") {
      return raw as QuickGuideGradeLevelKey
    }

    return null
  }, [searchParams])
  const initialStepId = useMemo(() => {
    if (!presetGradeLevel) {
      return QUICK_GUIDE_INITIAL_STEP_ID
    }

    return getQuickGuideGradeDetailStepId(presetGradeLevel)
  }, [presetGradeLevel])
  const presetRootSelection = useMemo(() => {
    if (!presetGradeLevel || initialStepId === QUICK_GUIDE_INITIAL_STEP_ID) {
      return null
    }

    const rootStep = stepGroupById[QUICK_GUIDE_INITIAL_STEP_ID]
    return rootStep?.options?.find((option) => option.nextStep === initialStepId)?.label ?? null
  }, [initialStepId, presetGradeLevel, stepGroupById])

  const [currentStepId, setCurrentStepId] = useState(initialStepId)
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
    if (!stepGroupById[initialStepId]) {
      setIsTyping(false)
      return
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (presetRootSelection) {
        setVisibleStepIds([QUICK_GUIDE_INITIAL_STEP_ID, initialStepId])
        setSelectedAnswers([presetRootSelection])
        setCurrentStepIndex(1)
        setCurrentStepId(initialStepId)
      } else {
        setVisibleStepIds([initialStepId])
        setSelectedAnswers([])
        setCurrentStepIndex(0)
        setCurrentStepId(initialStepId)
      }
      setIsTyping(false)
      typingTimeoutRef.current = null
    }, TYPING_DELAY_MS)

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
        typingTimeoutRef.current = null
      }
    }
  }, [initialStepId, presetRootSelection, stepGroupById])

  const handleSelectOption = (stepIndex: number, stepId: string, option: StepOption) => {
    if (isTyping || !currentStep || stepId !== currentStepId) {
      return
    }

    if (selectedAnswers[stepIndex]) {
      return
    }

    setSelectedAnswers((prev) => [...prev, option.label])
    const nextStepId = option.nextStep

    if (!nextStepId || !stepGroupById[nextStepId]) {
      return
    }

    setIsTyping(true)

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      setVisibleStepIds((prev) => {
        if (prev.includes(nextStepId)) {
          return prev
        }
        return [...prev, nextStepId]
      })
      setCurrentStepIndex((prev) => prev + 1)
      setCurrentStepId(nextStepId)
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
