"use client"

import Link from "next/link"
import {
  CalendarDays,
  Check,
  ChevronRight,
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

const LOGO_IMAGE_URL = "/saramme_logo.png"

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
    userInfo,
    attendance,
    selectedSchedules,
    concernTheme,
    phoneNumber,
    getAgeGroupLabel,
    formatScheduleDisplay,
  } = flow

  const attendanceLabel =
    attendance === "both" ? "부모와 자녀 함께" : attendance === "child" ? "자녀만" : attendance === "parent" ? "부모만" : "-"

  const schedulesLabel = selectedSchedules.length > 0 ? selectedSchedules.map((schedule) => formatScheduleDisplay(schedule)).join(", ") : "-"
  const concernThemeLabel = concernTheme.trim() || "-"

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F8FAFC] text-gray-900">
      <div className="pointer-events-none absolute top-0 left-1/2 h-96 w-96 -translate-x-[150%] rounded-full bg-blue-400/15 blur-[100px]" />
      <div className="pointer-events-none absolute top-40 left-1/2 h-80 w-80 translate-x-[50%] rounded-full bg-emerald-400/10 blur-[100px]" />

      <header className="fixed left-0 right-0 top-0 z-[100] border-b border-[#E3D5C7] bg-[#fff]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[64px] items-center md:h-[78px]">
            <Link href="/" className="flex shrink-0 items-center">
              <img src={LOGO_IMAGE_URL} alt="사람ME 로고" className="h-10 w-auto md:h-11" />
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 px-4 pb-12 pt-24 md:pt-28">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
            <div className="relative mb-6 inline-flex h-[66px] w-[66px] items-center justify-center rounded-[22px] bg-emerald-500 text-white shadow-lg shadow-emerald-200">
              <div className="absolute inset-0 rounded-[22px] bg-emerald-500 opacity-20 animate-ping" />
              <Check className="relative z-10 h-8 w-8" strokeWidth={3} />
            </div>

            <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-gray-900">예약 접수 완료</h1>
            <p className="mx-auto max-w-sm break-keep text-[16px] leading-relaxed text-gray-500 md:max-w-none md:whitespace-nowrap">
              센터에서 일정 확인 후 <strong>카카오톡 또는 문자로 최종 확정 안내</strong> 드리겠습니다.
            </p>
          </div>

          <section className="overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-200">
            <div className="flex items-center justify-between border-b border-gray-100 bg-[#F8F9FA] px-7 py-5">
              <h2 className="text-[16px] font-bold text-gray-800">예약 신청 상세</h2>
              <div className="rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-[12px] font-bold text-gray-500 shadow-sm">접수대기</div>
            </div>

            <div className="space-y-5 p-7">
              <div className="rounded-2xl border border-gray-100 bg-white p-5">
                <InfoRow label="예약자명" value={userInfo.name || "-"} icon={User} />
                <InfoRow
                  label="대상 아동"
                  value={`${ageGroup ? getAgeGroupLabel(ageGroup) : "-"} / ${userInfo.gender || "-"}`}
                />
                <InfoRow label="관계" value={userInfo.relationship || "-"} />
                <InfoRow label="참석 인원" value={attendanceLabel} />
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                <p className="text-[13px] font-bold text-gray-500">고민 테마</p>
                <p className="mt-2 break-words whitespace-pre-wrap text-[15px] font-bold text-gray-900">{concernThemeLabel}</p>
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
                href="tel:051-928-0944"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-3 text-[15px] font-bold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 sm:w-auto"
              >
                <Phone className="h-4 w-4" />
                051-928-0944
              </a>

              <a
                href="https://pf.kakao.com/_PDadX"
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
