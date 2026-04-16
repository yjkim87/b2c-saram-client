"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CenterRoutePage() {
  const router = useRouter()
  useEffect(() => { router.replace("/about/location") }, [router])
  return null
}
