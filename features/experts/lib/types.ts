export interface HeaderSectionData {
  imageUrl: string
  categoryBadge: string
  certificationLabel: string
  specialty: string
  name: string
  tags: string[]
  totalSessionsLabel: string
  totalSessionsValue: string
}

export interface PhilosophySectionData {
  title: string
  highlights: string[]
  description: string
}

export interface BioSectionData {
  title: string
  description: string
}

export type InfoCardTone = "default" | "emerald"

export interface InfoCardSectionData {
  id: string
  icon: string
  title: string
  items: string[]
  tone?: InfoCardTone
  useCheckIcon?: boolean
}

export interface ExpertProfileData {
  header: HeaderSectionData
  philosophy: PhilosophySectionData
  bio: BioSectionData
  infoCards: InfoCardSectionData[]
}
