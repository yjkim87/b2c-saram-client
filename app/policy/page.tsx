import { POLICY_TYPES, type PolicyType } from "@/features/policy/model/policy.types"
import { PolicyPage } from "@/features/policy/pages/policy-page"

type PageProps = {
  searchParams?:
    | Promise<{
        type?: string | string[]
        version?: string | string[]
      }>
    | {
        type?: string | string[]
        version?: string | string[]
      }
}

function toInitialPolicyType(rawType?: string | string[]): PolicyType {
  if (Array.isArray(rawType)) {
    return "privacy"
  }

  if (rawType && POLICY_TYPES.includes(rawType as PolicyType)) {
    return rawType as PolicyType
  }

  return "privacy"
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await Promise.resolve(searchParams) : undefined
  const initialType = toInitialPolicyType(resolvedSearchParams?.type)
  const initialVersion =
    typeof resolvedSearchParams?.version === "string" ? resolvedSearchParams.version : undefined

  return (
    <PolicyPage
      key={`${initialType}-${initialVersion ?? "latest"}`}
      initialType={initialType}
      initialVersion={initialVersion}
    />
  )
}
