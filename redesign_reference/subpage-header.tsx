"use client";

interface SubpageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SubpageHeader({ title, subtitle }: SubpageHeaderProps) {
  return (
    <div
      className="w-full pt-32 sm:pt-40 lg:pt-48 pb-20 sm:pb-24 lg:pb-28 px-4 sm:px-6 lg:px-8 flex items-center justify-center text-center"
      style={{ background: "oklch(0.30 0.05 165)" }}
    >
      <div className="max-w-4xl mx-auto">
        <h1
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-white text-balance"
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base text-white/80">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
