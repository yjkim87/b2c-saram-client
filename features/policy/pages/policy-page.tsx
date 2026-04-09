"use client"

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { PolicyContent } from "@/features/policy/components/policy-content"
import { PolicyEmptyState } from "@/features/policy/components/policy-empty-state"
import { PolicyLayout } from "@/features/policy/components/policy-layout"
import { PolicySidebar } from "@/features/policy/components/policy-sidebar"
import { type PolicyTabItem } from "@/features/policy/components/policy-tabs"
import { useActivePolicyHeading } from "@/features/policy/hooks/use-active-policy-heading"
import { usePolicyDocument } from "@/features/policy/hooks/use-policy-document"
import { buildPolicyHtmlModel } from "@/features/policy/lib/policy-html"
import { POLICY_TYPES, type PolicyType } from "@/features/policy/model/policy.types"
import { Footer } from "@/shared/layout/footer"
import { Header } from "@/shared/layout/header"
import { Button } from "@/shared/ui/button"

const POLICY_TABS: PolicyTabItem[] = [
  { type: "privacy", label: "개인정보처리방침" },
  { type: "terms", label: "이용약관" },
]

const TERMS_EMPTY_MESSAGE = "현재 이용약관은 준비 중이며, 추후 업데이트될 예정입니다."
const HEADING_SCROLL_OFFSET = 120

type PolicyPageProps = {
  initialType?: PolicyType
  initialVersion?: string
}

function getInitialPolicyType(initialType?: PolicyType): PolicyType {
  if (initialType && POLICY_TYPES.includes(initialType)) {
    return initialType
  }

  return "privacy"
}

function PolicyLoadingState() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8" aria-busy="true">
      <div className="h-8 w-44 animate-pulse rounded-md bg-slate-200" />
      <div className="mt-4 h-4 w-52 animate-pulse rounded-md bg-slate-200" />
      <div className="mt-10 space-y-3">
        <div className="h-4 w-full animate-pulse rounded-md bg-slate-100" />
        <div className="h-4 w-[92%] animate-pulse rounded-md bg-slate-100" />
        <div className="h-4 w-[78%] animate-pulse rounded-md bg-slate-100" />
      </div>
    </section>
  )
}

type PolicyErrorStateProps = {
  message: string
  onRetry: () => void
}

function PolicyErrorState({ message, onRetry }: PolicyErrorStateProps) {
  return (
    <section className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center sm:px-8">
      <h2 className="text-lg font-semibold text-red-900">약관 정보를 불러오지 못했습니다.</h2>
      <p className="mt-3 text-sm leading-7 text-red-800">{message}</p>
      <Button type="button" onClick={onRetry} className="mt-6 bg-red-900 hover:bg-red-800">
        다시 시도
      </Button>
    </section>
  )
}

export function PolicyPage({ initialType, initialVersion }: PolicyPageProps) {
  const resolvedInitialType = getInitialPolicyType(initialType)
  const [activeType, setActiveType] = useState<PolicyType>(resolvedInitialType)
  const [selectedVersions, setSelectedVersions] = useState<Partial<Record<PolicyType, string>>>(() => {
    if (!initialVersion) {
      return {}
    }

    return {
      [resolvedInitialType]: initialVersion,
    }
  })
  const activeVersion = selectedVersions[activeType]
  const { activeState, fetchCurrent } = usePolicyDocument(activeType, activeVersion)
  const contentRef = useRef<HTMLElement | null>(null)

  const htmlModel = useMemo(() => {
    if (activeState.status !== "success" || !activeState.data) {
      return {
        html: "",
        headings: [],
      }
    }

    return buildPolicyHtmlModel(activeState.data.content)
  }, [activeState.data, activeState.status])

  const hasSidebar = activeState.status === "success" && !!activeState.data && htmlModel.headings.length > 0

  const activeHeadingId = useActivePolicyHeading(contentRef, hasSidebar ? htmlModel.headings : [])

  const handleSelectHeading = useCallback((headingId: string) => {
    const targetHeading = document.getElementById(headingId)

    if (!targetHeading) {
      return
    }

    const top = targetHeading.getBoundingClientRect().top + window.scrollY - HEADING_SCROLL_OFFSET
    window.scrollTo({
      top,
      behavior: "smooth",
    })
  }, [])

  const handleRetry = useCallback(() => {
    void fetchCurrent(true)
  }, [fetchCurrent])

  const handleVersionChange = useCallback(
    (version: string) => {
      setSelectedVersions((previous) => ({
        ...previous,
        [activeType]: version,
      }))
    },
    [activeType]
  )

  useEffect(() => {
    if (activeState.status !== "success") {
      return
    }

    const resolvedVersion = activeState.selectedVersion ?? activeState.latestVersion

    if (!resolvedVersion) {
      return
    }

    setSelectedVersions((previous) => {
      if (previous[activeType] === resolvedVersion) {
        return previous
      }

      return {
        ...previous,
        [activeType]: resolvedVersion,
      }
    })
  }, [activeState.latestVersion, activeState.selectedVersion, activeState.status, activeType])

  let content: ReactNode

  if (activeState.status === "idle" || activeState.status === "loading") {
    content = <PolicyLoadingState />
  } else if (activeState.status === "error") {
    content = <PolicyErrorState message={activeState.error ?? ""} onRetry={handleRetry} />
  } else if (!activeState.data) {
    content = <PolicyEmptyState title="이용약관 준비중" description={TERMS_EMPTY_MESSAGE} />
  } else {
    content = (
      <PolicyContent
        title={activeState.data.title}
        updatedAt={activeState.data.updatedAt}
        html={htmlModel.html}
        contentRef={contentRef}
      />
    )
  }

  const sidebar = hasSidebar ? (
    <PolicySidebar
      headings={htmlModel.headings}
      activeHeadingId={activeHeadingId}
      onSelectHeading={handleSelectHeading}
    />
  ) : null

  return (
    <main className="min-h-screen bg-[#F4F6FA]">
      <Header />
      <PolicyLayout
        tabs={POLICY_TABS}
        activeType={activeType}
        onTypeChange={setActiveType}
        versions={activeState.versions}
        selectedVersion={selectedVersions[activeType] ?? activeState.selectedVersion}
        onVersionChange={handleVersionChange}
        hasSidebar={hasSidebar}
        sidebar={sidebar}
      >
        {content}
      </PolicyLayout>
      <Footer />
    </main>
  )
}
