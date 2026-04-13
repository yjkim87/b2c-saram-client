import { notFound } from "next/navigation"
import { getInsightPostById } from "@/features/community/data/insights"
import { CommunityInsightDetailPage } from "@/features/community/pages/insight-detail-page"

interface CommunityInsightDetailRouteProps {
  params: Promise<{ id: string }>
}

export default async function CommunityInsightDetailRoutePage({ params }: CommunityInsightDetailRouteProps) {
  const { id } = await params
  const post = getInsightPostById(id)

  if (!post) {
    notFound()
  }

  return <CommunityInsightDetailPage post={post} />
}
