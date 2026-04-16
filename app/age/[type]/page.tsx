import { AGE_DETAIL_CONTENT, type AgeDetailType } from "@/features/age/data/age-detail"
import { AgeDetailPage } from "@/features/age/pages/[type]"

const VALID_TYPES: AgeDetailType[] = Object.keys(AGE_DETAIL_CONTENT) as AgeDetailType[]

export function generateStaticParams() {
  return VALID_TYPES.map((type) => ({ type }))
}

interface AgeDetailRouteProps {
  params: Promise<{ type: string }>
}

export default async function AgeDetailRoute(props: AgeDetailRouteProps) {
  return <AgeDetailPage {...props} />
}
