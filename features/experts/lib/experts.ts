export interface ExpertProfile {
  id: string
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

export interface ExpertMeta {
  imageUrl: string
  listBadge?: ExpertBadge
  landingCredentials: string
  landingThemeColor: string
  landingThemeBg: string
  landingDescription?: string
  detail: ExpertDetailContent
}

export interface LandingExpertItem {
  id: string
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

export const experts: ExpertProfile[] = [
  {
    id: "1",
    name: "김지윤 코치",
    specialty: "진로 코칭",
    shortIntro: "학생의 진로 방향 탐색과 실행 가능한 성장 계획 수립을 돕습니다.",
    experienceSummary: "청소년 진로 코칭 14년, 누적 3,000회 이상 세션 진행.",
    philosophy:
      "아이의 숨겨진 가능성을 함께 발견하는 여정, 그것이 진정한 진로 교육입니다.",
    tags: ["진로탐색", "적성발견", "미래설계", "잠재력개발"],
  },
  {
    id: "2",
    name: "이수민 코치",
    specialty: "학습 코칭",
    shortIntro: "학생의 진로 방향 탐색과 실행 가능한 성장 계획 수립을 돕습니다.",
    experienceSummary: "학습 코칭 12년, 누적 2,890회 이상 세션 진행.",
    philosophy:
      "공부는 강요가 아닌 내면의 동기에서 시작됩니다. 그 불씨를 찾아드립니다.",
    tags: ["자기주도학습", "학습동기", "메타인지", "공부습관"],
  },
  {
    id: "3",
    name: "박준호 코치",
    specialty: "부모 양육 코칭",
    shortIntro: "학생의 진로 방향 탐색과 실행 가능한 성장 계획 수립을 돕습니다.",
    experienceSummary: "부모 양육 코칭 10년, 누적 4,120회 이상 세션 진행.",
    philosophy:
      "완벽한 부모는 없습니다. 하지만 성장하는 부모는 있습니다.",
    tags: ["부모코칭", "양육스트레스", "기질이해", "가족소통"],
  },
  {
    id: "4",
    name: "정다은 코치",
    specialty: "입시 전략",
    shortIntro: "학생 목표와 성향에 맞춘 현실적인 입시 전략을 설계합니다.",
    experienceSummary: "입시 컨설팅 9년, 학생부 면접 지원 전략 코칭 집중.",
    philosophy: "입시는 정보의 양보다 맞는 전략을 선택하는 과정입니다.",
    tags: ["입시로드맵", "학생부", "면접코칭"],
  },
  {
    id: "5",
    name: "최서연 코치",
    specialty: "정서 동기 코칭",
    shortIntro: "불안 번아웃 학습 동기 저하와 같은 정서 이슈를 함께 다룹니다.",
    experienceSummary: "청소년 정서 코칭 8년, 학교 센터 연계 프로그램 운영.",
    philosophy:
      "정서 안정이 확보되어야 꾸준한 실행과 장기 성장이 가능합니다.",
    tags: ["정서안정", "회복탄력성", "마인드셋"],
  },
  {
    id: "6",
    name: "오민재 코치",
    specialty: "커리어 설계",
    shortIntro: "청소년 대학생의 전공 선택 강점 직무 방향을 연결해 설계합니다.",
    experienceSummary: "전공 탐색 및 커리어 전환 코칭 7년.",
    philosophy:
      "흥미와 강점을 실제 선택지로 매핑할 때 커리어 경로가 선명해집니다.",
    tags: ["전공선택", "직무탐색", "커리어코칭"],
  },
  {
    id: "7",
    name: "한유진 코치",
    specialty: "학부모 상담",
    shortIntro: "가정 내 교육 의사결정을 체계적으로 할 수 있도록 지원합니다.",
    experienceSummary: "학부모 중심 교육 컨설팅 및 코칭 12년.",
    philosophy:
      "부모의 방향성이 명확할수록 아이의 불안은 줄고 집중은 높아집니다.",
    tags: ["양육코칭", "의사결정", "가정교육"],
  },
  {
    id: "8",
    name: "윤태호 코치",
    specialty: "멘탈 퍼포먼스",
    shortIntro: "중요 시기 집중력과 실행력을 높이기 위한 코칭을 제공합니다.",
    experienceSummary: "퍼포먼스 코칭 6년, 목표 실행 트래킹 프로그램 운영.",
    philosophy:
      "성과는 순간적인 동기보다 반복 가능한 습관에서 만들어집니다.",
    tags: ["집중력", "실행관리", "성과관리"],
  },
]

export const landingExperts = experts.slice(0, 3)

export const EXPERT_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600"

function createDefaultDetailContent(expert: ExpertProfile): ExpertDetailContent {
  return {
    categoryBadge: "🌱 코칭 전문",
    specialtyLine: `${expert.specialty} 전문`,
    totalSessions: "2,800+",
    philosophyHighlights: [expert.philosophy, "작은 실행이 큰 변화를 만듭니다."],
    philosophyDescription: expert.philosophy,
    bioDescription: expert.shortIntro,
    education: ["교육학 관련 석사", "상담심리 심화과정 수료", "코칭 전문과정 이수"],
    career: [expert.experienceSummary, "학교/기관 연계 프로그램 운영", "1:1 맞춤 코칭 진행"],
    certifications: ["Assesta 공인 코칭 인증", "상담 관련 전문 자격", "코칭 전문 과정 수료"],
  }
}

const expertMetaById: Record<string, ExpertMeta> = {
  "1": {
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200",
    listBadge: "추천",
    landingCredentials: "청소년 진로상담 1급",
    landingThemeColor: "text-blue-600",
    landingThemeBg: "bg-blue-50",
    detail: {
      categoryBadge: "🧭 진로 코칭",
      specialtyLine: "진로 탐색 설계 전문",
      totalSessions: "3,240+",
      philosophyHighlights: [
        "아이의 숨겨진 가능성을 함께 발견하는 여정,",
        "그것이 진정한 진로 교육입니다.",
      ],
      philosophyDescription:
        "진로 교육의 핵심은 '발견'입니다. 아이들은 이미 자신 안에 답을 가지고 있습니다. 저는 그 답을 찾아가는 과정에서 안전한 탐색 환경을 제공하고, 다양한 가능성의 문을 열어주는 길잡이가 되고자 합니다. 성적이나 외부의 기대가 아닌, 아이 내면의 불꽃을 발견하는 것. 그것이 평생을 관통하는 진정한 진로 교육입니다.",
      bioDescription:
        "15년간 1,200명 이상의 청소년 진로 코칭을 수행하며, 각 아이의 고유한 강점과 관심사를 기반으로 맞춤형 진로 로드맵을 설계해왔습니다. '정답'을 알려주는 것이 아니라, 아이 스스로 자신의 길을 찾아갈 수 있도록 돕는 것이 저의 역할입니다.",
      education: ["서울대학교 교육학 박사", "연세대학교 심리학 석사", "이화여자대학교 상담심리학 학사"],
      career: ["現 사발면 수석 진로 코치", "前 서울시 교육청 진로진학 자문위원", "前 한국진로교육학회 이사", "EBS 진로 멘토링 프로그램 자문"],
      certifications: ["Assesta 공인 모델 인증 코치", "국가공인 청소년상담사 1급", "한국코치협회 KPC 인증", "MBTI 국제공인강사"],
    },
  },
  "2": {
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=1200",
    listBadge: "추천",
    landingCredentials: "학습코칭 전문가 1급",
    landingThemeColor: "text-amber-600",
    landingThemeBg: "bg-amber-50",
    detail: {
      categoryBadge: "💡 학습 코칭",
      specialtyLine: "자기주도 학습 시스템 설계 전문",
      totalSessions: "2,890+",
      philosophyHighlights: [
        "공부는 강요가 아닌 내면의 동기에서 시작됩니다.",
        "그 불씨를 찾아드립니다.",
      ],
      philosophyDescription:
        "학습의 출발점은 '나는 할 수 있다'는 믿음입니다. 많은 아이들이 실패 경험으로 인해 학습 무기력에 빠져있습니다. 저는 작은 성공 경험을 쌓아가며 아이 스스로 자신의 학습 방식을 설계할 수 있도록 돕습니다. 메타인지를 깨우고, 자기 주도적으로 목표를 세우고 실행하는 힘. 이것이 평생 학습자로 성장하는 기반입니다.",
      bioDescription:
        "12년간 다양한 학습 유형의 아이들을 만나며, '왜 공부해야 하는지' 모르는 아이들이 스스로 책상 앞에 앉게 되는 변화를 이끌어왔습니다. 단순한 학습 기술이 아닌, 배움 자체에 대한 호기심과 자신감을 심어주는 것이 저의 목표입니다.",
      education: ["고려대학교 교육심리학 박사수료", "서강대학교 인지과학 석사", "중앙대학교 심리학 학사"],
      career: ["現 사발면 학습코칭 팀장", "前 강남 메가스터디 학습 컨설턴트", "前 한국학습코칭학회 연구위원", "SBS 교육 다큐멘터리 자문"],
      certifications: ["Assesta 공인 모델 인증 코치", "학습컨설턴트 전문가 1급", "NLP 마스터 프랙티셔너", "한국코치협회 PCC 인증"],
    },
  },
  "3": {
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200",
    listBadge: "추천",
    landingCredentials: "가족상담전문가 1급",
    landingThemeColor: "text-emerald-600",
    landingThemeBg: "bg-emerald-50",
    detail: {
      categoryBadge: "🌱 부모 양육 코칭",
      specialtyLine: "부모 양육 코칭 전문",
      totalSessions: "4,120+",
      philosophyHighlights: ["완벽한 부모는 없습니다.", "하지만 성장하는 부모는 있습니다."],
      philosophyDescription:
        "양육에는 정답이 없지만, 방향은 있습니다. 그 방향은 '아이의 기질을 이해하는 것'에서 시작됩니다. 부모와 아이의 기질적 차이를 인식하고, 그 차이를 갈등이 아닌 이해로 바꿀 때 진정한 소통이 시작됩니다. 저는 부모님들이 자녀의 고유한 특성을 발견하고, 그에 맞는 양육 방식을 찾아갈 수 있도록 돕는 동반자입니다.",
      bioDescription:
        "10년간 2,000가정 이상의 부모-자녀 관계 개선을 도우며, 양육의 어려움 속에서 지쳐있는 부모님들이 다시 자신감을 되찾는 과정을 함께해왔습니다. 부모도 완벽할 필요가 없습니다. 아이와 함께 성장하는 것, 그것이 가장 아름다운 양육입니다.",
      education: ["성균관대학교 아동가족학 박사", "숙명여자대학교 가족상담학 석사", "한양대학교 심리학 학사"],
      career: ["現 사발면 부모코칭 총괄", "前 삼성생명 가족상담센터 책임연구원", "前 서울시 건강가정지원센터 자문위원", "MBC 육아 프로그램 전문가 패널"],
      certifications: ["Assesta 공인 모델 인증 코치", "가족상담전문가 1급", "부모교육 전문강사", "한국상담학회 전문상담사"],
    },
  },
  "4": {
    imageUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=1200",
    landingCredentials: "진학지도사 1급",
    landingThemeColor: "text-violet-600",
    landingThemeBg: "bg-violet-50",
    detail: {
      categoryBadge: "🎯 입시 전략",
      specialtyLine: "학생부/면접 기반 입시 전략 전문",
      totalSessions: "3,540+",
      philosophyHighlights: ["입시는 정보전이 아니라", "전략 설계의 과정입니다."],
      philosophyDescription:
        "학생의 목표와 성향, 현재 성취 수준을 함께 분석해 가장 현실적인 입시 경로를 만듭니다. 계획은 단순할수록 실행력이 높아집니다.",
      bioDescription:
        "입시 컨설팅 9년 동안 학생별 강점에 맞춘 로드맵을 제시해 왔습니다. 학생부, 면접, 일정 관리를 한 흐름으로 통합해 불확실성을 줄이고 합격 가능성을 높입니다.",
      education: ["교육행정학 석사", "진학지도 전문가 과정", "면접 코칭 실무 과정"],
      career: ["입시 로드맵 컨설팅 2,100회+", "학생부/면접 집중 프로그램 운영", "고3 집중 코칭 캠프 총괄"],
      certifications: ["Assesta 공인 모델 인증 코치", "진학지도사 1급", "면접지도 전문강사"],
    },
  },
  "5": {
    imageUrl:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200",
    landingCredentials: "청소년 상담사",
    landingThemeColor: "text-rose-600",
    landingThemeBg: "bg-rose-50",
    detail: {
      categoryBadge: "🫶 정서 코칭",
      specialtyLine: "불안/번아웃 회복 코칭 전문",
      totalSessions: "2,980+",
      philosophyHighlights: ["정서가 안정되어야", "실행이 지속됩니다."],
      philosophyDescription:
        "학습과 진로 문제의 근저에는 정서적 소진이 있는 경우가 많습니다. 감정 조절과 회복 루틴을 통해 다시 행동할 힘을 만들도록 돕습니다.",
      bioDescription:
        "청소년 정서 코칭 8년 동안 불안, 무기력, 번아웃 이슈를 다뤘습니다. 내담자의 리듬에 맞춘 회복 계획과 작은 성공 경험 설계를 통해 자기효능감을 회복하도록 지원합니다.",
      education: ["상담심리학 석사", "정서조절 코칭 과정", "청소년 정신건강 지원 과정"],
      career: ["정서 회복 코칭 1,900회+", "학교 연계 회복탄력성 프로그램 운영", "학부모 정서지원 워크숍 진행"],
      certifications: ["Assesta 공인 모델 인증 코치", "청소년 상담사 자격", "회복탄력성 코칭 전문가"],
    },
  },
  "6": {
    imageUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1200",
    landingCredentials: "커리어코치 1급",
    landingThemeColor: "text-sky-600",
    landingThemeBg: "bg-sky-50",
    detail: {
      categoryBadge: "🚀 커리어 설계",
      specialtyLine: "전공-직무 연결형 커리어 코칭 전문",
      totalSessions: "2,640+",
      philosophyHighlights: ["흥미와 강점이 연결될 때", "커리어는 선명해집니다."],
      philosophyDescription:
        "전공 선택과 직무 탐색은 분리된 문제가 아닙니다. 개인의 강점과 시장 정보를 함께 분석해 실행 가능한 커리어 경로를 제시합니다.",
      bioDescription:
        "전공 탐색 및 커리어 전환 코칭 7년 동안 청소년과 대학생을 대상으로 현실적인 경로 설계를 지원했습니다. 탐색, 검증, 실행의 3단계 구조로 의사결정을 돕습니다.",
      education: ["경영학 석사", "커리어코칭 전문 과정", "직무분석 실무 과정"],
      career: ["전공/직무 코칭 1,600회+", "대학생 커리어 설계 캠프 운영", "직무 탐색 워크숍 기획"],
      certifications: ["Assesta 공인 모델 인증 코치", "커리어코치 1급", "직무역량 진단 전문가"],
    },
  },
  "7": {
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=1200",
    landingCredentials: "부모교육 전문강사",
    landingThemeColor: "text-cyan-700",
    landingThemeBg: "bg-cyan-50",
    detail: {
      categoryBadge: "👨‍👩‍👧 학부모 상담",
      specialtyLine: "가정 내 교육 의사결정 코칭 전문",
      totalSessions: "4,430+",
      philosophyHighlights: ["부모의 기준이 선명해지면", "아이의 불안은 줄어듭니다."],
      philosophyDescription:
        "가정의 교육 결정은 정보보다 기준이 먼저입니다. 각 가정의 우선순위를 정리해 일관된 방향으로 의사결정하도록 지원합니다.",
      bioDescription:
        "학부모 중심 코칭 12년 동안 가정별 환경과 아이의 성향을 함께 분석해 맞춤형 교육 결정을 돕고 있습니다. 불안 기반 의사결정을 줄이고 실행 가능한 합의점을 만드는 데 강점이 있습니다.",
      education: ["가족상담학 석사", "부모교육 전문 과정", "가정코칭 리더십 과정"],
      career: ["학부모 상담 2,900회+", "가정교육 컨설팅 프로그램 운영", "부모 소통 워크숍 다수 진행"],
      certifications: ["Assesta 공인 모델 인증 코치", "가족상담사 1급", "부모교육 전문강사"],
    },
  },
  "8": {
    imageUrl:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=80&w=1200",
    landingCredentials: "멘탈코칭 지도사",
    landingThemeColor: "text-indigo-600",
    landingThemeBg: "bg-indigo-50",
    detail: {
      categoryBadge: "🔥 멘탈 퍼포먼스",
      specialtyLine: "집중력/실행력 퍼포먼스 코칭 전문",
      totalSessions: "2,350+",
      philosophyHighlights: ["성과는 순간의 동기가 아닌", "반복 가능한 루틴에서 나옵니다."],
      philosophyDescription:
        "중요한 시기일수록 감정 관리와 실행 관리가 함께 필요합니다. 목표를 작게 쪼개고 일상 루틴에 연결해 꾸준한 퍼포먼스를 만듭니다.",
      bioDescription:
        "퍼포먼스 코칭 6년 동안 시험기/프로젝트기 집중력 관리 프로그램을 운영했습니다. 실행 추적과 피드백 사이클로 목표 달성 확률을 높이는 데 집중합니다.",
      education: ["스포츠심리학 석사", "성과코칭 전문가 과정", "집중력 트레이닝 과정"],
      career: ["퍼포먼스 코칭 1,400회+", "목표 실행 트래킹 프로그램 운영", "집중력 향상 워크숍 진행"],
      certifications: ["Assesta 공인 모델 인증 코치", "멘탈코칭 지도사", "퍼포먼스 코칭 전문가"],
    },
  },
}

function validateExpertDataConsistency() {
  const expertIds = experts.map((expert) => expert.id)
  const uniqueExpertIds = new Set(expertIds)
  const metaIds = Object.keys(expertMetaById)

  if (uniqueExpertIds.size !== expertIds.length) {
    throw new Error("[experts] Duplicate expert id detected in experts array.")
  }

  for (const id of expertIds) {
    if (!expertMetaById[id]) {
      throw new Error(`[experts] Missing meta for expert id: ${id}`)
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

export function getLandingExpertItems(limit = 3): LandingExpertItem[] {
  return experts.slice(0, limit).map((expert) => {
    const meta = expertMetaById[expert.id]
    const detail = getExpertDetailContent(expert)
    const { category, emoji } = splitCategoryBadge(detail.categoryBadge)

    return {
      id: expert.id,
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
