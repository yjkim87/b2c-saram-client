"use client"

import { useEffect, useState, type RefObject } from "react"
import type { PolicyHeading } from "@/features/policy/model/policy.types"

const DEFAULT_SCROLL_OFFSET = 140

function escapeSelector(value: string) {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
    return CSS.escape(value)
  }

  return value.replace(/([ #;?%&,.+*~':"!^$[\]()=>|/@])/g, "\\$1")
}

export function useActivePolicyHeading(
  contentRootRef: RefObject<HTMLElement | null>,
  headings: PolicyHeading[]
) {
  const [activeHeadingId, setActiveHeadingId] = useState("")

  useEffect(() => {
    if (!headings.length) {
      setActiveHeadingId("")
      return
    }

    const root = contentRootRef.current

    if (!root) {
      return
    }

    const headingElements = headings
      .map((heading) => {
        const selector = `#${escapeSelector(heading.id)}`
        const element = root.querySelector(selector) as HTMLElement | null

        if (!element) {
          return null
        }

        return { id: heading.id, element }
      })
      .filter((item): item is { id: string; element: HTMLElement } => item !== null)

    if (!headingElements.length) {
      setActiveHeadingId("")
      return
    }

    const updateActiveHeading = () => {
      let currentActiveId = headingElements[0].id

      for (const heading of headingElements) {
        const top = heading.element.getBoundingClientRect().top

        if (top - DEFAULT_SCROLL_OFFSET <= 0) {
          currentActiveId = heading.id
          continue
        }

        break
      }

      setActiveHeadingId((previousId) => {
        if (previousId === currentActiveId) {
          return previousId
        }

        return currentActiveId
      })
    }

    updateActiveHeading()

    window.addEventListener("scroll", updateActiveHeading, { passive: true })
    window.addEventListener("resize", updateActiveHeading)

    return () => {
      window.removeEventListener("scroll", updateActiveHeading)
      window.removeEventListener("resize", updateActiveHeading)
    }
  }, [contentRootRef, headings])

  return activeHeadingId
}
