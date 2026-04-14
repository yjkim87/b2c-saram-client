"use client"

import { cn } from "@/shared/lib/utils"
import {
  landingLayoutTokens,
  landingSectionTokens,
} from "@/features/home/styles/landing-tokens"

export function FeaturesSection() {
  return (
    <section id="features" className={cn("bg-[#FFF]", landingSectionTokens.base)}>
      <div className={landingLayoutTokens.containerWide}>
        <div className="mx-auto max-w-4xl text-center text-[#1A1410]">
          <div className="md:hidden">
            <p className="text-[20px] font-medium leading-[1.55]">
              전문가를 찾기엔 애매하고
              <br />
              혼자 해결하기엔 버거운 고민들이 있습니다.
            </p>

            <p className="mt-8 text-[20px] font-medium leading-[1.55]">
              나 자신, 자녀, 관계에 대한 질문들.
              <br />
              이것은 문제가 아니라{" "}
              <span className="inline-flex rounded-[10px] bg-[linear-gradient(90deg,#FF7A33_0%,#FF6221_100%)] px-2.5 py-1 text-[20px] font-bold leading-none text-white">
                성장의 과정
              </span>
            </p>

            <p className="mt-10 text-[20px] leading-[1.55]">
              <span className="font-bold">사발면은 심리상담의 깊이와</span>
              <br />
              <span className="font-bold">코칭의 실용성으로</span>
              <br />
              그 과정을 전문적으로 함께합니다.
            </p>

            <p className="mt-10 text-[20px] leading-[1.55]">
              초등학교 입학부터 고등학교 졸업까지.
              <br />
              아이의 발달 단계에 맞춘
            </p>

            <p className="mt-2">
              <span className="inline-flex rounded-[12px] border-2 border-[#FF7A33] px-3 py-1 text-[20px] font-bold leading-[1.15] text-[#1A1410]">
                맞춤형 심리상담·성장 코칭
              </span>
            </p>
          </div>

          <div className="hidden md:block md:space-y-0 md:text-[20px] md:leading-[1.55]">
            <p className="font-medium">전문가를 찾기엔 애매하고 혼자 해결하기엔 버거운 고민들이 있습니다.</p>
            <p className="font-medium">
              나 자신, 자녀, 관계에 대한 질문들: 이것은 문제가 아니라{" "}
              <span className="inline-flex rounded-[10px] bg-[linear-gradient(90deg,#FF7A33_0%,#FF6221_100%)] px-2.5 py-1 text-[20px] font-bold leading-none text-white">
                성장의 과정
              </span>{" "}
              입니다.
            </p>
            <p>
              사발면은 <span className="font-bold">심리상담의 깊이와 코칭의 실용성</span>으로 그 과정을 전문적으로 함께합니다.
            </p>
            <p>
              초등학교 입학부터 고등학교 졸업까지. 아이의 발달 단계에 맞춘{" "}
              <span className="inline-flex rounded-[12px] border-2 border-[#FF7A33] px-3 py-1 text-[20px] font-bold leading-[1.15] text-[#1A1410]">
                맞춤형 심리상담·성장 코칭
              </span>{" "}
              을 제공합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
