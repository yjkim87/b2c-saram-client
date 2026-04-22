import type { PolicyFetchResult, PolicyType } from "@/features/policy/model/policy.types"

const DEFAULT_POLICY_FETCH_ERROR_MESSAGE = "\uC57D\uAD00 \uC815\uBCF4\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."

export async function fetchPolicy(
  type: PolicyType,
  version?: string,
  signal?: AbortSignal
): Promise<PolicyFetchResult> {
  const searchParams = new URLSearchParams({
    type,
  })

  if (version) {
    searchParams.set("version", version)
  }

  const response = await fetch(`/api/policy?${searchParams.toString()}`, {
    method: "GET",
    cache: "no-store",
    signal,
  })

  if (!response.ok) {
    const errorPayload = (await response.json().catch(() => null)) as { message?: string } | null
    const message = errorPayload?.message ?? DEFAULT_POLICY_FETCH_ERROR_MESSAGE
    throw new Error(message)
  }

  return (await response.json()) as PolicyFetchResult
}
