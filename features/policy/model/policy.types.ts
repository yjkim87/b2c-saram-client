export const POLICY_TYPES = ["privacy", "terms"] as const

export type PolicyType = (typeof POLICY_TYPES)[number]

export type PolicyDocument = {
  type: PolicyType
  title: string
  content: string
  updatedAt?: string
}

export type PolicyResponse = PolicyDocument | null

export type PolicyFetchResult = {
  data: PolicyResponse
  versions: string[]
  latestVersion: string | null
  selectedVersion: string | null
}

export type PolicyHeading = {
  id: string
  text: string
  level: 2 | 3
}
