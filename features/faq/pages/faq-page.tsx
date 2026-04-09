import { PageHeader } from "@/components/common/page-header"

const FAQ_ITEMS = [
  {
    question: "상담과 코칭은 어떻게 다른가요?",
    answer: "상담은 정서 회복 중심, 코칭은 성장 실행 중심으로 설계됩니다.",
  },
  {
    question: "첫 방문 전에 준비할 것이 있나요?",
    answer: "아이의 최근 고민 상황을 간단히 메모해 오시면 초기 상담이 더 정확해집니다.",
  },
  {
    question: "보호자도 세션에 함께 참여하나요?",
    answer: "연령과 목적에 따라 보호자 피드백 세션을 함께 진행합니다.",
  },
]

export function FaqPage() {
  return (
    <>
      <PageHeader
        label="FAQ"
        title="자주 묻는 질문"
        description="상담/코칭 시작 전 가장 많이 문의하시는 내용을 먼저 안내합니다."
      />

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-4">
          {FAQ_ITEMS.map((item) => (
            <article key={item.question} className="rounded-2xl border border-[#EDE3D8] bg-[#FFF9F4] p-6">
              <h2 className="text-lg font-semibold text-slate-900">{item.question}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
