import { notFound } from "next/navigation"
import { getInsightPostById, INSIGHT_HIGHLIGHT_ITEMS, INSIGHT_BOARD_ITEMS } from "@/features/community/data/insights"
import { CommunityInsightDetailPage } from "@/features/community/pages/insight-detail-page"

export function generateStaticParams() {
  const allIds = [
    ...INSIGHT_HIGHLIGHT_ITEMS.map((item) => item.id),
    ...INSIGHT_BOARD_ITEMS.map((item) => item.id),
  ]
  return allIds.map((id) => ({ id }))
}

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
