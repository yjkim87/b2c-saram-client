import type { ReactNode } from "react"

export type AgeGroup = "infant" | "elementary" | "middle" | "high" | "adult"
export type ConcernAgeGroup = Exclude<AgeGroup, "adult">
export type Relationship = "본인" | "자녀" | "기타"
export type Gender = "남성" | "여성"
export type Attendance = "both" | "child" | "parent" | "self"

export interface UserInfo {
  name: string
  relationship: string
  birthdate: string
  gender: Gender | ""
}

export interface SelectedSchedule {
  date: string
  time: string
}

export interface Message {
  id: string
  type: "bot" | "user" | "card"
  content: string | ReactNode
  isTyping?: boolean
}

export interface ConcernCardItem {
  title: string
  needs: string
  solution: string
}

export interface SelectedConcernItem {
  id: string
  order: number
}

export interface ConcernGroup {
  slogan: string
  intro: string
  cards: ConcernCardItem[]
}

export type ConcernDataMap = Record<ConcernAgeGroup, ConcernGroup>
