import { getExpertCardMeta, getExpertDetailContent, type ExpertProfile } from "@/features/experts/lib/experts"
import type { ExpertProfileData } from "./types"

export function createExpertProfileData(expert: ExpertProfile): ExpertProfileData {
  const detail = getExpertDetailContent(expert)
  const cardMeta = getExpertCardMeta(expert.id)

  return {
    header: {
      imageUrl: cardMeta.avatar,
      categoryBadge: detail.categoryBadge,
      certificationLabel: "Assesta 공식 검증",
      specialty: detail.specialtyLine,
      name: expert.name,
      tags: expert.tags.map((tag) => `#${tag}`),
      totalSessionsLabel: "현장 경험",
      totalSessionsValue: detail.totalSessions,
    },
    philosophy: {
      title: "성장 코칭 철학",
      highlights: detail.philosophyHighlights,
      description: detail.philosophyDescription,
    },
    bio: {
      title: "전문가 소개",
      description: detail.bioDescription,
    },
    infoCards: [
      {
        id: "education",
        icon: "🎓",
        title: "학력",
        items: detail.education,
      },
      {
        id: "career",
        icon: "💼",
        title: "주요 경력",
        items: detail.career,
      },
      {
        id: "certifications",
        icon: "🏅",
        title: "자격 및 인증",
        items: detail.certifications,
        tone: "emerald",
        useCheckIcon: true,
      },
    ],
  }
}
