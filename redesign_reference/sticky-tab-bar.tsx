// v11 — useState-based sticky, no DOM manipulation, breaks stale cache
"use client";

import { useEffect, useRef, useState } from "react";
import { Brain, TrendingUp } from "lucide-react";
import { useTabContext } from "./tab-context";

const LABEL_COUNSELING = "\uc2ec\ub9ac\uc0c1\ub2f4";
const LABEL_COACHING = "\uc131\uc7a5\ucf54\uce6d";

export default function StickyTabBar() {
  const { activeTab, setActiveTab } = useTabContext();
  const [sticky, setSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        setSticky(!entries[0].isIntersecting);
      },
      { threshold: 0, rootMargin: "-64px 0px 0px 0px" }
    );
    obs.observe(el);
    return () => { obs.disconnect(); };
  }, []);

  function pickCounseling() {
    setActiveTab("counseling");
  }
  function pickCoaching() {
    setActiveTab("coaching");
  }

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" style={{ height: 0 }} />
      <div
        className="w-full z-40"
        style={{
          position: sticky ? "sticky" : "relative",
          top: sticky ? 64 : "auto",
          transition: "box-shadow 0.2s",
        }}
      >
        <div className="flex justify-center py-3 px-4">
          <div
            className="flex gap-1 rounded-full p-1"
            style={{
              background: sticky ? "rgba(255,255,255,0.95)" : "var(--secondary)",
              boxShadow: sticky
                ? "0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)"
                : "none",
              backdropFilter: sticky ? "blur(14px)" : "none",
              border: sticky ? "1px solid var(--border)" : "none",
              transition: "background 0.3s, box-shadow 0.3s",
            }}
          >
            <button
              type="button"
              onClick={pickCounseling}
              aria-pressed={activeTab === "counseling"}
              className="flex items-center gap-1.5 rounded-full font-semibold px-5 py-2 text-sm"
              style={
                activeTab === "counseling"
                  ? { background: "oklch(0.48 0.09 165)", color: "white", transition: "all 0.2s" }
                  : { background: "transparent", color: "var(--muted-foreground)", transition: "all 0.2s" }
              }
            >
              <Brain className="w-4 h-4" />
              {LABEL_COUNSELING}
            </button>
            <button
              type="button"
              onClick={pickCoaching}
              aria-pressed={activeTab === "coaching"}
              className="flex items-center gap-1.5 rounded-full font-semibold px-5 py-2 text-sm"
              style={
                activeTab === "coaching"
                  ? { background: "oklch(0.62 0.09 45)", color: "white", transition: "all 0.2s" }
                  : { background: "transparent", color: "var(--muted-foreground)", transition: "all 0.2s" }
              }
            >
              <TrendingUp className="w-4 h-4" />
              {LABEL_COACHING}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
