"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { POLICY_TYPES, type PolicyType } from "@/features/policy/model/policy.types"
import { PolicyPage } from "@/features/policy/pages/policy-page"

function toInitialPolicyType(rawType: string | null): PolicyType {
  if (rawType && POLICY_TYPES.includes(rawType as PolicyType)) {
    return rawType as PolicyType
  }
  return "privacy"
}

function PolicyPageInner() {
  const searchParams = useSearchParams()
  const initialType = toInitialPolicyType(searchParams.get("type"))
  const initialVersion = searchParams.get("version") ?? undefined

  return (
    <PolicyPage
      key={`${initialType}-${initialVersion ?? "latest"}`}
      initialType={initialType}
      initialVersion={initialVersion}
    />
  )
}

export default function Page() {
  return (
    <Suspense>
      <PolicyPageInner />
    </Suspense>
  )
}
