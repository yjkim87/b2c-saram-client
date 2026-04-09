"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Star } from "lucide-react";
import Navbar from "@/components/navbar";
import SubpageHeader from "@/components/subpage-header";
import { Footer } from "@/components/cta-footer";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const scheduleRows = [
  { day: "월 – 금", time: "10:00 – 20:00" },
  { day: "토요일", time: "10:00 – 17:00" },
  { day: "일 · 공휴일", time: "휴무" },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function DirectionsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "var(--background)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map placeholder */}
          <div
            className="rounded-2xl overflow-hidden flex items-center justify-center min-h-64"
            style={{ background: "oklch(0.93 0.01 200)", border: "1px solid var(--border)" }}
          >
            <div className="text-center">
              <MapPin className="w-10 h-10 mx-auto mb-2" style={{ color: "oklch(0.48 0.09 165)" }} />
              <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>지도 영역</p>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>서울특별시 강남구 사발면로 123</p>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            {[
              { icon: MapPin, label: "주소", value: "서울특별시 강남구 사발면로 123, 4층", color: "oklch(0.48 0.09 165)" },
              { icon: Phone, label: "전화", value: "02-000-0000", color: "oklch(0.62 0.09 45)" },
              { icon: Mail, label: "이메일", value: "hello@sabalmyeon.co.kr", color: "oklch(0.52 0.10 260)" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color.slice(0, -1)} / 0.1)`, border: `1px solid ${color.slice(0, -1)} / 0.2)` }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <div>
                  <p className="text-xs font-semibold mb-0.5" style={{ color }}>{label}</p>
                  <p className="text-sm" style={{ color: "var(--foreground)" }}>{value}</p>
                </div>
              </div>
            ))}

            {/* Hours */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "oklch(0.55 0.07 200 / 0.1)", border: "1px solid oklch(0.55 0.07 200 / 0.2)" }}>
                <Clock className="w-4 h-4" style={{ color: "oklch(0.55 0.07 200)" }} />
              </div>
              <div>
                <p className="text-xs font-semibold mb-1.5" style={{ color: "oklch(0.55 0.07 200)" }}>운영 시간</p>
                <table className="text-xs border-collapse">
                  <tbody>
                    {scheduleRows.map((r) => (
                      <tr key={r.day}>
                        <td className="pr-4 py-0.5 font-medium" style={{ color: "var(--foreground)" }}>{r.day}</td>
                        <td className="py-0.5" style={{ color: "var(--muted-foreground)" }}>{r.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Subway guide */}
            <div className="rounded-xl border p-4" style={{ background: "oklch(0.97 0.006 85)", borderColor: "var(--border)" }}>
              <p className="text-xs font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>교통 안내</p>
              <ul className="flex flex-col gap-1">
                {["2호선 강남역 3번 출구 도보 5분", "3호선 신사역 2번 출구 도보 8분", "버스 146, 360, 740번 사발면센터 앞 정류장"].map((t) => (
                  <li key={t} className="flex items-start gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                    <Star className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: "oklch(0.48 0.09 165)" }} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function LocationPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />
      <SubpageHeader title="오시는 길" subtitle="사발면 센터를 찾아오세요" />
      <DirectionsSection />
      <Footer />
    </main>
  );
}
