import { notFound } from "next/navigation"
import { getExpertById } from "@/features/experts/lib/experts"
import { ExpertDetailView } from "../components/detail/expert-detail-view"
import { createExpertProfileData } from "../lib/profile-data"

interface ExpertDetailPageProps {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ from?: string }>
}

export async function ExpertDetailPage({ params }: ExpertDetailPageProps) {
  const { id } = await params

  const expert = getExpertById(id)
  if (!expert) {
    notFound()
  }

  const backHref = "/experts"
  const profileData = createExpertProfileData(expert)

  return <ExpertDetailView backHref={backHref} profileData={profileData} />
}
