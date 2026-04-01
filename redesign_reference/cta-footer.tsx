"use client";

import { useRef, useEffect } from "react";
import { ArrowRight, MessageCircle, Phone, Mail, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

function useFadeInUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return ref;
}

export function CTASection() {
  const ref = useFadeInUp(0);

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: "var(--hero-bg)" }}
    >
      <div ref={ref} className="max-w-3xl mx-auto text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: "oklch(0.48 0.09 165 / 0.2)" }}
        >
          <MessageCircle className="w-8 h-8" style={{ color: "oklch(0.75 0.1 165)" }} />
        </div>
        <h2
          className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-balance"
          style={{ color: "oklch(0.97 0.005 80)" }}
        >
          지금 바로 무료 상담을 받아보세요
        </h2>
        <p className="text-base leading-relaxed mb-8" style={{ color: "oklch(0.72 0.01 220)" }}>
          아이의 발달에 대한 궁금증이나 걱정이 있으신가요?
          <br className="hidden sm:block" />
          전문 코치가 친절하게 답변드립니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            size="lg"
            className="group text-base px-8 py-3 font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            AI 상담 시작하기 (무료)
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-base px-8 py-3 font-medium transition-all duration-200 hover:scale-105"
            style={{
              borderColor: "oklch(0.78 0.01 220 / 0.3)",
              color: "oklch(0.85 0.005 80)",
              background: "transparent",
            }}
          >
            전화 상담 예약
          </Button>
        </div>
      </div>
    </section>
  );
}

const footerLinks = [
  { label: "서비스 소개", href: "#" },
  { label: "발달 단계", href: "#" },
  { label: "코칭 프로그램", href: "#" },
  { label: "전문가 소개", href: "#" },
  { label: "상담 예약", href: "#" },
  { label: "개인정보처리방침", href: "#" },
];

export function Footer() {
  const ref = useFadeInUp(0);

  return (
    <footer
      className="py-16 px-4 sm:px-6 lg:px-8 md:pb-16 pb-28"
      style={{ background: "oklch(0.15 0.01 240)", borderTop: "1px solid oklch(0.25 0.01 240)" }}
    >
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "oklch(0.48 0.09 165 / 0.2)" }}>
                <Brain className="w-4 h-4" style={{ color: "oklch(0.75 0.1 165)" }} />
              </div>
              <span className="font-serif font-bold text-lg" style={{ color: "oklch(0.95 0.005 80)" }}>
                사발면 센터
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "oklch(0.6 0.01 220)" }}>
              0세부터 18세까지, 발달심리학을 기반으로 한 맞춤형 심리 코칭 전문 기관입니다.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm mb-3" style={{ color: "oklch(0.85 0.005 80)" }}>
              빠른 링크
            </h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-150 hover:underline"
                    style={{ color: "oklch(0.65 0.01 220)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-3" style={{ color: "oklch(0.85 0.005 80)" }}>
              문의하기
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="tel:02-000-0000"
                className="flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
                style={{ color: "oklch(0.65 0.01 220)" }}
              >
                <Phone className="w-4 h-4" style={{ color: "oklch(0.48 0.09 165)" }} />
                02-000-0000
              </a>
              <a
                href="mailto:hello@maeum.kr"
                className="flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
                style={{ color: "oklch(0.65 0.01 220)" }}
              >
                <Mail className="w-4 h-4" style={{ color: "oklch(0.48 0.09 165)" }} />
                hello@maeum.kr
              </a>
            </div>
          </div>
        </div>

        <div
          className="pt-6 border-t text-center text-xs"
          style={{ borderColor: "oklch(0.28 0.01 220)", color: "oklch(0.45 0.01 220)" }}
        >
          © 2025 사발면 센터. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
