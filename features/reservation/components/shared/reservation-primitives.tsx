"use client"

import { useState, type ReactNode } from "react"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/shared/ui/button"
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
}

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-[#F8F5EF] rounded-[20px] rounded-tl-[5px] w-fit">
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
        <TypingIndicator />
      </div>
    )
  }

  return (
    <div className="animate-in fade-in-0 slide-in-from-left-4 duration-300">
      <div className="w-fit bg-[#F8F5EF] rounded-[20px] rounded-tl-[5px] px-4 py-3 max-w-[85%]">
        {typeof content === "string" ? (
          <p className="text-foreground text-sm md:text-base leading-relaxed whitespace-pre-line">{content}</p>
        ) : (
          content
        )}
      </div>
    </div>
  )
}

export function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="flex justify-end animate-in fade-in-0 slide-in-from-right-4 duration-300">
      <div className="bg-[#B1A58F] text-white rounded-[20px] rounded-tr-[5px] px-4 py-3 max-w-[85%]">
        <p className="text-sm md:text-base leading-relaxed">{content}</p>
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
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer",
        isSelected ? "border-[#A99B83] bg-[#F8F7F4]" : "border-[#CFC5B5] bg-[#FCFBF9] hover:border-[#B9AC95]",
      )}
      onClick={onSelect}
    >
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors",
                isSelected ? "border-[#AFA38D] bg-[#AFA38D] text-white" : "border-[#BDB3A2] bg-transparent text-transparent",
              )}
            >
              {isSelected && selectionOrder ? selectionOrder : ""}
            </div>
            <span className="font-medium text-[#2F2A23]">{card.title}</span>
          </div>
          {isSelected && (
            <span className="rounded-md bg-[#F7A23B] px-2 py-1 text-xs font-medium text-white">선택됨</span>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded((prev) => !prev)
            }}
            className="inline-flex items-center gap-1 text-xs text-[#5D5549] hover:text-[#2F2A23] transition-colors"
          >
            {isExpanded ? "접기" : "자세히 보기"}
            <ChevronDown className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-180")} />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 animate-in fade-in-0 slide-in-from-top-2 duration-300">
          <div className="space-y-4 rounded-2xl border border-[#D5DEE8] bg-white p-5">
            <p className="text-[15px] leading-relaxed text-[#4D6E95]">{card.needs}</p>

            <div className="rounded-xl border border-[#D5DEE8] bg-[#E9EDF3] p-4">
              <p className="mb-2 text-xs font-bold text-[#6D4BFF]">
                <span className="mr-1" aria-hidden="true">
                  💡
                </span>
                사발면 솔루션
              </p>
              <p className="text-base font-semibold leading-relaxed text-[#2D486A]">{card.solution}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function CalendarPicker({
  selectedDates,
  onDateSelect,
}: CalendarPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    const days: (number | null)[] = []
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const formatDateString = (day: number) => {
    const year = currentMonth.getFullYear()
    const month = String(currentMonth.getMonth() + 1).padStart(2, "0")
    const dayStr = String(day).padStart(2, "0")
    return `${year}-${month}-${dayStr}`
  }

  const formatDisplayDate = (dateStr: string) => {
    const [, month, day] = dateStr.split("-")
    return `${parseInt(month)}/${parseInt(day)}`
  }

  const isDatePast = (day: number) => {
    const today = new Date()
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const isDateSelected = (day: number) => {
    const dateStr = formatDateString(day)
    return selectedDates.some((s) => s.date === dateStr)
  }

  const handleAddSchedule = () => {
    if (selectedDate && selectedTime) {
      onDateSelect(selectedDate, selectedTime)
      setSelectedTime(null)
    }
  }

  const days = getDaysInMonth(currentMonth)
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"]

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold">
          {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
        </span>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 border-b border-border">
        {weekDays.map((day, i) => (
          <div
            key={day}
            className={cn(
              "py-2 text-center text-sm font-medium",
              i === 0 ? "text-red-500" : i === 6 ? "text-blue-500" : "text-muted-foreground",
            )}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 p-2 gap-1">
        {days.map((day, index) => (
          <button
            key={index}
            disabled={!day || isDatePast(day)}
            onClick={() => day && !isDatePast(day) && setSelectedDate(formatDateString(day))}
            className={cn(
              "aspect-square flex items-center justify-center text-sm rounded-lg transition-all",
              !day && "invisible",
              day && isDatePast(day) && "text-muted-foreground/30 cursor-not-allowed",
              day && !isDatePast(day) && "hover:bg-[#FEA847]/15 cursor-pointer",
              day && selectedDate === formatDateString(day) && "bg-[#FEA847] text-white",
              day && isDateSelected(day) && selectedDate !== formatDateString(day) && "bg-[#FEA847]/20 text-[#B26A09] font-medium",
            )}
          >
            {day}
          </button>
        ))}
      </div>

      {selectedDate && (
        <div className="p-4 border-t border-border animate-in fade-in-0 slide-in-from-top-2 duration-300">
          <p className="text-sm font-medium text-muted-foreground mb-3">{formatDisplayDate(selectedDate)} 시간 선택</p>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {timeSlots.map((time) => {
              const isAlreadySelected = selectedDates.some((s) => s.date === selectedDate && s.time === time)
              return (
                <button
                  key={time}
                  disabled={isAlreadySelected}
                  onClick={() => setSelectedTime(time)}
                  className={cn(
                    "py-2 px-3 text-sm rounded-lg border transition-all",
                    isAlreadySelected && "bg-muted text-muted-foreground cursor-not-allowed border-muted",
                    !isAlreadySelected && selectedTime === time && "bg-[#FEA847] text-white border-[#FEA847]",
                    !isAlreadySelected && selectedTime !== time && "border-border hover:border-[#FEA847]/60",
                  )}
                >
                  {time}
                </button>
              )
            })}
          </div>
          {selectedTime && (
            <Button onClick={handleAddSchedule} className="w-full mt-4 bg-[#FEA847] text-white hover:bg-[#EA9738]">
              일정 추가하기
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
