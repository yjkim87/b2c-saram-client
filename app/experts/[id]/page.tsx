import { ExpertDetailPage } from "@/features/experts/pages/expert-detail-page"

interface ExpertDetailRouteProps {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ from?: string }>
}

export default async function ExpertDetailRoute(props: ExpertDetailRouteProps) {
  return <ExpertDetailPage {...props} />
}
