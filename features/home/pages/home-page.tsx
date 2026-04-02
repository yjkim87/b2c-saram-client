"use client"

import { Header } from "@/shared/layout/header"
import { Footer } from "@/shared/layout/footer"
import { HeroSection } from "@/features/home/sections/hero-section"
import { FeaturesSection } from "@/features/home/sections/features-section"
import { AgeGuideSection } from "@/features/home/sections/age-guide-section"
import { ServiceProgramSection } from "@/features/home/sections/service-program-section"
import { ProcessStepsSection } from "@/features/home/sections/process-steps-section"
import { ReviewsSection } from "@/features/home/sections/reviews-section"
import { CenterSection } from "@/features/home/sections/center-section"
import { ExpertsSection } from "@/features/experts/experts-section"
import { CTASection } from "@/features/home/sections/cta-section"
import type { HomeServiceTab } from "@/features/home/model/home-tab"

export function HomePage() {
  const tab: HomeServiceTab = "counseling"

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <section className="relative">
        <AgeGuideSection tab={tab} />
        <ServiceProgramSection tab={tab} />
        <ProcessStepsSection tab={tab} />
      </section>
      {false && <ExpertsSection variant="preview" />}
      <CenterSection />
      <ReviewsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
