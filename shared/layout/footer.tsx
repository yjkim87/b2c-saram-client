"use client"

import Image from "next/image"
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

const socialChannels = [
  {
    label: "카카오채널",
    href: "https://pf.kakao.com/",
    viewBox: "0 0 24 24",
    path: "M12 3C6.477 3 2 6.582 2 11c0 2.843 1.874 5.336 4.694 6.751l-1.17 4.282c-.1.37.325.664.655.45l5.106-3.313c.235.022.474.033.715.033 5.523 0 10-3.582 10-8.001C22 6.582 17.523 3 12 3z",
  },
  {
    label: "인스타그램",
    href: "https://www.instagram.com/",
    viewBox: "0 0 24 24",
    path: "M7.75 2C4.575 2 2 4.575 2 7.75v8.5C2 19.425 4.575 22 7.75 22h8.5C19.425 22 22 19.425 22 16.25v-8.5C22 4.575 19.425 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0 1 20 7.75v8.5A3.75 3.75 0 0 1 16.25 20h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5A3.75 3.75 0 0 1 7.75 4zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.25-3.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z",
  },
  {
    label: "블로그",
    href: "https://blog.naver.com/",
    viewBox: "0 0 24 24",
    path: "M15.12 0v12.283L8.857 0H0v24h8.88V11.717L15.143 24H24V0z",
  },
  {
    label: "유튜브",
    href: "https://www.youtube.com/",
    viewBox: "0 0 24 24",
    path: "M23.498 6.186a2.997 2.997 0 0 0-2.11-2.122C19.54 3.545 12 3.545 12 3.545s-7.54 0-9.388.519A2.997 2.997 0 0 0 .502 6.186 31.84 31.84 0 0 0 0 12a31.84 31.84 0 0 0 .502 5.814 2.997 2.997 0 0 0 2.11 2.122c1.848.519 9.388.519 9.388.519s7.54 0 9.388-.519a2.997 2.997 0 0 0 2.11-2.122A31.84 31.84 0 0 0 24 12a31.84 31.84 0 0 0-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
]

function openExternalSite(url: string) {
  const openedWindow = window.open(url, "_blank", "noopener,noreferrer")
  if (openedWindow) {
    openedWindow.opener = null
  }
}

function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {socialChannels.map((channel) => (
        <a
          key={channel.label}
          href={channel.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={channel.label}
          title={channel.label}
          className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#2D323A] text-white transition-colors hover:bg-[#3C424B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#15171B]"
        >
          <svg aria-hidden="true" className="h-4 w-4" viewBox={channel.viewBox} fill="currentColor">
            <path d={channel.path} />
          </svg>
        </a>
      ))}
    </div>
  )
}

function SiteSelects({ mobile = false }: { mobile?: boolean }) {
  const triggerClass = mobile
    ? "h-12 w-full rounded-[10px] border-[#4A505A] bg-[#21262E] px-4 text-base font-normal text-[#F1F5F9] data-[placeholder]:text-[#F1F5F9]"
    : "h-12 w-[210px] rounded-[10px] border-[#4A505A] bg-[#21262E] px-4 text-base font-normal text-[#F1F5F9] data-[placeholder]:text-[#F1F5F9]"

  return (
    <div className={mobile ? "footer-select-theme space-y-3" : "footer-select-theme flex items-center gap-3"}>
      <Select onValueChange={openExternalSite}>
        <SelectTrigger className={triggerClass}>
          <SelectValue placeholder="관련기관 사이트" />
        </SelectTrigger>
        <SelectContent>
          {relatedSites.map((site) => (
            <SelectItem key={site.value} value={site.value}>
              {site.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={openExternalSite}>
        <SelectTrigger className={triggerClass}>
          <SelectValue placeholder="어세스타 패밀리사이트" />
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
  )
}

export function Footer() {
  return (
    <footer className="bg-[#15171B] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_auto] md:gap-10">
          <div className="space-y-4">
            <Link href="/" className="mb-4 inline-flex" aria-label="사발면 홈으로 이동">
              <Image
                src="/saramme_W_logo.png"
                alt="사발면 로고"
                width={162}
                height={40}
                className="h-[40px] w-auto"
              />
            </Link>

            <div className="flex flex-wrap items-center text-sm text-[#C5CBD4]">
              <span className="whitespace-nowrap">대표이사 : 김명준</span>
              <span className="mx-3 text-[#4A505A]">|</span>
              <span className="whitespace-nowrap">개인정보 관리자 : 손성훈</span>
              <span className="mx-3 text-[#4A505A]">|</span>
              <span className="whitespace-nowrap">사업자등록번호 : 107-86-76668</span>
              <span className="mx-3 text-[#4A505A]">|</span>
              <span className="whitespace-nowrap">통신판매업신고 : 제2022-서울영등포-0184호</span>
              <Link
                href="#"
                className="ml-3 inline-flex h-6 cursor-pointer items-center rounded-full bg-[#F5F5F5] px-3 text-[11px] font-medium leading-none text-[#111318]"
              >
                사업자정보확인
              </Link>
              <span className="mx-3 text-[#4A505A]">|</span>
              <Link href="/policy?type=privacy" className="whitespace-nowrap text-sm transition-colors hover:text-white">
                개인정보처리방침
              </Link>
              <span className="mx-3 text-[#4A505A]">|</span>
              <Link href="/policy?type=terms" className="whitespace-nowrap text-sm transition-colors hover:text-white">
                서비스 이용 약관
              </Link>
            </div>

            <div className="space-y-1 text-sm text-[#C5CBD4]">
              <p>서울시 영등포구 국회대로 68길 11, 삼보호정빌딩 6층</p>
              <p>TEL 02)787-1402 (월-금 9am-6pm) FAX 02)787-1408</p>
              <p>assestacs@assesta.com</p>
            </div>

            <p className="pt-7 text-xs text-[#C5CBD4]">copyright © 2026. ASSESTAHRC All Rights Reserved</p>
          </div>

          <div className="flex flex-col items-end justify-end gap-6">
            <SocialLinks />
            <SiteSelects />
          </div>
        </div>

        <div className="space-y-4 md:hidden">
          <Link href="/" className="mb-2 inline-flex" aria-label="사발면 홈으로 이동">
            <Image
              src="/saramme_W_logo.png"
              alt="사발면 로고"
              width={162}
              height={40}
              className="h-[40px] w-auto"
            />
          </Link>

          <div className="space-y-1.5 text-sm text-[#C5CBD4]">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="whitespace-nowrap">대표이사 : 김명준</span>
              <span className="text-[#4A505A]">|</span>
              <span className="whitespace-nowrap">개인정보 관리자 : 손성훈</span>
            </div>
            <p>사업자등록번호 : 107-86-76668</p>
            <p>통신판매업신고 : 제2013-서울영등포-0153호</p>
            <Link
              href="#"
              className="inline-flex h-6 cursor-pointer items-center rounded-full bg-[#F5F5F5] px-3 text-[11px] font-medium leading-none text-[#111318]"
            >
              사업자정보확인
            </Link>
          </div>

          <div className="space-y-1 pt-2 text-sm text-[#C5CBD4]">
            <p>서울시 영등포구 국회대로 68길 11, 삼보호정빌딩 6층</p>
            <p>TEL 02)787-1402 (월-금 9am-6pm)</p>
            <p>FAX 02)787-1408</p>
            <p>assestacs@assesta.com</p>
          </div>

          <div className="flex items-center gap-4 pt-2 text-sm text-[#C5CBD4]">
            <Link href="/policy?type=privacy" className="transition-colors hover:text-white">
              개인정보처리방침
            </Link>
            <span className="text-[#4A505A]">|</span>
            <Link href="/policy?type=terms" className="transition-colors hover:text-white">
              서비스 이용 약관
            </Link>
          </div>

          <div className="pt-2">
            <SocialLinks />
          </div>

          <div className="pt-2">
            <SiteSelects mobile />
          </div>

          <p className="pt-5 text-xs text-[#C5CBD4]">copyright 2026. ASSESTAHRC All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}
