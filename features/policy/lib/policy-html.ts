import type { PolicyHeading } from "@/features/policy/model/policy.types"

const DISALLOWED_TAGS = ["script", "style", "iframe", "object", "embed", "link", "meta"]
const URL_ATTRS = ["href", "src", "xlink:href"]

function toHeadingSlug(text: string) {
  const normalized = text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s가-힣-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")

  return normalized || "section"
}

function createUniqueHeadingId(base: string, usedIds: Map<string, number>) {
  const currentCount = usedIds.get(base) ?? 0
  usedIds.set(base, currentCount + 1)

  if (currentCount === 0) {
    return base
  }

  return `${base}-${currentCount + 1}`
}

function takeHeadingId(rawId: string, text: string, usedIds: Map<string, number>) {
  const seed = rawId.trim() || toHeadingSlug(text)
  return createUniqueHeadingId(seed, usedIds)
}

function sanitizeDocument(document: Document) {
  document.body.querySelectorAll(DISALLOWED_TAGS.join(",")).forEach((element) => {
    element.remove()
  })

  document.body.querySelectorAll("*").forEach((element) => {
    for (const attribute of Array.from(element.attributes)) {
      const attributeName = attribute.name.toLowerCase()
      const attributeValue = attribute.value.trim().toLowerCase()

      if (attributeName.startsWith("on")) {
        element.removeAttribute(attribute.name)
        continue
      }

      if (URL_ATTRS.includes(attributeName) && attributeValue.startsWith("javascript:")) {
        element.removeAttribute(attribute.name)
      }
    }
  })
}

export type PolicyHtmlModel = {
  html: string
  headings: PolicyHeading[]
}

export function buildPolicyHtmlModel(content: string): PolicyHtmlModel {
  if (typeof window === "undefined" || typeof DOMParser === "undefined") {
    return {
      html: content,
      headings: [],
    }
  }

  const parser = new DOMParser()
  const document = parser.parseFromString(content, "text/html")
  sanitizeDocument(document)

  const headings: PolicyHeading[] = []
  const usedIds = new Map<string, number>()

  document.body.querySelectorAll("h2, h3").forEach((headingElement) => {
    const text = headingElement.textContent?.trim()

    if (!text) {
      return
    }

    const id = takeHeadingId(headingElement.id, text, usedIds)
    const level = headingElement.tagName === "H2" ? 2 : 3

    headingElement.id = id
    headings.push({
      id,
      text,
      level,
    })
  })

  return {
    html: document.body.innerHTML,
    headings,
  }
}
