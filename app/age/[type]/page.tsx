import { AgeDetailPage } from "@/features/age/pages/[type]"

interface AgeDetailRouteProps {
  params: Promise<{ type: string }>
}

export default async function AgeDetailRoute(props: AgeDetailRouteProps) {
  return <AgeDetailPage {...props} />
}
