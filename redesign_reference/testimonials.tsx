"use client";

import { useRef, useEffect, useState } from "react";
import { Quote } from "lucide-react";

const reviews = [
  {
    initial: "김",
    name: "김○○ 어머니",
    role: "7세 자녀 · 사회성 발달 코칭",
    text: "7살 아이가 친구 사귀기를 너무 어려워했는데, 6개월 코칭 후 반에서 리더 역할을 하게 되었어요. 아이가 스스로 달라졌다는 게 느껴집니다.",
    accent: "oklch(0.48 0.09 165)",
  },
  {
    initial: "박",
    name: "박○○ 아버지",
    role: "14세 자녀 · 청소년 정체성 코칭",
    text: "중2 아들이 무기력하고 학교를 가기 싫어했어요. 코치님이 아이의 이야기를 진심으로 들어주시면서 아이가 다시 활기를 찾았습니다. 정말 감사해요.",
    accent: "oklch(0.62 0.09 45)",
  },
  {
    initial: "이",
    name: "이○○ 어머니",
    role: "3세 자녀 · 언어발달 코칭",
    text: "3살 아이 언어 발달이 느리다는 걱정이 있었는데, 영아 발달 전문가가 부모 코칭도 함께 해주셔서 가정에서도 도움을 줄 수 있었어요.",
    accent: "oklch(0.52 0.08 290)",
  },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useFadeInUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return ref;
}

// ─── Single review card ───────────────────────────────────────────────────────
function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  return (
    <div
      className="group rounded-2xl p-6 border flex flex-col gap-4 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <Quote className="w-6 h-6 opacity-25 flex-shrink-0" style={{ color: review.accent }} />
      <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--foreground)" }}>
        {review.text}
      </p>
      <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm"
          style={{ background: `${review.accent.replace(")", " / 0.15)")}`, color: review.accent }}
        >
          {review.initial}
        </div>
        <div>
          <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{review.name}</p>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{review.role}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile: scroll-snap carousel with touch swipe ───────────────────────────
function MobileReviewCarousel() {
  // All hooks unconditionally at top
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardWidth = el.offsetWidth * 0.85 + 12; // 85% width + gap
      setIndex(Math.round(el.scrollLeft / cardWidth));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * 0.85 + 12;
    el.scrollTo({ left: i * cardWidth, behavior: "smooth" });
    setIndex(i);
  };

  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) scrollTo(Math.min(reviews.length - 1, index + 1));
      else scrollTo(Math.max(0, index - 1));
    }
  };

  return (
    <div>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          paddingLeft: "2px",
          paddingRight: "15%",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {reviews.map((r) => (
          <div
            key={r.name}
            className="flex-shrink-0"
            style={{ scrollSnapAlign: "start", width: "85%" }}
          >
            <ReviewCard review={r} />
          </div>
        ))}
      </div>
      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-4">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`${i + 1}번째 후기`}
            className="rounded-full transition-all duration-200"
            style={{
              width: i === index ? "20px" : "7px",
              height: "7px",
              background: i === index ? "var(--primary)" : "var(--border)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function Testimonials() {
  // All hooks unconditionally at top
  const headerRef = useFadeInUp(0);
  const gridRef = useFadeInUp(150);

  return (
    <section
      id="reviews"
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{ background: "var(--secondary)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="text-center mb-10">
          <span
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--primary)" }}
          >
            부모님 후기
          </span>
          <h2
            className="font-serif text-3xl sm:text-4xl font-bold text-balance"
            style={{ color: "var(--foreground)" }}
          >
            실제 변화를 경험하셨습니다
          </h2>
        </div>

        {/* Mobile: scroll-snap swipe carousel */}
        <div className="block md:hidden">
          <MobileReviewCarousel />
        </div>

        {/* Desktop: 3-col grid */}
        <div ref={gridRef} className="hidden md:grid grid-cols-3 gap-6">
          {reviews.map((r) => (
            <ReviewCard key={r.name} review={r} />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <a
            href="/reviews"
            className="inline-flex items-center px-8 py-3.5 rounded-full border font-semibold transition-all hover:shadow-lg hover:bg-white/95"
            style={{
              borderColor: "var(--primary)",
              color: "var(--primary)",
              background: "white",
            }}
          >
            부모님 생생 후기 전체보기
          </a>
        </div>
      </div>
    </section>
  );
}
