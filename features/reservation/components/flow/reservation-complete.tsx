"use client"

import Link from "next/link"
import {
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Home,
  MessageCircle,
  Phone,
  User,
  type LucideIcon,
} from "lucide-react"
import type { UseReservationFlowReturn } from "../../hooks/use-reservation-flow"

interface ReservationCompleteProps {
  flow: UseReservationFlowReturn
}

interface InfoRowProps {
  label: string
  value: string
  icon?: LucideIcon
}

function InfoRow({ label, value, icon: Icon }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0">
      <div className="flex items-center gap-2.5 text-gray-500">
        {Icon && <Icon className="h-4 w-4 text-gray-400" />}
        <span className="text-[14px] font-medium">{label}</span>
      </div>
      <span className="text-[15px] font-bold text-gray-900">{value || "-"}</span>
    </div>
  )
}

export function ReservationComplete({ flow }: ReservationCompleteProps) {
  const {
    ageGroup,
    selectedConcern,
    userInfo,
    attendance,
    selectedSchedules,
    phoneNumber,
    getAgeGroupLabel,
    formatScheduleDisplay,
  } = flow

  const attendanceLabel =
    attendance === "both" ? "부모와 자녀 함께" : attendance === "child" ? "자녀만" : attendance === "parent" ? "부모만" : "-"

  const schedulesLabel = selectedSchedules.length > 0 ? selectedSchedules.map((schedule) => formatScheduleDisplay(schedule)).join(", ") : "-"

  const nextSteps = [
    "24시간 이내 일정 확정 안내를 드립니다.",
    "알림톡 또는 문자로 안내가 발송됩니다.",
    "문의가 필요하시면 언제든 연락주세요.",
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F8FAFC] text-gray-900">
      <div className="pointer-events-none absolute top-0 left-1/2 h-96 w-96 -translate-x-[150%] rounded-full bg-blue-400/15 blur-[100px]" />
      <div className="pointer-events-none absolute top-40 left-1/2 h-80 w-80 translate-x-[50%] rounded-full bg-emerald-400/10 blur-[100px]" />

      <header className="fixed top-0 left-0 right-0 z-[100] border-b border-[#e6ebf7] bg-[#ffffff]">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:h-20 lg:px-8">
          <Link href="/" className="shrink-0">
            <span className="text-2xl font-bold tracking-tight text-[#0C0C0C] lg:text-[2.1rem]">사발면</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 px-4 pb-12 pt-24 md:pt-28">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
            <div className="relative mb-6 inline-flex h-20 w-20 items-center justify-center rounded-[28px] bg-emerald-500 text-white shadow-lg shadow-emerald-200">
              <div className="absolute inset-0 rounded-[28px] bg-emerald-500 opacity-20 animate-ping" />
              <Check className="relative z-10 h-10 w-10" strokeWidth={3} />
            </div>

            <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-gray-900">예약 접수 완료</h1>
            <p className="mx-auto max-w-sm break-keep text-[16px] leading-relaxed text-gray-500">
              센터에서 일정 확인 후 최종 확정 안내를 드리겠습니다.
            </p>
          </div>

          <section className="mb-6 rounded-[32px] border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-in fade-in-0 slide-in-from-bottom-6 duration-700 delay-100">
            <h2 className="mb-4 flex items-center gap-2 text-[17px] font-bold text-gray-900">
              <Clock className="h-5 w-5 text-blue-500" />
              다음 안내
            </h2>

            <div className="space-y-4">
              {nextSteps.map((stepText, index) => (
                <div key={stepText} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-[15px] font-semibold text-gray-800">{stepText}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-200">
            <div className="flex items-center justify-between border-b border-gray-100 bg-[#F8F9FA] px-7 py-5">
              <h2 className="text-[16px] font-bold text-gray-800">예약 신청 상세</h2>
              <div className="rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-[12px] font-bold text-gray-500 shadow-sm">접수대기</div>
            </div>

            <div className="space-y-5 p-7">
              <div className="rounded-2xl border border-[#F0D7AB] bg-[#FFF7EB] p-5">
                <div className="mb-4 flex items-center gap-3 border-b border-[#F0D7AB] pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FEE500]">
                    <MessageCircle className="h-5 w-5 text-[#3C1E1E]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">에세스타 부모코칭</p>
                    <p className="text-xs text-gray-500">알림톡</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="text-xs text-[#5F5750]">아래와 같은 내용으로 안내가 발송됩니다.</p>
                  <p className="font-medium text-gray-900">{userInfo.name}님의 예약 접수가 완료되었습니다.</p>
                  <p className="leading-relaxed text-gray-600 break-keep">
                    고객님께서 요청하신 내용을 바탕으로 센터에서 일정을 조율 중입니다. 일정이 최종 확정되면 다시 한 번 알림톡을 통해
                    상세 안내를 보내드리겠습니다.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-5">
                <InfoRow label="예약자명" value={userInfo.name || "-"} icon={User} />
                <InfoRow
                  label="대상 아동"
                  value={`${ageGroup ? getAgeGroupLabel(ageGroup) : "-"} / ${userInfo.gender || "-"}`}
                />
                <InfoRow label="관계" value={userInfo.relationship || "-"} />
                <InfoRow label="주요 고민" value={selectedConcern || "-"} />
                <InfoRow label="참석 인원" value={attendanceLabel} />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-blue-100/60 bg-blue-50/60 p-4">
                  <div className="mb-1 flex items-center gap-2 text-[13px] font-bold text-blue-600">
                    <CalendarDays className="h-4 w-4" />
                    희망 일정
                  </div>
                  <p className="break-keep text-[15px] font-bold text-gray-900">{schedulesLabel}</p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <div className="mb-1 flex items-center gap-2 text-[13px] font-bold text-gray-500">
                    <Phone className="h-4 w-4" />
                    연락처
                  </div>
                  <p className="text-[15px] font-bold text-gray-900">{phoneNumber || "-"}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6 rounded-[28px] border border-gray-100 bg-white p-5 animate-in fade-in-0 slide-in-from-bottom-10 duration-700 delay-300">
            <h2 className="mb-3 text-base font-semibold text-gray-900">문의</h2>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <a
                href="tel:02-1234-5678"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-3 text-[15px] font-bold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 sm:w-auto"
              >
                <Phone className="h-4 w-4" />
                02-1234-5678
              </a>

              <a
                href="https://open.kakao.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FEE500] px-6 py-3 text-[15px] font-bold text-[#191919] shadow-sm transition-colors hover:bg-[#FDD800] sm:w-auto"
              >
                <MessageCircle className="h-4 w-4 fill-current" />
                카카오톡 문의하기
              </a>
            </div>

            <p className="mt-3 text-sm text-[#5C5448]">예약 변경 또는 취소는 센터로 문의해 주세요.</p>
          </section>

          <div className="mt-12 border-t border-gray-100 pt-8">
            <Link
              href="/"
              className="group flex h-16 w-full items-center justify-center gap-2 rounded-[24px] bg-gray-900 text-[17px] font-bold text-white shadow-xl shadow-gray-200 transition-all duration-300 active:scale-[0.98] hover:bg-gray-800"
            >
              <Home className="h-5 w-5" />
              홈으로 돌아가기
              <ChevronRight className="h-5 w-5 opacity-50 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
