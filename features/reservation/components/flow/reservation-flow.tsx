"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import {
  ArrowUp,
  Check,
  Phone,
  RotateCcw,
  X,
} from "lucide-react"
import { usePolicyDocument } from "@/features/policy/hooks/use-policy-document"
import { buildPolicyHtmlModel } from "@/features/policy/lib/policy-html"
import { Button } from "@/shared/ui/button"
import { FieldLabel } from "@/shared/ui/field-label"
import { cn } from "@/shared/lib/utils"
import { Footer } from "@/shared/layout/footer"
import type { UseReservationFlowReturn } from "../../hooks/use-reservation-flow"
import { genders, relationships } from "../../data/reservation.constants"
import type { AgeGroup, Gender } from "../../model/reservation.types"
import { BotMessage, CalendarPicker } from "../shared/reservation-primitives"
import { Step1Service } from "./step1-service"
import { Step2Expert } from "./step2-expert"
import { Step3Schedule } from "./step3-schedule"

const LOGO_IMAGE_URL = "/saramme_logo.png"

interface ReservationFlowProps {
  flow: UseReservationFlowReturn
}

interface AttendanceOptionButtonProps {
  isSelected: boolean
  onClick: () => void
  children: ReactNode
}

interface EditableUserMessageProps {
  content: string
  onEdit: () => void
}

interface BackStepButtonProps {
  onClick: () => void
  className?: string
}

const STEP1_TYPING_DELAY_MS = 1200
const RIGHT_BUBBLE_GRADIENT_CLASS = "bg-[linear-gradient(144.37deg,#FFB836_7.06%,#F57220_90.82%)]"
const RIGHT_INTERACTIVE_PANEL_CLASS = "w-full max-w-md rounded-[20px] rounded-tr-[5px] border border-[#DFDFDF] bg-white"
const WIDE_INTERACTIVE_PANEL_CLASS = "w-full max-w-md rounded-[20px] border border-[#DFDFDF] bg-white"
const CONCERN_THEME_PLACEHOLDERS = {
  elementaryLower: "예: 아이가 도와주면 의존하고, 혼자 하라 하면 더 느려지는 것 같아요. 아이의 성향에 맞는 학습/양육 방법을 알고 싶어요.",
  elementaryUpper: "예: 아이가 뭔가 좋아하는 건 있는데, 공부와 어떻게 연결해야 할지 모르겠어요.",
  middle: "예: 제가 도와주려 하면 간섭이라고 해요. 그렇다고 놔두면 아무것도 안 해요. 어떻게 소통해야 할지 막막해요.",
  high: "예: 제 방식으로 도와주려 하면 아이가 답답해해요. 아이의 성향에 맞춰 효과적으로 조력하고 싶어요.",
} as const

function getAgeFromBirthdate(birthdate: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(birthdate)

  if (!match) {
    return null
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const now = new Date()

  let age = now.getFullYear() - year
  const hasBirthdayPassed = now.getMonth() + 1 > month || (now.getMonth() + 1 === month && now.getDate() >= day)

  if (!hasBirthdayPassed) {
    age -= 1
  }

  return age
}

function getConcernThemePlaceholder(ageGroup: AgeGroup | null, birthdate: string) {
  if (ageGroup === "middle") {
    return CONCERN_THEME_PLACEHOLDERS.middle
  }

  if (ageGroup === "high" || ageGroup === "adult") {
    return CONCERN_THEME_PLACEHOLDERS.high
  }

  if (ageGroup === "elementary") {
    const age = getAgeFromBirthdate(birthdate)

    if (age !== null && age <= 10) {
      return CONCERN_THEME_PLACEHOLDERS.elementaryLower
    }

    return CONCERN_THEME_PLACEHOLDERS.elementaryUpper
  }

  return CONCERN_THEME_PLACEHOLDERS.elementaryLower
}

function AttendanceOptionButton({ isSelected, onClick, children }: AttendanceOptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full rounded-[18px] border px-4 py-5 text-left transition-all duration-200",
        isSelected
          ? "border-[#8FB3E8] bg-[#FFF7EF]"
          : "border-[#DFDFDF] bg-[#FFF7EF] hover:border-[#C9D7EE] hover:bg-[#FFEBD7]",
      )}
    >
      {children}
    </button>
  )
}

function EditableUserMessage({ content, onEdit }: EditableUserMessageProps) {
  return (
    <div className="flex justify-end items-end gap-2 animate-in fade-in-0 slide-in-from-right-4 duration-300">
      <button type="button" onClick={onEdit} className="cursor-pointer px-1 text-sm text-[#6E6352] hover:text-[#4F4537]">
        {"\uC218\uC815"}
      </button>
      <div
        className={cn(
          RIGHT_BUBBLE_GRADIENT_CLASS,
          "text-white rounded-[20px] rounded-tr-[5px] px-4 py-3 max-w-[calc(100%-2.5rem)] sm:max-w-[85%]",
        )}
      >
        <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">{content}</p>
      </div>
    </div>
  )
}

function BackStepButton({ onClick, className }: BackStepButtonProps) {
  return (
    <Button
      type="button"
      variant="default"
      onClick={onClick}
      className={cn(
        "h-[50px] rounded-[0.7rem] border-0 bg-[#DFDFDF] px-5 text-[18px] font-semibold text-[#0C0C0C] shadow-none hover:bg-[#D4D4D4] hover:text-[#0C0C0C]",
        className,
      )}
    >
      {"\uC774\uC804\uC73C\uB85C"}
    </Button>
  )
}

function getAttendanceLabel(attendance: UseReservationFlowReturn["attendance"]) {
  if (attendance === "both") {
    return "\uBD80\uBAA8\uC640 \uC790\uB140 \uBAA8\uB450 \uCC38\uC11D"
  }

  if (attendance === "child") {
    return "\uC790\uB140\uB9CC \uCC38\uC11D"
  }

  if (attendance === "parent") {
    return "\uBD80\uBAA8\uB9CC \uCC38\uC11D"
  }

  if (attendance === "self") {
    return "\uBCF8\uC778\uB9CC \uCC38\uC11D (\uAC1C\uC778 \uC0C1\uB2F4 \uBC0F \uCF54\uCE6D)"
  }

  return "-"
}

export function ReservationFlow({ flow }: ReservationFlowProps) {
  const router = useRouter()
  const {
    step,
    isTyping,
    showContent,
    messagesEndRef,
    userInfo,
    birthdateInput,
    birthdateError,
    ageGroup,
    attendance,
    concernTheme,
    showNudge,
    selectedSchedules,
    phoneNumber,
    privacyConsent,
    showPrivacyModal,
    setUserInfo,
    setPhoneNumber,
    setConcernTheme,
    setPrivacyConsent,
    setShowPrivacyModal,
    goToNextStep,
    goToPrevStep,
    goToStep,
    resetAll,
    handleBirthdateChange,
    handleBirthdateBlur,
    handleAttendanceSelect,
    handleNudgeResponse,
    handleScheduleSelect,
    removeSchedule,
    formatScheduleDisplay,
    handleSubmit,
    isSubmitting,
    submitError,
    formatPhoneNumber,
    isStep1Valid,
  } = flow

  const { activeState: privacyPolicyState, fetchCurrent: fetchPrivacyPolicy } = usePolicyDocument("privacy")
  const privacyPolicyHtml = useMemo(() => {
    if (privacyPolicyState.status !== "success" || !privacyPolicyState.data) {
      return ""
    }

    return buildPolicyHtmlModel(privacyPolicyState.data.content).html
  }, [privacyPolicyState.data, privacyPolicyState.status])

  const [nameDraft, setNameDraft] = useState(userInfo.name)
  const headerRef = useRef<HTMLElement>(null)
  const mobileStepHeaderRef = useRef<HTMLDivElement>(null)
  const step2StartRef = useRef<HTMLDivElement>(null)
  const step3StartRef = useRef<HTMLDivElement>(null)
  const step4StartRef = useRef<HTMLDivElement>(null)
  const step5StartRef = useRef<HTMLDivElement>(null)
  const step1LatestUserBubbleRef = useRef<HTMLDivElement>(null)
  const step1LatestBotBubbleRef = useRef<HTMLDivElement>(null)
  const step1AnswerRef = useRef<HTMLDivElement>(null)
  const step2AnswerRef = useRef<HTMLDivElement>(null)
  const step3AnswerRef = useRef<HTMLDivElement>(null)
  const step4AnswerRef = useRef<HTMLDivElement>(null)
  const [showExitModal, setShowExitModal] = useState(false)
  const [editingField, setEditingField] = useState<"name" | "relationship" | "birthdate" | "gender" | null>(null)
  const [isMobileStepCompact, setIsMobileStepCompact] = useState(false)
  const [isRelationshipPromptReady, setIsRelationshipPromptReady] = useState(false)
  const [isBirthdatePromptReady, setIsBirthdatePromptReady] = useState(false)
  const [isGenderPromptReady, setIsGenderPromptReady] = useState(false)
  const [isNudgePromptReady, setIsNudgePromptReady] = useState(false)
  const relationshipPromptTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const birthdatePromptTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const genderPromptTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const nudgePromptTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isOnlyKoreanJamo = (value: string) => /^[\u3131-\u314e\u314f-\u3163]+$/.test(value)
  const isValidName = (value: string) => {
    const trimmed = value.trim()
    return trimmed.length >= 2 && !isOnlyKoreanJamo(trimmed)
  }
  const [otherRelationshipDraft, setOtherRelationshipDraft] = useState("")
  const isPresetRelationship = (value: string) => value === "\uBCF8\uC778" || value === "\uBD80\uBAA8"
  const isCustomRelationship = (value: string) => value.trim().length > 0 && !isPresetRelationship(value)

  useEffect(() => {
    setNameDraft(userInfo.name)
  }, [userInfo.name])

  useEffect(() => {
    let frameId: number | null = null

    const updateCompactState = () => {
      const isMobile = window.innerWidth < 1024
      const shouldCompact = isMobile && window.scrollY > 40
      setIsMobileStepCompact((prev) => (prev === shouldCompact ? prev : shouldCompact))
      frameId = null
    }

    const handleScroll = () => {
      if (frameId !== null) {
        return
      }
      frameId = window.requestAnimationFrame(updateCompactState)
    }

    updateCompactState()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  const handleNameSubmit = () => {
    const trimmedName = nameDraft.trim()
    if (!isValidName(trimmedName)) {
      return
    }

    setUserInfo((prev) => ({ ...prev, name: trimmedName }))
    setEditingField(null)
  }

  const handleOtherRelationshipSubmit = () => {
    const trimmed = otherRelationshipDraft.trim()
    if (trimmed.length === 0) {
      return
    }

    setUserInfo((prev) => ({ ...prev, relationship: trimmed }))
    setOtherRelationshipDraft(trimmed)
    setEditingField(null)
  }

  const isBothSelected = attendance === "both"
  const isAdultTarget = ageGroup === "adult"
  const hasNameAnswer = isValidName(userInfo.name)
  const hasRelationshipAnswer = Boolean(userInfo.relationship)
  const hasBirthdateAnswer =
    userInfo.birthdate.length === 10 && birthdateError === null && userInfo.birthdate === birthdateInput
  const hasGenderAnswer = Boolean(userInfo.gender)
  const isConcernThemeValid = concernTheme.trim().length > 0
  const concernThemePlaceholder = useMemo(
    () => getConcernThemePlaceholder(ageGroup, userInfo.birthdate),
    [ageGroup, userInfo.birthdate],
  )
  const stepLabels = ["\uC815\uBCF4\uC785\uB825", "\uCC38\uC11D\uC790", "\uACE0\uBBFC\uD14C\uB9C8", "\uC77C\uC815", "\uC5F0\uB77D\uCC98"]
  const totalSteps = stepLabels.length
  const currentStep = Math.min(step, totalSteps)
  const currentStepLabel = stepLabels[currentStep - 1] ?? stepLabels[0]
  const progressPercent = (currentStep / totalSteps) * 100
  const isEditingName = editingField === "name"
  const isEditingRelationship = editingField === "relationship"
  const isEditingBirthdate = editingField === "birthdate"
  const isEditingGender = editingField === "gender"
  const canShowRelationshipQuestion = hasNameAnswer && !isEditingName
  const canShowBirthdateQuestion = canShowRelationshipQuestion && hasRelationshipAnswer && !isEditingRelationship
  const canShowGenderQuestion = canShowBirthdateQuestion && hasBirthdateAnswer && !isEditingBirthdate
  const getScrollTopWithOffsets = (
    target: HTMLElement,
    options?: {
      mobileContextPeek?: number
      desktopContextPeek?: number
    },
  ) => {
    const isMobileView = window.innerWidth < 1024
    const headerHeight = headerRef.current?.offsetHeight ?? (window.innerWidth >= 768 ? 78 : 64)
    const mobileStepHeaderHeight = isMobileView ? (mobileStepHeaderRef.current?.offsetHeight ?? 0) : 0
    const spacing = isMobileView ? 16 : 24
    const contextPeekOffset = isMobileView ? (options?.mobileContextPeek ?? 56) : (options?.desktopContextPeek ?? 72)
    const mobileSafeOffset = isMobileView ? 28 : 0
    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      (headerHeight + mobileStepHeaderHeight + spacing + contextPeekOffset + mobileSafeOffset)

    return Math.max(0, top)
  }

  const scrollTargetWithOffsets = (
    target: HTMLElement,
    options?: {
      mobileContextPeek?: number
      desktopContextPeek?: number
      settleDelayMs?: number
      disableSettle?: boolean
    },
  ) => {
    window.scrollTo({
      top: getScrollTopWithOffsets(target, options),
      behavior: "smooth",
    })

    if (options?.disableSettle) {
      return () => {}
    }

    const settleTimerId = window.setTimeout(() => {
      window.scrollTo({
        top: getScrollTopWithOffsets(target, options),
        behavior: "auto",
      })
    }, options?.settleDelayMs ?? 220)

    return () => {
      window.clearTimeout(settleTimerId)
    }
  }

  useEffect(() => {
    if (isEditingBirthdate && hasBirthdateAnswer) {
      setEditingField(null)
    }
  }, [isEditingBirthdate, hasBirthdateAnswer])

  useEffect(() => {
    if (!canShowRelationshipQuestion) {
      setIsRelationshipPromptReady(false)
      if (relationshipPromptTimerRef.current) {
        clearTimeout(relationshipPromptTimerRef.current)
        relationshipPromptTimerRef.current = null
      }
      return
    }

    if (isRelationshipPromptReady) {
      return
    }

    relationshipPromptTimerRef.current = setTimeout(() => {
      setIsRelationshipPromptReady(true)
      relationshipPromptTimerRef.current = null
    }, STEP1_TYPING_DELAY_MS)

    return () => {
      if (relationshipPromptTimerRef.current) {
        clearTimeout(relationshipPromptTimerRef.current)
        relationshipPromptTimerRef.current = null
      }
    }
  }, [canShowRelationshipQuestion, isRelationshipPromptReady])

  useEffect(() => {
    if (!canShowBirthdateQuestion) {
      setIsBirthdatePromptReady(false)
      if (birthdatePromptTimerRef.current) {
        clearTimeout(birthdatePromptTimerRef.current)
        birthdatePromptTimerRef.current = null
      }
      return
    }

    if (isBirthdatePromptReady) {
      return
    }

    birthdatePromptTimerRef.current = setTimeout(() => {
      setIsBirthdatePromptReady(true)
      birthdatePromptTimerRef.current = null
    }, STEP1_TYPING_DELAY_MS)

    return () => {
      if (birthdatePromptTimerRef.current) {
        clearTimeout(birthdatePromptTimerRef.current)
        birthdatePromptTimerRef.current = null
      }
    }
  }, [canShowBirthdateQuestion, isBirthdatePromptReady])

  useEffect(() => {
    if (!canShowGenderQuestion) {
      setIsGenderPromptReady(false)
      if (genderPromptTimerRef.current) {
        clearTimeout(genderPromptTimerRef.current)
        genderPromptTimerRef.current = null
      }
      return
    }

    if (isGenderPromptReady) {
      return
    }

    genderPromptTimerRef.current = setTimeout(() => {
      setIsGenderPromptReady(true)
      genderPromptTimerRef.current = null
    }, STEP1_TYPING_DELAY_MS)

    return () => {
      if (genderPromptTimerRef.current) {
        clearTimeout(genderPromptTimerRef.current)
        genderPromptTimerRef.current = null
      }
    }
  }, [canShowGenderQuestion, isGenderPromptReady])

  useEffect(() => {
    if (!showNudge) {
      setIsNudgePromptReady(false)
      if (nudgePromptTimerRef.current) {
        clearTimeout(nudgePromptTimerRef.current)
        nudgePromptTimerRef.current = null
      }
      return
    }

    setIsNudgePromptReady(false)
    nudgePromptTimerRef.current = setTimeout(() => {
      setIsNudgePromptReady(true)
      nudgePromptTimerRef.current = null
    }, STEP1_TYPING_DELAY_MS)

    return () => {
      if (nudgePromptTimerRef.current) {
        clearTimeout(nudgePromptTimerRef.current)
        nudgePromptTimerRef.current = null
      }
    }
  }, [showNudge])

  useEffect(() => {
    if (step < 2) {
      return
    }

    const stepStartTargetRef =
      step === 2
        ? step2StartRef
        : step === 3
          ? step3StartRef
          : step === 4
            ? step4StartRef
            : step === 5
              ? step5StartRef
            : null

    const isMobileView = window.innerWidth < 1024
    const mobileAnswerTargetRef =
      step === 2
        ? step1AnswerRef
        : step === 3
          ? step2AnswerRef
          : step === 4
            ? step3AnswerRef
            : step === 5
              ? step4AnswerRef
            : null
    const target = isMobileView ? (mobileAnswerTargetRef?.current ?? stepStartTargetRef?.current) : stepStartTargetRef?.current

    if (!target) {
      return
    }

    const isUsingMobileAnswerAnchor = isMobileView && Boolean(mobileAnswerTargetRef?.current)
    let clearSettledScroll: (() => void) | null = null
    const frameId = window.requestAnimationFrame(() => {
      clearSettledScroll = scrollTargetWithOffsets(target, {
        mobileContextPeek: isUsingMobileAnswerAnchor ? 92 : 56,
        desktopContextPeek: 72,
        disableSettle: isUsingMobileAnswerAnchor,
      })
    })

    return () => {
      window.cancelAnimationFrame(frameId)
      clearSettledScroll?.()
    }
  }, [step, showContent])

  useEffect(() => {
    if (step !== 1 || !showContent || isTyping) {
      return
    }

    const isMobileView = window.innerWidth < 1024
    if (!isMobileView) {
      return
    }

    const answerTarget = step1LatestUserBubbleRef.current
    const botTarget = step1LatestBotBubbleRef.current
    if (!answerTarget && !botTarget) {
      return
    }

    const frameId = window.requestAnimationFrame(() => {
      const answerTop = answerTarget
        ? getScrollTopWithOffsets(answerTarget, {
            mobileContextPeek: 92,
            desktopContextPeek: 72,
          })
        : Number.POSITIVE_INFINITY

      const botTop = botTarget
        ? getScrollTopWithOffsets(botTarget, {
            mobileContextPeek: 56,
            desktopContextPeek: 72,
          })
        : Number.POSITIVE_INFINITY

      const nextTop = Number.isFinite(answerTop) || Number.isFinite(botTop) ? Math.min(answerTop, botTop) : null
      if (nextTop === null) {
        return
      }

      window.scrollTo({ top: Math.max(0, nextTop), behavior: "smooth" })
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [
    step,
    showContent,
    isTyping,
    hasNameAnswer,
    hasRelationshipAnswer,
    hasBirthdateAnswer,
    hasGenderAnswer,
    isRelationshipPromptReady,
    isBirthdatePromptReady,
    isGenderPromptReady,
    isEditingName,
    isEditingRelationship,
    isEditingBirthdate,
    isEditingGender,
  ])

  const handleFlowReset = () => {
    resetAll()
    setEditingField(null)
    setOtherRelationshipDraft("")
    setIsRelationshipPromptReady(false)
    setIsBirthdatePromptReady(false)
    setIsGenderPromptReady(false)
    setIsNudgePromptReady(false)

    if (relationshipPromptTimerRef.current) {
      clearTimeout(relationshipPromptTimerRef.current)
      relationshipPromptTimerRef.current = null
    }

    if (birthdatePromptTimerRef.current) {
      clearTimeout(birthdatePromptTimerRef.current)
      birthdatePromptTimerRef.current = null
    }

    if (genderPromptTimerRef.current) {
      clearTimeout(genderPromptTimerRef.current)
      genderPromptTimerRef.current = null
    }

    if (nudgePromptTimerRef.current) {
      clearTimeout(nudgePromptTimerRef.current)
      nudgePromptTimerRef.current = null
    }

    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleExit = () => {
    resetAll()
    setShowExitModal(false)
    router.push("/")
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <header ref={headerRef} className="fixed left-0 right-0 top-0 z-[100] border-b border-[#E3D5C7] bg-[#fff]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[64px] items-center justify-between gap-2 md:h-[78px]">
            <Link
              href="/"
              className="flex min-w-0 items-center"
              onClick={(e) => {
                e.preventDefault()
                setShowExitModal(true)
              }}
            >
              <img src={LOGO_IMAGE_URL} alt="SaramME Logo" className="h-10 w-auto md:h-11" />
            </Link>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowExitModal(true)}
              className="h-9 shrink-0 cursor-pointer rounded-full border-[#0C0C0C] bg-white px-4 text-sm font-semibold text-[#0C0C0C] shadow-none hover:bg-[#0C0C0C] hover:text-white sm:h-10 sm:px-6 sm:text-base"
            >
              {"\uB098\uAC00\uAE30"}
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section className="mb-10">
            <h1 className="text-[30px] font-bold text-[#1F1F1F]">{"\uC608\uC57D\uD558\uAE30"}</h1>
            <p className="mt-2 text-[18px] font-normal text-[#3D372F]">
              {"아이의 성장 단계에 맞는 전문적인 솔루션을 제공합니다."}
            </p>
          </section>

          <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <aside className="hidden self-start lg:sticky lg:top-28 lg:block">
              <ol className="space-y-8">
                {stepLabels.map((label, index) => {
                  const stepNumber = index + 1
                  const isActiveStep = step === stepNumber

                  return (
                    <li key={label} className={cn("relative pl-8", index === 0 && "pr-24")}>
                      <span
                        className={cn(
                          "absolute left-0 top-0 h-5 w-5 rounded-full border border-[#D6D9F3] bg-white",
                          isActiveStep && "border-[#4A83D8] bg-[#EFF4FF]",
                        )}
                      >
                        {isActiveStep && <span className="absolute left-1.5 top-1.5 h-2 w-2 rounded-full bg-[#4A83D8]" />}
                      </span>
                      {index < stepLabels.length - 1 && (
                        <span className="absolute left-[10px] top-5 h-8 w-px bg-[#DDE5F6]" aria-hidden />
                      )}
                      <span className={cn("text-[18px] leading-none", isActiveStep ? "font-bold text-[#1F1F1F]" : "font-medium text-[#5F6B8D]")}>
                        {label}
                      </span>
                      {index === 0 && (
                        <button
                          type="button"
                          onClick={handleFlowReset}
                          className="absolute right-0 top-1/2 inline-flex -translate-y-1/2 cursor-pointer items-center gap-1 text-sm font-medium text-[#6570A5] transition-colors hover:text-[#4A83D8]"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>{"\uCD08\uAE30\uD654"}</span>
                        </button>
                      )}
                    </li>
                  )
                })}
              </ol>
            </aside>

            <div className="min-w-0 space-y-4">
              <div
                ref={mobileStepHeaderRef}
                className={cn(
                  "sticky top-[74px] z-30 rounded-[15px] border border-[#D6D9F3] bg-white transition-all duration-300 md:top-[90px] lg:hidden",
                  isMobileStepCompact ? "space-y-[6px] p-[10px]" : "space-y-2 p-[15px]",
                )}
              >
                <div className={cn("flex justify-between gap-3", isMobileStepCompact ? "items-center" : "items-start")}>
                  <p
                    className={cn(
                      "truncate font-semibold leading-none text-[#2F2A23] transition-all duration-300",
                      isMobileStepCompact ? "text-[17px]" : "text-[22px]",
                    )}
                  >
                    {currentStepLabel}
                  </p>
                  <button
                    type="button"
                    onClick={handleFlowReset}
                    className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-[#2F2A23] transition-opacity hover:opacity-70"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>{"\uCD08\uAE30\uD654"}</span>
                  </button>
                </div>

                <span className="inline-flex h-7 items-center rounded-full bg-[#4A83D8] px-3 text-[14px] font-semibold leading-none text-white">
                  {currentStep}/{totalSteps}
                </span>

                <div
                  className={cn(
                    "w-full overflow-hidden rounded-full bg-[#DDE5F6] transition-all duration-300",
                    isMobileStepCompact ? "h-1.5" : "h-3",
                  )}
                >
                  <div
                    className="h-full rounded-full bg-[#4A83D8] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Step 1: Service */}
          <Step1Service flow={flow}>
            {step >= 1 && (
              <>
                {isTyping && step === 1 ? (
                  <BotMessage content="" isTyping />
                ) : (
                  <>
                    <div ref={step1LatestBotBubbleRef}>
                      <BotMessage content={"안녕하세요! 어세스타 사람의 발견을 원하면 상담 및 코칭 매니저입니다."} />
                    </div>

                    {showContent && step === 1 && (
                      <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
                        <div ref={step1LatestBotBubbleRef}>
                          <BotMessage content={"먼저, 예약자분 성함을 알려주세요."} />
                        </div>
                        {hasNameAnswer && !isEditingName ? (
                          <div ref={step1LatestUserBubbleRef}>
                            <EditableUserMessage
                              content={userInfo.name}
                              onEdit={() => {
                                setNameDraft(userInfo.name)
                                setEditingField("name")
                              }}
                            />
                          </div>
                        ) : (
                          <div className="flex justify-end animate-in fade-in-0 slide-in-from-right-4 duration-300">
                            <div className={cn(RIGHT_INTERACTIVE_PANEL_CLASS, "px-4 py-3")}>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 rounded-xl border border-[#D8CEBC] bg-white px-4 py-2.5">
                                  <input
                                    type="text"
                                    value={nameDraft}
                                    onChange={(e) => setNameDraft(e.target.value)}
                                    onBlur={handleNameSubmit}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault()
                                        handleNameSubmit()
                                      }
                                    }}
                                    placeholder={"\uC608\uC57D\uC790 \uC774\uB984\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694"}
                                    className="w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={handleNameSubmit}
                                  disabled={!isValidName(nameDraft)}
                                  className={cn(
                                    "w-9 h-9 rounded-full border flex items-center justify-center transition-all flex-shrink-0",
                                    isValidName(nameDraft)
                                      ? "border-transparent bg-[#FFF7EF] text-[#2E5FD7] hover:bg-[#FFEBD7]"
                                      : "bg-muted border-transparent text-muted-foreground cursor-not-allowed",
                                  )}
                                  aria-label={"\uC774\uB984 \uC804\uC1A1"}
                                >
                                  <ArrowUp className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {canShowRelationshipQuestion && (
                          <>
                            {isRelationshipPromptReady ? (
                              <>
                                <div ref={step1LatestBotBubbleRef}>
                                  <BotMessage content={"상담 또는 코칭을 받을 대상을 선택해 주세요."} />
                                </div>
                                {hasRelationshipAnswer && !isEditingRelationship ? (
                                  <div ref={step1LatestUserBubbleRef}>
                                    <EditableUserMessage
                                      content={userInfo.relationship}
                                      onEdit={() => {
                                        setEditingField("relationship")
                                        setOtherRelationshipDraft(isCustomRelationship(userInfo.relationship) ? userInfo.relationship : "")
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <div className="flex justify-end animate-in fade-in-0 slide-in-from-right-4 duration-300">
                                    <div className={cn(RIGHT_INTERACTIVE_PANEL_CLASS, "p-3 space-y-2")}>
                                      {relationships.filter((rel) => rel !== "\uAE30\uD0C0").map((rel) => (
                                        <button
                                          key={rel}
                                          onClick={() => {
                                            setUserInfo((prev) => ({ ...prev, relationship: rel }))
                                            setOtherRelationshipDraft("")
                                            setEditingField(null)
                                          }}
                                          className={cn(
                                            "w-full px-4 py-2.5 rounded-xl border text-left transition-all",
                                            userInfo.relationship === rel
                                              ? "border-[#7FC6FF] bg-[#FFF7EF] text-[#235FD7] font-semibold"
                                              : "border-transparent bg-[#FFF7EF] hover:bg-[#FFEBD7] text-[#1F2B3D]",
                                          )}
                                        >
                                          {rel}
                                        </button>
                                      ))}
                                      <div className="pt-1">
                                        <p className="mb-2 px-1 text-xs font-medium text-[#6E6352]">{"기타(직접 입력)"}</p>
                                        <div className="flex items-center gap-2">
                                          <div className="flex-1 rounded-xl border border-[#D8CEBC] bg-white px-4 py-2.5">
                                            <input
                                              type="text"
                                              value={otherRelationshipDraft}
                                              onChange={(e) => setOtherRelationshipDraft(e.target.value)}
                                              onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                  e.preventDefault()
                                                  handleOtherRelationshipSubmit()
                                                }
                                              }}
                                              placeholder={"\uAE30\uD0C0 \uB300\uC0C1\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694"}
                                              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                                            />
                                          </div>
                                          <button
                                            type="button"
                                            onClick={handleOtherRelationshipSubmit}
                                            disabled={otherRelationshipDraft.trim().length === 0}
                                            className={cn(
                                              "w-9 h-9 rounded-full border flex items-center justify-center transition-all flex-shrink-0",
                                              otherRelationshipDraft.trim().length > 0
                                                ? "border-transparent bg-[#FFF7EF] text-[#2E5FD7] hover:bg-[#FFEBD7]"
                                                : "bg-muted border-transparent text-muted-foreground cursor-not-allowed",
                                            )}
                                            aria-label={"\uAE30\uD0C0 \uAD00\uACC4 \uC804\uC1A1"}
                                          >
                                            <ArrowUp className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </>
                            ) : (
                              <BotMessage content="" isTyping />
                            )}
                          </>
                        )}

                        {canShowBirthdateQuestion && (
                          <>
                            {isBirthdatePromptReady ? (
                              <>
                                <div ref={step1LatestBotBubbleRef}>
                                  <BotMessage content={"대상자의 생년월일을 숫자로만 입력해 주세요. (예: 20021225)"} />
                                </div>
                                {hasBirthdateAnswer && !isEditingBirthdate ? (
                                  <div ref={step1LatestUserBubbleRef}>
                                    <EditableUserMessage
                                      content={userInfo.birthdate}
                                      onEdit={() => setEditingField("birthdate")}
                                    />
                                  </div>
                                ) : (
                                  <div className="flex justify-end animate-in fade-in-0 slide-in-from-right-4 duration-300">
                                    <div className={cn(RIGHT_INTERACTIVE_PANEL_CLASS, "p-4")}>
                                      <div className="flex items-center gap-2">
                                        <div className="flex-1 rounded-xl border border-[#D8CEBC] bg-white px-4 py-2.5">
                                          <input
                                            type="text"
                                            value={birthdateInput}
                                            onChange={(e) => handleBirthdateChange(e.target.value)}
                                            onBlur={handleBirthdateBlur}
                                            onKeyDown={(e) => {
                                              if (e.key === "Enter") {
                                                e.preventDefault()
                                                handleBirthdateBlur()
                                              }
                                            }}
                                            placeholder={"숫자만 입력해 주세요(예: 20021225)"}
                                            maxLength={10}
                                            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                                          />
                                        </div>
                                        <button
                                          type="button"
                                          onClick={handleBirthdateBlur}
                                          disabled={birthdateInput.trim().length === 0}
                                          className={cn(
                                            "w-9 h-9 rounded-full border flex items-center justify-center transition-all flex-shrink-0",
                                            birthdateInput.trim().length > 0
                                              ? "border-transparent bg-[#FFF7EF] text-[#2E5FD7] hover:bg-[#FFEBD7]"
                                              : "bg-muted border-transparent text-muted-foreground cursor-not-allowed",
                                          )}
                                          aria-label={"\uC0DD\uB144\uC6D4\uC77C \uC804\uC1A1"}
                                        >
                                          <ArrowUp className="w-4 h-4" />
                                        </button>
                                      </div>
                                      {birthdateError && <p className="mt-1.5 text-sm text-destructive">{birthdateError}</p>}
                                    </div>
                                  </div>
                                )}
                              </>
                            ) : (
                              <BotMessage content="" isTyping />
                            )}
                          </>
                        )}

                        {canShowGenderQuestion && (
                          <>
                            {isGenderPromptReady ? (
                              <>
                                <div ref={step1LatestBotBubbleRef}>
                                  <BotMessage content={"대상자 성별을 선택해 주세요."} />
                                </div>
                                {hasGenderAnswer && !isEditingGender ? (
                                  <>
                                    <div ref={step1LatestUserBubbleRef}>
                                      <EditableUserMessage
                                        content={userInfo.gender}
                                        onEdit={() => setEditingField("gender")}
                                      />
                                    </div>
                                    <div className="w-full animate-in fade-in-0 slide-in-from-right-4 duration-300">
                                      <Button
                                        onClick={goToNextStep}
                                        disabled={!isStep1Valid}
                                        className="mt-5 h-[50px] w-full bg-[#333333] text-[18px] font-semibold text-white hover:bg-[#333333] disabled:bg-[#333333] disabled:text-white"
                                      >
                                        {"\uB2E4\uC74C\uC73C\uB85C"}
                                      </Button>
                                    </div>
                                  </>
                                ) : (
                                  <div className="flex justify-end animate-in fade-in-0 slide-in-from-right-4 duration-300">
                                    <div className={cn(RIGHT_INTERACTIVE_PANEL_CLASS, "p-3 grid grid-cols-2 gap-2")}>
                                      {genders.map((gender) => (
                                        <button
                                          key={gender}
                                          onClick={() => {
                                            setUserInfo((prev) => ({ ...prev, gender: gender as Gender }))
                                            setEditingField(null)
                                          }}
                                          className={cn(
                                            "px-4 py-2.5 rounded-xl border text-center transition-all",
                                            userInfo.gender === gender
                                              ? "border-[#7FC6FF] bg-[#FFF7EF] text-[#235FD7] font-semibold"
                                              : "border-transparent bg-[#FFF7EF] hover:bg-[#FFEBD7] text-[#1F2B3D]",
                                          )}
                                        >
                                          {gender}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </>
                            ) : (
                              <BotMessage content="" isTyping />
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </>
                )}

                {step > 1 && (
                  <div ref={step1AnswerRef}>
                    <EditableUserMessage
                      content={`${userInfo.name} / ${userInfo.relationship} / ${userInfo.birthdate} / ${userInfo.gender}`}
                      onEdit={() => goToStep(1)}
                    />
                  </div>
                )}
              </>
            )}
          </Step1Service>

          {/* Step 2: Attendance */}
          <Step2Expert flow={flow}>
            {step >= 2 && (
            <>
              <div ref={step2StartRef} />
              {isTyping && step === 2 ? (
                <BotMessage content="" isTyping />
              ) : (
                <>
                  <BotMessage content={"이번 상담 및 코칭에는 누가 참석하시나요?"} />

                  {showContent && step === 2 && !showNudge && (
                    <div className="flex justify-end animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
                      <div className={cn(WIDE_INTERACTIVE_PANEL_CLASS, "space-y-3 p-3")}>
                        <AttendanceOptionButton isSelected={isBothSelected} onClick={() => handleAttendanceSelect("both")}>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{"\uBD80\uBAA8\uC640 \uC790\uB140 \uBAA8\uB450 \uCC38\uC11D"}</span>
                            <span className="rounded-full bg-[#E6F4FF] px-3 py-1 text-xs font-semibold text-[#4A83D8]">
                              {"\uAC15\uB825 \uCD94\uCC9C"}
                            </span>
                          </div>
                        </AttendanceOptionButton>
                        <AttendanceOptionButton isSelected={attendance === "child"} onClick={() => handleAttendanceSelect("child")}>
                          <span className="font-semibold">{"\uC790\uB140\uB9CC \uCC38\uC11D"}</span>
                        </AttendanceOptionButton>
                        <AttendanceOptionButton isSelected={attendance === "parent"} onClick={() => handleAttendanceSelect("parent")}>
                          <span className="font-semibold">{"\uBD80\uBAA8\uB9CC \uCC38\uC11D"}</span>
                        </AttendanceOptionButton>
                        {isAdultTarget && (
                          <AttendanceOptionButton isSelected={attendance === "self"} onClick={() => handleAttendanceSelect("self")}>
                            <span className="font-semibold">{"\uBCF8\uC778\uB9CC \uCC38\uC11D (\uAC1C\uC778 \uC0C1\uB2F4 \uBC0F \uCF54\uCE6D)"}</span>
                          </AttendanceOptionButton>
                        )}
                      </div>
                    </div>
                  )}

                  {showContent && step === 2 && !showNudge && (
                    <div className="mt-4 flex justify-end animate-in fade-in-0 slide-in-from-right-4 duration-300">
                      <BackStepButton onClick={goToPrevStep} />
                    </div>
                  )}

                  {/* Nudge Message */}
                  {showNudge && (
                    <>
                      {isNudgePromptReady ? (
                        <>
                          <BotMessage
                            content={
                              <div className="space-y-3">
                                <p className="leading-relaxed">
                                  {"물론 홀로 참석도 가능합니다. 하지만 에세스타 맞춤형 상담 및 코칭은 부모님과 자녀가 함께 오실 때 서로의 성향을 확인하고 소통하는 효과가 훨씬 커집니다."}
                                </p>
                                <p className="leading-relaxed">
                                  {"자녀의 현재 상태와 부모님의 양육 성향을 함께 점검하는 과정은 상담 및 코칭 방향을 더 정확하게 잡는 데 큰 도움이 됩니다."}
                                </p>
                                <p className="font-medium">{"상담 및 코칭의 효과를 위해 두 분이 함께 참석하시는 일정으로 잡아볼까요?"}</p>
                              </div>
                            }
                          />
                          <div className="mt-5 flex gap-3 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
                            <Button onClick={() => handleNudgeResponse(true)} className="h-[50px] flex-1 text-[18px] font-semibold">
                              {"\uB124, \uD568\uAED8 \uCC38\uC11D\uD560\uAC8C\uC694"}
                            </Button>
                            <Button variant="outline" onClick={() => handleNudgeResponse(false)} className="h-[50px] flex-1 text-[18px] font-semibold">
                              {"\uC774\uBC88\uC5D0\uB294 \uD640\uB85C \uCC38\uC11D\uD560\uAC8C\uC694"}
                            </Button>
                          </div>
                          <div className="mt-3 flex justify-end animate-in fade-in-0 slide-in-from-right-4 duration-300">
                            <BackStepButton onClick={goToPrevStep} />
                          </div>
                        </>
                      ) : (
                        <BotMessage content="" isTyping />
                      )}
                    </>
                  )}
                </>
              )}

              {step > 2 && attendance && (
                <div ref={step2AnswerRef}>
                  <EditableUserMessage content={getAttendanceLabel(attendance)} onEdit={() => goToStep(2)} />
                </div>
              )}
            </>
            )}
          </Step2Expert>

          {/* Step 3: Concern Theme */}
          <Step3Schedule flow={flow}>
            {step >= 3 && (
              <>
                <div ref={step3StartRef} />
                {isTyping && step === 3 ? (
                  <BotMessage content="" isTyping />
                ) : (
                  <>
                    <BotMessage content={"현재 가장 고민되는 부분은 무엇인가요? 전문가의 도움이 필요한 상황을 편하게 적어주세요."} />

                    {showContent && step === 3 && (
                      <div className="flex justify-end animate-in fade-in-0 slide-in-from-right-4 duration-300">
                        <div className={cn(RIGHT_INTERACTIVE_PANEL_CLASS, "w-full max-w-2xl p-4 md:p-5")}>
                          <textarea
                            value={concernTheme}
                            onChange={(event) => setConcernTheme(event.target.value)}
                            placeholder={concernThemePlaceholder}
                            className="h-44 w-full resize-none overflow-y-auto rounded-2xl border border-[#FFC6AA] bg-[#F4F5F7] px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-[#9CA3AF] caret-[#FF7A33] focus:border-[#FF7A33] focus:outline-none focus:ring-2 focus:ring-[#FF7A33]/25"
                          />
                          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                            <BackStepButton onClick={goToPrevStep} />
                            <p className="text-sm text-[#6B7280]">{"* 한 줄만 적으셔도 괜찮습니다."}</p>
                            <Button
                              type="button"
                              onClick={goToNextStep}
                              disabled={!isConcernThemeValid}
                              className="h-11 rounded-xl bg-[#FF7A33] px-5 text-base font-semibold text-white hover:bg-[#E86F2F] disabled:bg-[#FFC8AC] disabled:text-white"
                            >
                              {"\uC791\uC131 \uC644\uB8CC"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {step > 3 && concernTheme.trim().length > 0 && (
                  <div ref={step3AnswerRef}>
                    <EditableUserMessage content={concernTheme.trim()} onEdit={() => goToStep(3)} />
                  </div>
                )}
              </>
            )}

            {/* Step 4: Schedule */}
            {step >= 4 && (
              <>
                <div ref={step4StartRef} />
                {isTyping && step === 4 ? (
                  <BotMessage content="" isTyping />
                ) : (
                  <>
                    <BotMessage
                      content={
                        <div className="space-y-2">
                          <p>
                            {"상담 및 코칭이 가능한 시간은 "}
                            <strong>{"\u0032\uAC1C \uC774\uC0C1"}</strong>
                            {" 선택해 주세요. 전문가 일정과 조율하여 최종 예약 시간을 확정해 드립니다."}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {"최대한 많은 시간을 선택해 주시면 빠른 진행이 가능합니다."}
                          </p>
                        </div>
                      }
                    />

                    {showContent && step === 4 && (
                      <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
                        <CalendarPicker
                          selectedDates={selectedSchedules}
                          onDateSelect={handleScheduleSelect}
                          onDateRemove={removeSchedule}
                        />

                        <div className="grid grid-cols-4 gap-3">
                          <BackStepButton onClick={goToPrevStep} className="col-span-1 w-full" />
                          <Button
                            onClick={goToNextStep}
                            disabled={selectedSchedules.length < 2}
                            className="col-span-3 h-[50px] w-full rounded-[0.7rem] bg-[#0C0C0C] text-[18px] font-semibold text-white hover:bg-[#0C0C0C] disabled:bg-[#0C0C0C] disabled:text-white"
                          >
                            {"\uB2E4\uC74C\uC73C\uB85C"} {selectedSchedules.length < 2 && `(${2 - selectedSchedules.length}\uAC1C \uB354 \uC120\uD0DD)`}
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {step > 4 && selectedSchedules.length > 0 && (
                  <div ref={step4AnswerRef}>
                    <EditableUserMessage
                      content={`희망 일정: ${selectedSchedules.map((s) => formatScheduleDisplay(s)).join(", ")}`}
                      onEdit={() => goToStep(4)}
                    />
                  </div>
                )}
              </>
            )}

            {/* Step 5: Phone Number */}
            {step >= 5 && (
            <>
              <div ref={step5StartRef} />
              {isTyping && step === 5 ? (
                <BotMessage content="" isTyping />
              ) : (
                <>
                  <BotMessage
                    content={
                      <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap break-words md:text-base">
                        {"예약자분의 연락처를 남겨주시면 센터에서 일정 확인 후 "}
                        <strong>{"카카오톡 또는 문자로 최종 확정 안내"}</strong>
                        {" 드리겠습니다."}
                      </p>
                    }
                  />

                  {showContent && step === 5 && (
                    <div className="bg-card rounded-2xl p-5 shadow-sm border border-border animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
                      <div className="space-y-4">
                        <div>
                          <FieldLabel icon={<Phone className="w-4 h-4 inline mr-1" />}>{"\uD734\uB300\uD3F0 \uBC88\uD638"}</FieldLabel>
                          <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                            placeholder="010-0000-0000"
                            maxLength={13}
                            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </div>

                        {/* Privacy Consent */}
                        <div className="pt-2 border-t border-border">
                          <div className="flex items-start gap-3">
                            <button
                              type="button"
                              onClick={() => setPrivacyConsent(!privacyConsent)}
                              className={cn(
                                "mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all",
                                privacyConsent ? "bg-primary border-primary" : "border-muted-foreground/40 hover:border-primary/60",
                              )}
                            >
                              {privacyConsent && <Check className="w-3 h-3 text-primary-foreground" />}
                            </button>
                            <div className="flex-1">
                              <p className="text-sm text-foreground leading-relaxed">
                                {"\uAC1C\uC778\uC815\uBCF4 \uC218\uC9D1 \uBC0F \uC774\uC6A9\uC5D0 \uB3D9\uC758\uD569\uB2C8\uB2E4."} <span className="text-destructive font-medium">({"\uD544\uC218"})</span>
                              </p>
                              <button
                                type="button"
                                onClick={() => setShowPrivacyModal(true)}
                                className="text-xs text-primary hover:text-primary/80 underline underline-offset-2 mt-1"
                              >
                                [{"\uC804\uBB38 \uBCF4\uAE30"}]
                              </button>
                            </div>
                          </div>
                        </div>

                        {submitError && (
                          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
                            {submitError}
                          </div>
                        )}

                        <div className="grid grid-cols-4 gap-3">
                          <BackStepButton onClick={goToPrevStep} className="col-span-1 w-full" />
                          <Button
                            onClick={handleSubmit}
                            disabled={phoneNumber.length < 13 || !privacyConsent || isSubmitting}
                            className="col-span-3 h-[50px] w-full rounded-[0.7rem] text-[18px] font-semibold"
                          >
                            {isSubmitting ? "\uC811\uC218\uC911..." : "\uCD5C\uC885 \uC608\uC57D \uC811\uC218\uD558\uAE30"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Privacy Modal */}
                  {showPrivacyModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 animate-in fade-in-0 duration-200">
                      <div className="bg-card rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden shadow-xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-border">
                          <h3 className="font-semibold text-foreground">{privacyPolicyState.data?.title ?? "개인정보 수집 및 이용 동의"}</h3>
                          <button
                            onClick={() => setShowPrivacyModal(false)}
                            className="p-1 hover:bg-muted rounded-lg transition-colors"
                          >
                            <X className="w-5 h-5 text-muted-foreground" />
                          </button>
                        </div>
                        <div className="p-5 overflow-y-auto max-h-[60vh]">
                          {(privacyPolicyState.status === "idle" || privacyPolicyState.status === "loading") && (
                            <div className="space-y-3" aria-busy="true">
                              <div className="h-4 w-2/3 animate-pulse rounded-md bg-muted" />
                              <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
                              <div className="h-4 w-[92%] animate-pulse rounded-md bg-muted" />
                              <div className="h-4 w-[85%] animate-pulse rounded-md bg-muted" />
                            </div>
                          )}

                          {privacyPolicyState.status === "error" && (
                            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                              <p className="text-sm leading-relaxed text-red-700">
                                {privacyPolicyState.error ?? "개인정보처리방침을 불러오지 못했습니다."}
                              </p>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => void fetchPrivacyPolicy(true)}
                                className="mt-3 border-red-300 bg-white text-red-700 hover:bg-red-100"
                              >
                                다시 시도
                              </Button>
                            </div>
                          )}

                          {privacyPolicyState.status === "success" && privacyPolicyState.data && (
                            <article
                              className="min-w-0 text-sm leading-[1.8] text-muted-foreground [overflow-wrap:anywhere] [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_li]:mt-1.5 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mt-3 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_.policy-table-wrap]:mt-4 [&_.policy-table-wrap]:w-full [&_.policy-table-wrap]:overflow-x-auto [&_.policy-table-wrap]:[-webkit-overflow-scrolling:touch] [&_.policy-table]:min-w-[640px] [&_.policy-table]:w-full [&_.policy-table]:border-collapse [&_.policy-table]:border [&_.policy-table]:border-slate-300 [&_.policy-table_th]:border [&_.policy-table_th]:border-slate-300 [&_.policy-table_th]:bg-slate-100 [&_.policy-table_th]:px-4 [&_.policy-table_th]:py-3 [&_.policy-table_th]:text-left [&_.policy-table_th]:text-xs [&_.policy-table_th]:font-semibold [&_.policy-table_td]:border [&_.policy-table_td]:border-slate-300 [&_.policy-table_td]:px-4 [&_.policy-table_td]:py-3 [&_.policy-table_td]:align-top"
                              dangerouslySetInnerHTML={{ __html: privacyPolicyHtml }}
                            />
                          )}

                          {privacyPolicyState.status === "success" && !privacyPolicyState.data && (
                            <p className="text-sm text-muted-foreground leading-relaxed">개인정보처리방침 내용을 찾지 못했습니다.</p>
                          )}
                        </div>
                        <div className="p-4 border-t border-border">
                          <Button
                            onClick={() => {
                              setPrivacyConsent(true)
                              setShowPrivacyModal(false)
                            }}
                            className="w-full"
                          >
                            {"\uB3D9\uC758\uD558\uACE0 \uB2EB\uAE30"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
            )}
          </Step3Schedule>

              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </main>

      {showExitModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/45 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-[#E4DBCC] bg-white p-6 shadow-xl">
            <p className="whitespace-pre-line text-base font-medium leading-relaxed text-[#2F2A23]">
              {"작성 중인 내용은 모두 사라집니다.\n정말 나가시겠어요?"}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowExitModal(false)}
                className="h-11 cursor-pointer rounded-xl border-[#D4CBB9] bg-white text-[#3D372F] hover:bg-white hover:text-[#3D372F]"
              >
                {"\uACC4\uC18D \uC9C4\uD589"}              </Button>
              <Button type="button" onClick={handleExit} className="h-11 cursor-pointer rounded-xl bg-[#333333] text-white hover:bg-[#333333] hover:text-white">
                {"\uB098\uAC00\uAE30"}              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}



