import { Header } from "@/shared/layout/header"
import { Footer } from "@/shared/layout/footer"
import { HeroSection } from "@/features/home/sections/hero-section"
import { FeaturesSection } from "@/features/home/sections/features-section"
import { BrandSection } from "@/features/brand/brand-section"
import { SolutionSection } from "@/features/solution/solution-section"
import { ExpertsSection } from "@/features/experts/experts-section"
import { CenterSection } from "@/features/center/center-section"
import { CTASection } from "@/features/home/sections/cta-section"

export function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <BrandSection variant="preview" />
      <SolutionSection variant="preview" />
      <ExpertsSection variant="preview" />
      <CenterSection variant="preview" />
      <CTASection />
      <Footer />
    </main>
  )
}
