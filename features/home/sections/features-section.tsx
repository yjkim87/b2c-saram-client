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
        <div className="mx-auto max-w-[1120px] text-center text-[#1A1410]">
          <div className="mx-auto flex h-[50px] w-[50px] items-center justify-center" aria-hidden="true">
            <svg width="50" height="50" viewBox="0 0 50 49.925" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Iconly_Regular_Bulk_Chat" data-name="Iconly/Regular/Bulk/Chat" transform="translate(-2 -2)">
                <g id="Chat" transform="translate(2 2)">
                  <path
                    id="Fill_1"
                    data-name="Fill 1"
                    d="M27.05,2A25,25,0,0,0,2,27,26.4,26.4,0,0,0,5.375,39.475a2.614,2.614,0,0,1,.175,2.25l-1.675,5.6a1.56,1.56,0,0,0,2.05,1.95l5.05-1.5c1.375-.45,2.45.125,3.728.9A25,25,0,0,0,27,51.925c12.4,0,25-9.575,25-25A24.964,24.964,0,0,0,27.05,2Z"
                    transform="translate(-2 -2)"
                    fill="#FF7A33"
                    opacity="0.4"
                  />
                  <path
                    id="Combined_Shape"
                    data-name="Combined Shape"
                    d="M20.9,17.076a3.223,3.223,0,0,1-3.219-3.2,3.219,3.219,0,1,1,3.219,3.2Zm-11.594,0A3.219,3.219,0,0,1,6.09,13.9a3.219,3.219,0,1,1,3.219,3.173ZM29.276,13.9A3.219,3.219,0,1,0,32.5,10.73,3.2,3.2,0,0,0,29.276,13.9Z"
                    transform="translate(4.049 11.122)"
                    fill="#FF7A33"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </g>
              </g>
            </svg>
          </div>

          <p className="mx-auto mt-6 max-w-[11.4em] text-[22px] font-semibold leading-[1.42] text-[#FFBC77] md:mt-7 md:max-w-[31.5em] lg:text-[28px]">
            <span className="lg:hidden">
              전문가를 찾기엔 애매하고
              <br />
              혼자 해결하기엔
              <br />
              버거운 <span className="text-[#FF7A33]">고민</span>들이 있습니다.
              <span className="mt-4 block">
                나 자신, 자녀,
                <br />
                관계에 대한 질문들.
              </span>
            </span>
            <span className="hidden lg:inline">
              전문가를 찾기엔 애매하고 혼자 해결하기엔 버거운 <span className="text-[#FF7A33]">고민</span>들이 있습니다.
              <br />
              나 자신, 자녀, 관계에 대한 질문들.
            </span>
          </p>

          <p className="mx-auto mt-6 text-[26px] font-bold leading-[1.3] text-[#FF7A33] md:mt-5 lg:text-[32px]">
            이것은 문제가 아니라{" "}
            <span className="inline-flex rounded-[10px] bg-[#FF7A33] px-[0.26em] py-[0.03em] font-bold leading-[1.05] text-white">
              성장의 과정
            </span>{" "}
            입니다.
          </p>

          <div className="mx-auto mt-8 h-12 w-px bg-[#F4CCB0] md:mt-9 md:h-14" />

          <div className="mx-auto mt-8 max-w-full text-center md:mt-9">
            <p className="text-center text-[18px] font-medium leading-[1.45] lg:hidden">
              사발면은 <span className="font-bold">심리상담의 깊이와</span>
              <br />
              <span className="font-bold">코칭의 실용성으로</span>
              <br />
              그 과정을 전문적으로 함께합니다.
            </p>
            <p className="mt-2 text-center text-[18px] font-medium leading-[1.5] lg:hidden sm:text-[20px]">
              초등학교 입학부터 고등학교 졸업까지.
              <br />
              아이의 발달 단계에 맞춘
              <br />
              <span className="inline-block rounded-[9px] border-2 border-[#F07C33] px-[0.24em] py-[0.02em] font-bold leading-[1.08] text-[#1A1410]">
                맞춤형 심리상담·성장 코칭
              </span>{" "}
              을 제공합니다.
            </p>

            <div className="hidden text-center text-[28px] font-medium leading-[1.45] lg:block">
              <p className="tracking-[-0.01em]">
                <span className="whitespace-nowrap">
                  사발면은 <span className="font-bold">심리상담의 깊이와 코칭의 실용성</span>으로 그 과정을 전문적으로 함께합니다.
                </span>
                <br />
                <span className="whitespace-nowrap">
                  초등학교 입학부터 고등학교 졸업까지. 아이의 발달 단계에 맞춘{" "}
                  <span className="inline-block rounded-[9px] border-2 border-[#F07C33] px-[0.2em] py-[0.02em] font-bold leading-[1.08] text-[#1A1410]">
                    맞춤형 심리상담·성장 코칭
                  </span>
                  을 제공합니다.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
