"use client";

import { useRef, useEffect, useState } from "react";
import { Clock, MapPin, Phone, ExternalLink, Calendar, Bus } from "lucide-react";

// ─── Hook ─────────────────────────────────────────────────────────────────────
function useFadeInUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    el.style.opacity = "0";
    el.style.transform = "translateY(22px)";
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return ref;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const slides = [
  { label: "센터 외경", desc: "사발면 센터 건물 외부" },
  { label: "상담실 내부", desc: "아늑하고 편안한 1:1 상담 공간" },
  { label: "놀이치료실", desc: "아이 친화적인 다양한 놀이 공간" },
];

const hours = [
  { days: "월 – 금", time: "09:00 – 20:00", badge: "평일", primary: true },
  { days: "토요일",  time: "09:00 – 17:00", badge: "주말", primary: false },
];

// ─── Image slideshow ──────────────────────────────────────────────────────────
function ImageSlideshow() {
  // Hook unconditionally at top
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 3400);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative rounded-2xl overflow-hidden border w-full h-full min-h-[360px] lg:min-h-0"
      style={{ background: "var(--secondary)", borderColor: "var(--border)" }}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.label}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-1"
            style={{ background: "oklch(0.48 0.09 165 / 0.14)" }}
          >
            <MapPin className="w-7 h-7" style={{ color: "var(--primary)" }} />
          </div>
          <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            {slide.label}
          </span>
          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            {slide.desc}
          </span>
        </div>
      ))}
      {/* Dot nav */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`슬라이드 ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? "18px" : "6px",
              height: "6px",
              background: i === current ? "var(--primary)" : "var(--border)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Desktop info panel ───────────────────────────────────────────────────────
// Single column of tight cards; combined address+phone at bottom
function DesktopInfoPanel() {
  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Operating hours */}
      <div
        className="rounded-2xl border px-4 py-3"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-2 mb-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "oklch(0.48 0.09 165 / 0.12)" }}
          >
            <Clock className="w-3.5 h-3.5" style={{ color: "var(--primary)" }} />
          </div>
          <h3 className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>운영 시간</h3>
        </div>
        <div className="flex flex-col gap-1">
          {hours.map((h) => (
            <div
              key={h.days}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-lg"
              style={{
                background: h.time === "휴무" ? "var(--muted)" : "oklch(0.48 0.09 165 / 0.05)",
              }}
            >
              <div className="flex items-center gap-1.5">
                {h.badge && (
                  <span
                    className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
                    style={{
                      background: h.primary
                        ? "oklch(0.48 0.09 165 / 0.15)"
                        : "oklch(0.62 0.09 45 / 0.15)",
                      color: h.primary ? "var(--primary)" : "var(--accent)",
                    }}
                  >
                    {h.badge}
                  </span>
                )}
                <span className="text-xs" style={{ color: "var(--foreground)" }}>{h.days}</span>
              </div>
              <span
                className="text-xs font-semibold"
                style={{
                  color: h.time === "휴무" ? "var(--muted-foreground)" : "var(--foreground)",
                }}
              >
                {h.time}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
          * 예약제 운영 · 초기 상담 50분
        </p>
      </div>

      {/* Address + Phone — single compact grid card */}
      <div
        className="rounded-2xl border px-4 py-3 grid grid-cols-2 gap-4"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        {/* Address */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
              style={{ background: "oklch(0.62 0.09 45 / 0.12)" }}
            >
              <MapPin className="w-3 h-3" style={{ color: "var(--accent)" }} />
            </div>
            <span className="font-semibold text-xs" style={{ color: "var(--foreground)" }}>오시는 길</span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "var(--foreground)" }}>
            서울 마포구 성미산로 000<br />OO빌딩 3층
          </p>
          <div className="flex items-center gap-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
            <Bus className="w-3 h-3 flex-shrink-0" />
            <span>합정역 3번 출구 도보 5분</span>
          </div>
          <a
            href="https://map.naver.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-xs font-medium hover:underline"
            style={{ color: "var(--primary)" }}
          >
            <ExternalLink className="w-3 h-3" />
            네이버 지도
          </a>
        </div>

        {/* Phone + CTA */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
              style={{ background: "oklch(0.52 0.08 290 / 0.12)" }}
            >
              <Phone className="w-3 h-3" style={{ color: "oklch(0.52 0.08 290)" }} />
            </div>
            <span className="font-semibold text-xs" style={{ color: "var(--foreground)" }}>전화 상담</span>
          </div>
          <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>02-000-0000</p>
          <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            평일 09:00–20:00<br />주말 09:00–17:00
          </p>
          <a
            href="#contact"
            className="mt-auto w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-md flex items-center justify-center gap-1.5"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            <Calendar className="w-3 h-3" />
            무료 상담하기
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile info card (single compact card) ───────────────────────────────────
function MobileInfoCard() {
  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* Hours strip */}
      <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--primary)" }} />
          <span className="font-semibold text-xs" style={{ color: "var(--foreground)" }}>운영 시간</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {hours.map((h) => (
            <div
              key={h.days}
              className="rounded-lg px-2 py-1.5 text-center"
              style={{ background: h.time === "휴무" ? "var(--muted)" : "oklch(0.48 0.09 165 / 0.07)" }}
            >
              <p className="text-xs font-medium" style={{ color: "var(--foreground)" }}>
                {h.badge ?? "휴일"}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                {h.time === "휴무" ? "휴무" : h.time.split(" – ").join("~")}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact grid */}
      <div className="px-4 py-3 grid grid-cols-2 gap-3">
        {/* Address */}
        <div className="flex items-start gap-2">
          <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
          <div>
            <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--foreground)" }}>오시는 길</p>
            <p className="text-xs leading-snug" style={{ color: "var(--muted-foreground)" }}>
              서울 마포구 성미산로 000<br />합정역 3번 출구 5분
            </p>
            <a
              href="https://map.naver.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-0.5 text-xs font-medium"
              style={{ color: "var(--primary)" }}
            >
              <ExternalLink className="w-3 h-3" />
              지도 보기
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-2">
          <Phone className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "oklch(0.52 0.08 290)" }} />
          <div>
            <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--foreground)" }}>전화 상담</p>
            <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>02-000-0000</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>예약제 운영</p>
          </div>
        </div>
      </div>

      {/* CTA button */}
      <div className="px-4 pb-4">
        <a
          href="#contact"
          className="w-full py-3 px-5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 hover:shadow-md"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          <Calendar className="w-4 h-4" />
          무료 상담하기
        </a>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function CenterInfo() {
  // ALL hooks unconditionally at the top
  const headerRef = useFadeInUp(0);
  const contentRef = useFadeInUp(150);

  return (
    <section
      id="center"
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{ background: "var(--secondary)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10">
          <span
            className="inline-block text-xs font-medium uppercase tracking-[0.2em] mb-4"
            style={{ color: "oklch(0.55 0.06 260)" }}
          >
            Center Guide
          </span>
          <h2
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-balance leading-snug"
            style={{ color: "var(--foreground)" }}
          >
            <span style={{ color: "var(--primary)", fontSize: "1.15em" }}>사</span>람의{" "}
            <span style={{ color: "var(--primary)", fontSize: "1.15em" }}>발</span>견을 원하
            <span style={{ color: "var(--primary)", fontSize: "1.15em" }}>면</span>
          </h2>
          <p 
            className="text-sm font-medium mb-2" 
            style={{ color: "oklch(0.50 0.08 165)" }}
          >
            사람의 발견을 지향하는 &apos;사발면&apos; 센터입니다
          </p>
          <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: "var(--muted-foreground)" }}>
            아이와 부모님이 편안하게 이야기 나눌 수 있는 따뜻한 공간
          </p>
        </div>

        {/* ── Mobile layout ── */}
        <div className="block lg:hidden" ref={contentRef}>
          <ImageSlideshow />
          <div className="mt-4">
            <MobileInfoCard />
          </div>
        </div>

        {/* ── Desktop layout: image left / info right — top & bottom aligned ── */}
        <div
          ref={contentRef}
          className="hidden lg:grid grid-cols-2 gap-6"
          style={{ alignItems: "stretch" }}
        >
          {/* Left: image fills full height of the grid row */}
          <ImageSlideshow />
          {/* Right: info panel fills same height */}
          <DesktopInfoPanel />
        </div>
      </div>
    </section>
  );
}
