import { notFound } from "next/navigation"
import { getExpertByIdentifier } from "@/features/experts/lib/experts"
import { ExpertDetailView } from "../components/detail/expert-detail-view"
import { createExpertProfileData } from "../lib/profile-data"

interface ExpertDetailPageProps {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ from?: string }>
}

export async function ExpertDetailPage({ params }: ExpertDetailPageProps) {
  const { id: identifier } = await params

  const expert = getExpertByIdentifier(identifier)
  if (!expert) {
    notFound()
  }

  const backHref = "/experts"
  const profileData = createExpertProfileData(expert)

  return <ExpertDetailView backHref={backHref} profileData={profileData} />
}
