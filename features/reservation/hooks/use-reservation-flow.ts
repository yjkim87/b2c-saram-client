"use client"

import { useEffect, useRef, useState } from "react"
import type { AgeGroup, Attendance, SelectedSchedule, UserInfo } from "../model/reservation.types"
import {
  calculateAgeGroupFromBirthdate,
  extractDigits,
  formatBirthdateInput,
  isValidBirthdate,
} from "../lib/birthdate.utils"

const BIRTHDATE_ERROR_MESSAGE = "날짜가 올바르지 않습니다. 다시 입력해 주세요."

function getAgeGroupLabel(ageGroup: AgeGroup): string {
  const labels: Record<AgeGroup, string> = {
    infant: "영유아·미취학",
    elementary: "초등학생",
    middle: "중학생",
    high: "고등학생",
    adult: "성인",
  }
  return labels[ageGroup]
}

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "")
  if (digits.length <= 3) return digits
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`
}

export function useReservationFlow() {
  const [step, setStep] = useState(1)
  const [stepHistory, setStepHistory] = useState<number[]>([1])
  const [isTyping, setIsTyping] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    relationship: "",
    birthdate: "",
    gender: "",
  })
  const [birthdateInput, setBirthdateInput] = useState("")
  const [birthdateError, setBirthdateError] = useState<string | null>(null)
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null)
  const [attendance, setAttendance] = useState<Attendance | null>(null)
  const [showNudge, setShowNudge] = useState(false)
  const [selectedSchedules, setSelectedSchedules] = useState<SelectedSchedule[]>([])
  const [phoneNumber, setPhoneNumber] = useState("")
  const [privacyConsent, setPrivacyConsent] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const isMobile = window.innerWidth < 1024

    if (isMobile || step === 1 || step === 2 || step === 3 || !showContent) {
      return
    }

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [showNudge, selectedSchedules])

  useEffect(() => {
    setIsTyping(true)
    setShowContent(false)
    const timer = setTimeout(() => {
      setIsTyping(false)
      setShowContent(true)
    }, 1200)
    return () => clearTimeout(timer)
  }, [step])

  const handleBirthdateChange = (value: string) => {
    const formatted = formatBirthdateInput(value)
    setBirthdateInput(formatted)

    if (extractDigits(formatted).length < 8) {
      setBirthdateError(null)
      return
    }

    if (!isValidBirthdate(formatted)) {
      setBirthdateError(BIRTHDATE_ERROR_MESSAGE)
      return
    }

    const calculatedAgeGroup = calculateAgeGroupFromBirthdate(formatted)
    setUserInfo((prev) => ({ ...prev, birthdate: formatted }))
    setAgeGroup(calculatedAgeGroup)
    setBirthdateError(null)
  }

  const handleBirthdateBlur = () => {
    const digits = extractDigits(birthdateInput)

    if (digits.length === 0) {
      setBirthdateError(null)
      return
    }

    if (digits.length < 8) {
      setBirthdateError(BIRTHDATE_ERROR_MESSAGE)
      return
    }

    if (!isValidBirthdate(birthdateInput)) {
      setBirthdateError(BIRTHDATE_ERROR_MESSAGE)
      return
    }

    const calculatedAgeGroup = calculateAgeGroupFromBirthdate(birthdateInput)
    setUserInfo((prev) => ({ ...prev, birthdate: birthdateInput }))
    setAgeGroup(calculatedAgeGroup)
    setBirthdateError(null)
  }

  const goToNextStep = () => {
    setStepHistory((prev) => [...prev, step + 1])
    setStep((prev) => prev + 1)
  }

  const goToPrevStep = () => {
    if (stepHistory.length > 1) {
      const newHistory = [...stepHistory]
      newHistory.pop()
      setStepHistory(newHistory)
      setStep(newHistory[newHistory.length - 1])
      setShowNudge(false)
    }
  }

  const resetAll = () => {
    setStep(1)
    setStepHistory([1])
    setUserInfo({ name: "", relationship: "", birthdate: "", gender: "" })
    setBirthdateInput("")
    setBirthdateError(null)
    setAgeGroup(null)
    setAttendance(null)
    setShowNudge(false)
    setSelectedSchedules([])
    setPhoneNumber("")
    setPrivacyConsent(false)
    setShowPrivacyModal(false)
    setIsComplete(false)
  }

  const handleAttendanceSelect = (value: Attendance) => {
    setAttendance(value)
    if (value === "child" || value === "parent") {
      setShowNudge(true)
    } else {
      setShowNudge(false)
      goToNextStep()
    }
  }

  const handleNudgeResponse = (together: boolean) => {
    if (together) {
      setAttendance("both")
    }
    setShowNudge(false)
    goToNextStep()
  }

  const handleScheduleSelect = (date: string, time: string) => {
    const newSchedule = { date, time }
    if (!selectedSchedules.some((s) => s.date === date && s.time === time)) {
      setSelectedSchedules((prev) => [...prev, newSchedule])
    }
  }

  const removeSchedule = (index: number) => {
    setSelectedSchedules((prev) => prev.filter((_, i) => i !== index))
  }

  const formatScheduleDisplay = (schedule: SelectedSchedule) => {
    const [, month, day] = schedule.date.split("-")
    return `${parseInt(month)}/${parseInt(day)} ${schedule.time}`
  }

  const handleSubmit = () => {
    setIsComplete(true)
    window.scrollTo({ top: 0, behavior: "auto" })
  }

  const isStep1Valid =
    userInfo.name &&
    userInfo.relationship &&
    extractDigits(birthdateInput).length === 8 &&
    birthdateError === null &&
    userInfo.birthdate === birthdateInput &&
    userInfo.gender

  return {
    step,
    stepHistory,
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
    isComplete,
    setUserInfo,
    setPhoneNumber,
    setPrivacyConsent,
    setShowPrivacyModal,
    goToNextStep,
    goToPrevStep,
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
  }
}

export type UseReservationFlowReturn = ReturnType<typeof useReservationFlow>
