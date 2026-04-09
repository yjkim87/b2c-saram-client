import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageHeader } from "@/components/common/page-header"
import { AGE_GUIDE_HEADER, AGE_OVERVIEW_ITEMS, type AgeDetailType } from "@/features/age/data/age-detail"

interface AgePageCardItem {
  id: string
  routeType: AgeDetailType
  range: string
  title: string
  description: string
}

interface AgePageProps {
  mode?: "default" | "program"
}

const DEFAULT_AGE_CARDS: AgePageCardItem[] = AGE_OVERVIEW_ITEMS.map((item) => ({
  id: item.type,
  routeType: item.type,
  range: item.range,
  title: item.title,
  description: item.description,
}))

const PROGRAM_AGE_CARDS: AgePageCardItem[] = [
  {
    id: "infant",
    routeType: "infant",
    range: "0 – 2세",
    title: "영아기 발달",
    description: "출생 후 첫 2년은 뇌 발달이 가장 활발한 시기입니다. 안정적인 애착 형성과 감각 자극이 이후 모든 발달의 기초가 됩니다.",
  },
  {
    id: "preschool",
    routeType: "preschool",
    range: "3 – 6세",
    title: "유아기 발달",
    description: "언어가 폭발적으로 발달하고 사회적 관계가 시작되는 시기입니다. 풍부한 놀이 경험이 창의성과 사회정서 발달의 기반이 됩니다.",
  },
  {
    id: "elementary-lower",
    routeType: "school-age",
    range: "7 – 9세",
    title: "초등학교(저학년)",
    description: "기초 학습 습관과 규칙 이해를 익히는 시기입니다. 자기조절력과 또래 관계의 기본을 다지는 지원이 중요합니다.",
  },
  {
    id: "elementary-upper",
    routeType: "school-age",
    range: "10 – 12세",
    title: "초등학교(고학년)",
    description: "학습 난이도와 또래 비교가 커지는 시기입니다. 자존감 보호와 학습 전략 코칭을 함께 설계하는 것이 필요합니다.",
  },
  {
    id: "middle-school",
    routeType: "teen",
    range: "13 – 15세",
    title: "중학생 발달",
    description: "사춘기 변화와 정체성 탐색이 본격적으로 시작됩니다. 감정 조절과 관계 갈등을 다루는 심리적 지원이 필요합니다.",
  },
  {
    id: "high-school",
    routeType: "teen",
    range: "16 – 18세",
    title: "고등학생 발달",
    description: "진로 결정과 학업 스트레스가 커지는 시기입니다. 자기주도성 강화와 불안 관리 중심의 코칭이 효과적입니다.",
  },
]

export function AgePage({ mode = "default" }: AgePageProps) {
  const cards = mode === "program" ? PROGRAM_AGE_CARDS : DEFAULT_AGE_CARDS

  return (
    <>
      <PageHeader
        label={AGE_GUIDE_HEADER.label}
        title={AGE_GUIDE_HEADER.title}
        description={AGE_GUIDE_HEADER.description}
      />

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          {cards.map((item) => (
            <Link
              key={item.id}
              href={`/age/${item.routeType}`}
              className="group rounded-2xl border border-[#EDE3D8] bg-[#FFF9F4] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-sm font-semibold text-primary">{item.range}</p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-slate-700 group-hover:text-slate-900">
                자세히 보기
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
