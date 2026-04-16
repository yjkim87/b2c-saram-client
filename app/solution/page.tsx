"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SolutionPage() {
  const router = useRouter()
  useEffect(() => { router.replace("/program") }, [router])
  return null
}
