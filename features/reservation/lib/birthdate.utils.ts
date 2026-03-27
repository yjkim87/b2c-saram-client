import type { AgeGroup } from "../model/reservation.types"

export function extractDigits(value: string): string {
  return value.replace(/\D/g, "")
}

export function formatBirthdateInput(value: string): string {
  const digits = extractDigits(value).slice(0, 8)

  if (digits.length <= 4) return digits
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`
}

function getLastDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

export function isValidBirthdate(value: string): boolean {
  const formatted = formatBirthdateInput(value)
  const digits = extractDigits(formatted)

  if (digits.length !== 8) {
    return false
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(formatted)) {
    return false
  }

  const [year, month, day] = formatted.split("-").map(Number)

  if (month < 1 || month > 12) {
    return false
  }

  const maxDay = getLastDayOfMonth(year, month)
  if (day < 1 || day > maxDay) {
    return false
  }

  return true
}

export function calculateAgeGroupFromBirthdate(birthdate: string, now = new Date()): AgeGroup | null {
  const formatted = formatBirthdateInput(birthdate)
  if (!isValidBirthdate(formatted)) {
    return null
  }

  const [year, month, day] = formatted.split("-").map(Number)

  let age = now.getFullYear() - year
  const currentMonth = now.getMonth() + 1
  const currentDay = now.getDate()
  const hadBirthday = currentMonth > month || (currentMonth === month && currentDay >= day)

  if (!hadBirthday) {
    age -= 1
  }

  if (age <= 7) return "infant"
  if (age <= 13) return "elementary"
  if (age <= 16) return "middle"
  if (age <= 19) return "high"
  return "adult"
}
