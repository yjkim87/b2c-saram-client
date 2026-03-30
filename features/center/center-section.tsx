"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, CircleCheck } from "lucide-react";
import { toast } from "@/shared/hooks/use-toast";

type SectionVariant = "preview" | "full";

interface CenterSectionProps {
  variant?: SectionVariant;
  showGallery?: boolean;
  showIntroText?: boolean;
}

const MapPinIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const PrinterIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9V2h12v7" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <path d="M6 14h12v8H6z" />
  </svg>
);

const CopyIcon = ({ className = "h-3.5 w-3.5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const CarIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

const TrainIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="16" height="16" x="4" y="3" rx="2" />
    <path d="M4 11h16" />
    <path d="M12 3v8" />
    <path d="m8 19-2 3" />
    <path d="m18 22-2-3" />
    <path d="M8 15h0" />
    <path d="M16 15h0" />
  </svg>
);

const BusIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 6v6" />
    <path d="M15 6v6" />
    <path d="M2 12h19.6" />
    <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
    <circle cx="7" cy="18" r="2" />
    <path d="M9 18h5" />
    <circle cx="16" cy="18" r="2" />
  </svg>
);

type TabKey = "parking" | "subway" | "bus";

declare global {
  interface Window {
    naver?: any;
  }
}

const CENTER_COORDS = { lat: 35.170265, lng: 129.130395 };
const NAVER_MAP_URL =
  "https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%EC%8B%9C%20%ED%95%B4%EC%9A%B4%EB%8C%80%EA%B5%AC%20%EC%84%BC%ED%85%80%EB%8F%99%EB%A1%9C%2099";
const KAKAO_MAP_URL =
  "https://map.kakao.com/?q=%EB%B6%80%EC%82%B0%EC%8B%9C%20%ED%95%B4%EC%9A%B4%EB%8C%80%EA%B5%AC%20%EC%84%BC%ED%85%80%EB%8F%99%EB%A1%9C%2099";
const CENTER_GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1600",
    alt: "Center signature space",
    label: "Signature",
  },
  {
    src: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80&w=1600",
    alt: "Center interior lounge",
    label: "Interior",
  },
  {
    src: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=1600",
    alt: "Private counseling room",
    label: "Consulting",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600",
    alt: "Center exterior view",
    label: "Exterior",
  },
];

function CenterGallery() {
  const [carouselRef, carouselApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    loop: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const syncCarouselState = useCallback(() => {
    if (!carouselApi) return;
    setSelectedIndex(carouselApi.selectedScrollSnap());
    setCanScrollPrev(carouselApi.canScrollPrev());
    setCanScrollNext(carouselApi.canScrollNext());
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;

    syncCarouselState();
    carouselApi.on("select", syncCarouselState);
    carouselApi.on("reInit", syncCarouselState);

    return () => {
      carouselApi.off("select", syncCarouselState);
      carouselApi.off("reInit", syncCarouselState);
    };
  }, [carouselApi, syncCarouselState]);

  const handlePrev = () => carouselApi?.scrollPrev();
  const handleNext = () => carouselApi?.scrollNext();
  const handleMoveToSlide = (index: number) => carouselApi?.scrollTo(index);

  return (
    <div className="mb-10 md:mb-12">
      <div
        className="group relative"
        role="region"
        aria-roledescription="carousel"
        aria-label="Center space gallery"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            handlePrev();
          }

          if (event.key === "ArrowRight") {
            event.preventDefault();
            handleNext();
          }
        }}
      >
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
          <div ref={carouselRef} className="overflow-hidden">
            <div className="flex touch-pan-y">
              {CENTER_GALLERY_IMAGES.map((image, index) => (
                <div
                  key={image.src}
                  className="min-w-0 shrink-0 grow-0 basis-[92%] pl-3 first:pl-0 sm:basis-[95%] sm:pl-4 md:basis-full md:pl-0"
                  aria-label={`${index + 1} / ${CENTER_GALLERY_IMAGES.length}`}
                >
                  <figure className="overflow-hidden rounded-3xl border border-neutral-200/80 bg-neutral-100 shadow-sm">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                        draggable={false}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePrev}
          disabled={!canScrollPrev}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/90 text-neutral-700 shadow-md opacity-0 transition-all duration-300 ease-out hover:bg-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-0 md:flex md:group-hover:opacity-100"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!canScrollNext}
          aria-label="Next image"
          className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/90 text-neutral-700 shadow-md opacity-0 transition-all duration-300 ease-out hover:bg-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-0 md:flex md:group-hover:opacity-100"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2" aria-label="Gallery position indicator">
        {CENTER_GALLERY_IMAGES.map((image, index) => {
          const isActive = index === selectedIndex;

          return (
            <button
              key={image.src}
              type="button"
              onClick={() => handleMoveToSlide(index)}
              aria-label={`Go to image ${index + 1}`}
              aria-current={isActive ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 ${
                isActive ? "w-6 bg-neutral-900" : "w-2.5 bg-neutral-300 hover:bg-neutral-400"
              }`}
            />
          );
        })}
      </div>

      <p className="mt-2 text-center text-xs text-neutral-500 md:hidden">
        Swipe left or right to explore the space.
      </p>

      <div className="mt-5 hidden grid-cols-4 gap-3 md:grid">
        {CENTER_GALLERY_IMAGES.map((image, index) => {
          const isActive = index === selectedIndex;

          return (
            <button
              key={`thumb-${image.src}`}
              type="button"
              onClick={() => handleMoveToSlide(index)}
              aria-label={`${image.label} thumbnail`}
              aria-current={isActive ? "true" : undefined}
              className={`overflow-hidden rounded-2xl border bg-white text-left transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 ${
                isActive
                  ? "border-neutral-900 shadow-sm ring-1 ring-neutral-900/30"
                  : "border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={image.src}
                  alt={`${image.alt} thumbnail`}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="h-full w-full object-cover"
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
function CenterSectionPreview() {
  const ADDRESS_SUMMARY = "부산시 해운대구 센텀동로 99, 백산센텀클래스원(1차) 406호";

  return (
    <section className="relative z-0 w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center text-center lg:mb-10">
          <div className="mb-4 inline-flex items-center rounded-full border border-slate-200/70 bg-white px-4 py-2 shadow-sm">
            <span className="text-xs font-semibold tracking-[0.14em] text-slate-700">센터 안내</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            마음성장 코칭 센터
          </h2>
          <p className="mt-3 text-sm text-neutral-600 sm:text-base">
            아이와 부모님이 편안하게 이야기 나눌 수 있는 따뜻한 공간입니다
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-stretch">
          <div className="relative isolate min-h-[320px] overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm md:min-h-[380px]">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-100 via-white to-sky-100" />
            <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.08)_1px,transparent_1px)] [background-size:28px_28px]" />
            <div className="absolute -left-10 -top-12 h-40 w-40 rounded-full bg-teal-300/40 blur-3xl" />
            <div className="absolute -bottom-12 -right-10 h-44 w-44 rounded-full bg-sky-300/35 blur-3xl" />

            <div className="relative z-10 flex h-full items-center justify-center px-4 pb-20 pt-12">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-white shadow-lg shadow-teal-900/30">
                  <MapPinIcon className="h-5 w-5" />
                </div>
                <p className="mt-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-800 shadow-sm">
                  사람의 발견을 원하면- 센터
                </p>
              </div>
            </div>

            <div className="absolute inset-x-3 bottom-3 z-20 sm:inset-x-4 sm:bottom-4">
              <div className="grid grid-cols-2 gap-2 rounded-2xl bg-white/95 p-2 shadow-lg backdrop-blur-sm">
                <a
                  href={NAVER_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-500 px-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:ring-offset-2"
                >
                  네이버 지도
                </a>
                <a
                  href={KAKAO_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-yellow-300 px-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/70 focus-visible:ring-offset-2"
                >
                  카카오 맵
                </a>
              </div>
            </div>
          </div>

          <aside className="flex flex-col rounded-3xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">주소</p>
            <p className="mt-2 text-lg font-semibold leading-snug text-neutral-900">{ADDRESS_SUMMARY}</p>
            <p className="mt-3 text-sm text-neutral-600">
              Need parking, contact, and transport details? Check the full center introduction page.
            </p>

            <div className="mt-6">
              <Link
                href="/center"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 transition-colors hover:border-neutral-400 hover:bg-neutral-100"
              >
                Center details
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function CenterSectionFull({
  showGallery = true,
  showIntroText = true,
}: {
  showGallery?: boolean;
  showIntroText?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<TabKey>("parking");
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [showMapFallback, setShowMapFallback] = useState(true);
  const naverClientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

  const ADDRESS_TEXT = "부산시 해운대구 센텀동로 99, 백산센텀클래스원(1차) 406호";

  const handleCopyAddress = async () => {
    const showCopiedToast = () => {
      const { dismiss } = toast({
        title: (
          <span className="inline-flex items-center gap-2 text-xs font-medium leading-none">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/25">
              <CircleCheck className="h-3.5 w-3.5 text-emerald-300" />
            </span>
            주소를 복사했습니다.
          </span>
        ),
        duration: 3000,
        className:
          "!w-auto !min-h-0 !rounded-full !border-neutral-800 !bg-neutral-900/95 !px-3 !py-2 !pr-3 !text-white !items-center !justify-center !space-x-0 shadow-xl backdrop-blur-sm [&_[toast-close]]:hidden [&>div]:!flex [&>div]:!items-center [&>div]:!gap-2",
      });

      window.setTimeout(() => {
        dismiss();
      }, 3000);
    };

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(ADDRESS_TEXT);
        showCopiedToast();
        return;
      } catch {
        // Fallback below.
      }
    }

    const textarea = document.createElement("textarea");
    textarea.value = ADDRESS_TEXT;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    showCopiedToast();
  };

  useEffect(() => {
    if (!naverClientId || !mapRef.current) {
      setShowMapFallback(true);
      return;
    }

    let isUnmounted = false;
    const scriptId = "naver-map-sdk";
    let tileLoaded = false;
    let fallbackTimer: ReturnType<typeof setTimeout> | null = null;

    const initNaverMap = () => {
      if (isUnmounted || !mapRef.current || !window.naver?.maps) return;

      const center = new window.naver.maps.LatLng(CENTER_COORDS.lat, CENTER_COORDS.lng);
      const map = new window.naver.maps.Map(mapRef.current, {
        center,
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT,
        },
      });

      // 지도 타일이 모두 로드된 시점에 fallback UI 제거
      window.naver.maps.Event.once(map, "tilesloaded", () => {
        if (isUnmounted) return;
        tileLoaded = true;
        setShowMapFallback(false);
      });

      // 지도 로딩이 지연될 경우를 대비한 fallback 처리 (예외 상황 대응)
      fallbackTimer = setTimeout(() => {
        if (isUnmounted) return;
        if (!tileLoaded) setShowMapFallback(true);
      }, 5000);
    };

    if (window.naver?.maps) {
      initNaverMap();
      return;
    }

    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener("load", initNaverMap);
      return () => {
        isUnmounted = true;
        existingScript.removeEventListener("load", initNaverMap);
      };
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${naverClientId}`;
    script.addEventListener("load", initNaverMap);
    script.addEventListener("error", () => {
      if (!isUnmounted) setShowMapFallback(true);
    });
    document.head.appendChild(script);

    return () => {
      isUnmounted = true;
      if (fallbackTimer) clearTimeout(fallbackTimer);
      script.removeEventListener("load", initNaverMap);
    };
  }, [naverClientId]);

  return (
    <section className="relative z-0 w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {showIntroText && (
          <div className="mb-10 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center space-x-2 rounded-full border border-slate-200/60 bg-white px-3 py-1.5 shadow-sm md:mb-6 md:px-4 md:py-2">
              <span className="text-xs md:text-sm">📍</span>
              <span className="text-xs font-bold tracking-wide text-slate-700 md:text-sm">
                센터 소개
              </span>
            </div>
          </div>
        )}

        {showGallery && <CenterGallery />}

        <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm ring-1 ring-black/5">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative isolate min-h-[384px] w-full overflow-hidden bg-stone-200 lg:min-h-[560px]">
              <div ref={mapRef} className="absolute inset-0 z-0" />

              {showMapFallback && (
                <div
                  className="absolute inset-0 opacity-10 mix-blend-multiply"
                  style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}
                />
              )}

              <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
                <div className="flex flex-col items-center drop-shadow-md">
                  <div
                    className="flex h-12 w-12 items-center justify-center text-white shadow-lg"
                    style={{
                      borderRadius: 9999,
                      backgroundColor: "#0D9488",
                      boxShadow: "0 10px 22px rgba(0,0,0,0.18), 0 0 0 4px rgba(255,255,255,0.5)",
                    }}
                  >
                    <MapPinIcon className="h-5 w-5" />
                  </div>
                  <div className="mt-2 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-neutral-900 shadow-md">
                    사람의 발견을 원하면- 센터
                </div>
              </div>
              </div>

              <div className="absolute inset-x-6 bottom-4 z-30 flex justify-center gap-3">
                <a
                  href={NAVER_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex max-w-[140px] flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:ring-offset-2"
                >
                  네이버 지도
                </a>
                <a
                  href={KAKAO_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex max-w-[140px] flex-1 items-center justify-center gap-2 rounded-xl bg-yellow-300 px-4 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-black/20 transition-all hover:bg-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/70 focus-visible:ring-offset-2"
                >
                  카카오 맵
                </a>
              </div>
            </div>

            <div className="flex min-w-0 flex-col p-6 sm:p-10">
              <div className="mb-8 space-y-6">
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <MapPinIcon className="h-4 w-4" /> 주소</h3>
                  <div className="mt-2 flex items-start justify-between gap-4">
                    <p className="text-lg font-medium leading-relaxed text-neutral-900 sm:text-xl">
                      부산시 해운대구 센텀동로 99
                      <br className="hidden sm:block" />
                      <span className="text-neutral-600">백산센텀클래스원(1차) 406호</span>
                    </p>
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-50 active:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
                    >
                      <CopyIcon /> 복사</button>
                  </div>
                </div>

                <div className="mb-8 flex gap-4 rounded-2xl !bg-neutral-100 p-5 max-[400px]:flex-col">
                  <a
                    href="tel:0519280944"
                    aria-label="?????????▲뀋????遺얘턁筌?（????????붺몭????051-928-0944"
                    className="flex-1 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 max-[400px]:flex max-[400px]:items-center max-[400px]:gap-2"
                  >
                    <div className="mb-1 flex items-center gap-1.5 text-sm font-medium text-neutral-500 max-[400px]:mb-0">
                      <PhoneIcon className="h-4 w-4" /> 전화
                    </div>
                    <p className="text-lg font-bold text-neutral-900 max-[400px]:text-base max-[400px]:leading-none">051-928-0944</p>
                  </a>
                  <div className="flex-1 max-[400px]:flex max-[400px]:items-center max-[400px]:gap-2">
                    <div className="mb-1 flex items-center gap-1.5 text-sm font-medium text-neutral-500 max-[400px]:mb-0">
                      <PrinterIcon className="h-4 w-4" /> 팩스
                    </div>
                    <p className="text-lg font-bold text-neutral-900 max-[400px]:text-base max-[400px]:leading-none">051-928-0946</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <div className="relative mb-5 border-b border-neutral-200">
                  <div className="flex">
                  <button
                    type="button"
                    onClick={() => setActiveTab("parking")}
                    className={`flex flex-1 items-center justify-center gap-2 pb-3 pt-2 text-sm transition-colors ${
                      activeTab === "parking"
                        ? "!font-bold !text-neutral-900"
                        : "font-medium text-neutral-400 hover:text-neutral-600"
                    }`}
                  >
                    <CarIcon className="h-4 w-4" /> 주차 안내
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("subway")}
                    className={`flex flex-1 items-center justify-center gap-2 pb-3 pt-2 text-sm transition-colors ${
                      activeTab === "subway"
                        ? "!font-bold !text-neutral-900"
                        : "font-medium text-neutral-400 hover:text-neutral-600"
                    }`}
                  >
                    <TrainIcon className="h-4 w-4" /> 지하철
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("bus")}
                    className={`flex flex-1 items-center justify-center gap-2 pb-3 pt-2 text-sm transition-colors ${
                      activeTab === "bus"
                        ? "!font-bold !text-neutral-900"
                        : "font-medium text-neutral-400 hover:text-neutral-600"
                    }`}
                  >
                    <BusIcon className="h-4 w-4" /> 버스
                  </button>
                </div>
                  <span
                    className="pointer-events-none absolute bottom-[-1px] left-0 h-[3px] w-1/3 bg-neutral-900 transition-transform duration-300 ease-out"
                    style={{
                      transform:
                        activeTab === "parking"
                          ? "translateX(0%)"
                          : activeTab === "subway"
                            ? "translateX(100%)"
                            : "translateX(200%)",
                    }}
                  />
                </div>

                <div className="min-h-[160px] pt-5">
                  {activeTab === "parking" && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="rounded-2xl !bg-neutral-100 p-5">
                        <p className="mb-1 font-semibold text-neutral-900">건물 내 지하주차장 이용</p>
                        <p className="text-base text-neutral-600 md:text-sm">
                          백산센텀클래스원 지하주차장에 주차 후, 센터 데스크에 차량 번호를 말씀해 주시면 무료 주차 처리를 도와드립니다.
                        </p>
                      </div>
                      <div className="rounded-2xl !bg-neutral-100 p-5">
                        <p className="mb-1 font-semibold text-neutral-900">외부 주차장 이용 시</p>
                        <p className="text-base text-neutral-600 md:text-sm">
                          만차로 인해 인근 유료 주차장을 이용하신 경우, 데스크에서 할인 쿠폰 및 주차권을 안내해 드립니다.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "subway" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="rounded-2xl !bg-neutral-100 p-5">
                        <p className="mb-1 font-semibold text-neutral-900">동해선 센텀역 하차</p>
                        <p className="text-base leading-relaxed text-neutral-600 md:text-sm">
                         동해선 센텀역 2번 출구로 나와 도보 약 10분 (약 700m) 거리에 위치해 있습니다. 센텀중학교 방면으로 직진하시면 쉽게 찾으실 수 있습니다.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "bus" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="rounded-2xl !bg-neutral-100 p-5">
                        <p className="mb-1 font-semibold text-neutral-900">센텀고등학교 정류장 하차</p>
                        <p className="text-base leading-relaxed text-neutral-600 md:text-sm">
                          일반 버스: 115, 181, 307번<br />
                          마을 버스: 해운대구3-1, 해운대구3-2<br />
                          정류장에서 하차 후 도보 3분 거리입니다.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CenterSection({
  variant = "full",
  showGallery = true,
  showIntroText = true,
}: CenterSectionProps) {
  if (variant === "preview") {
    return <CenterSectionPreview />;
  }

  return <CenterSectionFull showGallery={showGallery} showIntroText={showIntroText} />;
}
