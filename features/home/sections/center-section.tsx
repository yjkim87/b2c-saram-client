import Link from "next/link"
import { ArrowRight, MapPin, Navigation } from "lucide-react"

export function CenterSection() {
  return (
    <section id="center" className="bg-white px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center md:mb-12">
          <span className="mb-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">센터 안내</span>
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">편안한 상담 공간에서 만나요</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            부산 해운대구 센텀동로 99, 벽산e센텀클래스원 1차 406호
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <article className="rounded-3xl border border-[#EDE3D8] bg-[#FFF9F4] p-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <MapPin className="h-4 w-4" />
              위치 안내
            </div>
            <p className="mt-3 text-xl font-bold text-slate-900">수영강역 2번 출구 도보 약 10분</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              방문 전 예약을 통해 더 원활한 상담이 가능합니다. 주차 및 상세 교통 정보는 센터 상세 페이지에서 확인해주세요.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/about/location"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                센터 상세 보기
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about/intro"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                스토리 보기
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>

          <article className="rounded-3xl border border-[#EDE3D8] bg-white p-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Navigation className="h-4 w-4" />
              운영 정보
            </div>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li>
                <span className="font-semibold text-slate-900">운영시간</span>
                <p className="mt-1 text-slate-600">평일 09:00 - 20:00 / 주말 09:00 - 17:00</p>
              </li>
              <li>
                <span className="font-semibold text-slate-900">전화 문의</span>
                <p className="mt-1 text-slate-600">051-928-0944</p>
              </li>
              <li>
                <span className="font-semibold text-slate-900">운영 방식</span>
                <p className="mt-1 text-slate-600">사전 예약제로 운영됩니다.</p>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}

