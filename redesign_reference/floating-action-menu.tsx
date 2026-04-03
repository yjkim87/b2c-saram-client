"use client";

import { MessageCircle, Instagram, Calendar } from "lucide-react";

export default function FloatingActionMenu() {
  const actions = [
    {
      id: "call",
      icon: Calendar,
      href: "/#contact",
      color: "oklch(0.48 0.09 165)",
      title: "예약하기",
    },
    {
      id: "kakao",
      icon: MessageCircle,
      href: "https://pf.kakao.com/_/sabalface",
      color: "oklch(0.62 0.09 45)",
      title: "카카오톡 문의",
    },
    {
      id: "instagram",
      icon: Instagram,
      href: "https://instagram.com/sabalface",
      color: "oklch(0.52 0.10 260)",
      title: "인스타그램",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8 flex flex-col gap-3">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <a
            key={action.id}
            href={action.href}
            target={action.id !== "call" ? "_blank" : undefined}
            rel={action.id !== "call" ? "noopener noreferrer" : undefined}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
            style={{ background: action.color }}
            title={action.title}
            aria-label={action.title}
          >
            <Icon className="w-5 h-5 md:w-6 md:h-6" />
          </a>
        );
      })}
    </div>
  );
}
