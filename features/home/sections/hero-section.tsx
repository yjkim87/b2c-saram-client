"use client"

import { BookOpen, ChevronDown, Pencil } from "lucide-react"
import { useState } from "react"

export function HeroSection() {
  const [visualImageError, setVisualImageError] = useState(false)

  return (
    <section className="relative min-h-screen bg-[#FFF9F4] pt-20">
      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-[1520px] flex-col px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="relative z-20 mx-auto w-full max-w-[1080px] text-center md:mx-0 md:text-left">
          <p className="text-[clamp(1rem,0.92rem+0.35vw,1.25rem)] font-semibold text-[#FF741D]">
            사람의 발견을 원하면-
          </p>

          <h1 className="mt-4 text-[clamp(2.1rem,1.6rem+2.6vw,3.75rem)] font-bold leading-[1.16] tracking-[-0.02em] text-[#0C0C0C]">
            해석의 깊이를 더하는,
            <br />
            아이와 부모의 새로운 연결
          </h1>

          <p className="mt-8 text-[clamp(1rem,0.9rem+0.5vw,1.375rem)] font-normal leading-[1.6] text-[#0C0C0C] md:mt-10">
            사발면은 데이터 기반의 심리 및 진로 전문 플랫폼으로,
            <br />
            개인의 기질, 성격, 흥미, 역량 등을 종합적으로 분석하여 맞춤형 성장 로드맵을 제공합니다.
            <br />
            단순한 검사 결과 제공을 넘어, 검증된 전문가의 1:1 코칭을 통해
            <br />
            개인의 잠재력을 발견하고 성공적인 미래 설계를 지원하는 당신만의 <span className="font-bold">'인생 네비게이션'</span>입니다.
          </p>
        </div>

        <div className="relative z-10 mx-auto mt-10 w-full max-w-[698px] md:absolute md:right-8 md:top-[58%] md:mt-0 md:w-[698px] md:-translate-y-1/2 lg:right-10 xl:right-12">
          <div className="relative aspect-[698/517] w-full">
            {!visualImageError ? (
              <img
                src="/hero-main-visual.png"
                alt="아동과 부모의 성장을 상징하는 메인 비주얼"
                className="h-full w-full object-contain"
                onError={() => setVisualImageError(true)}
              />
            ) : (
              <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] border border-[#EDE3D8] bg-gradient-to-br from-[#FFFDFB] to-[#FDEEDC] shadow-[0_24px_70px_rgba(12,12,12,0.09)]">
                <div className="absolute left-[12%] top-[10%] rounded-full bg-white p-3 text-[#80715F] shadow-md">
                  <BookOpen className="h-7 w-7" />
                </div>
                <div className="absolute right-[12%] top-[27%] rotate-[-18deg] rounded-full bg-[#FFF5E4] p-3 text-[#E09243] shadow-md">
                  <Pencil className="h-7 w-7" />
                </div>

                <div className="absolute inset-x-8 bottom-11 h-5 rounded-full bg-[#E9DCCD]" />
                <div className="absolute bottom-[20%] left-[17%] h-40 w-40 rounded-full bg-[#F8CE6D] shadow-xl" />
                <div className="absolute bottom-[20%] left-[44%] h-44 w-44 rounded-full bg-[#C8D8F7] shadow-xl" />
                <div className="absolute bottom-[18%] right-[13%] h-44 w-44 rounded-full bg-[#CDE889] shadow-xl" />
                <div className="absolute bottom-12 left-[34%] h-10 w-16 rounded-md bg-[#D6B393] shadow-sm" />
                <div className="absolute bottom-[14%] left-[23%] h-8 w-11 rounded-md bg-[#FFE6C4] shadow-sm" />
                <div className="absolute bottom-[13%] left-[31%] h-8 w-11 rounded-md bg-[#FFD8A0] shadow-sm" />
                <div className="absolute bottom-[12.5%] left-[39%] h-8 w-11 rounded-md bg-[#FFCC86] shadow-sm" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bouncing Arrow - Scroll indicator */}
      <a
        href="#features"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-label="스크롤 내리기"
      >
        <ChevronDown className="h-8 w-8 md:h-10 md:w-10 text-muted-foreground" />
      </a>
    </section>
  )
}
