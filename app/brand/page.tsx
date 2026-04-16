"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function BrandPage() {
  const router = useRouter()
  useEffect(() => { router.replace("/story") }, [router])
  return null
}
