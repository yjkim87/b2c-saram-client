export interface ExpertProfile {
  id: string
  slug: string
  name: string
  specialty: string
  shortIntro: string
  experienceSummary: string
  philosophy: string
  tags: string[]
}

export type ExpertBadge = "추천" | "인기"

export interface ExpertDetailContent {
  categoryBadge: string
  specialtyLine: string
  totalSessions: string
  philosophyHighlights: [string, string]
  philosophyDescription: string
  bioDescription: string
  education: string[]
  career: string[]
  certifications: string[]
}

export interface ExpertQuoteContent {
  lead: string
  highlight: string
  trailing: string
}

export interface ExpertLongformContent {
  quote: ExpertQuoteContent
  historyTitle: string
  historyItems: string[]
  bioTitle: string
  bioDescription: string
  philosophyTitle: string
  philosophyDescription: string
}

export interface ExpertMeta {
  imageUrl: string
  listBadge?: ExpertBadge
  landingCredentials: string
  landingThemeColor: string
  landingThemeBg: string
  landingDescription?: string
  detail: ExpertDetailContent
  detailPage?: ExpertLongformContent
}

export interface LandingExpertItem {
  id: string
  slug: string
  category: string
  emoji: string
  name: string
  credentials: string
  keywords: string[]
  description: string
  image: string
  themeColor: string
  themeBg: string
}

// TODO: 어드민 연동 전까지 사용하는 임시 정적 데이터입니다.
export const experts: ExpertProfile[] = [
  {
    id: "1",
    slug: "kim-myungjun",
    name: "김명준",
    specialty: "진로·성장 코칭",
    shortIntro: "정밀한 심리 진단과 글로벌 수준의 코칭으로 무한한 가능성을 엽니다.",
    experienceSummary:
      "한국코칭심리학회 코칭심리사 1급, TMBC 공식 파트너, MMTIC 검사리포트 개발 사업총괄",
    philosophy: "아이의 고유한 결을 읽는 정밀함과 부모를 위한 근거 있는 가이드가 핵심입니다.",
    tags: ["진로탐색", "적성발견", "부모가이드", "심리진단"],
  },
  {
    id: "2",
    slug: "kim-youngjae",
    name: "김영재",
    specialty: "AI 기반 심리성장 코칭",
    shortIntro:
      "글로벌 MBTI 파트너십과 AI 시스템이 그리는, 우리 아이를 위한 과학적이고 균일한 성장 지도.",
    experienceSummary: "MBTI 글로벌 파트너십 구축 및 심리학 기반 AI 시스템 도입·설계",
    philosophy: "가장 과학적이면서도 인간적인 품질 관리로 신뢰 가능한 성장 솔루션을 만듭니다.",
    tags: ["AI진단", "MBTI", "성장설계", "데이터코칭"],
  },
  {
    id: "3",
    slug: "choi-yoonhee",
    name: "최윤희",
    specialty: "아동·청소년 발달 코칭",
    shortIntro:
      "어린이용 성격 유형 검사 한국 표준화 전문가로서, 아이 고유의 성향에 맞춘 발달 중심의 따뜻한 성장 지도를 그립니다.",
    experienceSummary:
      "MMTIC2 한국 표준화 연구 주도, CATi 및 초·중·고 어세스타 스쿨 검사 개발",
    philosophy:
      "과학적으로 검증된 데이터를 바탕으로 양육·정서·진로·학습을 연결하는 통합 로드맵을 제시합니다.",
    tags: ["아동발달", "성격유형", "양육가이드", "학습코칭"],
  },
  {
    id: "4",
    slug: "song-miri",
    name: "송미리",
    specialty: "영유아·아동 발달 코칭",
    shortIntro: "마음이 자라는 여정을 탐구하며, 부모와 아이가 함께 행복할 수 있는 길에 동행합니다.",
    experienceSummary: "MMTIC2 한국 표준화 연구 참여, MBTI 유형 연구 공저, 발달 연구·교육·콘텐츠 개발",
    philosophy:
      "아이의 발달 단계와 타고난 성향, 행동 이면의 심리를 학술적 근거로 해석해 성장 변화를 돕습니다.",
    tags: ["영유아발달", "정서발달", "사회성", "부모상담"],
  },
  {
    id: "5",
    slug: "chae-jookyung",
    name: "채주경",
    specialty: "발달·학교 상담 코칭",
    shortIntro: "우리 아이 인지·사회성·정서 발달의 따뜻하고 단단한 뿌리를 지원합니다.",
    experienceSummary: "학교 검사 연구/강의(SPQ·KLAT·GST), 임상심리사 1급, 청소년상담사 2급",
    philosophy:
      "학교·상담 현장에서 검증된 검사 데이터를 바탕으로 부모와 아이의 지속 가능한 소통과 성장을 지원합니다.",
    tags: ["인지발달", "사회성", "정서지원", "학교상담"],
  },
  {
    id: "6",
    slug: "kim-jiyoung",
    name: "김지영",
    specialty: "진로·역량 컨설팅",
    shortIntro:
      "객관적인 데이터와 따뜻한 통찰로, 숨겨진 역량이 조직의 성과와 삶의 행복으로 연결되는 길을 안내합니다.",
    experienceSummary: "어세스타 부산센터 센터장, NCS 컨설팅·채용 컨설턴트, 10년+ 교육·상담 경력",
    philosophy:
      "객관적인 공정성, 잠재력의 발현, 통합적 성숙을 기반으로 개인과 조직의 동반 성장을 이끕니다.",
    tags: ["역량진단", "진로설계", "조직적합성", "MBTI"],
  },
  {
    id: "7",
    slug: "kim-hayoung",
    name: "김하영",
    specialty: "임상·가족관계 코칭",
    shortIntro:
      "20년 임상경험의 통찰력과 과학적인 심리 평가를 통해 아이와 부모님의 관계를 이해하고 소통방식을 제시합니다.",
    experienceSummary: "정신건강임상심리사 1급, 20년 임상경험, 아동청소년·가족관계 상담",
    philosophy:
      "가족 고유의 관계성을 존중하고 연령·특성에 맞춘 소통 방식을 제시해 부모와 자녀의 건강한 성장을 돕습니다.",
    tags: ["가족소통", "임상심리", "아동청소년", "정서지원"],
  },
]

export const landingExperts = experts.slice(0, 3)

export const EXPERT_FALLBACK_IMAGE = "/placeholder-user.jpg"

function createDefaultDetailContent(expert: ExpertProfile): ExpertDetailContent {
  return {
    categoryBadge: "🌱 성장 코칭",
    specialtyLine: `${expert.specialty} 전문`,
    totalSessions: "다년+",
    philosophyHighlights: [expert.philosophy, "근거 기반의 따뜻한 코칭을 제공합니다."],
    philosophyDescription: expert.philosophy,
    bioDescription: expert.shortIntro,
    education: ["전문 교육 과정 이수"],
    career: [expert.experienceSummary],
    certifications: ["전문가 자격 검증 완료"],
  }
}

function createDefaultDetailPageContent(
  expert: ExpertProfile,
  detail: ExpertDetailContent
): ExpertLongformContent {
  const [lead = "", highlight = ""] = detail.philosophyHighlights

  return {
    quote: {
      lead,
      highlight,
      trailing: "",
    },
    historyTitle: "경력 및 이력",
    historyItems: [...detail.education, ...detail.career, ...detail.certifications],
    bioTitle: "전문가 Bio: 걸어온 길",
    bioDescription: detail.bioDescription,
    philosophyTitle: "심리상담·성장코칭 철학",
    philosophyDescription: detail.philosophyDescription,
  }
}

const expertMetaById: Record<string, ExpertMeta> = {
  "1": {
    imageUrl: "/expert-profile-photos/Kim-mj.jpg",
    landingCredentials: "코칭심리사 1급",
    landingThemeColor: "text-blue-600",
    landingThemeBg: "bg-blue-50",
    landingDescription: "정밀 심리 진단과 근거 기반 코칭으로 자녀의 가능성을 열어드립니다.",
    detail: {
      categoryBadge: "🧭 진로·성장 코칭",
      specialtyLine: "정밀 심리 진단 기반 진로·성장 코칭",
      totalSessions: "다년+",
      philosophyHighlights: ["아이의 고유한 결을 읽는 정밀함", "부모를 위한 근거 있는 가이드"],
      philosophyDescription:
        "자녀의 기질과 강점은 정밀 진단 도구를 통해 정확하게 이해되어야 합니다. 과학적 데이터에 근거해 영아부터 고등학생까지 발달 과업을 해석하고, 부모에게 아이의 눈높이에 맞는 지속 가능한 소통·성장 가이드를 제시합니다.",
      bioDescription:
        "국내에 심리 측정과 진단 개념이 자리 잡기 시작한 초기부터 객관적인 이해 도구를 연구해 왔습니다. 해외 연구 기관 경험과 국내 주요 검사 표준화 프로젝트를 바탕으로 부모와 아이가 함께 행복한 미래를 설계할 수 있도록 돕고 있습니다.",
      education: ["University of Illinois at Urbana-Champaign PostDoc (산업 및 조직심리 전공)"],
      career: [
        "TMBC(The Myers-Briggs Company) 공식 파트너",
        "STRONG, Firo-B, CPI 검사 및 교육 개발",
        "MMTIC 기반 자녀의 발견 검사리포트 개발 사업총괄",
      ],
      certifications: [
        "한국코칭심리학회 코칭심리사 1급",
        "CPP 미국 MBTI 전문교육과정 수료",
        "『한국인 대표 표본의 MBTI 유형 분포 연구(2012-2020)』 공저(2021)",
      ],
    },
    detailPage: {
      quote: {
        lead: "정밀한 심리 진단과 글로벌 수준의 코칭으로",
        highlight: "무한한 가능성",
        trailing: "을 엽니다",
      },
      historyTitle: "경력 및 이력",
      historyItems: [
        "University of Illinois at Urbana-Champaign PostDoc(산업 및 조직심리 전공)",
        "한국코칭심리학회 코칭심리사 1급",
        "TMBC(The Myers-Briggs Company)의 공식 파트너",
        "STRONG, Firo-B, CPI 검사 및 교육 개발",
        "MMTIC 검사를 활용한 자녀의 발견 검사리포트 개발 사업총괄",
        "CPP, 미국 MBTI 전문교육과정 수료",
        "'한국인 대표 표본의 MBTI 유형 분포 연구: 2012-2020년 자료를 바탕으로' 공저 (2021)",
      ],
      bioTitle: "전문가 Bio: 걸어온 길",
      bioDescription:
        "국내에 심리 측정과 진단 개념이 자리 잡기 시작하던 초기부터, 저는 '사람의 마음을 어떻게 객관적으로 이해할 수 있을까'라는 질문을 붙들고 연구해 왔습니다. 해외 연구 기관에서의 경험과 국내 주요 심리 검사들의 표준화 작업을 수행하며 제가 집중했던 것은, 개인이 자신의 고유한 특성을 발견하도록 돕는 실질적인 지표를 만드는 일이었습니다. 이제 그 축적된 경험과 글로벌 기준의 전문성을 통해, 전 생애 주기에 걸친 자녀의 건강한 성장과 진로 설계를 고민하는 부모님들에게 가장 확실하고 객관적인 나침반이 되어 드리고자 합니다. 아이와 부모가 함께 행복한 미래를 설계하는 길, 그 정밀한 동행을 시작합니다.",
      philosophyTitle: "심리상담·성장코칭 철학",
      philosophyDescription:
        "저의 철학은 '아이의 고유한 결을 읽는 정밀함'과 '부모를 위한 근거 있는 가이드'에 기반합니다. 자녀의 기질과 강점은 글로벌 기준의 정밀 진단 도구를 통해 정확하게 진단되어야 하며, 이는 아이의 전 생애 주기에 걸친 성장의 기초가 됩니다. 저는 단순한 조언을 넘어, 과학적 데이터에 근거하여 영아부터 고등학생까지 자녀의 발달 과업을 정교하게 이해하고, 부모님들에게 아이의 눈높이에서 지속 가능한 소통과 성장을 돕는 맞춤형 가이드를 제공합니다. 복잡한 아이의 내면 지도를 세심하게 그리되, 그 길은 부모님과 함께 따뜻하고 안정적으로 동행하는 것, 그것이 제가 지향하는 심리 서비스입니다.",
    },
  },
  "2": {
    imageUrl: "/expert-profile-photos/Kim-yj.jpg",
    landingCredentials: "심리학 박사",
    landingThemeColor: "text-amber-700",
    landingThemeBg: "bg-amber-50",
    landingDescription: "글로벌 MBTI 파트너십과 AI 시스템으로 신뢰 가능한 성장 지도를 설계합니다.",
    detail: {
      categoryBadge: "🤖 AI 심리 코칭",
      specialtyLine: "심리학 기반 AI 시스템 설계 및 성장 코칭",
      totalSessions: "다년+",
      philosophyHighlights: [
        "글로벌 MBTI 파트너십과 AI 시스템이 그리는",
        "우리 아이를 위한 과학적이고 균일한 성장 지도",
      ],
      philosophyDescription:
        "어떤 전문가를 만나더라도 차별 없이 최선의 성장을 경험하도록 신뢰 기반의 시스템을 구축합니다. 고도화된 AI 기술로 정밀도를 높이면서도, 데이터가 담지 못하는 아이의 마음은 전문가 통찰로 보완해 과학성과 인간성을 함께 지켜냅니다.",
      bioDescription:
        "글로벌 심리 진단 기술 기업의 공식 파트너로 다양한 진단 도구와 교육 프로그램을 이끌어 왔습니다. 한국인 대표 표본 데이터 기반 연구를 통해 검사의 정밀도 향상에도 기여했으며, 축적된 분석 역량으로 부모의 성장 설계를 지원합니다.",
      education: [
        "University of Georgia 심리학 박사",
        "KAIST 경영과학 석사",
        "University of Illinois at Urbana-Champaign 심리학 학사",
      ],
      career: [
        "심리학 기반 AI 시스템 설계",
        "CSO(Chief Strategy Officer)",
        "MBTI 글로벌 파트너십 구축 및 AI 시스템 도입",
      ],
      certifications: [
        "글로벌 심리 진단 기술 기업 공식 파트너",
        "한국인 대표 표본 데이터 기반 연구 공저",
        "심리 지표 기반 성장 솔루션 설계",
      ],
    },
    detailPage: {
      quote: {
        lead: "글로벌 MBTI 파트너십과 AI 시스템이 그리는,",
        highlight: "우리 아이를 위한 과학적이고 균일한 성장 지도",
        trailing: "",
      },
      historyTitle: "경력 및 이력",
      historyItems: [
        "University of Georgia 심리학 박사",
        "KAIST 경영과학 석사",
        "University of Illinois at Urbana-Champaign 심리학 학사",
        "심리학 기반 AI 시스템 설계",
        "CSO(Chief Strategy Officer)",
        "MBTI 글로벌 파트너십 구축 및 AI 시스템 도입",
      ],
      bioTitle: "전문가 Bio: 걸어온 길",
      bioDescription:
        "저는 글로벌 심리 진단 기술 기업의 공식 파트너로서 다수의 진단 도구와 교육 프로그램을 이끌었으며, 특히 한국인 대표 표본을 대상으로 한 대규모 데이터 기반 연구를 공저하여 검사의 정밀도를 높이는 데 기여했습니다. 이제 그 축적된 데이터 분석 역량과 따뜻한 통찰을 통해, 부모님들이 우리 아이를 위한 최적의 성장을 디자인할 수 있도록 돕는 이정표가 되어 드리겠습니다.",
      philosophyTitle: "심리상담·성장코칭 철학",
      philosophyDescription:
        "어세스타 사발면 심리상담·성장코칭의 핵심은 어떤 전문가를 만나더라도 차별 없이 최선의 성장을 경험할 수 있는 신뢰의 기반을 다지는 데 있습니다. 고도화된 AI 기술을 서비스 전반에 유기적으로 결합하여 정밀도를 높이되, 수치와 데이터가 미처 담아내지 못하는 아이의 고유한 마음의 결은 전문가의 깊은 통찰로 세밀하게 살피는 조화로운 시스템을 지향합니다. 부모님들께서 분석 결과를 온전히 신뢰하실 수 있도록, 복잡한 심리 지표들을 아이의 삶에 적용 가능한 명확한 성장 솔루션으로 세심하게 정제하여 전달하고자 합니다. 가장 과학적이면서도 인간적인 품질 관리를 통해, 부모님과 아이가 함께 마주하는 모든 순간이 흔들림 없는 성장의 확신으로 이어지도록 든든하게 뒷받침하겠습니다.",
    },
  },
  "3": {
    imageUrl: "/expert-profile-photos/Choi-yh.jpg",
    landingCredentials: "아동·청소년 표준화 전문가",
    landingThemeColor: "text-emerald-700",
    landingThemeBg: "bg-emerald-50",
    landingDescription: "아동·청소년 성향을 과학적으로 읽어 발달 중심의 성장 지도를 제시합니다.",
    detail: {
      categoryBadge: "🧒 아동·청소년 발달",
      specialtyLine: "성격유형 표준화 및 발달 통합 코칭",
      totalSessions: "다년+",
      philosophyHighlights: [
        "아이 고유 성향에 맞춘 발달 중심의",
        "따뜻하고 과학적인 성장 지도",
      ],
      philosophyDescription:
        "직관이 아닌 검증된 스쿨 검사 데이터를 토대로 아이의 특성과 발달 맥락을 분석합니다. 양육·정서·진로·학습을 연결하는 통합 청사진을 통해 부모와 아이가 함께 성장의 방향을 명확히 볼 수 있도록 돕습니다.",
      bioDescription:
        "미국 대학원 과정에서 실험심리학 기반을 다졌고, 이후 글로벌 MBTI 전문가 과정을 거치며 진단 전문성을 확장했습니다. MMTIC2 한국 표준화와 학교 검사 개발을 통해 아이 눈높이에 맞는 과학적 도구를 만들고 현장 적용 솔루션을 제시해 왔습니다.",
      education: [
        "University of Texas at Arlington 심리학 박사",
        "Indiana State University 심리학 석사",
        "덕성여자대학교 심리학 학사",
      ],
      career: [
        "MBTI 적용교육 다수 과정 개발 및 교육",
        "MMTIC2(Murphy-Meisgeier Type Indicator for Children) 한국 표준화 연구",
        "CATi 어린이·청소년 성격유형 검사 II 개발",
        "초·중·고 어세스타 스쿨 검사(ARQ, GST) 개발",
      ],
      certifications: [
        "어린이용 성격 유형 검사 한국 표준화 전문가",
        "발달·양육·정서·진로·학습 통합 분석 전문성",
        "검사 기반 맞춤형 성장 로드맵 제공",
      ],
    },
    detailPage: {
      quote: {
        lead: "어린이용 성격 유형 검사 한국 표준화 전문가로서,",
        highlight: "아이 고유의 성향에 맞춘 발달 중심의 따뜻한 성장 지도",
        trailing: "를 그립니다",
      },
      historyTitle: "경력 및 이력",
      historyItems: [
        "University of Texas at Arlington 심리학 박사",
        "Indiana State University 심리학 석사",
        "덕성여자대학교 심리학 학사",
        "MBTI 적용교육 다수 과정 개발 및 교육",
        "MMTIC2(Murphy-Meisgeier Type Indicator for Children) 한국 표준화 연구",
        "CATi 어린이·청소년 성격유형 검사 II 개발",
        "초·중·고 학생 대상 어세스타 스쿨 검사(ARQ, GST) 개발",
      ],
      bioTitle: "전문가 Bio: 걸어온 길",
      bioDescription:
        "미국 유수 대학에서 실험심리학 박사 과정을 거치며 행동 분석의 기초를 다졌고, 이후 글로벌 MBTI 전문가 과정을 통해 심리 진단 분야의 정점에 섰습니다. 저의 가장 큰 열정은 '어린이'와 '청소년'에 있습니다. 이 열정을 바탕으로 어린이용 성격 유형 검사인 MMTIC2의 한국 표준화 연구를 주도했으며, 초·중·고 모든 학년을 아우르는 어세스타 스쿨 검사를 개발했습니다. 단순히 검사를 하는 전문가를 넘어, 우리 아이들의 눈높이에 맞춘 과학적인 진단 도구를 만들어낸 전문성을 보유하고 있습니다. 그리고 나아가 단순한 진단에 머물지 않고, 검사 결과 이면에 숨겨진 아이의 고유한 특성을 통찰하여 실제 상담과 코칭 현장에서 성장을 이끌어내는 솔루션을 제공하는 데 집중하고 있습니다.",
      philosophyTitle: "심리상담·성장코칭 철학",
      philosophyDescription:
        "제가 직접 개발한 초·중·고 모든 단계의 스쿨 검사 데이터를 활용해, 아이의 타고난 특성이 어떤 발달적 맥락에서 빛을 발할지 정밀하게 분석합니다. 특히 양육·정서·진로·학습을 연계하는 통합적 청사진을 제시하여, 부모님과 함께 아이의 무한한 가능성을 만나는 즐거움을 누리고자 합니다. 직관에 의존하는 조언이 아닌, 과학적으로 검증된 데이터를 기반으로 영아부터 고등학생까지 자녀의 발달 과업을 정교하게 이해하고, 부모님들에게 근거 있는 맞춤형 로드맵을 제공하겠습니다.",
    },
  },
  "4": {
    imageUrl: "/expert-profile-photos/Song-mr.jpg",
    landingCredentials: "연세대 심리학 석사",
    landingThemeColor: "text-violet-700",
    landingThemeBg: "bg-violet-50",
    landingDescription: "아이의 발달 흐름을 학술적으로 해석해 부모와 함께 변화의 길을 만듭니다.",
    detail: {
      categoryBadge: "🌱 영유아 발달 코칭",
      specialtyLine: "영유아·아동 초기 발달 기반 심리 코칭",
      totalSessions: "다년+",
      philosophyHighlights: [
        "마음이 자라는 여정을 탐구하며",
        "부모와 아이가 함께 행복할 수 있는 길에 동행합니다",
      ],
      philosophyDescription:
        "아이들은 공통 발달 과정을 따르면서도 각자 고유한 리듬으로 성장합니다. 발달 단계와 타고난 성향, 행동 이면의 심리를 학술적 근거로 해석해 부모가 자녀를 더 깊이 이해하고 긍정적 변화를 만들 수 있도록 돕습니다.",
      bioDescription:
        "심리학 전공 이후 영아기와 아동 초기의 인지·정서·사회성 발달을 중심으로 연구해 왔습니다. 현재는 심리 평가 전문 기관에서 글로벌 진단 도구 관련 연구, 교육, 콘텐츠 개발, 강의를 수행하며 MMTIC2 한국 표준화 연구에도 참여했습니다.",
      education: ["연세대학교 심리학 석사", "연세대학교 심리학 학사"],
      career: [
        "MMTIC2 한국 표준화 연구 참여",
        "글로벌 진단 도구 관련 연구·교육·콘텐츠 개발",
        "영아기·아동 초기 인지·정서·사회성 발달 연구",
      ],
      certifications: [
        "『한국인 대표 표본의 MBTI 유형 분포 연구(2012-2020)』 공저(2021)",
        "『MBTI 검사 결과 유형과 최적유형 비교 연구: 온라인 플랫폼을 중심으로』 공저(2023)",
        "MMTIC2 표준화 기반 아동 성향 해석 전문성",
      ],
    },
    detailPage: {
      quote: {
        lead: "마음이 자라는 여정을 탐구하며,",
        highlight: "부모와 아이가 함께 행복할 수 있는 길",
        trailing: "에 동행합니다.",
      },
      historyTitle: "경력 및 이력",
      historyItems: [
        "연세대학교 심리학 석사",
        "연세대학교 심리학 학사",
        "MMTIC2(Murphy-Meisgeier Type Indicator for Children) 한국 표준화 연구",
        "'한국인 대표 표본의 MBTI 유형 분포 연구: 2012-2020년 자료를 바탕으로' 공저(2021)",
        "'MBTI 검사 결과 유형과 최적유형 비교 연구: 온라인 플랫폼을 중심으로' 공저(2023)",
      ],
      bioTitle: "전문가 Bio: 걸어온 길",
      bioDescription:
        "심리학을 전공하며 시작된 저의 여정은 '인간은 어떻게 성장하는가'라는 근원적인 호기심에서 출발하였습니다. 전 생애 발달 중에서도 영유아기를 탐구하는 데 관심을 두고, 영아기와 아동 초기의 인지, 정서 및 사회성 발달 관련 연구를 진행하였습니다. 이후 심리 평가 전문 기관에 소속되어 글로벌 진단 도구와 관련된 연구, 교육 및 콘텐츠 개발, 강의를 담당하고 있습니다. 어린이용 성격 유형 검사인 MMTIC2의 한국 표준화 연구에 참여하여 아이들의 고유한 성향을 과학적으로 파악할 수 있는 토대를 마련하기도 하였습니다.",
      philosophyTitle: "심리상담·성장코칭 철학",
      philosophyDescription:
        "아이들은 또래와 유사한 인지, 정서 및 사회성 발달 과정을 따르면서도 자신만의 고유한 흐름으로 성장합니다. 저는 단순히 눈앞의 문제를 해결하는 것을 넘어, 아이의 발달 단계와 타고난 성향, 행동 이면의 심리를 학술적 근거를 바탕으로 정확하게 해석합니다. 자녀를 더 깊이 이해하고 양육하고자 하는 부모님의 곁에서 아이의 긍정적 변화를 함께 고민하는 조력자가 되어 드리겠습니다.",
    },
  },
  "5": {
    imageUrl: "/expert-profile-photos/Chae-jk.jpg",
    landingCredentials: "임상심리사 1급",
    landingThemeColor: "text-cyan-700",
    landingThemeBg: "bg-cyan-50",
    landingDescription: "인지·사회성·정서 발달의 핵심 뿌리를 데이터 기반으로 단단하게 지원합니다.",
    detail: {
      categoryBadge: "🏫 발달·학교 상담",
      specialtyLine: "학교 검사 데이터 기반 발달·상담 코칭",
      totalSessions: "다년+",
      philosophyHighlights: [
        "아이 고유 발달 맥락에 대한 정교한 이해",
        "학교 현장 검증 데이터를 부모 가이드로 연결",
      ],
      philosophyDescription:
        "학교 검사 개발 경험과 교사 워크숍 설계 전문성을 바탕으로 아이의 성향과 발달 상태를 과학적으로 진단합니다. 데이터를 현장에서 바로 활용할 수 있는 실질적 가이드로 전환해 부모와 아이의 지속 가능한 소통과 성장을 지원합니다.",
      bioDescription:
        "발달심리학 연구를 바탕으로 영아의 초기 도덕성 발달과 공감 반응 형성 과정을 심도 있게 탐구했습니다. 이후 검사 데이터를 교육 현장과 학급 지도에 적용하는 워크숍을 설계해 왔고, 현재는 교육·임상 경험을 결합해 부모와 함께 성장 가이드를 제공합니다.",
      education: ["연세대학교 심리학 석사", "이화여자대학교 심리학 학사"],
      career: [
        "학교 검사 연구 및 강의(SPQ, KLAT, GST)",
        "초등학교 상담실 심리상담사",
        "진로수퍼비전 설계",
      ],
      certifications: [
        "임상심리사 1급(한국산업인력공단)",
        "청소년상담사 2급(여성가족부)",
        "학교 현장 기반 검사 활용 가이드 설계",
      ],
    },
    detailPage: {
      quote: {
        lead: "우리 아이 인지·사회성·정서 발달의",
        highlight: "따뜻하고 단단한 뿌리",
        trailing: "를 지원합니다",
      },
      historyTitle: "경력 및 이력",
      historyItems: [
        "연세대학교 심리학 석사",
        "이화여자대학교 심리학 학사",
        "학교 검사 연구 및 강의(SPQ, KLAT, GST)",
        "임상심리사 1급(한국산업인력공단), 청소년상담사 2급(여성가족부)",
        "초등학교 상담실 심리상담사",
        "진로수퍼비전 설계",
      ],
      bioTitle: "전문가 Bio: 걸어온 길",
      bioDescription:
        "국내 유수 대학에서 발달심리학을 전공하며 아이의 성장에 대한 깊은 이해를 쌓았습니다. 특히 영아를 대상으로 초기 도덕성 발달에 관한 심도 있는 연구를 수행하여, 이 시기에 타인에 대한 공감적 반응과 초기 사회적 규칙의 기초가 어떻게 형성되는지 심도 있게 탐색했습니다. 이러한 연구 기반 위에 검사 데이터를 교육 현장과 학급 지도에 어떻게 실질적으로 활용할 수 있는지에 대한 교사 워크숍을 설계하며, 데이터의 실제적인 가치를 높이는 데 집중해 왔습니다. 이제는 교육 현장과 임상 경험을 넘어, 부모님들과 함께 아이의 발달적 맥락을 읽어내면서 아이의 건강한 성장을 돕는 가이드가 되어 드리겠습니다.",
      philosophyTitle: "심리상담·성장코칭 철학",
      philosophyDescription:
        "저의 철학은 아이 고유의 발달적 맥락에 대한 정교한 데이터적 이해에 기반합니다. 제가 직접 수행한 학교 검사 개발 경험과 교사 워크숍 설계 전문성을 바탕으로, 아이의 성향과 발달 상태를 과학적으로 진단하고, 교육 현장에서 검증된 실질적인 활용 가이드를 부모님들에게 제공합니다. 아이와 지속 가능한 소통과 성장을 이루도록 단단하게 지원해드리도록 하겠습니다.",
    },
  },
  "6": {
    imageUrl: "/expert-profile-photos/Kim-jy.jpg",
    landingCredentials: "어세스타 부산센터 센터장",
    landingThemeColor: "text-rose-700",
    landingThemeBg: "bg-rose-50",
    landingDescription: "객관적인 데이터와 따뜻한 통찰로 개인과 조직의 성장을 연결합니다.",
    detail: {
      categoryBadge: "🏢 역량·진로 컨설팅",
      specialtyLine: "조직·개인 역량 진단 기반 진로 컨설팅",
      totalSessions: "10년+",
      philosophyHighlights: ["객관적인 공정성", "잠재력의 발현과 통합적 성숙"],
      philosophyDescription:
        "근거 있는 데이터를 기반으로 개인의 성격과 역량을 편견 없이 바라보고, 누구나 내면의 성장 동력을 가지고 있다는 믿음으로 잠재력 발현을 돕습니다. 단순한 문제 해결을 넘어 심리적 건강과 조직 내 기능적 성장이 조화를 이루는 통합적 성숙을 지향합니다.",
      bioDescription:
        "10년 넘게 개인의 마음과 역량을 연구해 왔으며, 어세스타 부산센터를 이끌며 MBTI·NCS 기반의 진로 설계, 채용, 역량 평가까지 폭넓은 실무를 수행했습니다. 진단 결과를 실제 변화로 연결하는 성장 조력자로서 개인과 조직의 변화를 지원합니다.",
      education: ["부경대학교 교육컨설팅 석사(교육 및 역량 설계 전문성)"],
      career: [
        "어세스타 부산센터 센터장(기업·학교 심리검사 및 역량 강화 솔루션 총괄)",
        "NCS 기업 컨설팅 및 채용 컨설턴트",
        "공공기관 및 기업 간부급 역량평가(AC) 평가위원(FT) 역임",
        "부산외대·경상대 진로 및 자기이해 프로그램 책임 강사",
      ],
      certifications: [
        "MBTI / STRONG / MMTIC 전문 자격 및 해석 강연 다수",
        "인재 확보 및 조직 적합성 진단 전문성",
        "10년 이상 교육·상담 경력",
      ],
    },
    detailPage: {
      quote: {
        lead: "객관적인 데이터와 따뜻한 통찰로,",
        highlight: "숨겨진 역량이 조직의 성과와 삶의 행복",
        trailing: "으로 연결되는 길을 안내합니다.",
      },
      historyTitle: "경력 및 이력",
      historyItems: [
        "현) 어세스타 부산센터 센터장(기업·학교 심리검사 및 역량 강화 솔루션 총괄)",
        "부경대학교 교육컨설팅 석사(교육 및 역량 설계 전문성 보유)",
        "NCS 기업 컨설팅 및 채용 컨설턴트(인재 확보 및 조직 적합성 진단 전문가)",
        "MBTI / STRONG / MMTIC 등 전문 자격 및 해석 강연 다수",
        "공공기관 및 기업 간부급 공무원 역량평가(AC) 평가위원(FT) 역임",
        "부산외대, 경상대 등 주요 대학 진로 및 자기이해 프로그램 책임 강사",
        "10년 이상의 교육·상담 경력(아웃소싱 교육기획팀 등 역임)",
      ],
      bioTitle: "전문가 Bio: 걸어온 길",
      bioDescription:
        "10년 넘게 사람의 '마음'과 '역량'을 연구하며, 개인이 가진 고유한 강점이 조직 내에서 어떻게 가장 빛날 수 있을지를 고민해 왔습니다. 어세스타 부산센터를 이끌며 MBTI와 NCS 등 검증된 도구를 기반으로 대학생의 진로 설계부터 기업의 인재 채용, 간부급 역량 평가까지 폭넓은 스펙트럼의 인사이트를 쌓았습니다. 단순히 진단에 그치지 않고, 그 결과를 삶의 구체적인 변화로 이끄는 '성장 조력자'로서 수많은 내담자와 조직을 만나오고 있습니다.",
      philosophyTitle: "심리상담·성장코칭 철학",
      philosophyDescription:
        "첫째, 근거 있는 데이터를 바탕으로 개인의 고유한 성격과 역량을 편견 없이 바라보는 '객관적인 공정성'을 지향합니다.\n둘째, 모든 사람은 스스로 성장할 수 있는 동력을 내부에 가지고 있다는 믿음으로 '잠재력의 발현'을 돕습니다.\n셋째, 단순한 문제 해결을 넘어 개인의 심리적 건강과 조직 내 기능적 성장이 조화를 이루는 '통합적 성숙'을 추구합니다.",
    },
  },
  "7": {
    imageUrl: "/expert-profile-photos/Kim-hy.jpg",
    landingCredentials: "정신건강임상심리사 1급",
    landingThemeColor: "text-indigo-700",
    landingThemeBg: "bg-indigo-50",
    landingDescription: "20년 임상 통찰로 부모-자녀 관계를 읽고 건강한 소통 방식을 제시합니다.",
    detail: {
      categoryBadge: "🧠 임상·가족 상담",
      specialtyLine: "아동청소년 임상심리 및 가족관계 코칭",
      totalSessions: "20년+",
      philosophyHighlights: [
        "관계성에 대한 심리학적 이해를 바탕으로",
        "연령·특성에 맞춘 소통 방식을 제시합니다",
      ],
      philosophyDescription:
        "우리는 태어나며 관계를 시작하고, 가족마다 고유한 문화와 상호작용을 갖습니다. 이 관계성을 심리학적으로 해석해 아이의 발달 과업을 건강하게 완수하도록 돕고, 궁극적으로 부모와 자녀 모두가 행복한 가정 생활을 영위할 수 있도록 지원합니다.",
      bioDescription:
        "어린 시절부터 삶의 본질에 대한 질문을 심리학으로 탐구해 왔고, 상담심리 전공과 대학병원 임상 수련을 거치며 사람 간 영향의 메커니즘을 과학적으로 연구했습니다. 앞으로도 부모와 자녀가 상호호혜적으로 성장할 수 있는 실질적 솔루션 제공에 집중합니다.",
      education: [
        "동국대학교 대학원 박사과정(아동청소년심리상담 전공)",
        "영남대학교 심리학과 석사(상담심리학 전공)",
        "영남대학교 심리학과 학사",
        "대전대학교 대학원 석사(미술치료 전공)",
      ],
      career: [
        "근로복지공단 산재병원 재활사업부 근무",
        "법무복지공단 보호복지부 근무",
        "카톨릭대학병원 정신의학과 수련",
        "직업상담사 및 임상심리사 강의",
      ],
      certifications: [
        "정신건강임상심리사 1급(보건복지부)",
        "예술심리치료사 1급",
        "인지학습치료사 1급",
        "직업상담사 2급",
      ],
    },
    detailPage: {
      quote: {
        lead: "20년 임상경험의 통찰력과 과학적인 심리 평가를 통해",
        highlight: "아이와 부모님의 관계를 이해하고",
        trailing: " 소통방식을 제시합니다.",
      },
      historyTitle: "경력 및 이력",
      historyItems: [
        "동국대학교 대학원 박사과정 중(아동청소년심리상담 전공)",
        "영남대학교 심리학과 석사(상담심리학 전공), 영남대학교 심리학과 학사",
        "대전대학교 대학원 석사(미술치료 전공)",
        "정신건강임상심리사 1급(보건복지부), 예술심리치료사 1급, 인지학습치료사 1급, 직업상담사 2급",
        "근로복지공단 산재병원 재활사업부 근무, 법무복지공단 보호복지부 근무",
        "카톨릭대학병원 정신의학과 수련, 직업상담사 및 임상심리사 강의",
      ],
      bioTitle: "전문가 Bio: 걸어온 길",
      bioDescription:
        "저는 유년시절부터 삶에서 가장 중요한 것은 무엇인가 하는 궁금증을 품고 있었고, 그 매듭을 심리학으로 풀어왔습니다. 대학원에서 상담심리를 전공하며 사람의 관계에 나름의 해답을 찾았습니다. 이를 보다 심층적으로 이해하기 위해 대학병원에서 임상 수련을 하며, 사람과 사람이 서로에게 끼치는 영향에 대해 과학적인 방식으로 탐구하려는 노력을 기울이기도 하였습니다. 앞으로는 특히 자녀와 부모님이 서로에게 어떠한 영향을 끼치는지 탐구하며, 보다 상호호혜적인 관계와 성장을 이끌어내기 위한 솔루션을 제공하는 데 집중하겠습니다.",
      philosophyTitle: "심리상담·성장코칭 철학",
      philosophyDescription:
        "우리는 모두 태어나자 마자 관계를 시작하게 되며, 각각의 가족은 가족만의 고유한 문화와 부모와 자녀간의 관계성을 지니고 있습니다. 이러한 관계성에 대한 심리학적 이해를 바탕으로, 아이의 연령 및 특성을 고려한 소통 방식을 제시하겠습니다. 이러한 과정에서 아이들이 각 연령에 이루어야 할 발달 과업을 이루어 밝고 건강하게 성장하도록 돕고, 궁극적으로는 부모님과 자녀 모두 행복한 가정 생활을 영위하도록 조력하겠습니다.",
    },
  },
}

function validateExpertDataConsistency() {
  const expertIds = experts.map((expert) => expert.id)
  const expertSlugs = experts.map((expert) => expert.slug)
  const uniqueExpertIds = new Set(expertIds)
  const uniqueExpertSlugs = new Set(expertSlugs)
  const metaIds = Object.keys(expertMetaById)

  if (uniqueExpertIds.size !== expertIds.length) {
    throw new Error("[experts] Duplicate expert id detected in experts array.")
  }

  if (uniqueExpertSlugs.size !== expertSlugs.length) {
    throw new Error("[experts] Duplicate expert slug detected in experts array.")
  }

  for (const id of expertIds) {
    if (!expertMetaById[id]) {
      throw new Error(`[experts] Missing meta for expert id: ${id}`)
    }

    if (!expertMetaById[id].detailPage) {
      throw new Error(`[experts] Missing longform detail page content for expert id: ${id}`)
    }
  }

  for (const id of metaIds) {
    if (!uniqueExpertIds.has(id)) {
      throw new Error(`[experts] Meta exists without expert profile. id: ${id}`)
    }
  }
}

if (process.env.NODE_ENV !== "production") {
  validateExpertDataConsistency()
}

function splitCategoryBadge(categoryBadge: string) {
  const trimmed = categoryBadge.trim()
  const tokens = trimmed.split(/\s+/)
  const hasTextInFirstToken = /[0-9A-Za-z가-힣]/.test(tokens[0] ?? "")

  if (tokens.length > 1 && !hasTextInFirstToken) {
    return {
      emoji: tokens[0],
      category: tokens.slice(1).join(" "),
    }
  }

  const chars = Array.from(trimmed)
  const firstChar = chars[0]
  const restText = chars.slice(1).join("").trim()
  const firstCharIsText = /[0-9A-Za-z가-힣]/.test(firstChar ?? "")

  if (firstChar && restText && !firstCharIsText) {
    return {
      emoji: firstChar,
      category: restText,
    }
  }

  return {
    emoji: "🌱",
    category: trimmed,
  }
}

export function getExpertById(id: string) {
  return experts.find((expert) => expert.id === id)
}

export function getExpertBySlug(slug: string) {
  return experts.find((expert) => expert.slug === slug)
}

export function getExpertByIdentifier(identifier: string) {
  return getExpertById(identifier) ?? getExpertBySlug(identifier)
}

export function getExpertMetaById(id: string) {
  return expertMetaById[id]
}

export function getExpertCardMeta(id: string) {
  const meta = expertMetaById[id]

  return {
    avatar: meta?.imageUrl ?? EXPERT_FALLBACK_IMAGE,
    badge: meta?.listBadge,
  }
}

export function getExpertDetailContent(expert: ExpertProfile): ExpertDetailContent {
  const meta = expertMetaById[expert.id]
  return meta?.detail ?? createDefaultDetailContent(expert)
}

export function getExpertLongformContent(expert: ExpertProfile): ExpertLongformContent {
  const detail = getExpertDetailContent(expert)
  const meta = expertMetaById[expert.id]
  return meta?.detailPage ?? createDefaultDetailPageContent(expert, detail)
}

export function getLandingExpertItems(limit = 3): LandingExpertItem[] {
  return experts.slice(0, limit).map((expert) => {
    const meta = expertMetaById[expert.id]
    const detail = getExpertDetailContent(expert)
    const { category, emoji } = splitCategoryBadge(detail.categoryBadge)

    return {
      id: expert.id,
      slug: expert.slug,
      category,
      emoji,
      name: expert.name,
      credentials: meta?.landingCredentials ?? detail.certifications[0] ?? `${expert.specialty} 전문가`,
      keywords: expert.tags.slice(0, 3).map((tag) => `#${tag}`),
      description: meta?.landingDescription ?? detail.philosophyHighlights.join(" "),
      image: meta?.imageUrl ?? EXPERT_FALLBACK_IMAGE,
      themeColor: meta?.landingThemeColor ?? "text-slate-600",
      themeBg: meta?.landingThemeBg ?? "bg-slate-100",
    }
  })
}
