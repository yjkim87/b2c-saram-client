import { PROGRAM_DETAIL_CONTENT, type ProgramDetailType } from "@/features/program/data/program-detail"
import { ProgramDetailPage } from "@/features/program/pages/[type]"

const VALID_TYPES: ProgramDetailType[] = Object.keys(PROGRAM_DETAIL_CONTENT) as ProgramDetailType[]

export function generateStaticParams() {
  return VALID_TYPES.map((type) => ({ type }))
}

interface ProgramDetailRouteProps {
  params: Promise<{ type: string }>
}

export default async function ProgramDetailRoute(props: ProgramDetailRouteProps) {
  return <ProgramDetailPage {...props} />
}
