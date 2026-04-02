export type QuickTopicId =
  | "attachment"
  | "language_delay"
  | "school_adaptation"
  | "teen_communication"
  | "emotion_regulation"
  | "peer_relationship"

export type QuickTopicActionType = "follow_up" | "reservation"

export interface QuickTopicAction {
  id: string
  label: string
  type: QuickTopicActionType
  botReply?: string
}

export interface QuickTopicItem {
  id: QuickTopicId
  label: string
  icon: "baby" | "speech" | "school" | "teen" | "heart" | "users"
  userMessage: string
  botMessage: string
  tips: string[]
  actions: QuickTopicAction[]
}

const DEFAULT_RESERVATION_CTA: QuickTopicAction = {
  id: "reservation",
  label: "전문가 상담 예약",
  type: "reservation",
}

export function normalizeQuickTopicActions(actions: QuickTopicAction[] = []): QuickTopicAction[] {
  const existingReservation = actions.find((action) => action.type === "reservation")
  const filtered = actions.filter((action) => action.type !== "reservation")

  return [
    ...filtered,
    existingReservation
      ? {
          ...existingReservation,
          label: DEFAULT_RESERVATION_CTA.label,
          type: "reservation",
        }
      : DEFAULT_RESERVATION_CTA,
  ]
}

export const QUICK_TOPIC_ORDER: QuickTopicId[] = [
  "attachment",
  "language_delay",
  "school_adaptation",
  "teen_communication",
  "emotion_regulation",
  "peer_relationship",
]

const QUICK_TOPICS_RAW: Record<QuickTopicId, QuickTopicItem> = {
  attachment: {
    id: "attachment",
    label: "영아 애착 형성",
    icon: "baby",
    userMessage: "영아기 애착 형성에 대해 알고 싶어요",
    botMessage:
      "애착과 분리 불안에 대해 물어보셨군요. 💙\n애착은 아이의 정서 발달과 대인 관계 형성의 근본적인 기초입니다.\n볼비의 애착 이론에 따르면, 안정 애착이 형성된 아이들은 세상을 안전한 곳으로 인식하고 더 자신감 있게 탐색합니다.",
    tips: [
      "아이의 신호에 일관되게 반응하기",
      "충분한 신체적 접촉과 눈 맞춤",
      "예측 가능하고 안정적인 환경 제공",
    ],
    actions: [
      {
        id: "attachment-method",
        label: "안정 애착 형성 방법",
        type: "follow_up",
        botReply:
          "안정 애착은 빠른 반응보다 일관된 반응이 핵심입니다.\n하루 10분이라도 눈 맞춤 놀이와 신체 접촉 루틴을 고정해 보세요.",
      },
      {
        id: "separation-anxiety",
        label: "분리 불안 완화 전략",
        type: "follow_up",
        botReply:
          "짧은 이별-재회 연습을 반복하면서, 돌아오는 시간을 예고해 주세요.\n이별 의식(포옹+인사 문장)을 고정하면 불안이 빠르게 줄어듭니다.",
      },
      {
        id: "reservation",
        label: "전문가 상담 예약",
        type: "reservation",
      },
    ],
  },
  language_delay: {
    id: "language_delay",
    label: "언어 발달 지연",
    icon: "speech",
    userMessage: "언어 발달 지연이 걱정돼요",
    botMessage:
      "언어 발달 속도는 개인차가 있지만, 조기 개입이 매우 중요합니다.\n현재 표현 언어와 이해 언어를 함께 확인하면 정확한 방향을 잡을 수 있어요.",
    tips: [
      "지시어 이해(예: 가져와) 반응 확인",
      "짧은 문장으로 반복 입력 늘리기",
      "놀이 상황에서 상호작용 언어 확장하기",
    ],
    actions: [
      {
        id: "language-home-routine",
        label: "가정 언어 자극 루틴",
        type: "follow_up",
        botReply:
          "하루 2회, 10분씩 같은 그림책으로 반복 대화를 시도해 보세요.\n아이가 낸 소리를 부모가 확장해 말해주는 방식이 효과적입니다.",
      },
      {
        id: "language-assessment",
        label: "발달 평가 체크포인트",
        type: "follow_up",
        botReply:
          "월령 대비 이해/표현/사회적 의사소통 3가지를 함께 점검하는 것이 좋습니다.\n필요 시 표준화 검사로 정확도를 높일 수 있어요.",
      },
      {
        id: "reservation",
        label: "전문가 상담 예약",
        type: "reservation",
      },
    ],
  },
  school_adaptation: {
    id: "school_adaptation",
    label: "학교 적응 문제",
    icon: "school",
    userMessage: "학교 적응 문제로 고민 중이에요",
    botMessage:
      "학교 적응은 학업보다 관계·정서 안정이 먼저입니다.\n등교 전 불안, 수업 집중, 교우관계 패턴을 함께 보면 원인을 더 빠르게 찾을 수 있어요.",
    tips: [
      "등교 전 루틴을 단순하고 고정적으로 구성",
      "교사와 관찰 포인트를 짧게 공유",
      "성공 경험을 작은 단위로 매일 강화",
    ],
    actions: [
      {
        id: "school-routine",
        label: "등교 불안 완화 루틴",
        type: "follow_up",
        botReply:
          "아침 루틴을 체크리스트 3개로 줄이고, 등교 직전 칭찬 문장을 반복해 보세요.\n예측 가능성이 높아질수록 불안이 낮아집니다.",
      },
      {
        id: "teacher-collaboration",
        label: "교사 협업 포인트",
        type: "follow_up",
        botReply:
          "문제 상황 자체보다 발생 전 신호(표정/행동)를 교사와 공유하세요.\n예방 개입이 사후 지적보다 훨씬 효과적입니다.",
      },
      {
        id: "reservation",
        label: "전문가 상담 예약",
        type: "reservation",
      },
    ],
  },
  teen_communication: {
    id: "teen_communication",
    label: "청소년 소통 문제",
    icon: "teen",
    userMessage: "청소년 자녀와 소통이 어려워요",
    botMessage:
      "청소년기 소통은 조언보다 공감의 순서가 중요합니다.\n질문 방식과 반응 타이밍만 바꿔도 대화 지속 시간이 크게 늘어날 수 있어요.",
    tips: [
      "충고 전 감정 라벨링 먼저 하기",
      "예/아니오 질문 대신 선택형 질문 사용",
      "갈등 대화는 시간 제한 후 재개하기",
    ],
    actions: [
      {
        id: "teen-dialogue",
        label: "대화 시작 문장 가이드",
        type: "follow_up",
        botReply:
          '"왜 그랬어?" 대신 "그때 어떤 마음이었어?"처럼 감정 중심으로 시작해 보세요.\n방어 반응이 줄고 대화가 이어질 가능성이 높아집니다.',
      },
      {
        id: "teen-conflict",
        label: "갈등 상황 대응법",
        type: "follow_up",
        botReply:
          "갈등이 커질 때는 즉시 결론을 내지 말고, 20분 휴식 후 재대화 규칙을 정하세요.\n감정 진정 후 문제 해결력이 훨씬 좋아집니다.",
      },
      {
        id: "reservation",
        label: "전문가 상담 예약",
        type: "reservation",
      },
    ],
  },
  emotion_regulation: {
    id: "emotion_regulation",
    label: "정서 조절 어려움",
    icon: "heart",
    userMessage: "아이가 감정을 조절하기 어려워해요",
    botMessage:
      "정서 조절은 의지 문제가 아니라 기술 학습의 영역입니다.\n아이의 촉발 상황(트리거)과 회복 시간 패턴을 파악하면 개입 포인트가 선명해집니다.",
    tips: [
      "폭발 전 신호를 부모-아이가 함께 이름 붙이기",
      "진정 루틴(호흡, 물, 공간)을 시각화하기",
      "감정 이후 회복 대화를 짧고 구체적으로 하기",
    ],
    actions: [
      {
        id: "emotion-routine",
        label: "진정 루틴 설계",
        type: "follow_up",
        botReply:
          "감정이 올라오기 전 단계에서 사용할 3단계 진정 루틴을 미리 정해두세요.\n예: 심호흡 3회 → 물 마시기 → 조용한 코너 5분.",
      },
      {
        id: "emotion-coaching",
        label: "부모 코칭 포인트",
        type: "follow_up",
        botReply:
          "감정 행동을 지적하기 전에 감정을 먼저 인정해 주세요.\n인정-한계설정-대안제시 순서가 가장 안정적입니다.",
      },
      {
        id: "reservation",
        label: "전문가 상담 예약",
        type: "reservation",
      },
    ],
  },
  peer_relationship: {
    id: "peer_relationship",
    label: "또래 관계 문제",
    icon: "users",
    userMessage: "또래 관계 문제로 도움을 받고 싶어요",
    botMessage:
      "또래 관계 어려움은 사회적 기술과 자존감이 함께 연결되어 있습니다.\n관찰 장면을 구체화하면 어떤 기술을 먼저 훈련해야 할지 빠르게 정할 수 있어요.",
    tips: [
      "갈등 상황을 장면 단위로 기록",
      "대화 시작/유지/마무리 기술 분리 연습",
      "작은 성공 경험을 즉시 강화",
    ],
    actions: [
      {
        id: "peer-social-skill",
        label: "사회성 기술 훈련",
        type: "follow_up",
        botReply:
          "관계 시작 문장, 차례 지키기, 거절 표현처럼 기술을 쪼개서 연습해 보세요.\n역할놀이로 반복하면 실제 상황 전이가 빨라집니다.",
      },
      {
        id: "peer-parent-guide",
        label: "부모 개입 가이드",
        type: "follow_up",
        botReply:
          "문제 해결을 대신해주기보다, 상황 정리 질문으로 아이가 선택하게 도와주세요.\n자기효능감이 올라가면서 관계 회복력이 커집니다.",
      },
      {
        id: "reservation",
        label: "전문가 상담 예약",
        type: "reservation",
      },
    ],
  },
}

export const QUICK_TOPICS: Record<QuickTopicId, QuickTopicItem> = Object.fromEntries(
  Object.entries(QUICK_TOPICS_RAW).map(([topicId, topic]) => [
    topicId,
    {
      ...topic,
      actions: normalizeQuickTopicActions(topic.actions),
    },
  ]),
) as Record<QuickTopicId, QuickTopicItem>
