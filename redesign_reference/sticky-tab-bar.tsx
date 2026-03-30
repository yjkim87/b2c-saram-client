"use client";

import { useEffect, useRef, useState } from "react";
import { Brain, TrendingUp } from "lucide-react";
import { useTabContext } from "./tab-context";

export default function StickyTabBar() {
  const { activeTab, setActiveTab } = useTabContext();
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-64px 0px 0px 0px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="h-0 w-full" aria-hidden="true" />

      {/* Outer wrapper — sticky when scrolled past sentinel */}
      <div
        className="w-full z-40 transition-all duration-300"
        style={{
          position: isSticky ? "sticky" : "relative",
          top: isSticky ? "64px" : "auto",
        }}
      >
        {/* Floating pill — always centered */}
        <div className="flex justify-center py-3 px-4">
          <div
            className="flex gap-1 rounded-full p-1 transition-all duration-300"
            style={{
              background: isSticky
                ? "oklch(0.98 0.006 85 / 0.95)"
                : "var(--secondary)",
              boxShadow: isSticky
                ? "0 4px 24px oklch(0 0 0 / 0.10), 0 1px 4px oklch(0 0 0 / 0.06)"
                : "none",
              backdropFilter: isSticky ? "blur(14px)" : "none",
              border: isSticky ? "1px solid var(--border)" : "none",
            }}
          >
            <button
              onClick={() => setActiveTab("counseling")}
              className="flex items-center gap-1.5 rounded-full font-semibold transition-all duration-200 px-5 py-2 text-sm hover:opacity-90"
              style={
                activeTab === "counseling"
                  ? { background: "var(--primary)", color: "var(--primary-foreground)" }
                  : { color: "var(--muted-foreground)", background: "transparent" }
              }
              aria-pressed={activeTab === "counseling"}
            >
              <Brain className="w-3.5 h-3.5 flex-shrink-0" />
              상담심리
            </button>

            <button
              onClick={() => setActiveTab("coaching")}
              className="flex items-center gap-1.5 rounded-full font-semibold transition-all duration-200 px-5 py-2 text-sm hover:opacity-90"
              style={
                activeTab === "coaching"
                  ? { background: "var(--accent)", color: "var(--accent-foreground)" }
                  : { color: "var(--muted-foreground)", background: "transparent" }
              }
              aria-pressed={activeTab === "coaching"}
            >
              <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" />
              코칭심리
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
