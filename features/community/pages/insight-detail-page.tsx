import Link from "next/link"
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { cn } from "@/shared/lib/utils"
import { InsightCoverImage } from "@/features/community/components/insight-cover-image"
import { INSIGHT_GRADE_BADGE_TONE, type InsightPost } from "@/features/community/data/insights"

interface InsightDetailPageProps {
  post: InsightPost
}

export function CommunityInsightDetailPage({ post }: InsightDetailPageProps) {
  return (
    <div className="bg-white pb-20">
      <section className="mx-auto max-w-3xl px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[#6B7684]">
            <li>
              <Link href="/" className="transition-colors hover:text-[#4E5968]">
                홈
              </Link>
            </li>
            <li aria-hidden="true">{">"}</li>
            <li>
              <Link href="/community/insights" className="transition-colors hover:text-[#4E5968]">
                양육 코칭 인사이트
              </Link>
            </li>
            <li aria-hidden="true">{">"}</li>
            <li className="font-semibold text-[#4E5968]" aria-current="page">
              {post.grade}
            </li>
          </ol>
        </nav>

        <Link
          href="/community/insights"
          className="mb-7 inline-flex items-center gap-1.5 text-sm font-medium text-[#6B7684] transition-colors hover:text-[#4E5968]"
        >
          <ArrowLeft className="h-4 w-4" />
          목록으로 돌아가기
        </Link>

        <header className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", INSIGHT_GRADE_BADGE_TONE[post.grade])}>
              {post.grade}
            </span>
            <span className="rounded-full bg-[#F2F4F6] px-2.5 py-1 text-xs font-medium text-[#5B6674]">{post.category}</span>
          </div>

          <h1 className="break-keep text-2xl font-bold leading-tight text-[#191F28] md:text-3xl">{post.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#6B7684]">
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              {post.publishedAt}
            </span>
            <span>{post.author}</span>
          </div>
        </header>

        <div className="mb-10 overflow-hidden rounded-2xl border border-[#EEF2F6] bg-[#F8FAFC]">
          <InsightCoverImage
            coverImage={post.coverImage}
            alt={`${post.title} 대표 이미지`}
            className="aspect-video w-full"
            loading="eager"
          />
        </div>

        <article className="space-y-6 text-[17px] leading-8 text-[#2F3B59]">
          <p>{post.summary}</p>
          <p>
            {post.grade} 시기의 아이는 환경과 질문 방식에 따라 표현이 크게 달라집니다. 아이의 반응을 빠르게 판단하기보다,
            구체적인 장면을 함께 떠올릴 수 있도록 대화를 여는 것이 중요합니다.
          </p>
          <p>
            코칭 관점에서는 정답을 알려주기보다, 아이가 스스로 선택하고 설명할 수 있는 경험을 만들어 주는 것을 핵심으로
            봅니다. 작은 변화가 반복될 때 자신감과 실행력이 함께 자랍니다.
          </p>
        </article>

        <div className="mt-8 flex flex-wrap gap-2 border-t border-[#E8EDF3] pt-6">
          {post.tags.map((tag) => (
            <span key={`${post.id}-${tag}`} className="rounded-full bg-[#F2F4F6] px-3 py-1.5 text-xs font-medium text-[#55606D]">
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-[#F5F8FF] px-6 py-8 text-center">
          <p className="text-sm text-[#5B6674]">학년을 알려주시면 발달 단계에 맞는 코칭 포인트를 바로 안내해드립니다.</p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/reservation">
              <Button className="h-11 rounded-full bg-[#05070D] px-7 text-sm font-semibold text-white hover:bg-[#151922]">
                바로 예약하기
              </Button>
            </Link>
            <Link href="/quick-coaching-guide">
              <Button
                variant="outline"
                className="h-11 rounded-full border-[#1B2D52] px-6 text-sm font-semibold text-[#1B2D52] hover:bg-[#EFF3FA]"
              >
                학년 맞춤으로 알아보기
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
