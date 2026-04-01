"use client"

import { useState } from "react"
import { Header } from "@/shared/layout/header"
import { Footer } from "@/shared/layout/footer"
import { HeroSection } from "@/features/home/sections/hero-section"
import { FeaturesSection } from "@/features/home/sections/features-section"
import { StickyTabs } from "@/features/home/sections/sticky-tabs"
import { AgeGuideSection } from "@/features/home/sections/age-guide-section"
import { ServiceProgramSection } from "@/features/home/sections/service-program-section"
import { ProcessStepsSection } from "@/features/home/sections/process-steps-section"
import { ReviewsSection } from "@/features/home/sections/reviews-section"
import { CenterSection } from "@/features/home/sections/center-section"
import { ExpertsSection } from "@/features/experts/experts-section"
import { CTASection } from "@/features/home/sections/cta-section"
import type { HomeServiceTab } from "@/features/home/model/home-tab"

export function HomePage() {
  const [tab, setTab] = useState<HomeServiceTab>("counseling")

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <section className="relative">
        <StickyTabs tab={tab} setTab={setTab} />
        <AgeGuideSection tab={tab} />
        <ServiceProgramSection tab={tab} />
        <ProcessStepsSection tab={tab} />
      </section>
      {false && <ExpertsSection variant="preview" />}
      <ReviewsSection />
      <CenterSection />
      <CTASection />
      <Footer />
    </main>
  )
}
