"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState, type ReactNode } from "react"
import {
  ArrowUp,
  Baby,
  Check,
  GraduationCap,
  Heart,
  MessageCircle,
  Phone,
  RotateCcw,
  School,
  Users,
  X,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/shared/ui/button"
import { FieldLabel } from "@/shared/ui/field-label"
import { cn } from "@/shared/lib/utils"
import { Footer } from "@/shared/layout/footer"
import type { UseReservationFlowReturn } from "../../hooks/use-reservation-flow"
import { genders, relationships } from "../../data/reservation.constants"
import {
  QUICK_TOPICS,
  QUICK_TOPIC_ORDER,
  normalizeQuickTopicActions,
  type QuickTopicAction,
  type QuickTopicId,
  type QuickTopicItem,
} from "../../data/quick-topics"
import type { Gender, Relationship } from "../../model/reservation.types"
import { BotMessage, CalendarPicker, UserMessage } from "../shared/reservation-primitives"
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

interface QuickTopicChatEntry {
  id: string
  topicId?: QuickTopicId
  userMessage: string
  botMessage: string
  tips?: string[]
  actions?: QuickTopicAction[]
}

interface QuickIntroAgeOption {
  id: "age_0_2" | "age_3_6" | "age_7_12" | "age_13_18"
  label: string
}

const QUICK_TOPIC_ICON_MAP: Record<QuickTopicItem["icon"], LucideIcon> = {
  baby: Baby,
  speech: MessageCircle,
  school: School,
  teen: GraduationCap,
  heart: Heart,
  users: Users,
}

const STEP1_TYPING_DELAY_MS = 1200
const QUICK_TOPIC_GUIDE_MESSAGE =
  "안녕하세요! 🌱\n\n아이의 발달과 관련된 궁금증이나 걱정을 편하게 말씀해 주세요.\n발달심리학을 기반으로 도움이 되는 정보와 방향을 안내해 드리겠습니다.\n\n먼저, 아이가 몇 살인지 알려주실 수 있을까요?"
const QUICK_INTRO_AGE_OPTIONS: QuickIntroAgeOption[] = [
  { id: "age_0_2", label: "0-2세 (영아기)" },
  { id: "age_3_6", label: "3-6세 (유아기)" },
  { id: "age_7_12", label: "7-12세 (아동기)" },
  { id: "age_13_18", label: "13-18세 (청소년기)" },
]
const QUICK_INTRO_RESERVATION_LABEL = "전문가 상담 바로 시작하기"
const QUICK_INTRO_TYPING_DELAY_MS = 900
const QUICK_TOPIC_TYPING_DELAY_MS = 900
const RIGHT_BUBBLE_GRADIENT_CLASS = "bg-[linear-gradient(144.37deg,#FFB836_7.06%,#F57220_90.82%)]"
const RIGHT_INTERACTIVE_PANEL_CLASS = "w-full max-w-md rounded-[20px] rounded-tr-[5px] border border-[#DFDFDF] bg-white"
const WIDE_INTERACTIVE_PANEL_CLASS = "w-full rounded-[20px] border border-[#DFDFDF] bg-white"

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
      <button type="button" onClick={onEdit} className="px-1 text-sm text-[#6E6352] hover:text-[#4F4537]">
        {"수정"}
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

function isQuickIntroAgeEntryId(id: string) {
  return id.startsWith("quick-intro:age_")
}

function isQuickTopicRootEntryId(id: string): id is QuickTopicId {
  return QUICK_TOPIC_ORDER.includes(id as QuickTopicId)
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
    showNudge,
    selectedSchedules,
    phoneNumber,
    privacyConsent,
    showPrivacyModal,
    setUserInfo,
    setPhoneNumber,
    setPrivacyConsent,
    setShowPrivacyModal,
    goToNextStep,
    resetAll,
    handleBirthdateChange,
    handleBirthdateBlur,
    handleAttendanceSelect,
    handleNudgeResponse,
    handleScheduleSelect,
    removeSchedule,
    formatScheduleDisplay,
    handleSubmit,
    getAgeGroupLabel,
    formatPhoneNumber,
    isStep1Valid,
  } = flow

  const [nameDraft, setNameDraft] = useState(userInfo.name)
  const headerRef = useRef<HTMLElement>(null)
  const mobileQuickTopicsRef = useRef<HTMLDivElement>(null)
  const quickIntroMessageRef = useRef<HTMLDivElement>(null)
  const latestQuickTopicEntryRef = useRef<HTMLDivElement>(null)
  const reservationFlowStartRef = useRef<HTMLDivElement>(null)
  const step2StartRef = useRef<HTMLDivElement>(null)
  const step3StartRef = useRef<HTMLDivElement>(null)
  const step4StartRef = useRef<HTMLDivElement>(null)
  const step1LatestUserBubbleRef = useRef<HTMLDivElement>(null)
  const step1LatestBotBubbleRef = useRef<HTMLDivElement>(null)
  const step1AnswerRef = useRef<HTMLDivElement>(null)
  const step2AnswerRef = useRef<HTMLDivElement>(null)
  const step3AnswerRef = useRef<HTMLDivElement>(null)
  const [showExitModal, setShowExitModal] = useState(false)
  const [quickTopicHistory, setQuickTopicHistory] = useState<QuickTopicChatEntry[]>([])
  const [activeQuickTopicId, setActiveQuickTopicId] = useState<QuickTopicId | null>(null)
  const [selectedQuickAgeId, setSelectedQuickAgeId] = useState<QuickIntroAgeOption["id"] | null>(null)
  const [isQuickIntroReady, setIsQuickIntroReady] = useState(false)
  const [quickIntroSeed, setQuickIntroSeed] = useState(0)
  const [isReservationFlowStarted, setIsReservationFlowStarted] = useState(true)
  const [editingField, setEditingField] = useState<"name" | "relationship" | "birthdate" | "gender" | null>(null)
  const [isMobileStepCompact, setIsMobileStepCompact] = useState(false)
  const [isRelationshipPromptReady, setIsRelationshipPromptReady] = useState(false)
  const [isBirthdatePromptReady, setIsBirthdatePromptReady] = useState(false)
  const [isGenderPromptReady, setIsGenderPromptReady] = useState(false)
  const [isNudgePromptReady, setIsNudgePromptReady] = useState(false)
  const [quickTopicTypingEntryIds, setQuickTopicTypingEntryIds] = useState<string[]>([])
  const relationshipPromptTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const birthdatePromptTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const genderPromptTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const nudgePromptTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const quickTopicTypingTimersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  const quickIntroTypingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reservationStartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isOnlyKoreanJamo = (value: string) => /^[ㄱ-ㅎㅏ-ㅣ]+$/.test(value)
  const isValidName = (value: string) => {
    const trimmed = value.trim()
    return trimmed.length >= 2 && !isOnlyKoreanJamo(trimmed)
  }

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

  const isBothSelected = attendance === "both"
  const hasNameAnswer = isValidName(userInfo.name)
  const hasRelationshipAnswer = Boolean(userInfo.relationship)
  const hasBirthdateAnswer =
    userInfo.birthdate.length === 10 && birthdateError === null && userInfo.birthdate === birthdateInput
  const hasGenderAnswer = Boolean(userInfo.gender)
  const stepLabels = ["정보입력", "참석자", "일정", "연락처"]
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
    const mobileQuickTopicsHeight = isMobileView ? (mobileQuickTopicsRef.current?.offsetHeight ?? 0) : 0
    const spacing = isMobileView ? 16 : 24
    const contextPeekOffset = isMobileView ? (options?.mobileContextPeek ?? 56) : (options?.desktopContextPeek ?? 72)
    const mobileSafeOffset = isMobileView ? 28 : 0
    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      (headerHeight + mobileQuickTopicsHeight + spacing + contextPeekOffset + mobileSafeOffset)

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
    setIsQuickIntroReady(false)

    if (quickIntroTypingTimerRef.current) {
      clearTimeout(quickIntroTypingTimerRef.current)
      quickIntroTypingTimerRef.current = null
    }

    quickIntroTypingTimerRef.current = setTimeout(() => {
      setIsQuickIntroReady(true)
      quickIntroTypingTimerRef.current = null
    }, QUICK_INTRO_TYPING_DELAY_MS)

    return () => {
      if (quickIntroTypingTimerRef.current) {
        clearTimeout(quickIntroTypingTimerRef.current)
        quickIntroTypingTimerRef.current = null
      }
    }
  }, [quickIntroSeed])

  useEffect(() => {
    if (!isReservationFlowStarted || step < 2) {
      return
    }

    const stepStartTargetRef =
      step === 2
        ? step2StartRef
        : step === 3
          ? step3StartRef
          : step === 4
            ? step4StartRef
            : null

    const isMobileView = window.innerWidth < 1024
    const mobileAnswerTargetRef =
      step === 2
        ? step1AnswerRef
        : step === 3
          ? step2AnswerRef
          : step === 4
            ? step3AnswerRef
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
  }, [isReservationFlowStarted, step, showContent])

  useEffect(() => {
    if (!isReservationFlowStarted || !reservationFlowStartRef.current) {
      return
    }

    let clearSettledScroll: (() => void) | null = null
    const frameId = window.requestAnimationFrame(() => {
      const target = quickTopicHistory.length > 0 ? (latestQuickTopicEntryRef.current ?? reservationFlowStartRef.current) : reservationFlowStartRef.current
      if (!target) {
        return
      }

      clearSettledScroll = scrollTargetWithOffsets(target, {
        mobileContextPeek: quickTopicHistory.length > 0 ? 28 : 0,
        desktopContextPeek: quickTopicHistory.length > 0 ? 72 : 0,
      })
    })

    return () => {
      window.cancelAnimationFrame(frameId)
      clearSettledScroll?.()
    }
  }, [isReservationFlowStarted, quickTopicHistory.length])

  useEffect(() => {
    if (!isReservationFlowStarted || step !== 1 || !showContent || isTyping) {
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
    isReservationFlowStarted,
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

  useEffect(() => {
    if (isReservationFlowStarted || quickTopicHistory.length === 0) {
      return
    }

    const isDesktopView = window.innerWidth >= 1024
    const latestEntry = quickTopicHistory[quickTopicHistory.length - 1]

    if (isDesktopView && latestEntry) {
      const ageSelectionCount = quickTopicHistory.filter((entry) => isQuickIntroAgeEntryId(entry.id)).length
      const quickTopicSelectionCount = quickTopicHistory.filter((entry) => isQuickTopicRootEntryId(entry.id)).length
      const isFirstAgeSelection = isQuickIntroAgeEntryId(latestEntry.id) && ageSelectionCount === 1
      const isFirstQuickTopicSelection =
        isQuickTopicRootEntryId(latestEntry.id) &&
        quickTopicSelectionCount === 1 &&
        ageSelectionCount === 0

      if (isFirstAgeSelection || isFirstQuickTopicSelection) {
        const frameId = window.requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: "smooth" })
        })

        return () => {
          window.cancelAnimationFrame(frameId)
        }
      }
    }

    const target = latestQuickTopicEntryRef.current
    if (!target) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      return
    }

    let clearSettledScroll: (() => void) | null = null
    const frameId = window.requestAnimationFrame(() => {
      clearSettledScroll = scrollTargetWithOffsets(target, {
        mobileContextPeek: 28,
        desktopContextPeek: 72,
      })
    })

    return () => {
      window.cancelAnimationFrame(frameId)
      clearSettledScroll?.()
    }
  }, [quickTopicHistory, isReservationFlowStarted, messagesEndRef])

  useEffect(() => {
    return () => {
      Object.values(quickTopicTypingTimersRef.current).forEach((timerId) => {
        clearTimeout(timerId)
      })
      quickTopicTypingTimersRef.current = {}
      if (reservationStartTimerRef.current) {
        clearTimeout(reservationStartTimerRef.current)
        reservationStartTimerRef.current = null
      }
    }
  }, [])

  const enqueueQuickTopicReplyWithTyping = (entry: QuickTopicChatEntry) => {
    if (quickTopicTypingTimersRef.current[entry.id] || quickTopicHistory.some((item) => item.id === entry.id)) {
      return
    }

    const { botMessage, tips, actions, ...baseEntry } = entry

    setQuickTopicHistory((previous) => [
      ...previous,
      {
        ...baseEntry,
        botMessage: "",
      },
    ])
    setQuickTopicTypingEntryIds((previous) => (previous.includes(entry.id) ? previous : [...previous, entry.id]))

    quickTopicTypingTimersRef.current[entry.id] = setTimeout(() => {
      setQuickTopicHistory((previous) =>
        previous.map((item) =>
          item.id === entry.id
            ? {
                ...item,
                botMessage,
                tips,
                actions,
              }
            : item,
        ),
      )
      setQuickTopicTypingEntryIds((previous) => previous.filter((itemId) => itemId !== entry.id))
      delete quickTopicTypingTimersRef.current[entry.id]
    }, QUICK_TOPIC_TYPING_DELAY_MS)
  }

  const startReservationFlowWithTyping = (entry: QuickTopicChatEntry) => {
    const alreadyQueued = Boolean(quickTopicTypingTimersRef.current[entry.id]) || quickTopicHistory.some((item) => item.id === entry.id)
    const delay = alreadyQueued ? 0 : QUICK_TOPIC_TYPING_DELAY_MS

    if (!alreadyQueued) {
      enqueueQuickTopicReplyWithTyping(entry)
    }

    if (reservationStartTimerRef.current) {
      clearTimeout(reservationStartTimerRef.current)
      reservationStartTimerRef.current = null
    }

    reservationStartTimerRef.current = setTimeout(() => {
      setIsReservationFlowStarted(true)
      reservationStartTimerRef.current = null
    }, delay)
  }

  const handleQuickIntroAgeSelect = (option: QuickIntroAgeOption) => {
    setSelectedQuickAgeId(option.id)
    const ageEntryId = `quick-intro:${option.id}`
    enqueueQuickTopicReplyWithTyping({
      id: ageEntryId,
      userMessage: option.label,
      botMessage:
        "좋아요. 해당 연령대에 맞는 관점으로 안내해 드릴게요.\n빠른 상담 주제를 선택해 질문을 이어가 보세요.",
    })
  }

  const handleQuickIntroReservationStart = () => {
    startReservationFlowWithTyping({
      id: "quick-intro:reservation-start",
      userMessage: QUICK_INTRO_RESERVATION_LABEL,
      botMessage: "좋아요. 예약 플로우를 바로 시작할게요.",
    })
  }

  const handleQuickTopicSelect = (topicId: QuickTopicId) => {
    setActiveQuickTopicId(topicId)
    const topic = QUICK_TOPICS[topicId]
    enqueueQuickTopicReplyWithTyping({
      id: topic.id,
      topicId: topic.id,
      userMessage: topic.userMessage,
      botMessage: topic.botMessage,
      tips: topic.tips,
      actions: normalizeQuickTopicActions(topic.actions),
    })
  }

  const handleQuickTopicActionClick = (topicId: QuickTopicId, action: QuickTopicAction) => {
    setActiveQuickTopicId(topicId)
    const normalizedTopicActions = normalizeQuickTopicActions(QUICK_TOPICS[topicId].actions)
    const reservationAction = normalizedTopicActions[normalizedTopicActions.length - 1]

    if (action.type === "reservation") {
      startReservationFlowWithTyping({
        id: `${topicId}:reservation-intro`,
        topicId,
        userMessage: "전문가 상담 예약을 진행하고 싶어요",
        botMessage: "좋아요. 지금부터 예약 플로우를 이어서 진행할게요.",
      })
      return
    }

    if (!action.botReply) {
      return
    }

    enqueueQuickTopicReplyWithTyping({
      id: `${topicId}:${action.id}`,
      topicId,
      userMessage: action.label,
      botMessage: action.botReply,
      actions: reservationAction ? [reservationAction] : [],
    })
  }

  const handleQuickTopicReset = () => {
    resetAll()
    Object.values(quickTopicTypingTimersRef.current).forEach((timerId) => {
      clearTimeout(timerId)
    })
    quickTopicTypingTimersRef.current = {}
    setQuickTopicHistory([])
    setQuickTopicTypingEntryIds([])
    setActiveQuickTopicId(null)
    setSelectedQuickAgeId(null)
    setQuickIntroSeed((previous) => previous + 1)
    setIsReservationFlowStarted(true)
    setEditingField(null)
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

    if (reservationStartTimerRef.current) {
      clearTimeout(reservationStartTimerRef.current)
      reservationStartTimerRef.current = null
    }

    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const selectedQuickTopicSet = new Set(
    quickTopicHistory.flatMap((entry) => (entry.topicId ? [entry.topicId] : [])),
  )
  const hasQuickTopicActivity =
    quickTopicHistory.length > 0 || selectedQuickAgeId !== null || isReservationFlowStarted || activeQuickTopicId !== null

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
              <img src={LOGO_IMAGE_URL} alt="사람ME 로고" className="h-10 w-auto md:h-11" />
            </Link>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowExitModal(true)}
              className="h-9 shrink-0 cursor-pointer rounded-full border-[#0C0C0C] bg-white px-4 text-sm font-semibold text-[#0C0C0C] shadow-none hover:bg-[#0C0C0C] hover:text-white sm:h-10 sm:px-6 sm:text-base"
            >
              {"나가기"}
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section className="mb-10">
            <h1 className="text-[30px] font-bold text-[#1F1F1F]">{"예약하기"}</h1>
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
                          onClick={handleQuickTopicReset}
                          className="absolute right-0 top-1/2 inline-flex -translate-y-1/2 cursor-pointer items-center gap-1 text-sm font-medium text-[#6570A5] transition-colors hover:text-[#4A83D8]"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>{"초기화"}</span>
                        </button>
                      )}
                    </li>
                  )
                })}
              </ol>
            </aside>

            <div className="min-w-0 space-y-4">
              <div
                ref={mobileQuickTopicsRef}
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
                    onClick={handleQuickTopicReset}
                    className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-[#2F2A23] transition-opacity hover:opacity-70"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>{"초기화"}</span>
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

              {!isReservationFlowStarted && (
                <>
                  <div ref={quickIntroMessageRef}>
                    {isQuickIntroReady ? (
                      <BotMessage
                        content={
                          <div className="space-y-3">
                            <p className="text-sm leading-relaxed whitespace-pre-line text-foreground md:text-base">
                              {QUICK_TOPIC_GUIDE_MESSAGE}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-1">
                              {QUICK_INTRO_AGE_OPTIONS.map((option) => (
                                <button
                                  key={option.id}
                                  type="button"
                                  onClick={() => handleQuickIntroAgeSelect(option)}
                                  className={cn(
                                    "inline-flex max-w-full items-center rounded-full border px-3 py-1.5 text-left text-sm font-semibold whitespace-normal transition-colors",
                                    selectedQuickAgeId === option.id
                                      ? "border-primary bg-[#EEF3FF] text-primary"
                                      : "border-[#D8CEBC] bg-white text-[#2F2A23] hover:bg-[#F4F0E7]",
                                  )}
                                >
                                  {option.label}
                                </button>
                              ))}
                              <button
                                type="button"
                                onClick={handleQuickIntroReservationStart}
                                className="inline-flex max-w-full items-center rounded-full bg-primary px-3 py-1.5 text-left text-sm font-semibold whitespace-normal text-primary-foreground transition-colors hover:bg-primary/90"
                              >
                                {QUICK_INTRO_RESERVATION_LABEL}
                              </button>
                            </div>
                          </div>
                        }
                      />
                    ) : (
                      <BotMessage content="" isTyping />
                    )}
                  </div>

                  {quickTopicHistory.map((entry, index) => {
                    const normalizedActions = entry.actions ? normalizeQuickTopicActions(entry.actions) : []
                    const isQuickEntryTyping = quickTopicTypingEntryIds.includes(entry.id)
                    const isLatestQuickTopicEntry = index === quickTopicHistory.length - 1

                    return (
                      <div
                        key={entry.id}
                        ref={isLatestQuickTopicEntry ? latestQuickTopicEntryRef : undefined}
                        className="space-y-3"
                      >
                        <UserMessage content={entry.userMessage} />
                        {isQuickEntryTyping ? (
                          <BotMessage content="" isTyping />
                        ) : (
                          entry.botMessage && (
                            <BotMessage
                              content={
                                <div className="space-y-3">
                                  <p className="text-sm leading-relaxed whitespace-pre-line text-foreground md:text-base">
                                    {entry.botMessage}
                                  </p>
                                  {entry.tips && entry.tips.length > 0 && (
                                    <div className="space-y-1.5">
                                      <p className="text-sm font-semibold text-[#2F2A23]">{"해당 연령에 대한 구체적인 팁:"}</p>
                                      <ul className="space-y-1">
                                        {entry.tips.map((tip) => (
                                          <li key={tip} className="text-sm leading-relaxed text-foreground md:text-base">
                                            {"•"} {tip}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {normalizedActions.length > 0 && (
                                    <div className="flex flex-wrap gap-2 pt-1">
                                      {normalizedActions.map((action) => (
                                        <button
                                          key={`${entry.id}-${action.id}`}
                                          type="button"
                                          onClick={() => {
                                            if (!entry.topicId) {
                                              return
                                            }
                                            handleQuickTopicActionClick(entry.topicId, action)
                                          }}
                                          className={cn(
                                            "inline-flex max-w-full items-center rounded-full px-3 py-1.5 text-left text-sm font-semibold whitespace-normal transition-colors",
                                            action.type === "reservation"
                                              ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                              : "border border-[#D8CEBC] bg-white text-[#2F2A23] hover:bg-[#F4F0E7]",
                                          )}
                                        >
                                          {action.label}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              }
                            />
                          )
                        )}
                      </div>
                    )
                  })}
                </>
              )}

              {isReservationFlowStarted && (
                <>
                  <div ref={reservationFlowStartRef} />
                  {/* Step 1: Service */}
          <Step1Service flow={flow}>
            {step >= 1 && (
              <>
                {isTyping && step === 1 ? (
                  <BotMessage content="" isTyping />
                ) : (
                  <>
                    <div ref={step1LatestBotBubbleRef}>
                      <BotMessage content={"안녕하세요! 어세스타 코칭 매니저입니다."} />
                    </div>
                    <div ref={step1LatestBotBubbleRef}>
                      <BotMessage content={"가장 최적화된 코칭을 위해 예약자분의 이름과 대상자와의 관계,\n그리고 대상자의 생년월일을 입력해 주십시오."} />
                    </div>

                    {showContent && step === 1 && (
                      <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
                        <div ref={step1LatestBotBubbleRef}>
                          <BotMessage content={"예약자분 성함을 알려주세요."} />
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
                                    placeholder={"예약자 이름을 입력해 주세요"}
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
                                  aria-label={"이름 전송"}
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
                                  <BotMessage content={"대상자와의 관계를 선택해 주세요."} />
                                </div>
                                {hasRelationshipAnswer && !isEditingRelationship ? (
                                  <div ref={step1LatestUserBubbleRef}>
                                    <EditableUserMessage
                                      content={userInfo.relationship}
                                      onEdit={() => setEditingField("relationship")}
                                    />
                                  </div>
                                ) : (
                                  <div className="flex justify-end animate-in fade-in-0 slide-in-from-right-4 duration-300">
                                    <div className={cn(RIGHT_INTERACTIVE_PANEL_CLASS, "p-3 space-y-2")}>
                                      {relationships.map((rel) => (
                                        <button
                                          key={rel}
                                          onClick={() => {
                                            setUserInfo((prev) => ({ ...prev, relationship: rel as Relationship }))
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
                                  <BotMessage content={"대상자의 생년월일을 입력해 주세요. 숫자만 입력하세요. (예: 20021225)"} />
                                </div>
                                {hasBirthdateAnswer && !isEditingBirthdate ? (
                                  <div ref={step1LatestUserBubbleRef}>
                                    <EditableUserMessage
                                      content={`${userInfo.birthdate}${ageGroup ? ` (${getAgeGroupLabel(ageGroup)})` : ""}`}
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
                                            placeholder={"숫자만 입력하세요 (예: 20021225)"}
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
                                          aria-label={"생년월일 전송"}
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
                                        {"다음으로"}
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
                    <UserMessage content={`${userInfo.name} / ${userInfo.relationship} / ${userInfo.birthdate} / ${userInfo.gender}`} />
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
                  <BotMessage content={"이번 코칭/상담에는 누가 참석하시나요?"} />

                  {showContent && step === 2 && !showNudge && attendance !== "both" && (
                    <div className="space-y-3 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
                      <div className={cn(WIDE_INTERACTIVE_PANEL_CLASS, "space-y-3 p-3")}>
                        <AttendanceOptionButton isSelected={isBothSelected} onClick={() => handleAttendanceSelect("both")}>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{"부모와 자녀 모두 참석"}</span>
                            <span className="rounded-full bg-[#E6F4FF] px-3 py-1 text-xs font-semibold text-[#4A83D8]">
                              {"강력 추천"}
                            </span>
                          </div>
                        </AttendanceOptionButton>
                        <AttendanceOptionButton isSelected={attendance === "child"} onClick={() => handleAttendanceSelect("child")}>
                          <span className="font-semibold">{"자녀만 참석"}</span>
                        </AttendanceOptionButton>
                        <AttendanceOptionButton isSelected={attendance === "parent"} onClick={() => handleAttendanceSelect("parent")}>
                          <span className="font-semibold">{"부모만 참석"}</span>
                        </AttendanceOptionButton>
                      </div>
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
                                  {"물론 홀로 참석도 가능합니다. 하지만 에세스타 맞춤형 코칭은 부모님과 자녀가 함께 오실 때 서로의 성향을 확인하고 소통하는 효과가 훨씬 커집니다."}
                                </p>
                                <p className="leading-relaxed">
                                  {"아이의 현재 상태와 부모님의 양육 성향을 함께 점검하는 과정은 코칭 방향을 더 정확하게 잡는 데 큰 도움이 됩니다."}
                                </p>
                                <p className="font-medium">{"상담 효과를 위해 두 분이 함께 참석하시는 일정으로 잡아볼까요?"}</p>
                              </div>
                            }
                          />
                          <div className="mt-5 flex gap-3 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
                            <Button onClick={() => handleNudgeResponse(true)} className="h-[50px] flex-1 text-[18px] font-semibold">
                              {"네, 함께 참석할게요"}
                            </Button>
                            <Button variant="outline" onClick={() => handleNudgeResponse(false)} className="h-[50px] flex-1 text-[18px] font-semibold">
                              {"이번에는 홀로 참석할게요"}
                            </Button>
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
                  <UserMessage
                    content={
                      attendance === "both" ? "부모와 자녀 모두 참석" : attendance === "child" ? "자녀만 참석" : "부모만 참석"
                    }
                  />
                </div>
              )}
            </>
            )}
          </Step2Expert>

          {/* Step 3: Schedule */}
          <Step3Schedule flow={flow}>
            {step >= 3 && (
            <>
              <div ref={step3StartRef} />
              {isTyping && step === 3 ? (
                <BotMessage content="" isTyping />
              ) : (
                <>
                  <BotMessage
                    content={
                      <div className="space-y-2">
                        <p>
                          {"일정 조율을 위해 희망 일정은 "}<strong>{"최소 2개 이상"}</strong>{" 선택해 주세요."}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {"선택하신 일정 중 전문가 스케줄과 교차 확인하여 최종 일정을 확정해 드립니다. 가능한 시간을 넉넉히 선택해 주시면 예약이 더 빠르게 진행됩니다."}
                        </p>
                      </div>
                    }
                  />

                  {showContent && step === 3 && (
                    <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
                      <CalendarPicker selectedDates={selectedSchedules} onDateSelect={handleScheduleSelect} />

                      {/* Selected Schedules Chips */}
                      {selectedSchedules.length > 0 && (
                        <div className="bg-card rounded-xl p-4 border border-border">
                          <p className="text-sm font-medium text-muted-foreground mb-3">{"선택한 일정"} ({selectedSchedules.length}{"개"})</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedSchedules.map((schedule, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm"
                              >
                                <span>{formatScheduleDisplay(schedule)}</span>
                                <button
                                  onClick={() => removeSchedule(index)}
                                  className="hover:bg-primary/20 rounded-full p-0.5"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <Button
                        onClick={goToNextStep}
                        disabled={selectedSchedules.length < 2}
                        className="mt-5 h-[50px] w-full bg-[#333333] text-[18px] font-semibold text-white hover:bg-[#333333] disabled:bg-[#333333] disabled:text-white"
                      >
                        {"다음으로"} {selectedSchedules.length < 2 && `(${2 - selectedSchedules.length}개 더 선택)`}
                      </Button>
                    </div>
                  )}
                </>
              )}

              {step > 3 && selectedSchedules.length > 0 && (
                <div ref={step3AnswerRef}>
                  <UserMessage content={`희망 일정: ${selectedSchedules.map((s) => formatScheduleDisplay(s)).join(", ")}`} />
                </div>
              )}
            </>
            )}

            {/* Step 4: Phone Number */}
            {step >= 4 && (
            <>
              <div ref={step4StartRef} />
              {isTyping && step === 4 ? (
                <BotMessage content="" isTyping />
              ) : (
                <>
                  <BotMessage content={"거의 완료되었습니다. 예약자분의 연락처를 남겨주시면 센터에서 일정 확인 후 카카오 알림톡으로 최종 확정 안내를 보내드립니다."} />

                  {showContent && step === 4 && (
                    <div className="bg-card rounded-2xl p-5 shadow-sm border border-border animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
                      <div className="space-y-4">
                        <div>
                          <FieldLabel icon={<Phone className="w-4 h-4 inline mr-1" />}>{"휴대폰 번호"}</FieldLabel>
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
                                {"개인정보 수집 및 이용에 동의합니다"} <span className="text-destructive font-medium">({"필수"})</span>
                              </p>
                              <button
                                type="button"
                                onClick={() => setShowPrivacyModal(true)}
                                className="text-xs text-primary hover:text-primary/80 underline underline-offset-2 mt-1"
                              >
                                [{"전문 보기"}]
                              </button>
                            </div>
                          </div>
                        </div>

                        <Button onClick={handleSubmit} disabled={phoneNumber.length < 13 || !privacyConsent} className="w-full">
                          {"최종 예약 접수하기"}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Privacy Modal */}
                  {showPrivacyModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 animate-in fade-in-0 duration-200">
                      <div className="bg-card rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden shadow-xl animate-in zoom-in-95 duration-200">
                                                <div className="flex items-center justify-between p-4 border-b border-border">
                          <h3 className="font-semibold text-foreground">{"개인정보 수집 및 이용 동의"}</h3>
                          <button
                            onClick={() => setShowPrivacyModal(false)}
                            className="p-1 hover:bg-muted rounded-lg transition-colors"
                          >
                            <X className="w-5 h-5 text-muted-foreground" />
                          </button>
                        </div>
                        <div className="p-5 overflow-y-auto max-h-[60vh]">
                          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                            <div>
                              <h4 className="font-medium text-foreground mb-2">{"1. 수집하는 개인정보 항목"}</h4>
                              <p>{"에세스타 부모코칭은 상담 예약 및 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다."}</p>
                              <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>{"필수 항목: 예약자 이름, 대상자와의 관계, 대상자 생년월일, 대상자 성별, 휴대폰 번호"}</li>
                                <li>{"선택 항목: 상담 희망 일정, 상담 고민 내용"}</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground mb-2">{"2. 개인정보 수집 및 이용 목적"}</h4>
                              <ul className="list-disc list-inside space-y-1">
                                <li>{"상담 예약 접수 및 일정 조율"}</li>
                                <li>{"카카오 알림톡을 통한 예약 확정 안내"}</li>
                                <li>{"맞춤형 상담 서비스 제공을 위한 사전 정보 파악"}</li>
                                <li>{"서비스 개선을 위한 통계 분석 (비식별 처리)"}</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground mb-2">{"3. 개인정보 보유 및 이용 기간"}</h4>
                              <p>
                                {"수집된 개인정보는 "}<strong className="text-foreground">{"상담 완료 후 1년간"}</strong>{" 보관되며, 이후 지체 없이"}
                                {"파기됩니다. 단, 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관될 수 있습니다."}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground mb-2">{"4. 동의 거부권 및 불이익"}</h4>
                              <p>
                                {"귀하는 개인정보 수집 및 이용 동의를 거부할 권리가 있습니다. 다만, 필수 항목에 대한 동의를 거부하실 경우 상담"}
                                {"예약 서비스 이용이 제한될 수 있습니다."}
                              </p>
                            </div>
                          </div>
                        </div>                        <div className="p-4 border-t border-border">
                          <Button
                            onClick={() => {
                              setPrivacyConsent(true)
                              setShowPrivacyModal(false)
                            }}
                            className="w-full"
                          >
                            {"동의하고 닫기"}
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
                </>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </main>

      {showExitModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/45 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-[#E4DBCC] bg-white p-6 shadow-xl">
            <p className="whitespace-pre-line text-base font-medium leading-relaxed text-[#2F2A23]">
              {"작성 중인 내용이 모두 사라집니다.\n정말 나가시겠어요?"}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowExitModal(false)}
                className="h-11 cursor-pointer rounded-xl border-[#D4CBB9] bg-white text-[#3D372F] hover:bg-white hover:text-[#3D372F]"
              >
                {"계속 진행"}              </Button>
              <Button type="button" onClick={handleExit} className="h-11 cursor-pointer rounded-xl bg-[#333333] text-white hover:bg-[#333333] hover:text-white">
                {"나가기"}              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}



