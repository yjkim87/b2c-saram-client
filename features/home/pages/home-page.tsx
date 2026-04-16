"use client"

import { Header } from "@/shared/layout/header"
import { Footer } from "@/shared/layout/footer"
import { HeroSection } from "@/features/home/sections/hero-section"
import { FeaturesSection } from "@/features/home/sections/features-section"
import { AgeGuideSection } from "@/features/home/sections/age-guide-section"
import { ReviewsSection } from "@/features/home/sections/reviews-section"
import { CenterSection } from "@/features/home/sections/center-section"

export function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <AgeGuideSection />
      <ReviewsSection />
      <CenterSection />
      <Footer />
    </main>
  )
}
