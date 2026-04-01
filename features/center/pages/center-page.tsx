import Link from "next/link"
import { ExternalLink, MapPin, Phone, Clock3, CarFront } from "lucide-react"
import { PageHeader } from "@/components/common/page-header"

const NAVER_MAP_URL =
  "https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%EC%8B%9C%20%ED%95%B4%EC%9A%B4%EB%8C%80%EA%B5%AC%20%EC%84%BC%ED%85%80%EB%8F%99%EB%A1%9C%2099"
const KAKAO_MAP_URL =
  "https://map.kakao.com/?q=%EB%B6%80%EC%82%B0%EC%8B%9C%20%ED%95%B4%EC%9A%B4%EB%8C%80%EA%B5%AC%20%EC%84%BC%ED%85%80%EB%8F%99%EB%A1%9C%2099"

export function CenterPage() {
  return (
    <>
      <PageHeader
        label="센터 안내"
        title="편안한 상담 공간, 사발면 센터"
        description="센터 위치와 방문 정보를 확인하고 편하게 찾아오실 수 있습니다."
      />

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1.2fr_1fr]">
          <article className="rounded-3xl border border-[#EDE3D8] bg-[#FFF9F4] p-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <MapPin className="h-4 w-4" />
              센터 주소
            </div>
            <p className="mt-3 text-xl font-bold text-slate-900">부산시 해운대구 센텀동로 99, 벽산e센텀클래스원(1차) 406호</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">수영강역 2번 출구 도보 약 10분 거리입니다.</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={NAVER_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2.5 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
              >
                네이버 지도
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href={KAKAO_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-5 py-2.5 text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-100"
              >
                카카오맵
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </article>

          <article className="rounded-3xl border border-[#EDE3D8] bg-white p-8">
            <ul className="space-y-5 text-sm text-slate-700">
              <li>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Clock3 className="h-4 w-4" />
                  운영시간
                </div>
                <p className="mt-2 text-slate-600">평일 09:00 - 20:00 / 주말 09:00 - 17:00</p>
              </li>
              <li>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Phone className="h-4 w-4" />
                  전화문의
                </div>
                <a href="tel:0519280944" className="mt-2 inline-flex text-slate-600 hover:underline">
                  051-928-0944
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <CarFront className="h-4 w-4" />
                  방문안내
                </div>
                <p className="mt-2 text-slate-600">사전 예약제로 운영되며, 주차 안내는 데스크에서 도와드립니다.</p>
              </li>
            </ul>

            <div className="mt-6">
              <Link
                href="/reservation"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                상담 예약하기
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
