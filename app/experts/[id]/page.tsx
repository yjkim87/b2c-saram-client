import { experts } from "@/features/experts/lib/experts"
import { ExpertDetailPage } from "@/features/experts/pages/expert-detail-page"

export function generateStaticParams() {
  return experts.flatMap((e) => [
    { id: e.id },
    { id: e.slug },
  ])
}

interface ExpertDetailRouteProps {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ from?: string }>
}

export default async function ExpertDetailRoute(props: ExpertDetailRouteProps) {
  return <ExpertDetailPage {...props} />
}
