"use client"

import { useEffect, useRef, useState } from "react"
import { Baby, Backpack, GraduationCap, Sparkles, Users, Check } from "lucide-react"
import { Card, CardContent } from "@/shared/ui/card"

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="py-20 md:py-28 bg-secondary/30"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Card 1: Point 01 */}
          <Card 
            className={`bg-card border-border shadow-sm transition-all duration-700 ease-out ${
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            }`}
          >
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-primary">
                  Point 01: 생애 주기별 데이터 기반
                </h3>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                아이의 발달 단계는 각기 다른 언어를 필요로 합니다. 
                유아부터 성인까지, 사발면은 검증된 데이터를 통해 
                연속성 있는 성장을 지원합니다.
              </p>

              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Baby className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">영유아:</span>
                    <span className="text-muted-foreground ml-1">기질 분석 및 맞춤형 양육 솔루션</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Backpack className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">초등학생:</span>
                    <span className="text-muted-foreground ml-1">자기 이해와 학습 동기 부여</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <GraduationCap className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">중고등학생:</span>
                    <span className="text-muted-foreground ml-1">강점 기반 진로 및 커리어 설계</span>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Card 2: Point 02 */}
          <Card 
            className={`bg-card border-border shadow-sm transition-all duration-700 ease-out delay-150 ${
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            }`}
          >
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-primary">
                  Point 02: 세상에 단 하나뿐인 맞춤형 통합 솔루션
                </h3>
              </div>

              <ul className="flex flex-col gap-5">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground block mb-1">인간만의 통찰적 시각</span>
                    <span className="text-muted-foreground leading-relaxed">
                      AI가 흉내 낼 수 없는 깊은 교감으로 피코치와 소통하며 성장의 해답을 찾습니다.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground block mb-1">개인 맞춤형 최적화 솔루션</span>
                    <span className="text-muted-foreground leading-relaxed">
                      기질, 성적, 환경 등 복합적인 변수를 통합하여 니즈에 부합하는 솔루션을 제공합니다.
                    </span>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
