import type { PolicyFetchResult, PolicyType } from "@/features/policy/model/policy.types"
import { getPolicyByType } from "@/features/policy/lib/policy.service"

export async function fetchPolicy(
  type: PolicyType,
  version?: string,
  _signal?: AbortSignal
): Promise<PolicyFetchResult> {
  return getPolicyByType(type, version)
}
