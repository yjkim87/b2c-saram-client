"use client"

import Link from "next/link"
import { Check, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/shared/ui/button"
import type { UseReservationFlowReturn } from "../../hooks/use-reservation-flow"

interface ReservationCompleteProps {
  flow: UseReservationFlowReturn
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
  const schedulesLabel = selectedSchedules.length > 0 ? selectedSchedules.map((s) => formatScheduleDisplay(s)).join(", ") : "-"

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-[100] border-b border-[#EDE3D8] bg-[#FFF9F4]">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:h-20 lg:px-8">
          <Link href="/" className="shrink-0">
            <span className="text-2xl font-bold tracking-tight text-[#0C0C0C] lg:text-[2.1rem]">사발면</span>
          </Link>
        </div>
      </header>

      <main className="pb-8 pt-24 md:pt-28">
        <div className="mx-auto max-w-2xl px-4 py-8">
          <div className="mb-8 text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-foreground">예약 접수 완료</h1>
            <p className="text-muted-foreground">센터에서 일정 확인 후 최종 확정 안내를 드리겠습니다.</p>
          </div>

          <section className="mb-6 rounded-2xl border border-[#E4DBCC] bg-[#F8F5EF] p-5 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-100">
            <h2 className="mb-3 text-base font-semibold text-[#2F2A23]">다음 안내</h2>
            <ul className="space-y-2 text-sm text-[#4C453B]">
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-[#0B6980]" />
                <span>24시간 이내 일정 확정 안내를 드립니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-[#0B6980]" />
                <span>알림톡 또는 문자로 안내가 발송됩니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-[#0B6980]" />
                <span>문의가 필요하시면 언제든 연락주세요.</span>
              </li>
            </ul>
          </section>

          <div className="rounded-2xl bg-[#FEE500] p-1 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-150">
            <div className="rounded-xl bg-white p-6">
              <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FEE500]">
                  <MessageCircle className="h-5 w-5 text-[#3C1E1E]" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">에세스타 부모코칭</p>
                  <p className="text-xs text-muted-foreground">알림톡</p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <p className="text-xs text-[#5F5750]">아래와 같은 내용으로 안내가 발송됩니다.</p>
                <p className="font-medium text-foreground">{userInfo.name}님의 예약 접수가 완료되었습니다.</p>
                <p className="leading-relaxed text-muted-foreground">
                  고객님께서 요청하신 내용을 바탕으로 센터에서 일정을 조율 중입니다. 일정이 최종 확정되면 다시 한 번 알림톡을 통해
                  상세 안내를 보내드리겠습니다.
                </p>

                <div className="space-y-2.5 rounded-lg border border-[#E6DED2] bg-[#FCFAF7] p-4">
                  <div className="grid grid-cols-[80px_1fr] gap-3">
                    <span className="text-[#746B5E]">예약자</span>
                    <span className="break-words font-medium text-[#2F2A23]">{userInfo.name || "-"}</span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-3">
                    <span className="text-[#746B5E]">대상</span>
                    <span className="break-words font-medium text-[#2F2A23]">
                      {ageGroup ? getAgeGroupLabel(ageGroup) : "-"} / {userInfo.gender || "-"}
                    </span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-3">
                    <span className="text-[#746B5E]">관계</span>
                    <span className="break-words font-medium text-[#2F2A23]">{userInfo.relationship || "-"}</span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-3">
                    <span className="text-[#746B5E]">고민</span>
                    <span className="break-words font-medium text-[#2F2A23]">{selectedConcern || "-"}</span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-3">
                    <span className="text-[#746B5E]">참석</span>
                    <span className="break-words font-medium text-[#2F2A23]">{attendanceLabel}</span>
                  </div>
                </div>

                <div className="mt-1 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-lg border border-[#F0D7AB] bg-[#FFF7EB] p-3">
                    <p className="text-xs text-[#8A6F45]">희망 일정</p>
                    <p className="mt-1 break-words font-semibold text-[#2F2A23]">{schedulesLabel}</p>
                  </div>
                  <div className="rounded-lg border border-[#F0D7AB] bg-[#FFF7EB] p-3">
                    <p className="text-xs text-[#8A6F45]">연락처</p>
                    <p className="mt-1 break-words font-semibold text-[#2F2A23]">{phoneNumber || "-"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-6 rounded-2xl border border-[#E4DBCC] bg-white p-5 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200">
            <h2 className="mb-3 text-base font-semibold text-[#2F2A23]">문의</h2>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:02-1234-5678"
                className="inline-flex items-center gap-2 rounded-full border border-[#D4CBB9] bg-white px-4 py-2 text-sm font-medium text-[#3D372F] transition-colors hover:bg-[#F8F5EF]"
              >
                <Phone className="h-4 w-4" />
                <span>02-1234-5678</span>
              </a>
              <a
                href="https://open.kakao.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 rounded-full border border-[#D4CBB9] bg-white px-4 py-2 text-sm font-medium text-[#3D372F] transition-colors hover:bg-[#F8F5EF]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>카카오톡 문의하기</span>
              </a>
            </div>
            <p className="mt-3 text-sm text-[#5C5448]">예약 변경 또는 취소는 센터로 문의해 주세요.</p>
          </section>

          <div className="mt-8 text-center">
            <Link href="/">
              <Button className="h-12 cursor-pointer rounded-xl bg-[#0B6980] px-8 text-base font-semibold text-white hover:bg-[#095668]">
                홈으로 돌아가기
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
