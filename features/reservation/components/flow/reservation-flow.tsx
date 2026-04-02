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
import { concernData, genders, relationships } from "../../data/reservation.constants"
import {
  QUICK_TOPICS,
  QUICK_TOPIC_ORDER,
  normalizeQuickTopicActions,
  type QuickTopicAction,
  type QuickTopicId,
  type QuickTopicItem,
} from "../../data/quick-topics"
import type { Gender, Relationship } from "../../model/reservation.types"
import { BotMessage, CalendarPicker, ConcernCard, UserMessage } from "../shared/reservation-primitives"
import { Step1Service } from "./step1-service"
import { Step2Expert } from "./step2-expert"
import { Step3Schedule } from "./step3-schedule"

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
  "\uC548\uB155\uD558\uC138\uC694! \uD83C\uDF31\n\n\uC544\uC774\uC758 \uBC1C\uB2EC\uACFC \uAD00\uB828\uB41C \uAD81\uAE08\uC99D\uC774\uB098 \uAC71\uC815\uC744 \uD3B8\uD558\uAC8C \uB9D0\uC500\uD574 \uC8FC\uC138\uC694.\n\uBC1C\uB2EC\uC2EC\uB9AC\uD559\uC744 \uAE30\uBC18\uC73C\uB85C \uB3C4\uC6C0\uC774 \uB418\uB294 \uC815\uBCF4\uC640 \uBC29\uD5A5\uC744 \uC548\uB0B4\uD574 \uB4DC\uB9AC\uACA0\uC2B5\uB2C8\uB2E4.\n\n\uBA3C\uC800, \uC544\uC774\uAC00 \uBA87 \uC0B4\uC778\uC9C0 \uC54C\uB824\uC8FC\uC2E4 \uC218 \uC788\uC744\uAE4C\uC694?"
const QUICK_INTRO_AGE_OPTIONS: QuickIntroAgeOption[] = [
  { id: "age_0_2", label: "0-2\uC138 (\uC601\uC544\uAE30)" },
  { id: "age_3_6", label: "3-6\uC138 (\uC720\uC544\uAE30)" },
  { id: "age_7_12", label: "7-12\uC138 (\uC544\uB3D9\uAE30)" },
  { id: "age_13_18", label: "13-18\uC138 (\uCCAD\uC18C\uB144\uAE30)" },
]
const QUICK_INTRO_RESERVATION_LABEL = "\uC804\uBB38\uAC00 \uC0C1\uB2F4 \uBC14\uB85C \uC2DC\uC791\uD558\uAE30"
const QUICK_TOPIC_TYPING_DELAY_MS = 900
const RIGHT_BUBBLE_GRADIENT_CLASS = "bg-[linear-gradient(144.37deg,#5CCDFF_7.06%,#3E72FF_90.82%)]"
const RIGHT_INTERACTIVE_PANEL_CLASS = "w-full max-w-md rounded-[20px] rounded-tr-[5px] border border-[#DFDFDF] bg-white"
const WIDE_INTERACTIVE_PANEL_CLASS = "w-full rounded-[20px] border border-[#DFDFDF] bg-white"

function AttendanceOptionButton({ isSelected, onClick, children }: AttendanceOptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full rounded-[18px] border px-4 py-5 text-left transition-all duration-200",
        isSelected
          ? "border-[#8FB3E8] bg-[#F4FAFF]"
          : "border-[#DFDFDF] bg-[#F4FAFF] hover:border-[#C9D7EE] hover:bg-[#F4FAFF]",
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
        {"\uc218\uc815"}
      </button>
      <div className={cn(RIGHT_BUBBLE_GRADIENT_CLASS, "text-white rounded-[20px] rounded-tr-[5px] px-4 py-3 max-w-[85%]")}>
        <p className="text-sm md:text-base leading-relaxed">{content}</p>
      </div>
    </div>
  )
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
    selectedConcerns,
    concernLimitMessage,
    selectedConcern,
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
    toggleConcernSelection,
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
  const reservationFlowStartRef = useRef<HTMLDivElement>(null)
  const step2StartRef = useRef<HTMLDivElement>(null)
  const step3StartRef = useRef<HTMLDivElement>(null)
  const step4StartRef = useRef<HTMLDivElement>(null)
  const step5StartRef = useRef<HTMLDivElement>(null)
  const [showExitModal, setShowExitModal] = useState(false)
  const [quickTopicHistory, setQuickTopicHistory] = useState<QuickTopicChatEntry[]>([])
  const [activeQuickTopicId, setActiveQuickTopicId] = useState<QuickTopicId | null>(null)
  const [selectedQuickAgeId, setSelectedQuickAgeId] = useState<QuickIntroAgeOption["id"] | null>(null)
  const [isReservationFlowStarted, setIsReservationFlowStarted] = useState(false)
  const [editingField, setEditingField] = useState<"name" | "relationship" | "birthdate" | "gender" | null>(null)
  const [isMobileStepCompact, setIsMobileStepCompact] = useState(false)
  const [isRelationshipPromptReady, setIsRelationshipPromptReady] = useState(false)
  const [isBirthdatePromptReady, setIsBirthdatePromptReady] = useState(false)
  const [isGenderPromptReady, setIsGenderPromptReady] = useState(false)
  const [quickTopicTypingEntryIds, setQuickTopicTypingEntryIds] = useState<string[]>([])
  const relationshipPromptTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const birthdatePromptTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const genderPromptTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const quickTopicTypingTimersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  const isOnlyKoreanJamo = (value: string) => /^[\u3131-\u314e\u314f-\u3163]+$/.test(value)
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
  const concernAgeGroup = ageGroup === "adult" ? "high" : ageGroup
  const totalConcernCount = concernAgeGroup ? concernData[concernAgeGroup].cards.length : 5
  const hasNameAnswer = isValidName(userInfo.name)
  const hasRelationshipAnswer = Boolean(userInfo.relationship)
  const hasBirthdateAnswer =
    userInfo.birthdate.length === 10 && birthdateError === null && userInfo.birthdate === birthdateInput
  const hasGenderAnswer = Boolean(userInfo.gender)
  const isEditingName = editingField === "name"
  const isEditingRelationship = editingField === "relationship"
  const isEditingBirthdate = editingField === "birthdate"
  const isEditingGender = editingField === "gender"
  const canShowRelationshipQuestion = hasNameAnswer && !isEditingName
  const canShowBirthdateQuestion = canShowRelationshipQuestion && hasRelationshipAnswer && !isEditingRelationship
  const canShowGenderQuestion = canShowBirthdateQuestion && hasBirthdateAnswer && !isEditingBirthdate

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
    if (!isReservationFlowStarted || step < 2) {
      return
    }

    const targetRef =
      step === 2
        ? step2StartRef
        : step === 3
          ? step3StartRef
          : step === 4
            ? step4StartRef
            : step === 5
              ? step5StartRef
              : null

    if (!targetRef?.current) {
      return
    }

    const target = targetRef.current
    const frameId = window.requestAnimationFrame(() => {
      const headerHeight = headerRef.current?.offsetHeight ?? (window.innerWidth >= 768 ? 80 : 64)
      const isMobileView = window.innerWidth < 1024
      const mobileQuickTopicsHeight = isMobileView ? (mobileQuickTopicsRef.current?.offsetHeight ?? 0) : 0
      const spacing = isMobileView ? 16 : 24
      const contextPeekOffset = isMobileView ? 56 : 72
      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        (headerHeight + mobileQuickTopicsHeight + spacing + contextPeekOffset)

      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" })
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [isReservationFlowStarted, step, showContent])

  useEffect(() => {
    if (!isReservationFlowStarted || !reservationFlowStartRef.current) {
      return
    }

    const frameId = window.requestAnimationFrame(() => {
      const target = reservationFlowStartRef.current
      if (!target) {
        return
      }

      const headerHeight = headerRef.current?.offsetHeight ?? (window.innerWidth >= 768 ? 80 : 64)
      const isMobileView = window.innerWidth < 1024
      const mobileQuickTopicsHeight = isMobileView ? (mobileQuickTopicsRef.current?.offsetHeight ?? 0) : 0
      const spacing = isMobileView ? 16 : 24
      const top = target.getBoundingClientRect().top + window.scrollY - (headerHeight + mobileQuickTopicsHeight + spacing)

      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" })
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [isReservationFlowStarted])

  useEffect(() => {
    if (quickTopicHistory.length === 0 && !isReservationFlowStarted) {
      return
    }

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [quickTopicHistory, isReservationFlowStarted, messagesEndRef])

  useEffect(() => {
    return () => {
      Object.values(quickTopicTypingTimersRef.current).forEach((timerId) => {
        clearTimeout(timerId)
      })
      quickTopicTypingTimersRef.current = {}
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

  const handleQuickIntroAgeSelect = (option: QuickIntroAgeOption) => {
    setSelectedQuickAgeId(option.id)
    const ageEntryId = `quick-intro:${option.id}`
    enqueueQuickTopicReplyWithTyping({
      id: ageEntryId,
      userMessage: option.label,
      botMessage:
        "\uC88B\uC544\uC694. \uD574\uB2F9 \uC5F0\uB839\uB300\uC5D0 \uB9DE\uB294 \uAD00\uC810\uC73C\uB85C \uC548\uB0B4\uD574 \uB4DC\uB9B4\uAC8C\uC694.\n\uBE60\uB978 \uC0C1\uB2F4 \uC8FC\uC81C\uB97C \uC120\uD0DD\uD574 \uC9C8\uBB38\uC744 \uC774\uC5B4\uAC00 \uBCF4\uC138\uC694.",
    })
  }

  const handleQuickIntroReservationStart = () => {
    setQuickTopicHistory((previous) => {
      const entryId = "quick-intro:reservation-start"
      if (previous.some((entry) => entry.id === entryId)) {
        return previous
      }

      return [
        ...previous,
        {
          id: entryId,
          userMessage: QUICK_INTRO_RESERVATION_LABEL,
          botMessage: "\uC88B\uC544\uC694. \uC608\uC57D \uD50C\uB85C\uC6B0\uB97C \uBC14\uB85C \uC2DC\uC791\uD560\uAC8C\uC694.",
        },
      ]
    })
    setIsReservationFlowStarted(true)
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

    if (action.type === "reservation") {
      setQuickTopicHistory((previous) => {
        const reservationIntroId = `${topicId}:reservation-intro`
        if (previous.some((entry) => entry.id === reservationIntroId)) {
          return previous
        }

        return [
          ...previous,
          {
            id: reservationIntroId,
            topicId,
            userMessage: "\uC804\uBB38\uAC00 \uC0C1\uB2F4 \uC608\uC57D\uC744 \uC9C4\uD589\uD558\uACE0 \uC2F6\uC5B4\uC694",
            botMessage: "\uC88B\uC544\uC694. \uC9C0\uAE08\uBD80\uD130 \uC608\uC57D \uD50C\uB85C\uC6B0\uB97C \uC774\uC5B4\uC11C \uC9C4\uD589\uD560\uAC8C\uC694.",
          },
        ]
      })
      setIsReservationFlowStarted(true)
      return
    }

    if (!action.botReply) {
      return
    }

    const normalizedTopicActions = normalizeQuickTopicActions(QUICK_TOPICS[topicId].actions)
    const reservationAction = normalizedTopicActions[normalizedTopicActions.length - 1]
    const followUpEntryId = `${topicId}:${action.id}`

    setQuickTopicHistory((previous) => {
      if (previous.some((entry) => entry.id === followUpEntryId)) {
        return previous
      }

      return [
        ...previous,
        {
          id: followUpEntryId,
          topicId,
          userMessage: action.label,
          botMessage: action.botReply ?? "",
          actions: reservationAction ? [reservationAction] : [],
        },
      ]
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
    setIsReservationFlowStarted(false)
    setEditingField(null)
    setIsRelationshipPromptReady(false)
    setIsBirthdatePromptReady(false)
    setIsGenderPromptReady(false)

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
    <div className="min-h-screen bg-white">
      <header ref={headerRef} className="fixed top-0 left-0 right-0 z-[100] border-b border-[#EDE3D8] bg-[#FFF9F4]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between md:h-20">
            <Link
              href="/"
              className="shrink-0"
              onClick={(e) => {
                e.preventDefault()
                setShowExitModal(true)
              }}
            >
              <span className="text-2xl font-bold tracking-tight text-[#0C0C0C] md:text-[2.1rem]">{"\uC0AC\uBC1C\uBA74"}</span>
            </Link>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowExitModal(true)}
              className="h-10 cursor-pointer rounded-full border-[#0C0C0C] bg-white px-6 text-base font-semibold text-[#0C0C0C] shadow-none hover:bg-[#0C0C0C] hover:text-white"
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
              {"\uc544\uc774\uc758 \uc131\uc7a5 \ub2e8\uacc4\uc5d0 \ub9de\ub294 \uc804\ubb38\uc801\uc778 \uc194\ub8e8\uc158\uc744 \uc81c\uacf5\ud569\ub2c8\ub2e4."}
            </p>
          </section>

          <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
            <aside className="hidden self-start lg:block lg:sticky lg:top-28">
              <div className="rounded-2xl border border-[#D6D9F3] bg-white p-5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-lg font-bold text-[#6570A5]">{"\uBE60\uB978 \uC0C1\uB2F4 \uC8FC\uC81C"}</p>
                  <button
                    type="button"
                    onClick={handleQuickTopicReset}
                    disabled={!hasQuickTopicActivity}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
                      hasQuickTopicActivity
                        ? "text-[#6570A5] hover:bg-[#EEF3FF] hover:text-primary"
                        : "cursor-not-allowed text-[#B4BCD9]",
                    )}
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>{"\uCD08\uAE30\uD654"}</span>
                  </button>
                </div>
                <div className="mt-4 space-y-2">
                  {QUICK_TOPIC_ORDER.map((topicId) => {
                    const topic = QUICK_TOPICS[topicId]
                    const Icon = QUICK_TOPIC_ICON_MAP[topic.icon]
                    const isActive = activeQuickTopicId === topicId
                    const isSelected = selectedQuickTopicSet.has(topicId)

                    return (
                      <button
                        key={topicId}
                        type="button"
                        onClick={() => handleQuickTopicSelect(topicId)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors",
                          isActive
                            ? "bg-[#EEF3FF] text-primary"
                            : isSelected
                              ? "bg-[#F4F7FF] text-[#4E5D90]"
                              : "text-[#4E5D90] hover:bg-[#F6F8FF]",
                        )}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        <span className="text-lg font-medium leading-none">{topic.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </aside>

            <div className="space-y-4">
              <div
                ref={mobileQuickTopicsRef}
                className={cn(
                  "sticky top-[74px] z-30 rounded-2xl border border-[#D6D9F3] bg-white transition-all duration-300 md:top-[90px] lg:hidden",
                  isMobileStepCompact ? "p-2.5" : "p-3.5",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={cn(
                      "font-semibold leading-none text-[#6570A5] transition-all duration-300",
                      isMobileStepCompact ? "text-sm" : "text-base",
                    )}
                  >
                    {"\uBE60\uB978 \uC0C1\uB2F4 \uC8FC\uC81C"}
                  </p>
                  <button
                    type="button"
                    onClick={handleQuickTopicReset}
                    disabled={!hasQuickTopicActivity}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold transition-colors",
                      hasQuickTopicActivity
                        ? "text-[#6570A5] hover:bg-[#EEF3FF] hover:text-primary"
                        : "cursor-not-allowed text-[#B4BCD9]",
                    )}
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>{"\uCD08\uAE30\uD654"}</span>
                  </button>
                </div>
                <div className="mt-2 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {QUICK_TOPIC_ORDER.map((topicId) => {
                    const topic = QUICK_TOPICS[topicId]
                    const Icon = QUICK_TOPIC_ICON_MAP[topic.icon]
                    const isActive = activeQuickTopicId === topicId
                    const isSelected = selectedQuickTopicSet.has(topicId)

                    return (
                      <button
                        key={topicId}
                        type="button"
                        onClick={() => handleQuickTopicSelect(topicId)}
                        className={cn(
                          "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 font-semibold transition-colors",
                          isActive
                            ? "border-primary bg-[#EEF3FF] text-primary"
                            : isSelected
                              ? "border-[#D6D9F3] bg-[#F4F7FF] text-[#4E5D90]"
                              : "border-[#D6D9F3] bg-white text-[#4E5D90]",
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="text-lg leading-none">{topic.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

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
                            "inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
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
                        className="inline-flex items-center rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        {QUICK_INTRO_RESERVATION_LABEL}
                      </button>
                    </div>
                  </div>
                }
              />

              {quickTopicHistory.map((entry) => {
                const normalizedActions = entry.actions ? normalizeQuickTopicActions(entry.actions) : []
                const isQuickEntryTyping = quickTopicTypingEntryIds.includes(entry.id)

                return (
                  <div key={entry.id} className="space-y-3">
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
                                  <p className="text-sm font-semibold text-[#2F2A23]">{"\uD574\uB2F9 \uC5F0\uB839\uC5D0 \uB300\uD55C \uAD6C\uCCB4\uC801\uC778 \uD301:"}</p>
                                  <ul className="space-y-1">
                                    {entry.tips.map((tip) => (
                                      <li key={tip} className="text-sm leading-relaxed text-foreground md:text-base">
                                        {"\u2022"} {tip}
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
                                        "inline-flex items-center rounded-full px-3 py-1.5 text-sm font-semibold transition-colors",
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
                    <BotMessage content={"\uc548\ub155\ud558\uc138\uc694! \uc5d0\uc138\uc2a4\ud0c0 \ubd80\ubaa8\ucf54\uce6d \ub9e4\ub2c8\uc800\uc785\ub2c8\ub2e4."} />
                    <BotMessage content={"\uac00\uc7a5 \ucd5c\uc801\ud654\ub41c \ucf54\uce6d\uc744 \uc704\ud574 \uc608\uc57d\uc790\ubd84\uc758 \uc774\ub984\uacfc \ub300\uc0c1\uc790\uc640\uc758 \uad00\uacc4,\n\uadf8\ub9ac\uace0 \ub300\uc0c1\uc790\uc758 \uc0dd\ub144\uc6d4\uc77c\uc744 \uc785\ub825\ud574 \uc8fc\uc2ed\uc2dc\uc624."} />

                    {showContent && step === 1 && (
                      <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
                        <BotMessage content={"\uc608\uc57d\uc790\ubd84 \uc131\ud568\uc744 \uc54c\ub824\uc8fc\uc138\uc694."} />
                        {hasNameAnswer && !isEditingName ? (
                          <EditableUserMessage
                            content={userInfo.name}
                            onEdit={() => {
                              setNameDraft(userInfo.name)
                              setEditingField("name")
                            }}
                          />
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
                                      ? "border-transparent bg-[#F4FAFF] text-[#2E5FD7] hover:bg-[#EAF4FF]"
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
                                <BotMessage content={"\ub300\uc0c1\uc790\uc640\uc758 \uad00\uacc4\ub97c \uc120\ud0dd\ud574 \uc8fc\uc138\uc694."} />
                                {hasRelationshipAnswer && !isEditingRelationship ? (
                                  <EditableUserMessage
                                    content={userInfo.relationship}
                                    onEdit={() => setEditingField("relationship")}
                                  />
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
                                              ? "border-[#7FC6FF] bg-[#F4FAFF] text-[#235FD7] font-semibold"
                                              : "border-transparent bg-[#F4FAFF] hover:bg-[#EAF4FF] text-[#1F2B3D]",
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
                                <BotMessage content={"\ub300\uc0c1\uc790\uc758 \uc0dd\ub144\uc6d4\uc77c\uc744 \uc785\ub825\ud574 \uc8fc\uc138\uc694. \uc22b\uc790\ub9cc \uc785\ub825\ud558\uc138\uc694. (\uc608: 20021225)"} />
                                {hasBirthdateAnswer && !isEditingBirthdate ? (
                                  <EditableUserMessage
                                    content={`${userInfo.birthdate}${ageGroup ? ` (${getAgeGroupLabel(ageGroup)})` : ""}`}
                                    onEdit={() => setEditingField("birthdate")}
                                  />
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
                                            placeholder={"\uc22b\uc790\ub9cc \uc785\ub825\ud558\uc138\uc694 (\uc608: 20021225)"}
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
                                              ? "border-transparent bg-[#F4FAFF] text-[#2E5FD7] hover:bg-[#EAF4FF]"
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
                                <BotMessage content={"\ub300\uc0c1\uc790 \uc131\ubcc4\uc744 \uc120\ud0dd\ud574 \uc8fc\uc138\uc694."} />
                                {hasGenderAnswer && !isEditingGender ? (
                                  <>
                                    <EditableUserMessage
                                      content={userInfo.gender}
                                      onEdit={() => setEditingField("gender")}
                                    />
                                    <div className="w-full animate-in fade-in-0 slide-in-from-right-4 duration-300">
                                      <Button
                                        onClick={goToNextStep}
                                        disabled={!isStep1Valid}
                                        className="mt-5 h-[50px] w-full bg-[#4A83D8] text-[18px] font-semibold text-white hover:bg-[#3F73C2] disabled:bg-[#4A83D8] disabled:text-white"
                                      >
                                        {"\ub2e4\uc74c\uc73c\ub85c"}
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
                                              ? "border-[#7FC6FF] bg-[#F4FAFF] text-[#235FD7] font-semibold"
                                              : "border-transparent bg-[#F4FAFF] hover:bg-[#EAF4FF] text-[#1F2B3D]",
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
                  <UserMessage content={`${userInfo.name} / ${userInfo.relationship} / ${userInfo.birthdate} / ${userInfo.gender}`} />
                )}
              </>
            )}
          </Step1Service>

          {/* Step 2: Expert */}
          <Step2Expert flow={flow}>
            {step >= 2 && concernAgeGroup && (
            <>
              <div ref={step2StartRef} />
              {isTyping && step === 2 ? (
                <BotMessage content="" isTyping />
              ) : (
                <>
                  <BotMessage content={"\ud604\uc7ac \uac00\uc7a5 \uace0\ubbfc\ub418\ub294 \ubd80\ubd84\uc740 \ubb34\uc5c7\uc778\uac00\uc694?"} />

                  {showContent && step === 2 && (
                    <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
                      <div className={cn(WIDE_INTERACTIVE_PANEL_CLASS, "space-y-4 p-4")}>
                        {/* Slogan Card */}
                        <div className="rounded-xl border border-[#DFDFDF] bg-[#FAF8F4] p-4">
                          <p className="text-center text-sm font-medium leading-relaxed text-[#2F2A23]">
                            {concernData[concernAgeGroup].slogan}
                          </p>
                          <p className="mt-2 text-center text-xs text-[#6B6256]">{concernData[concernAgeGroup].intro}</p>
                        </div>

                        {/* Concern Cards */}
                        <div className="space-y-3">
                          {concernData[concernAgeGroup].cards.map((card) => (
                            <ConcernCard
                              key={card.title}
                              card={card}
                              isSelected={selectedConcerns.some((item) => item.id === card.title)}
                              selectionOrder={selectedConcerns.find((item) => item.id === card.title)?.order}
                              onSelect={() => toggleConcernSelection(card.title)}
                            />
                          ))}
                        </div>

                        {concernLimitMessage && <p className="text-sm text-destructive">{concernLimitMessage}</p>}
                        <p className="text-sm text-[#5D5549]">{"\uc120\ud0dd\ub41c \uace0\ubbfc:"} {selectedConcerns.length}/{totalConcernCount}</p>
                      </div>

                      <Button
                        onClick={goToNextStep}
                        disabled={selectedConcerns.length === 0}
                        className="mt-5 h-[50px] w-full bg-[#4A83D8] text-[18px] font-semibold text-white hover:bg-[#3F73C2] disabled:bg-[#4A83D8] disabled:text-white"
                      >
                        {"\ub2e4\uc74c\uc73c\ub85c"}
                      </Button>
                    </div>
                  )}
                </>
              )}

              {step > 2 && selectedConcern && <UserMessage content={selectedConcern} />}
            </>
            )}

            {/* Step 3: Attendance */}
            {step >= 3 && (
            <>
              <div ref={step3StartRef} />
              {isTyping && step === 3 ? (
                <BotMessage content="" isTyping />
              ) : (
                <>
                  <BotMessage content={"\uc774\ubc88 \ucf54\uce6d/\uc0c1\ub2f4\uc5d0\ub294 \ub204\uac00 \ucc38\uc11d\ud558\uc2dc\ub098\uc694?"} />

                  {showContent && step === 3 && !showNudge && attendance !== "both" && (
                    <div className="space-y-3 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
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
                      </div>
                    </div>
                  )}

                  {/* Nudge Message */}
                  {showNudge && (
                    <>
                      <BotMessage
                        content={
                          <div className="space-y-3">
                            <p className="leading-relaxed">
                              {"\ubb3c\ub860 \ud640\ub85c \ucc38\uc11d\ub3c4 \uac00\ub2a5\ud569\ub2c8\ub2e4. \ud558\uc9c0\ub9cc \uc5d0\uc138\uc2a4\ud0c0 \ub9de\ucda4\ud615 \ucf54\uce6d\uc740 \ubd80\ubaa8\ub2d8\uacfc \uc790\ub140\uac00 \ud568\uaed8 \uc624\uc2e4 \ub54c \uc11c\ub85c\uc758 \uc131\ud5a5\uc744 \ud655\uc778\ud558\uace0 \uc18c\ud1b5\ud558\ub294 \ud6a8\uacfc\uac00 \ud6e8\uc52c \ucee4\uc9d1\ub2c8\ub2e4."}
                            </p>
                            <p className="leading-relaxed">
                              {"\uc544\uc774\uc758 \ud604\uc7ac \uc0c1\ud0dc\uc640 \ubd80\ubaa8\ub2d8\uc758 \uc591\uc721 \uc131\ud5a5\uc744 \ud568\uaed8 \uc810\uac80\ud558\ub294 \uacfc\uc815\uc740 \ucf54\uce6d \ubc29\ud5a5\uc744 \ub354 \uc815\ud655\ud558\uac8c \uc7a1\ub294 \ub370 \ud070 \ub3c4\uc6c0\uc774 \ub429\ub2c8\ub2e4."}
                            </p>
                            <p className="font-medium">{"\uc0c1\ub2f4 \ud6a8\uacfc\ub97c \uc704\ud574 \ub450 \ubd84\uc774 \ud568\uaed8 \ucc38\uc11d\ud558\uc2dc\ub294 \uc77c\uc815\uc73c\ub85c \uc7a1\uc544\ubcfc\uae4c\uc694?"}</p>
                          </div>
                        }
                      />
                      <div className="flex gap-3 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
                        <Button onClick={() => handleNudgeResponse(true)} className="flex-1">
                          {"\ub124, \ud568\uaed8 \ucc38\uc11d\ud560\uac8c\uc694"}                        </Button>
                        <Button variant="outline" onClick={() => handleNudgeResponse(false)} className="flex-1">
                          {"\uc774\ubc88\uc5d0\ub294 \ud640\ub85c \ucc38\uc11d\ud560\uac8c\uc694"}                        </Button>
                      </div>
                    </>
                  )}
                </>
              )}

              {step > 3 && attendance && (
                <UserMessage
                  content={
                    attendance === "both" ? "\uBD80\uBAA8\uC640 \uC790\uB140 \uBAA8\uB450 \uCC38\uC11D" : attendance === "child" ? "\uC790\uB140\uB9CC \uCC38\uC11D" : "\uBD80\uBAA8\uB9CC \uCC38\uC11D"
                  }
                />
              )}
            </>
            )}
          </Step2Expert>

          {/* Step 3: Schedule */}
          <Step3Schedule flow={flow}>
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
                          {"\uC77C\uC815 \uC870\uC728\uC744 \uC704\uD574 \uD76C\uB9DD \uC77C\uC815\uC740 "}<strong>{"\uCD5C\uC18C 2\uAC1C \uC774\uC0C1"}</strong>{" \uC120\uD0DD\uD574 \uC8FC\uC138\uC694."}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {"\uC120\uD0DD\uD558\uC2E0 \uC77C\uC815 \uC911 \uC804\uBB38\uAC00 \uC2A4\uCF00\uC904\uACFC \uAD50\uCC28 \uD655\uC778\uD558\uC5EC \uCD5C\uC885 \uC77C\uC815\uC744 \uD655\uC815\uD574 \uB4DC\uB9BD\uB2C8\uB2E4. \uAC00\uB2A5\uD55C \uC2DC\uAC04\uC744 \uB109\uB109\uD788 \uC120\uD0DD\uD574 \uC8FC\uC2DC\uBA74 \uC608\uC57D\uC774 \uB354 \uBE60\uB974\uAC8C \uC9C4\uD589\uB429\uB2C8\uB2E4."}
                        </p>
                      </div>
                    }
                  />

                  {showContent && step === 4 && (
                    <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
                      <CalendarPicker selectedDates={selectedSchedules} onDateSelect={handleScheduleSelect} />

                      {/* Selected Schedules Chips */}
                      {selectedSchedules.length > 0 && (
                        <div className="bg-card rounded-xl p-4 border border-border">
                          <p className="text-sm font-medium text-muted-foreground mb-3">{"\uc120\ud0dd\ud55c \uc77c\uc815"} ({selectedSchedules.length}{"\uac1c"})</p>
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
                        className="mt-5 h-[50px] w-full bg-[#4A83D8] text-[18px] font-semibold text-white hover:bg-[#3F73C2] disabled:bg-[#4A83D8] disabled:text-white"
                      >
                        {"\ub2e4\uc74c\uc73c\ub85c"} {selectedSchedules.length < 2 && `(${2 - selectedSchedules.length}\uac1c \ub354 \uc120\ud0dd)`}
                      </Button>
                    </div>
                  )}
                </>
              )}

              {step > 4 && selectedSchedules.length > 0 && (
                <UserMessage content={`\ud76c\ub9dd \uc77c\uc815: ${selectedSchedules.map((s) => formatScheduleDisplay(s)).join(", ")}`} />
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
                  <BotMessage content={"\uac70\uc758 \uc644\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \uc608\uc57d\uc790\ubd84\uc758 \uc5f0\ub77d\ucc98\ub97c \ub0a8\uaca8\uc8fc\uc2dc\uba74 \uc13c\ud130\uc5d0\uc11c \uc77c\uc815 \ud655\uc778 \ud6c4 \uce74\uce74\uc624 \uc54c\ub9bc\ud1a1\uc73c\ub85c \ucd5c\uc885 \ud655\uc815 \uc548\ub0b4\ub97c \ubcf4\ub0b4\ub4dc\ub9bd\ub2c8\ub2e4."} />

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
                                {"\uac1c\uc778\uc815\ubcf4 \uc218\uc9d1 \ubc0f \uc774\uc6a9\uc5d0 \ub3d9\uc758\ud569\ub2c8\ub2e4"} <span className="text-destructive font-medium">({"\ud544\uc218"})</span>
                              </p>
                              <button
                                type="button"
                                onClick={() => setShowPrivacyModal(true)}
                                className="text-xs text-primary hover:text-primary/80 underline underline-offset-2 mt-1"
                              >
                                [{"\uc804\ubb38 \ubcf4\uae30"}]
                              </button>
                            </div>
                          </div>
                        </div>

                        <Button onClick={handleSubmit} disabled={phoneNumber.length < 13 || !privacyConsent} className="w-full">
                          {"\ucd5c\uc885 \uc608\uc57d \uc811\uc218\ud558\uae30"}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Privacy Modal */}
                  {showPrivacyModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 animate-in fade-in-0 duration-200">
                      <div className="bg-card rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden shadow-xl animate-in zoom-in-95 duration-200">
                                                <div className="flex items-center justify-between p-4 border-b border-border">
                          <h3 className="font-semibold text-foreground">{"\uac1c\uc778\uc815\ubcf4 \uc218\uc9d1 \ubc0f \uc774\uc6a9 \ub3d9\uc758"}</h3>
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
                              <h4 className="font-medium text-foreground mb-2">{"1. \uc218\uc9d1\ud558\ub294 \uac1c\uc778\uc815\ubcf4 \ud56d\ubaa9"}</h4>
                              <p>{"\uc5d0\uc138\uc2a4\ud0c0 \ubd80\ubaa8\ucf54\uce6d\uc740 \uc0c1\ub2f4 \uc608\uc57d \ubc0f \uc11c\ube44\uc2a4 \uc81c\uacf5\uc744 \uc704\ud574 \uc544\ub798\uc640 \uac19\uc740 \uac1c\uc778\uc815\ubcf4\ub97c \uc218\uc9d1\ud569\ub2c8\ub2e4."}</p>
                              <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>{"\ud544\uc218 \ud56d\ubaa9: \uc608\uc57d\uc790 \uc774\ub984, \ub300\uc0c1\uc790\uc640\uc758 \uad00\uacc4, \ub300\uc0c1\uc790 \uc0dd\ub144\uc6d4\uc77c, \ub300\uc0c1\uc790 \uc131\ubcc4, \ud734\ub300\ud3f0 \ubc88\ud638"}</li>
                                <li>{"\uc120\ud0dd \ud56d\ubaa9: \uc0c1\ub2f4 \ud76c\ub9dd \uc77c\uc815, \uc0c1\ub2f4 \uace0\ubbfc \ub0b4\uc6a9"}</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground mb-2">{"2. \uac1c\uc778\uc815\ubcf4 \uc218\uc9d1 \ubc0f \uc774\uc6a9 \ubaa9\uc801"}</h4>
                              <ul className="list-disc list-inside space-y-1">
                                <li>{"\uc0c1\ub2f4 \uc608\uc57d \uc811\uc218 \ubc0f \uc77c\uc815 \uc870\uc728"}</li>
                                <li>{"\uce74\uce74\uc624 \uc54c\ub9bc\ud1a1\uc744 \ud1b5\ud55c \uc608\uc57d \ud655\uc815 \uc548\ub0b4"}</li>
                                <li>{"\ub9de\ucda4\ud615 \uc0c1\ub2f4 \uc11c\ube44\uc2a4 \uc81c\uacf5\uc744 \uc704\ud55c \uc0ac\uc804 \uc815\ubcf4 \ud30c\uc545"}</li>
                                <li>{"\uc11c\ube44\uc2a4 \uac1c\uc120\uc744 \uc704\ud55c \ud1b5\uacc4 \ubd84\uc11d (\ube44\uc2dd\ubcc4 \ucc98\ub9ac)"}</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground mb-2">{"3. \uac1c\uc778\uc815\ubcf4 \ubcf4\uc720 \ubc0f \uc774\uc6a9 \uae30\uac04"}</h4>
                              <p>
                                {"\uc218\uc9d1\ub41c \uac1c\uc778\uc815\ubcf4\ub294 "}<strong className="text-foreground">{"\uc0c1\ub2f4 \uc644\ub8cc \ud6c4 1\ub144\uac04"}</strong>{" \ubcf4\uad00\ub418\uba70, \uc774\ud6c4 \uc9c0\uccb4 \uc5c6\uc774"}
                                {"\ud30c\uae30\ub429\ub2c8\ub2e4. \ub2e8, \uad00\uacc4 \ubc95\ub839\uc5d0 \ub530\ub77c \ubcf4\uc874\uc774 \ud544\uc694\ud55c \uacbd\uc6b0 \ud574\ub2f9 \uae30\uac04 \ub3d9\uc548 \ubcf4\uad00\ub420 \uc218 \uc788\uc2b5\ub2c8\ub2e4."}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground mb-2">{"4. \ub3d9\uc758 \uac70\ubd80\uad8c \ubc0f \ubd88\uc774\uc775"}</h4>
                              <p>
                                {"\uadc0\ud558\ub294 \uac1c\uc778\uc815\ubcf4 \uc218\uc9d1 \ubc0f \uc774\uc6a9 \ub3d9\uc758\ub97c \uac70\ubd80\ud560 \uad8c\ub9ac\uac00 \uc788\uc2b5\ub2c8\ub2e4. \ub2e4\ub9cc, \ud544\uc218 \ud56d\ubaa9\uc5d0 \ub300\ud55c \ub3d9\uc758\ub97c \uac70\ubd80\ud558\uc2e4 \uacbd\uc6b0 \uc0c1\ub2f4"}
                                {"\uc608\uc57d \uc11c\ube44\uc2a4 \uc774\uc6a9\uc774 \uc81c\ud55c\ub420 \uc218 \uc788\uc2b5\ub2c8\ub2e4."}
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
                            {"\ub3d9\uc758\ud558\uace0 \ub2eb\uae30"}
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
              {"\uc791\uc131 \uc911\uc778 \ub0b4\uc6a9\uc774 \ubaa8\ub450 \uc0ac\ub77c\uc9d1\ub2c8\ub2e4.\n\uc815\ub9d0 \ub098\uac00\uc2dc\uaca0\uc5b4\uc694?"}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowExitModal(false)}
                className="h-11 cursor-pointer rounded-xl border-[#D4CBB9] bg-white text-[#3D372F] hover:bg-white hover:text-[#3D372F]"
              >
                {"\uacc4\uc18d \uc9c4\ud589"}              </Button>
              <Button type="button" onClick={handleExit} className="h-11 cursor-pointer rounded-xl bg-[#0B6980] text-white hover:bg-[#0B6980] hover:text-white">
                {"\ub098\uac00\uae30"}              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}



