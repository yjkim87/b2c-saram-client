import { mockPolicyHistory } from "@/features/policy/data/mock-policy"
import { POLICY_TYPES, type PolicyDocument, type PolicyFetchResult, type PolicyType } from "@/features/policy/model/policy.types"

const MOCK_API_DELAY_MS = 250

export function isPolicyType(value: string): value is PolicyType {
  return POLICY_TYPES.includes(value as PolicyType)
}

function sortVersionsDesc(versions: string[]) {
  return [...versions].sort((left, right) => right.localeCompare(left))
}

function getDistinctVersions(documents: PolicyDocument[]) {
  const versions = documents
    .map((document) => document.updatedAt)
    .filter((value): value is string => typeof value === "string" && value.length > 0)

  return sortVersionsDesc(Array.from(new Set(versions)))
}

export async function getPolicyByType(type: PolicyType, requestedVersion?: string): Promise<PolicyFetchResult> {
  await new Promise((resolve) => {
    setTimeout(resolve, MOCK_API_DELAY_MS)
  })

  const documents = mockPolicyHistory[type]
  const versions = getDistinctVersions(documents)
  const latestVersion = versions[0] ?? null
  const selectedVersion =
    requestedVersion && versions.includes(requestedVersion) ? requestedVersion : latestVersion

  const selectedDocument =
    selectedVersion !== null
      ? documents.find((document) => document.updatedAt === selectedVersion) ?? null
      : documents[0] ?? null

  return {
    data: selectedDocument,
    versions,
    latestVersion,
    selectedVersion: selectedVersion ?? selectedDocument?.updatedAt ?? null,
  }
}
