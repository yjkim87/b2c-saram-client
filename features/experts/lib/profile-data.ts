import {
  getExpertCardMeta,
  getExpertDetailContent,
  getExpertLongformContent,
  type ExpertProfile,
} from "@/features/experts/lib/experts"
import type { ExpertProfileData } from "./types"

export function createExpertProfileData(expert: ExpertProfile): ExpertProfileData {
  const detail = getExpertDetailContent(expert)
  const detailPage = getExpertLongformContent(expert)
  const cardMeta = getExpertCardMeta(expert.id)

  return {
    header: {
      imageUrl: cardMeta.avatar,
      certificationLabel: "ASSESTA 공식 검증",
      specialty: detail.specialtyLine,
      name: expert.name,
      tags: expert.tags.map((tag) => `#${tag}`),
    },
    quote: detailPage.quote,
    historyTitle: detailPage.historyTitle,
    historyItems: detailPage.historyItems,
    bio: {
      title: detailPage.bioTitle,
      description: detailPage.bioDescription,
    },
    philosophy: {
      title: detailPage.philosophyTitle,
      description: detailPage.philosophyDescription,
    },
  }
}
