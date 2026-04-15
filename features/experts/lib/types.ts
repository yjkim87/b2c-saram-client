export interface ExpertHeaderData {
  imageUrl: string
  certificationLabel: string
  specialty: string
  name: string
  tags: string[]
}

export interface ExpertQuoteData {
  lead: string
  highlight: string
  trailing: string
}

export interface ExpertTextSectionData {
  title: string
  description: string
}

export interface ExpertProfileData {
  header: ExpertHeaderData
  quote: ExpertQuoteData
  historyTitle: string
  historyItems: string[]
  bio: ExpertTextSectionData
  philosophy: ExpertTextSectionData
}

// Legacy types kept for unused section components to stay type-safe.
export interface HeaderSectionData extends ExpertHeaderData {
  categoryBadge: string
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
