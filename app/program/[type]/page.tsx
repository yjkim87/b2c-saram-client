import { ProgramDetailPage } from "@/features/program/pages/[type]"

interface ProgramDetailRouteProps {
  params: Promise<{ type: string }>
}

export default async function ProgramDetailRoute(props: ProgramDetailRouteProps) {
  return <ProgramDetailPage {...props} />
}
