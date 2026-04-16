"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ReviewsRoutePage() {
  const router = useRouter()
  useEffect(() => { router.replace("/community/reviews") }, [router])
  return null
}
