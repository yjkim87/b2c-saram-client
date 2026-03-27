import type { PolicyFetchResult, PolicyType } from "@/features/policy/model/policy.types"

function buildPolicyErrorMessage(status: number) {
  if (status >= 500) {
    return "약관 정보를 불러오는 중 서버 오류가 발생했습니다."
  }

  if (status === 400) {
    return "요청한 약관 종류가 올바르지 않습니다."
  }

  return "약관 정보를 불러오지 못했습니다."
}

export async function fetchPolicy(
  type: PolicyType,
  version?: string,
  signal?: AbortSignal
): Promise<PolicyFetchResult> {
  const query = new URLSearchParams({ type })

  if (version) {
    query.set("version", version)
  }

  const response = await fetch(`/api/policy?${query.toString()}`, {
    method: "GET",
    cache: "no-store",
    signal,
  })

  if (!response.ok) {
    throw new Error(buildPolicyErrorMessage(response.status))
  }

  return (await response.json()) as PolicyFetchResult
}
