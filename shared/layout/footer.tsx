"use client"

import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"

const relatedSites = [
  { label: "한국MBTI연구소", value: "https://www.mbti.co.kr" },
  { label: "The Myers-Briggs Company", value: "https://www.cpp.com/en/index.aspx" },
  { label: "PSI", value: "https://www.psionline.com/en-gb" },
  { label: "한국심리학회", value: "https://www.koreanpsychology.or.kr" },
  { label: "한국산업및조직심리학회", value: "https://www.ksiop.or.kr/" },
  { label: "한국코칭심리학회", value: "https://www.coachingpsychology.or.kr/" },
  { label: "한국심리유형학회", value: "http://www.kapt.or.kr/" },
  { label: "미국심리학회", value: "https://www.apa.org/" },
  { label: "미국산업및조직심리학회", value: "https://www.siop.org/" },
]

const familySites = [
  { label: "어세스타", value: "https://www.assesta.com/" },
  { label: "온라인심리검사센터", value: "https://www.career4u.net/" },
  { label: "(구) C4U", value: "http://before.career4u.net/" },
  { label: "어세스타 HR", value: "https://hr.assesta.com/" },
  { label: "어세스타 스쿨", value: "https://school.assesta.com/" },
]

function openExternalSite(url: string) {
  const openedWindow = window.open(url, "_blank", "noopener,noreferrer")
  if (openedWindow) {
    openedWindow.opener = null
  }
}

export function Footer() {
  return (
    <footer className="bg-[#4a4a4a] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-xl mb-4">사발면</h3>
            <div className="space-y-2 text-[#94a3b8] text-sm">
              <p>대표이사 김명준</p>
              <p>개인정보관리자: · 손성훈</p>
              <p>사업자등록번호: 123-45-67890</p>
              <p>서울시 영등포구 국회대로 68길 11, 삼보호정빌딩 603호</p>
              <p>연락처: : TEL 02)787-1402 (평일 9am-6pm) | FAX 02)787-1408</p>
              <p>이메일: assestacs@assesta.com</p>
            </div>
            <div className="flex gap-4 pt-4">
              <Link
                href="/policy?type=terms"
                className="text-[#94a3b8] hover:text-white transition-colors text-sm"
              >
                이용약관
              </Link>
              <Link
                href="/policy?type=privacy"
                className="text-[#94a3b8] hover:text-white transition-colors text-sm font-semibold"
              >
                개인정보처리방침
              </Link>
            </div>
          </div>

          {/* Site Links */}
          <div className="footer-select-theme space-y-4 md:justify-self-end">
            <div className="space-y-3">
              <label className="text-[#94a3b8] text-sm block">관련기관 사이트</label>
              <Select onValueChange={openExternalSite}>
                <SelectTrigger className="h-12 w-full rounded-[10px] border-[#6A6A6A] bg-[#5B5B5B] px-4 text-base font-normal text-[#F1F5F9] data-[placeholder]:text-[#F1F5F9] md:w-64">
                  <SelectValue placeholder="사이트 선택" />
                </SelectTrigger>
                <SelectContent>
                  {relatedSites.map((site) => (
                    <SelectItem key={site.value} value={site.value}>
                      {site.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <label className="text-[#94a3b8] text-sm block">어세스타 패밀리사이트</label>
              <Select onValueChange={openExternalSite}>
                <SelectTrigger className="h-12 w-full rounded-[10px] border-[#6A6A6A] bg-[#5B5B5B] px-4 text-base font-normal text-[#F1F5F9] data-[placeholder]:text-[#F1F5F9] md:w-64">
                  <SelectValue placeholder="사이트 선택" />
                </SelectTrigger>
                <SelectContent>
                  {familySites.map((site) => (
                    <SelectItem key={site.value} value={site.value}>
                      {site.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#5a5a5a] mt-8 pt-8 text-center">
          <p className="text-[#94a3b8] text-xs">
            copyright © 2026 ASSESTAHRC All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
