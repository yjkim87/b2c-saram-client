"use client"

import { useMemo, useState, type ReactNode } from "react"
import { CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, Clock, Sprout, X } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Calendar } from "@/shared/ui/calendar"
import { cn } from "@/shared/lib/utils"
import { timeSlots } from "../../data/reservation.constants"
import type { ConcernCardItem, SelectedSchedule } from "../../model/reservation.types"

interface BotMessageProps {
  content: string | ReactNode
  isTyping?: boolean
}

interface UserMessageProps {
  content: string
}

interface ConcernCardProps {
  card: ConcernCardItem
  isSelected: boolean
  selectionOrder?: number
  onSelect: () => void
}

interface CalendarPickerProps {
  selectedDates: SelectedSchedule[]
  onDateSelect: (date: string, time: string) => void
  onDateRemove: (index: number) => void
}

function BotAvatar() {
  return (
    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(144.37deg,#FF5C88_7.06%,#A63EFF_90.82%)]">
      <Sprout className="h-4 w-4 text-white" />
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-[#FFF7EF] rounded-[20px] rounded-tl-[5px] w-fit">
      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
    </div>
  )
}

export function BotMessage({ content, isTyping }: BotMessageProps) {
  if (isTyping) {
    return (
      <div className="animate-in fade-in-0 slide-in-from-left-4 duration-300">
        <div className="flex items-start gap-2.5">
          <BotAvatar />
          <TypingIndicator />
        </div>
      </div>
    )
  }

  return (
    <div className="animate-in fade-in-0 slide-in-from-left-4 duration-300">
      <div className="flex items-start gap-2.5">
        <BotAvatar />
        <div className="w-fit max-w-[calc(100%-3.25rem)] rounded-[20px] rounded-tl-[5px] bg-[#FFF7EF] px-4 py-3 sm:max-w-[85%]">
          {typeof content === "string" ? (
            <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap break-words md:text-base">{content}</p>
          ) : (
            content
          )}
        </div>
      </div>
    </div>
  )
}

export function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="flex justify-end animate-in fade-in-0 slide-in-from-right-4 duration-300">
      <div className="bg-[linear-gradient(144.37deg,#FFB836_7.06%,#F57220_90.82%)] text-white rounded-[20px] rounded-tr-[5px] px-4 py-3 max-w-[85%]">
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words md:text-base">{content}</p>
      </div>
    </div>
  )
}

export function ConcernCard({
  card,
  isSelected,
  selectionOrder,
  onSelect,
}: ConcernCardProps) {
  return (
    <div
      className={cn(
        "cursor-pointer overflow-hidden rounded-[20px] border transition-all duration-200",
        isSelected ? "border-[#8FB3E8] bg-white" : "border-[#DFDFDF] bg-white hover:border-[#C9D7EE]",
      )}
      onClick={onSelect}
    >
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors",
              isSelected
                ? "border-[#4A83D8] bg-[#4A83D8] text-white"
                : "border-[#B8B8B8] bg-white text-transparent",
            )}
          >
            {isSelected && selectionOrder ? selectionOrder : ""}
          </div>
          <span className="font-semibold text-[#2F2A23]">{card.title}</span>
        </div>
      </div>
    </div>
  )
}

export function CalendarPicker({
  selectedDates,
  onDateSelect,
  onDateRemove,
}: CalendarPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const handlePrevMonth = () => {
    setCurrentMonth((previous) => new Date(previous.getFullYear(), previous.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth((previous) => new Date(previous.getFullYear(), previous.getMonth() + 1, 1))
  }

  const toDateKey = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const dayStr = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${dayStr}`
  }

  const formatSelectedDateDetail = (date: Date) => {
    return new Intl.DateTimeFormat("ko-KR", {
      month: "long",
      day: "numeric",
      weekday: "long",
    }).format(date)
  }

  const formatReservationDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}. ${month}. ${day}`
  }

  const formatSelectedScheduleDisplay = (schedule: SelectedSchedule) => {
    const [, month, day] = schedule.date.split("-")
    return `${parseInt(month, 10)}/${parseInt(day, 10)} ${schedule.time}`
  }

  const today = useMemo(() => {
    const value = new Date()
    value.setHours(0, 0, 0, 0)
    return value
  }, [])

  const selectedDateKey = selectedDate ? toDateKey(selectedDate) : null
  const selectedScheduleDateSet = useMemo(() => new Set(selectedDates.map((schedule) => schedule.date)), [selectedDates])

  const handleAddSchedule = () => {
    if (selectedDateKey && selectedTime) {
      onDateSelect(selectedDateKey, selectedTime)
      setSelectedTime(null)
    }
  }

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#FBF7F1] bg-[#FBF7F1]">
      <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
        <div className="relative p-4 md:p-6 lg:border-r lg:border-[#E7DCCB]">
          <div className="mb-3">
            <p className="text-xs font-bold tracking-[0.2em] text-[#D2893B]">STEP 1</p>
            <h3 className="mt-1 text-[22px] font-extrabold leading-none text-[#2E2822]">날짜 선택</h3>
          </div>

          <div className="mb-3 flex items-center justify-center gap-3 border-b border-[#E7DCCB] pb-3 md:gap-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DCCCB8] bg-[#FFF8EF] text-[#4E4438] hover:bg-[#F5EBDD] md:h-9 md:w-9"
              aria-label="이전 달"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <p className="text-[28px] font-bold leading-none tracking-tight text-[#2E2822]">
              {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
            </p>
            <button
              type="button"
              onClick={handleNextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DCCCB8] bg-[#FFF8EF] text-[#4E4438] hover:bg-[#F5EBDD] md:h-9 md:w-9"
              aria-label="다음 달"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <Calendar
            mode="single"
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            selected={selectedDate}
            showOutsideDays={false}
            fixedWeeks
            hideNavigation
            disabled={(date) => date < today}
            onSelect={(date) => {
              if (!date) {
                return
              }
              setSelectedDate(date)
              setSelectedTime(null)
            }}
            modifiers={{
              hasSchedule: (date) => selectedScheduleDateSet.has(toDateKey(date)),
            }}
            formatters={{
              formatCaption: (date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월`,
              formatWeekdayName: (date) => ["일", "월", "화", "수", "목", "금", "토"][date.getDay()],
            }}
            className="w-full p-0"
            classNames={{
              root: "w-full",
              months: "w-full",
              month: "w-full gap-0",
              month_caption: "hidden",
              caption_label: "text-base font-semibold tracking-tight text-[#2E2822] md:text-[30px]",
              month_grid: "w-full table-fixed border-collapse",
              weekdays: "border-b border-[#E7DCCB]",
              weekday:
                "h-9 px-0 text-center align-middle text-sm font-semibold text-[#74695A] [&:first-child]:text-[#D85E49] [&:last-child]:text-[#D2893B]",
              week: "",
              day: "relative h-[74px] w-full p-0 text-center sm:h-[86px] md:h-[96px]",
              day_button:
                "!min-w-0 !w-[56px] !h-[56px] !rounded-[12px] sm:!w-[60px] sm:!h-[60px] md:!w-[64px] md:!h-[64px] mx-auto my-auto relative border-0 bg-transparent text-base font-medium text-[#322D27] shadow-none hover:bg-[#FFF1E3] hover:text-[#C2712A] data-[selected-single=true]:bg-[#F08B49] data-[selected-single=true]:text-white data-[selected-single=true]:shadow-none",
              today: "bg-transparent text-[#322D27] font-semibold",
              disabled: "text-[#CFC3B1] opacity-100",
            }}
            modifiersClassNames={{
              hasSchedule:
                "after:pointer-events-none after:absolute after:bottom-2 after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:rounded-full after:bg-[#F08B49]",
            }}
          />
        </div>

        <div className="flex flex-col border-t border-[#E7DCCB] bg-[#F6F1E9] p-4 md:p-6 lg:border-t-0">
          <div className="mb-4">
            <p className="text-xs font-bold tracking-[0.2em] text-[#D2893B]">STEP 2</p>
            <h3 className="mt-1 text-[22px] font-extrabold leading-none text-[#2E2822]">시간 선택</h3>
            <p className="mt-2 text-sm font-semibold text-[#7A6A55]">
              {selectedDate ? formatSelectedDateDetail(selectedDate) : "날짜를 먼저 선택해 주세요"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {timeSlots.map((time) => {
              const isAlreadySelected =
                selectedDateKey !== null &&
                selectedDates.some((schedule) => schedule.date === selectedDateKey && schedule.time === time)
              const isDisabled = !selectedDateKey || isAlreadySelected

              return (
                <button
                  key={time}
                  disabled={isDisabled}
                  onClick={() => setSelectedTime(time)}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-[17px] font-semibold transition-all",
                    isDisabled && "cursor-not-allowed bg-[#F4EEE6] text-[#B7AB97]",
                    selectedDateKey && selectedTime === time && !isAlreadySelected && "bg-[#F08B49] text-white shadow-md shadow-[#F08B49]/20",
                    selectedDateKey && selectedTime !== time && !isAlreadySelected && "bg-white text-[#3F372D] hover:bg-[#FFE2BD] hover:text-[#A54C00]",
                  )}
                >
                  <Clock className="h-4 w-4" />
                  {time}
                </button>
              )
            })}
          </div>

          <div className="mt-5 rounded-2xl border border-[#DCCEBB] bg-white p-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[#8B7D69]">
                  <CheckCircle2 className="h-4 w-4 text-[#2AA873]" />
                  예약 일시
                </span>
                <span className="font-semibold text-[#2E2822]">
                  {selectedDate ? formatReservationDate(selectedDate) : "----.--.--"} / {selectedTime ?? "--:--"}
                </span>
              </div>
            </div>

            <Button
              onClick={handleAddSchedule}
              disabled={!selectedDateKey || !selectedTime}
              className={cn(
                "mt-4 w-full",
                selectedDateKey && selectedTime
                  ? "bg-[#171717] text-white hover:bg-[#111111]"
                  : "bg-[#E6E0D4] text-[#A89C8A] hover:bg-[#E6E0D4] hover:text-[#A89C8A]",
              )}
            >
              일정 추가하기
            </Button>
            {!selectedDateKey || !selectedTime ? (
              <p className="mt-2 text-center text-xs font-medium text-[#A99984]">
                날짜와 시간을 모두 선택해야 일정 추가가 가능합니다.
              </p>
            ) : null}
          </div>

          {selectedDates.length > 0 && (
            <div className="lg:mt-auto">
              <div className="mt-4 rounded-2xl border border-[#DCCEBB] bg-white p-4">
                <p className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2E2822]">
                  <CalendarDays className="h-4 w-4 text-[#2AA873]" />
                  {"선택한 일정"} ({selectedDates.length}{"개"})
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedDates.map((schedule, index) => (
                    <div
                      key={`${schedule.date}-${schedule.time}-${index}`}
                      className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm text-primary"
                    >
                      <span>{formatSelectedScheduleDisplay(schedule)}</span>
                      <button
                        type="button"
                        onClick={() => onDateRemove(index)}
                        className="rounded-full p-0.5 hover:bg-primary/20"
                        aria-label="선택 일정 제거"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
