"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Brain, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "2,800+", label: "상담·코칭 완료" },
  { value: "98%", label: "만족도" },
  { value: "15년+", label: "전문 경력" },
  { value: "0~18세", label: "전 연령 대응" },
];

function useFadeInUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    const timer = setTimeout(() => {
      el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return ref;
}

export default function HeroSection() {
  const badgeRef = useFadeInUp(100);
  const headingRef = useFadeInUp(220);
  const descRef = useFadeInUp(340);
  const btnRef = useFadeInUp(460);
  const statsRef = useFadeInUp(580);

  return (
    <section
      className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden"
      style={{ background: "var(--hero-bg)" }}
    >
      {/* Subtle background texture layer */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, oklch(0.48 0.09 165) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.62 0.09 45) 0%, transparent 40%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div ref={badgeRef}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
              style={{ background: "oklch(0.48 0.09 165 / 0.25)", color: "oklch(0.82 0.1 165)", border: "1px solid oklch(0.48 0.09 165 / 0.4)" }}>
              <Brain className="w-4 h-4" />
              발달심리 전문 상담·코칭
            </span>
          </div>

          {/* Heading */}
          <div ref={headingRef}>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6"
              style={{ color: "oklch(0.97 0.005 80)" }}>
              아이의 성장,
              <br />
              <span style={{ color: "oklch(0.75 0.1 165)" }}>마음부터</span> 시작됩니다
            </h1>
          </div>

          {/* Description */}
          <div ref={descRef}>
            <p className="text-base sm:text-lg lg:text-xl leading-[1.7] mb-10 max-w-2xl"
              style={{ color: "oklch(0.78 0.01 220)" }}>
              0세부터 18세까지, 발달심리학을 기반으로 한 맞춤형 심리상담·성장코칭으로
              <br className="hidden sm:block" />
              아이의 잠재력을 깨워드립니다.
            </p>
          </div>

          {/* Single CTA Button */}
          <div ref={btnRef} className="mb-16">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{ 
                background: "linear-gradient(135deg, oklch(0.38 0.08 220), oklch(0.32 0.10 240))",
                boxShadow: "0 8px 32px oklch(0.35 0.10 230 / 0.35), 0 2px 8px oklch(0.30 0.08 230 / 0.20)",
              }}
            >
              <Compass className="w-5 h-5" />
              <span>우리 아이 맞춤형 여정 상담하기</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold font-serif"
                  style={{ color: "oklch(0.82 0.1 165)" }}>
                  {s.value}
                </span>
                <span className="text-xs sm:text-sm mt-1" style={{ color: "oklch(0.65 0.01 220)" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60 C360 0, 1080 0, 1440 60 L1440 60 L0 60 Z" fill="var(--background)" />
        </svg>
      </div>
    </section>
  );
}
