"use client"

import { useEffect, useMemo, useState } from "react"
import { cn } from "@/shared/lib/utils"
import { DEFAULT_INSIGHT_COVER_IMAGE, resolveInsightCoverImage } from "@/features/community/data/insights"

interface InsightCoverImageProps {
  coverImage: string | null
  alt: string
  className?: string
  imageClassName?: string
  loading?: "eager" | "lazy"
}

export function InsightCoverImage({
  coverImage,
  alt,
  className,
  imageClassName,
  loading = "lazy",
}: InsightCoverImageProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const resolvedCoverImage = useMemo(() => resolveInsightCoverImage(coverImage), [coverImage])
  const imageSrc = hasError ? DEFAULT_INSIGHT_COVER_IMAGE : resolvedCoverImage

  useEffect(() => {
    setHasError(false)
    setIsLoaded(false)
  }, [resolvedCoverImage])

  return (
    <div className={cn("relative overflow-hidden bg-[#E8EDF1]", className)}>
      {!isLoaded ? (
        <div
          aria-hidden
          className="absolute inset-0 animate-pulse bg-[linear-gradient(135deg,#F2F5F8_0%,#E8EDF3_55%,#EEF2F7_100%)]"
        />
      ) : null}

      <img
        src={imageSrc}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (imageSrc === DEFAULT_INSIGHT_COVER_IMAGE) {
            setIsLoaded(true)
            return
          }
          setHasError(true)
        }}
        className={cn(
          "h-full w-full object-cover transition duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          imageClassName
        )}
      />
    </div>
  )
}
