"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function FaqRoutePage() {
  const router = useRouter()
  useEffect(() => { router.replace("/community/faq") }, [router])
  return null
}
