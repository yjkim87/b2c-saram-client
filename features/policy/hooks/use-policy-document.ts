"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { fetchPolicy } from "@/features/policy/lib/policy.api"
import type { PolicyResponse, PolicyType } from "@/features/policy/model/policy.types"

type PolicyLoadStatus = "idle" | "loading" | "success" | "error"

type PolicyLoadState = {
  status: PolicyLoadStatus
  data: PolicyResponse
  versions: string[]
  latestVersion: string | null
  selectedVersion: string | null
  error: string | null
}

function createInitialState(): PolicyLoadState {
  return {
    status: "idle",
    data: null,
    versions: [],
    latestVersion: null,
    selectedVersion: null,
    error: null,
  }
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return "약관 정보를 불러오는 중 오류가 발생했습니다."
}

export function usePolicyDocument(activeType: PolicyType, requestedVersion?: string) {
  const [state, setState] = useState<PolicyLoadState>(createInitialState)
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchCurrent = useCallback(
    async (force = false) => {
      let shouldFetch = true

      setState((previousState) => {
        const isSameVersion = (previousState.selectedVersion ?? "") === (requestedVersion ?? "")
        const isBusy = previousState.status === "loading"
        const isAlreadyFetched = previousState.status === "success" && isSameVersion

        if (!force && (isBusy || isAlreadyFetched)) {
          shouldFetch = false
          return previousState
        }

        return {
          data: null,
          versions: [],
          latestVersion: null,
          selectedVersion: requestedVersion ?? null,
          status: "loading",
          error: null,
        }
      })

      if (!shouldFetch) {
        return
      }

      const controller = new AbortController()
      abortControllerRef.current?.abort()
      abortControllerRef.current = controller

      try {
        const payload = await fetchPolicy(activeType, requestedVersion, controller.signal)

        setState({
          status: "success",
          data: payload.data,
          versions: payload.versions,
          latestVersion: payload.latestVersion,
          selectedVersion: payload.selectedVersion,
          error: null,
        })
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return
        }

        setState({
          status: "error",
          data: null,
          versions: [],
          latestVersion: null,
          selectedVersion: null,
          error: getErrorMessage(error),
        })
      }
    },
    [activeType, requestedVersion]
  )

  useEffect(() => {
    void fetchCurrent()
  }, [fetchCurrent])

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])

  return {
    activeState: state,
    fetchCurrent,
  }
}
