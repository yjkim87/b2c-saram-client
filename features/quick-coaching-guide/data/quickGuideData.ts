export type StepQuestion = {
  label: string
  description: string
}

export type StepOption = {
  label: string
  description?: string
  nextStep?: string
}

export type StepGroup = {
  id: string
  botMessage: string
  checkpoint?: string[]
  questions?: StepQuestion[]
  options?: StepOption[]
  cta?: boolean
}

export type GuideData = StepGroup[]

type GradeInfoItem = {
  tip: string
  concerns: string[]
}

type ConcernTipItem = {
  title: string
  content: string
  hasFollowUpQuestion?: boolean
  followUpQuestion?: string
  followUpOptions?: string[]
  followUpResponses?: Record<string, string>
}

type HelpType = {
  label: string
  description: string
}

export type QuickGuideGradeLevelKey = "elementary-lower" | "elementary-upper" | "middle" | "high"

type GradeLevel = {
  key: QuickGuideGradeLevelKey
  label: string
  grades: string[]
}

export const QUICK_GUIDE_PAGE_CONTENT = {
  title: "퀵코칭가이드",
  description: "현재 자녀의 학년과 고민 맥락을 바탕으로 코칭 가이드를 채팅 흐름으로 확인해보세요.",
  introMessage:
    "안녕하세요! 사발면에 오신 걸 환영해요.\n학년별 맥락과 고민별 코칭 팁을 채팅 흐름으로 준비했어요. 필요한 주제부터 차근히 살펴보세요.",
} as const

export const QUICK_GUIDE_GRADE_INFO: Record<string, GradeInfoItem> = {
  "1학년": {
    tip: `1학년은 '유치원생'에서 '학생'으로 정체성이 바뀌는 첫 해예요.

이 시기 아이들은 학교라는 새로운 규칙과 단체 생활에 적응하면서 알게 모르게 큰 긴장감을 느껴요.

집에서 유독 예민하거나 짜증이 늘었다면 반항이 아니라 적응 중이라는 신호일 수 있어요.

이 시기 부모님이 해줄 수 있는 가장 큰 것은 학교에서 있었던 일을 편안하게 털어놓을 수 있는 공간을 만들어주는 거예요.`,
    concerns: [
      "도와주면 의존하고, 혼자 하라니 더 느려지고",
      "매일 같이 있는데 우리 아이가 뭘 좋아하는지 모르겠어요",
      "학원은 다 보내는데, 이게 맞는 건지 모르겠어요",
      "정확히 뭔지 모르겠지만 걱정이 돼요"
    ]
  },
  "2학년": {
    tip: `2학년은 평생의 학습 태도가 자리잡기 시작하는 시기예요.

이 시기 아이들은 처음으로 '나는 잘하는 편인가, 못하는 편인가'를 스스로 판단하기 시작해요.

또래와 비교하면서 자신감이 생기기도 하고 열등감이 싹트기도 하는 때예요.

"나는 해낼 수 있어"라는 믿음이 이 시기에 만들어지면 이후 학습 태도가 완전히 달라져요.`,
    concerns: [
      "도와주면 의존하고, 혼자 하라니 더 느려지고",
      "매일 같이 있는데 우리 아이가 뭘 좋아하는지 모르겠어요",
      "학원은 다 보내는데, 이게 맞는 건지 모르겠어요",
      "정확히 뭔지 모르겠지만 걱정이 돼요"
    ]
  },
  "3학년": {
    tip: `3학년은 사회, 과학 등 새로운 교과목이 갑자기 늘어나는 시기예요.

많은 아이들이 이 시기에 처음으로 '공부가 어렵다'는 걸 느껴요.

학습 격차가 본격적으로 시작되는 것도 바로 이 시기예요.

이때 중요한 건 학원을 더 보내는 게 아니라 '어떻게 공부해야 하는지'를 아이 스스로 알아가도록 돕는 거예요.

공부 방법을 모르는 건지, 의지가 없는 건지, 아니면 다른 이유가 있는 건지 전문가와 함께 들여다볼 수 있어요.`,
    concerns: [
      "도와주면 의존하고, 혼자 하라니 더 느려지고",
      "매일 같이 있는데 우리 아이가 뭘 좋아하는지 모르겠어요",
      "학원은 다 보내는데, 이게 맞는 건지 모르겠어요",
      "정확히 뭔지 모르겠지만 걱정이 돼요"
    ]
  },
  "4학년": {
    tip: `4학년은 처음으로 자신의 강점과 약점을 스스로 의식하기 시작하는 시기예요.

또래와 비교하면서 "나는 이걸 잘하는 편인가, 못하는 편인가"를 판단하기 시작해요.

이 시기에 아이가 스스로를 어떻게 보는지, 무엇에 자신감이 있고 없는지를 파악해두는 게 중요한 이유예요.

그 자기 이해가 쌓여야 진로 방향도, 학습 방법도 아이에게 맞게 설계할 수 있어요.`,
    concerns: [
      "좋아하는 건 알겠는데, 그게 직업이 될 수 있는 건지 모르겠어요",
      "아이가 뭔가 좋아하는 건 있는데, 공부랑 어떻게 연결해야 할지 모르겠어요",
      "어떻게 반응해줬어야 했는데 그냥 넘긴 게 있는 것 같아요",
      "정확히 뭔지 모르겠지만 걱정이 돼요"
    ]
  },
  "5학년": {
    tip: `5학년은 실존하는 직업인을 처음으로 동경하기 시작하는 시기예요.

사춘기의 전조가 시작되면서 부모보다 또래의 영향력이 커지고 비판적으로 생각하는 힘도 생기기 시작해요.

아직 입시 압박이 본격화되기 전, 흥미를 탐색할 수 있는 마지막 여유가 있는 시기이기도 해요.

지금 아이가 무엇에 눈이 반짝이는지를 놓치지 않는 게 중요한 때예요.`,
    concerns: [
      "좋아하는 건 알겠는데, 그게 직업이 될 수 있는 건지 모르겠어요",
      "아이가 뭔가 좋아하는 건 있는데, 공부랑 어떻게 연결해야 할지 모르겠어요",
      "어떻게 반응해줬어야 했는데 그냥 넘긴 게 있는 것 같아요",
      "정확히 뭔지 모르겠지만 걱정이 돼요"
    ]
  },
  "6학년": {
    tip: `6학년은 초등학교 마지막 해이자 중학교를 앞두고 처음으로 자신만의 가치관이 형성되기 시작하는 시기예요.

"나는 어떤 사람이 되고 싶은가"를 진지하게 고민하기 시작해요.

중학교 진학을 앞두고 진로의 방향을 처음으로 잡아보기 좋은 때예요.

지금 아이와 나누는 대화가 이후 진로 탐색의 토대가 됩니다.`,
    concerns: [
      "좋아하는 건 알겠는데, 그게 직업이 될 수 있는 건지 모르겠어요",
      "아이가 뭔가 좋아하는 건 있는데, 공부랑 어떻게 연결해야 할지 모르겠어요",
      "어떻게 반응해줬어야 했는데 그냥 넘긴 게 있는 것 같아요",
      "정확히 뭔지 모르겠지만 걱정이 돼요"
    ]
  },
  "중1": {
    tip: `중1은 초등학교와 완전히 다른 환경에 처음 적응하는 시기예요.

에릭슨은 이 시기를 "나는 누구인가, 어떤 삶을 선택할 것인가"를 탐색하기 시작하는 단계라고 했어요.

자유학기제로 시험 부담이 없는 대신 다양한 직업군을 간접 체험하며 자신이 무엇에 끌리는지를 알아가기 좋은 시기이기도 해요.

집에서 말이 없어졌다면 반항이 아니라 자신을 탐색 중이라는 신호일 수 있어요.`,
    concerns: [
      "제가 도와주려 하면 간섭이래요. 그렇다고 놔두면 아무것도 안 해요",
      "목표는 생겼는데 어떻게 준비해야 하는지 정보가 없어요",
      "열심히 하는 것 같은데 성적이 안 올라요. 방법이 문제인지 의지가 문제인지",
      "정확히 뭔지 모르겠지만 걱정이 돼요"
    ]
  },
  "중2": {
    tip: `중2는 사춘기가 절정에 달하며 독립적 성향이 가장 강해지는 시기예요.

동시에 처음으로 내신 시험을 경험하며 학업에 대한 압박도 커지기 시작해요.

부모의 말이 잘 통하지 않는 시기지만 아이 안에서는 좋아하는 일과 잘하는 일의 일치점을 찾으려는 탐색이 시작되고 있어요.

이 시기 부모의 역할은 지시보다 공감적 경청이에요.`,
    concerns: [
      "제가 도와주려 하면 간섭이래요. 그렇다고 놔두면 아무것도 안 해요",
      "목표는 생겼는데 어떻게 준비해야 하는지 정보가 없어요",
      "열심히 하는 것 같은데 성적이 안 올라요. 방법이 문제인지 의지가 문제인지",
      "정확히 뭔지 모르겠지만 걱정이 돼요"
    ]
  },
  "중3": {
    tip: `중3은 자아 정체성을 확립해가며 고등학교 진학이라는 첫 번째 큰 선택을 앞두고 있는 시기예요.

어떤 고등학교가 맞는지, 지금 준비가 충분한 건지 정보가 부족한 채로 결정해야 하는 경우가 많아요.

아이의 진로 방향과 성향에 맞는 선택을 함께 찾아드릴 수 있어요.`,
    concerns: [
      "제가 도와주려 하면 간섭이래요. 그렇다고 놔두면 아무것도 안 해요",
      "목표는 생겼는데 어떻게 준비해야 하는지 정보가 없어요",
      "열심히 하는 것 같은데 성적이 안 올라요. 방법이 문제인지 의지가 문제인지",
      "정확히 뭔지 모르겠지만 걱정이 돼요"
    ]
  },
  "고1": {
    tip: `고1은 중학교와 차원이 다른 학업량에 처음 부딪히는 시기예요.

고교학점제에 따라 이미 계열과 과목 선택을 해야 하고 첫 내신 성적이 나오는 순간 아이도 부모도 현실을 마주하게 돼요.

이 시기 방향 설정이 이후 고등학교 3년을 좌우할 수 있어요.`,
    concerns: [
      "지금이라도 늦지 않은 건지, 이미 늦은 건지 모르겠어요",
      "제 방식으로 도와주려 하면 아이가 답답해해요",
      "방향은 정한 것 같은데, 그게 정말 맞는 건지 충분히 고민한 건지 모르겠어요",
      "정확히 뭔지 모르겠지만 걱정이 돼요"
    ]
  },
  "고2": {
    tip: `고2는 전공 심화 탐색과 함께 포트폴리오를 본격적으로 쌓아야 하는 시기예요.

동시에 노력한 만큼 성적이 나오지 않아서 슬럼프에 빠지기 쉬운 고비이기도 해요.

장기전인 입시에서 지치지 않고 방향을 유지하는 것이 이 시기의 핵심이에요.`,
    concerns: [
      "지금이라도 늦지 않은 건지, 이미 늦은 건지 모르겠어요",
      "제 방식으로 도와주려 하면 아이가 답답해해요",
      "방향은 정한 것 같은데, 그게 정말 맞는 건지 충분히 고민한 건지 모르겠어요",
      "정확히 뭔지 모르겠지만 걱정이 돼요"
    ]
  },
  "고3": {
    tip: `고3은 수시와 정시 사이에서 최종 의사결정을 내려야 하는 시기예요.

모의고사 성적 하나에도 크게 흔들리고 극도의 압박감을 경험하는 때예요.

이 시기 아이에게 부모가 줄 수 있는 가장 큰 것은 결과와 상관없이 아이를 믿는다는 신뢰의 표현이에요.`,
    concerns: [
      "지금이라도 늦지 않은 건지, 이미 늦은 건지 모르겠어요",
      "제 방식으로 도와주려 하면 아이가 답답해해요",
      "방향은 정한 것 같은데, 그게 정말 맞는 건지 충분히 고민한 건지 모르겠어요",
      "정확히 뭔지 모르겠지만 걱정이 돼요"
    ]
  }
}

export const QUICK_GUIDE_CONCERN_TIPS_BY_GRADE: Record<string, Record<string, ConcernTipItem>> = {
  "1학년": {
    "도와주면 의존하고, 혼자 하라니 더 느려지고": {
      title: "이건 의지의 문제가 아니에요",
      content: `1학년 아이들은 학교에서 40분씩 앉아 있는 것만으로도 이미 엄청난 에너지를 쓰고 있어요.

집에 오면 늘어지고 숙제를 미루는 건 당연한 반응일 수 있어요.

이 시기엔 혼자 하게 두는 것보다 어떻게 시작하는지를 함께 보여주는 것이 훨씬 효과적이에요.

덜 도와주는 게 아니라 다르게 도와주는 방법이 있어요.`
    },
    "매일 같이 있는데 우리 아이가 뭘 좋아하는지 모르겠어요": {
      title: "오래 봤다고 잘 보이는 건 아니에요",
      content: `1학년 아이들은 집에서 보이는 모습과 밖에서 보이는 모습이 전혀 다른 경우가 많아요.

이 시기 아이들은 아직 자신이 좋아하는 것을 말로 꺼내는 게 서툴러요.

코칭에서는 일상과 다른 질문을 해요. "오늘 학교 어땠어?"가 아니라 "오늘 시간이 제일 빨리 간 순간이 언제야?"처럼요.

그 질문 앞에서 아이들은 달라져요. 부모님도 몰랐던 이야기가 나오기 시작해요.`
    },
    "학원은 다 보내는데, 이게 맞는 건지 모르겠어요": {
      title: "1학년 시기엔 무엇을 배우느냐보다 어떻게 배우느냐가 더 중요해요",
      content: `앉아있는 힘을 기르는 경험, 해냈다는 성취감을 쌓는 경험.

학원의 종류보다 지금 아이가 배우는 환경에서 즐거움을 느끼고 있는지가 먼저예요.

지금 구성이 우리 아이 기질에 맞는 건지 같이 들여다볼 수 있어요.`
    },
    "정확히 뭔지 모르겠지만 걱정이 돼요": {
      title: "그 막막함, 당연한 거예요",
      content: `아이가 학교에 들어가는 순간 부모의 역할도 처음부터 다시 시작이에요.

뭘 도와줘야 하는지, 어디까지 개입해야 하는지, 이게 맞는 건지.

정확히 뭐가 걱정인지 모르는 채로 그냥 불안한 상태, 많은 부모님이 똑같아요.

그 막막함에서 시작해도 괜찮아요. 같이 찾아드릴 수 있어요.`
    }
  },
  "2학년": {
    "도와주면 의존하고, 혼자 하라니 더 느려지고": {
      title: "아이 대신 해주는 것과 발판을 만들어주는 것은 완전히 달라요",
      content: `"이거 맞아?" 하고 물어올 때 "맞아"가 아니라 "어떻게 생각해서 이렇게 했어?"로 받아주는 것.

이 질문 하나가 아이의 생각을 움직이게 만들어요.

도와주는 방식을 바꾸는 것, 어디서부터 시작해야 할지 같이 찾아드릴 수 있어요.`
    },
    "매일 같이 있는데 우리 아이가 뭘 좋아하는지 모르겠어요": {
      title: "아이는 알고 있어요. 다만 꺼낼 타이밍을 모를 뿐이에요",
      content: `2학년 아이들은 좋아하는 것이 생겨도 선뜻 말하지 않는 경우가 있어요.

"그게 직업이 돼?" 같은 말을 들을까 봐, 혹은 스스로도 확신이 없어서요.

매일 같이 있어도 몰랐던 이야기가 45분의 대화 안에서 나오는 경우가 많아요.

부모님이 그 자리에서 함께 들었을 때 집에서의 대화도 달라져요.`
    },
    "학원은 다 보내는데, 이게 맞는 건지 모르겠어요": {
      title: "2학년은 공부에 대한 태도가 굳어지기 시작하는 시기예요",
      content: `지금 다니는 학원에서 아이가 성취감을 느끼고 있는지 아니면 그냥 다니고 있는 건지를 먼저 확인하는 게 중요해요.

억지로 시키는 학습은 이 시기에 공부에 대한 거부감을 만들 수 있어요.

학원 구성보다 아이의 반응을 먼저 읽어야 할 때예요.`
    },
    "정확히 뭔지 모르겠지만 걱정이 돼요": {
      title: "뭔가 놓치고 있는 것 같은 느낌, 혼자만의 감각이 아니에요",
      content: `매일 함께 있는데 정작 아이에 대해 모르는 것 같고, 잘 하고 있는 건지도 모르겠고.

그 감각 자체가 아이를 더 잘 이해하고 싶다는 마음에서 오는 거예요.

어디서부터 시작해야 할지 같이 찾아드릴 수 있어요.`
    }
  },
  "3학년": {
    "도와주면 의존하고, 혼자 하라니 더 느려지고": {
      title: "3학년부터는 도와주는 방식이 그대로 통하지 않기 시작해요",
      content: `과목이 늘고 내용이 어려워지면서 부모가 도와주는 방식이 그대로 통하지 않기 시작해요.

이때 계속 같은 방식으로 도와주면 아이는 점점 더 의존하게 되고 스스로 생각하는 힘을 잃어가요.

이 시기에 자기주도학습의 첫 단추를 어떻게 끼워야 하는지 전문가와 함께 설계해드릴 수 있어요.`
    },
    "매일 같이 있는데 우리 아이가 뭘 좋아하는지 모르겠어요": {
      title: "이 시기부터 아이는 자신을 스스로 의식하기 시작해요",
      content: `좋아하는 것과 잘하는 것이 다르다는 걸 느끼기도 하고 비교 속에서 자신감을 잃기도 해요.

지금 아이가 무엇에 눈이 반짝이는지 어떤 것을 할 때 에너지가 생기는지를 이 시기에 함께 찾아두면

이후 진로 탐색의 속도가 완전히 달라져요.`
    },
    "학원은 다 보내는데, 이게 맞는 건지 모르겠어요": {
      title: "3학년부터는 학원을 늘리기 전에 학습 방법을 먼저 점검하는 게 필요해요",
      content: `학원을 추가해도 아이가 어떻게 공부해야 하는지를 모르면 효과가 제한적이에요.

우리 아이가 어떤 방식으로 배울 때 가장 잘 흡수하는지 전문가와 함께 찾아드릴 수 있어요.`
    },
    "정확히 뭔지 모르겠지만 걱정이 돼요": {
      title: "뭔지 모르겠지만 걱정이 된다면 그 감각을 믿으세요",
      content: `딱히 큰 문제가 있는 건 아닌데 왠지 모르게 신경이 쓰이는 것, 그냥 지나치기엔 찜찜한 것.

부모의 그 감각이 대부분은 맞아요.

어떤 부분이 걸리는지 같이 들여다볼 수 있어요.`
    }
  },
  "4학년": {
    "좋아하는 건 알겠는데, 그게 직업이 될 수 있는 건지 모르겠어요": {
      title: "부모가 모르는 게 당연해요",
      content: `아이가 그림 그리기를 좋아한다고 해서 그게 스토리보드 작가나 UI 디자이너와 연결될 수 있다는 걸 바로 알기는 어렵거든요.

직업 세계는 부모님이 자라던 시절보다 훨씬 넓어졌어요.

아이의 흥미와 직업 세계를 연결하는 언어를 먼저 드릴 수 있어요.`
    },
    "아이가 뭔가 좋아하는 건 있는데, 공부랑 어떻게 연결해야 할지 모르겠어요": {
      title: "4학년부터 메타인지가 서서히 발달하기 시작하는 시기예요",
      content: `아이가 좋아하는 것과 잘하는 것이 연결될 때 학습 동기가 완전히 달라져요.

억지로 앉혀서 공부시키는 것보다 아이가 관심 있는 분야와 학습을 연결하는 방법이 있어요.

그 접점을 찾아드릴 수 있어요.`
    },
    "어떻게 반응해줬어야 했는데 그냥 넘긴 게 있는 것 같아요": {
      title: "놓쳤다고 느끼는 그 순간들, 아직 늦지 않았어요",
      content: `4학년은 흥미가 막 구체화되기 시작하는 시기예요. 아직 학습 압박이 오기 전, 다양한 가능성을 열어두고 탐색할 수 있는 여유가 있어요.

지금 아이의 이야기에 다르게 반응하기 시작하면 돼요.

어떻게 하면 되는지 같이 찾아드릴게요.`
    },
    "정확히 뭔지 모르겠지만 걱정이 돼요": {
      title: "뭔지 모르겠지만 신경 쓰인다면 그 감각이 맞아요",
      content: `4학년은 겉으로는 잘 다니는 것 같아도 아이 안에서 중요한 변화가 시작되는 시기예요.

처음으로 자신의 강점과 약점을 의식하고 또래와 비교하면서 자존감이 흔들리기도 하거든요.

어떤 부분이 걸리는지 같이 들여다볼 수 있어요.`
    }
  },
  "5학년": {
    "좋아하는 건 알겠는데, 그게 직업이 될 수 있는 건지 모르겠어요": {
      title: "아이는 이미 알고 있어요. 다만 그게 직업이 될 수 있다는 걸 몰랐을 뿐이에요",
      content: `5학년 아이들은 좋아하는 것이 생겼을 때도 "그게 직업이 돼?" 같은 말을 들을까 봐 선뜻 말하지 않는 경우가 있어요.

아이의 일상 안에 이미 답이 있어요.

그 답을 직업 세계와 연결하는 언어를 먼저 드릴 수 있어요.`
    },
    "아이가 뭔가 좋아하는 건 있는데, 공부랑 어떻게 연결해야 할지 모르겠어요": {
      title: "반응의 차이가 아이의 탐색을 결정해요",
      content: `"그거 해서 뭐 할 건데?" 대신 "그거 어떤 점이 재밌어?"로 묻는 것.

그 질문 하나가 아이가 흥미를 계속 키울지 접을지를 결정하는 경우가 많아요.

흥미와 학습을 어떻게 연결할지 같이 찾아드릴 수 있어요.`
    },
    "어떻게 반응해줬어야 했는데 그냥 넘긴 게 있는 것 같아요": {
      title: "놓쳤다고 느끼는 그 순간, 지금 다시 시작하면 돼요",
      content: `5학년은 흥미가 구체화되는 결정적인 시기예요.

이 시기에 부모가 "우리 아이의 흥미가 세상과 어떻게 연결되는가"를 이해하는 것, 그것이 가장 큰 선물이에요.

어떻게 다시 시작할지 같이 찾아드릴 수 있어요.`
    },
    "정확히 뭔지 모르겠지만 걱정이 돼요": {
      title: "그 막막함, 5학년 부모님이라면 자연스러운 거예요",
      content: `아이가 점점 부모보다 친구의 말을 더 듣기 시작하고, 뭔가를 물어봐도 "몰라"로 끝나고.

그러면서도 진로는 생각해줘야 할 것 같고.

딱 이 시기예요. 방향을 잡아두면 이후가 완전히 달라지는 때예요.

어디서 시작할지 같이 찾아드릴게요.`
    }
  },
  "6학년": {
    "좋아하는 건 알겠는데, 그게 직업이 될 수 있는 건지 모르겠어요": {
      title: "6학년은 가치관 중심으로 진로를 탐색하기 시작하는 시기예요",
      content: `단순히 "뭘 좋아하냐"를 넘어 "어떤 삶을 살고 싶냐"와 연결되기 시작하는 때예요.

아이가 좋아하는 것이 어떤 직업 세계와 연결되는지, 어떤 가치관과 맞닿아 있는지 같이 찾아드릴 수 있어요.`
    },
    "아이가 뭔가 좋아하는 건 있는데, 공부랑 어떻게 연결해야 할지 모르겠어요": {
      title: "중학교 가기 전 지금이 가장 좋은 시작 타이밍이에요",
      content: `6학년은 중등 선행과 과목별 몰입 학습이 필요한 시기예요.

그런데 아이가 왜 공부해야 하는지를 스스로 납득하지 못하면 중학교 올라가서 더 힘들어져요.

흥미와 학습을 연결하는 방법, 지금 만들어두면 달라요.`
    },
    "어떻게 반응해줬어야 했는데 그냥 넘긴 게 있는 것 같아요": {
      title: "아직 늦지 않았어요. 중학교 가기 전 지금이 오히려 기회예요",
      content: `6학년 때 잡아둔 방향이 중학교 3년을 훨씬 편하게 만들어요.

아이가 어떤 것에 눈이 반짝이는지, 어떤 방향으로 가고 싶은지를 중학교 가기 전에 한번 들여다보는 것.

같이 시작해드릴 수 있어요.`
    },
    "정확히 뭔지 모르겠지만 걱정이 돼요": {
      title: "중학교를 앞두고 막연하게 불안한 거, 당연한 거예요",
      content: `6학년은 초등학교와 중학교 사이 어딘가에 있는 것 같은 시기예요.

아직 어린 것 같은데 진로를 생각해줘야 할 것 같고, 중학교 가면 달라질 것 같은데 어떻게 준비해야 할지 모르겠고.

그 막막함에서 시작해도 괜찮아요. 같이 찾아드릴 수 있어요.`
    }
  },
  "중1": {
    "제가 도와주려 하면 간섭이래요. 그렇다고 놔두면 아무것도 안 해요": {
      title: "중1 아이가 부모의 도움을 간섭으로 느끼기 시작하는 건 자연스러운 발달 과정이에요",
      content: `이 시기 아이들은 부모로부터 심리적으로 분리되려는 욕구가 생기거든요.

멀어지는 게 아니라 독립하는 과정이에요.

개입과 간섭의 차이, 이 시기에 맞는 연결 방법을 같이 찾아드릴 수 있어요.`
    },
    "목표는 생겼는데 어떻게 준비해야 하는지 정보가 없어요": {
      title: "목표가 생긴 것만으로도 충분히 좋은 시작이에요",
      content: `중1은 자유학기제로 다양한 직업군을 탐색하기 좋은 시기예요.

막연한 목표를 구체적인 방향으로 좁혀가는 과정, 어디서 어떻게 정보를 모아야 하는지 같이 찾아드릴 수 있어요.`
    },
    "열심히 하는 것 같은데 성적이 안 올라요. 방법이 문제인지 의지가 문제인지": {
      title: "중학교 올라오면서 공부량이 갑자기 늘어나는 시기예요",
      content: `초등학교 방식 그대로는 통하지 않는 경우가 많아요.

과목별로 다른 공부법이 필요하고 자기주도학습 루틴을 새로 만들어야 하는 때예요.

방법의 문제인지, 다른 이유가 있는지 같이 들여다볼 수 있어요.`
    },
    "정확히 뭔지 모르겠지만 걱정이 돼요": {
      title: "중학교에 올라오면서 뭔가 달라진 것 같은데 뭐가 문제인지 모르는 채로 그냥 불안한 상태, 많은 부모님이 똑같아요",
      content: `초등학교 때랑은 다른 환경에 아이도, 부모도 함께 적응하는 시기예요.

어떤 부분이 걸리는지 같이 들여다볼 수 있어요.`
    }
  },
  "중2": {
    "제가 도와주려 하면 간섭이래요. 그렇다고 놔두면 아무것도 안 해요": {
      title: "중2 시기에 부모의 개입이 간섭으로 느껴지는 건 사춘기 절정의 자연스러운 반응이에요",
      content: `그렇다고 완전히 놔두는 것도 이 시기 아이에겐 맞지 않아요.

비판보다 공감, 아이의 사생활과 독립성을 인정하면서도 연결을 유지하는 방법이 있어요.

그 균형을 찾아드릴 수 있어요.`
    },
    "목표는 생겼는데 어떻게 준비해야 하는지 정보가 없어요": {
      title: "중2는 좋아하는 일과 잘하는 일의 일치점을 찾기 좋은 시기예요",
      content: `막연한 목표를 구체화하고 그 방향에 맞는 준비를 지금부터 시작할 수 있어요.

어떤 정보가 필요한지, 어디서부터 시작해야 하는지 같이 찾아드릴 수 있어요.`
    },
    "열심히 하는 것 같은데 성적이 안 올라요. 방법이 문제인지 의지가 문제인지": {
      title: "첫 내신을 경험하는 시기예요. 열심히 하는데 성적이 안 오른다면 대부분은 방법의 문제예요",
      content: `아는 것과 모르는 것을 구분하는 힘, 취약한 과목을 어떻게 보완할지, 시험에 맞는 학습 전략을 다시 설계해야 할 때예요.

어디서 막혀 있는지 같이 들여다볼 수 있어요.`
    },
    "정확히 뭔지 모르겠지만 걱정이 돼요": {
      title: "중2 부모라면 그 막막함이 당연해요",
      content: `말도 잘 안 하고 방문은 닫혀 있고 성적은 신경 쓰이고.

딱히 큰 문제가 있는 건 아닌데 왠지 모르게 찜찜한 그 느낌, 부모의 감각이 맞는 경우가 많아요.

어떤 부분이 걸리는지 같이 들여다볼 수 있어요.`
    }
  },
  "중3": {
    "제가 도와주려 하면 간섭이래요. 그렇다고 놔두면 아무것도 안 해요": {
      title: "중3 아이에게 필요한 건 결정을 대신해주는 부모가 아니라 선택의 근거를 함께 찾아주는 부모예요",
      content: `"어느 고등학교 가"가 아니라 "어떤 환경에서 네가 더 잘 할 것 같아?"로 접근하는 것.

아이의 결정을 존중하면서도 연결을 유지하는 방법이 있어요.`
    },
    "목표는 생겼는데 어떻게 준비해야 하는지 정보가 없어요": {
      title: "중3은 고등학교 유형 선택부터 시작하는 시기예요",
      content: `일반고, 특목고, 자사고 중 아이의 진로 방향에 맞는 선택이 무엇인지를 먼저 알아야 해요.

그 다음 고교 과정과 연계되는 기초 학력을 지금 완성해두는 것.

어디서부터 준비해야 할지 같이 찾아드릴 수 있어요.`
    },
    "열심히 하는 것 같은데 성적이 안 올라요. 방법이 문제인지 의지가 문제인지": {
      title: "고등학교 가기 전 지금이 학습 방법을 다시 점검할 마지막 기회예요",
      content: `중학교 성적이 고등학교 첫 내신과 직결되는 경우가 많아요.

어떻게 공부해야 하는지를 모르는 건지, 다른 이유가 있는 건지 지금 찾아두는 게 중요해요.

같이 들여다볼 수 있어요.`
    },
    "정확히 뭔지 모르겠지만 걱정이 돼요": {
      title: "고등학교 진학을 앞두고 막연하게 불안한 거, 당연해요",
      content: `아직 아이인 것 같은데 고등학교, 진로, 입시를 생각해야 하는 시기가 왔고.

어디서부터 준비해야 할지 모르는 채로 시간이 가는 느낌.

그 막막함에서 시작해도 괜찮아요. 같이 찾아드릴 수 있어요.`
    }
  },
  "고1": {
    "지금이라도 늦지 않은 건지, 이미 늦은 건지 모르겠어요": {
      title: "고1은 아직 충분히 빨라요",
      content: `내신과 수능 기초의 균형을 잡고 자신만의 학습 방법을 만들어가는 것, 지금 시작해도 3년이 남아 있어요.

방향을 못 잡은 채로 시간을 보내는 것보다 지금 한번 점검하는 게 훨씬 나아요.

어디서부터 시작할지 같이 찾아드릴 수 있어요.`
    },
    "제 방식으로 도와주려 하면 아이가 답답해해요": {
      title: "부모와 아이의 성향이 다를수록 도움이 오히려 부담이 되는 경우가 많아요",
      content: `고1 아이에게 필요한 건 결정을 대신해주는 부모가 아니라 객관적인 데이터를 바탕으로 현실적인 방향을 함께 찾아주는 부모예요.

이 시기에 맞는 개입 방식을 같이 찾아드릴 수 있어요.`
    },
    "방향은 정한 것 같은데, 그게 정말 맞는 건지 충분히 고민한 건지 모르겠어요": {
      title: "많은 아이들이 충분히 고민하지 않은 채 방향을 정하는 경우가 많아요",
      content: `학원 선생님이 추천해서, 친구가 간다고 해서, 막연히 안정적일 것 같아서.

그 방향이 아이의 성향과 정말 맞는 건지 지금 점검해두는 것, 고1 때가 가장 좋은 타이밍이에요.

같이 들여다볼 수 있어요.`
    },
    "정확히 뭔지 모르겠지만 걱정이 돼요": {
      title: "고등학교에 올라오면서 뭔가 달라진 것 같은데 어디서부터 봐야 할지 모르는 채로 시간이 가는 느낌",
      content: `그 막막함, 고1 부모님이라면 자연스러운 거예요.

학업도, 진로도, 관계도 동시에 신경 써야 하는 시기니까요.

어떤 부분이 걸리는지 같이 들여다볼 수 있어요.`
    }
  },
  "고2": {
    "지금이라도 늦지 않은 건지, 이미 늦은 건지 모르겠어요": {
      title: "고2는 아직 늦지 않았어요",
      content: `수시든 정시든 지금부터 전략을 다듬으면 달라질 수 있는 시간이에요.

다만 지금 바로 시작해야 해요. 방향을 점검하고 남은 시간을 어떻게 써야 할지 같이 찾아드릴 수 있어요.`
    },
    "제 방식으로 도와주려 하면 아이가 답답해해요": {
      title: "고2 아이에게 부모의 개입이 답답하게 느껴지는 건 아이가 이미 자신만의 방식으로 문제를 해결하려 하기 때문이에요",
      content: `이 시기 부모의 역할은 지시하는 사람이 아니라 긴 마라톤을 곁에서 함께 뛰어주는 페이스메이커예요.

그 역할 전환이 어떻게 가능한지 같이 찾아드릴 수 있어요.`
    },
    "방향은 정한 것 같은데, 그게 정말 맞는 건지 충분히 고민한 건지 모르겠어요": {
      title: "고2는 관심 분야의 심화 탐구 보고서와 포트폴리오를 관리해야 하는 시기예요",
      content: `방향이 맞지 않으면 쌓아가는 것들이 다 흔들려요.

지금 한번 점검하는 것이 오히려 시간을 아끼는 방법이에요.

같이 들여다볼 수 있어요.`
    },
    "정확히 뭔지 모르겠지만 걱정이 돼요": {
      title: "고2는 부모도 아이도 가장 지치기 쉬운 시기예요",
      content: `1학년 때의 긴장감은 지났는데 3학년의 결전은 아직이고.

그 사이에서 뭔가 놓치고 있는 것 같은 막연한 불안감.

그 감각을 믿으세요. 지금 점검하기 딱 좋은 타이밍이에요.

같이 들여다볼 수 있어요.`
    }
  },
  "고3": {
    "지금이라도 늦지 않은 건지, 이미 늦은 건지 모르겠어요": {
      title: "고3이라고 해서 늦은 게 아니에요",
      content: `지금이라도 방향을 다시 점검하고 남은 시간을 어떻게 쓸지 전략을 세우는 게 중요해요.

기출 분석, 시간 제한 내 풀이 훈련, 수능 최저 관리까지 지금 할 수 있는 것들이 있어요.

같이 찾아드릴 수 있어요.`
    },
    "제 방식으로 도와주려 하면 아이가 답답해해요": {
      title: "고3 아이에게 부모의 조언이 오히려 부담이 되는 건 아이가 지금 극도로 예민한 상태이기 때문이에요",
      content: `이 시기 부모는 채점하는 사람이 아니라 세상이 아이를 거절하는 것 같은 순간에도 무조건 아이 편이 되어주는 사람이어야 해요.

어떻게 그 역할을 할 수 있는지 같이 찾아드릴 수 있어요.`
    },
    "방향은 정한 것 같은데, 그게 정말 맞는 건지 충분히 고민한 건지 모르겠어요": {
      title: "고3에서 방향을 다시 보는 건 결코 늦은 게 아니에요",
      content: `수시와 정시 중 어느 쪽이 유리한지, 지원 전략이 현실적으로 맞는 건지 지금 점검하는 것이 남은 시간을 가장 잘 쓰는 방법이에요.

같이 들여다볼 수 있어요.`
    },
    "정확히 뭔지 모르겠지만 걱정이 돼요": {
      title: "수능을 앞두고 막연하게 불안한 거, 당연해요",
      content: `아이가 힘들어 보이는데 뭘 해줄 수 있을지 모르겠고, 그렇다고 아무것도 안 하기엔 불안하고.

고3 부모라면 누구나 그 감각을 느껴요.

어떤 부분이 걸리는지 같이 들여다볼 수 있어요.`
    }
  }
}

export const QUICK_GUIDE_DEFAULT_CONCERN_TIPS: Record<string, string> = {
  "도와주면 의존하고, 혼자 하라니 더 느려지고": `이건 의지의 문제가 아니에요.

아이들은 학교에서 이미 엄청난 에너지를 쓰고 있어요.

집에 오면 늘어지고 숙제를 미루는 건 당연한 반응일 수 있어요.

혼자 하게 두는 것보다 어떻게 시작하는지를 함께 보여주는 것이 훨씬 효과적이에요.

덜 도와주는 게 아니라 다르게 도와주는 방법이 있어요.`,
  "매일 같이 있는데 우리 아이가 뭘 좋아하는지 모르겠어요": `오래 봤다고 잘 보이는 건 아니에요.

부모의 시선에는 늘 해석이 따라붙어요. "우리 애는 산만해", "우리 애는 수줍음이 많아"

그 해석이 아이를 있는 그대로 보는 것을 방해하기도 해요.

아이는 질문받는 방식이 달라지면 다르게 말해요.`,
  "학원은 다 보내는데, 이게 맞는 건지 모르겠어요": `학원을 보내는 것과 아이에게 맞는 환경을 만드는 것은 달라요.

지금 아이가 어떤 것에 눈이 반짝이는지, 어떤 방식으로 세상을 바라보는지를 알아야 아이에게 맞는 방향을 찾을 수 있어요.`,
  "정확히 뭔지 모르겠지만 걱정이 돼요": `막연한 걱정도 자연스러운 감정이에요.

정확히 뭐가 문제인지 몰라도 괜찮아요. 함께 이야기를 나누다 보면 걱정의 실체가 보이기 시작해요.`
}

export const QUICK_GUIDE_HELP_TYPES: HelpType[] = [
    {
      label: "아이와 함께 오고 싶어요",
      description: "아이가 어떤 사람인지, 무엇에 눈이 반짝이는지 부모님과 함께 들여다보는 시간이에요. 매일 함께 있어도 몰랐던 이야기가 나올 수 있어요."
    },
    {
      label: "부모인 제가 먼저 오고 싶어요",
      description: "도와주는 방식을 어떻게 바꿔야 할지, 아이의 발달 단계에 맞는 개입 방법을 먼저 알고 싶은 분께 맞아요."
    },
    {
      label: "아직 잘 모르겠어요, 상담 후 결정하고 싶어요",
      description: ""
    }
  ]

export const QUICK_GUIDE_FINAL_CHECKLIST = [
  "발달심리학 기반의 전문 코치가 함께해요",
  "아이의 연령과 발달 단계에 맞게 설계돼요",
  "아이 탐색 → 검사 해석 → 종합 코칭으로 구성돼요",
] as const

const QUICK_GUIDE_GRADE_LEVELS: GradeLevel[] = [
  { key: "elementary-lower", label: "초등 저학년", grades: ["1학년", "2학년", "3학년"] },
  { key: "elementary-upper", label: "초등 고학년", grades: ["4학년", "5학년", "6학년"] },
  { key: "middle", label: "중등", grades: ["중1", "중2", "중3"] },
  { key: "high", label: "고등", grades: ["고1", "고2", "고3"] },
]

const QUICK_GUIDE_ROOT_CONCERNS = (() => {
  const primary = QUICK_GUIDE_GRADE_INFO["1학년"]?.concerns ?? []
  if (primary.length > 0) {
    return primary
  }

  const firstGrade = Object.values(QUICK_GUIDE_GRADE_INFO)[0]
  return firstGrade?.concerns ?? []
})()

const QUICK_GUIDE_INTRO_HEAD_MESSAGE =
  "안녕하세요! 사발면에 오신 걸 환영해요.\n사발면은 '사람의 발견을 원하면'의 줄임말이에요.\n아이를 매일 보면서도 몰랐던 면을 발견하는 순간, 나 자신을 오래 살아왔지만 미처 몰랐던 나를 만나는 순간, 그 발견의 순간을 함께하고 싶다는 마음을 담았어요."

export const QUICK_GUIDE_INITIAL_STEP_ID = "step-grade-level-root"

function encodeStepValue(value: string): string {
  return encodeURIComponent(value)
}

function makeGradeDetailStepId(levelKey: GradeLevel["key"]): string {
  return `step-grade-detail:${levelKey}`
}

export function getQuickGuideGradeDetailStepId(levelKey: QuickGuideGradeLevelKey): string {
  return makeGradeDetailStepId(levelKey)
}

function makeConcernStepId(grade: string): string {
  return `step-concern:${encodeStepValue(grade)}`
}

function makeConcernTipStepId(grade: string, concernSlotIndex: number): string {
  return `step-concern-tip:${encodeStepValue(grade)}:${concernSlotIndex}`
}

function makeHelpStepId(grade: string, concernSlotIndex: number, followUpOptionIndex?: number): string {
  const suffix = followUpOptionIndex === undefined ? "base" : `${followUpOptionIndex}`
  return `step-help:${encodeStepValue(grade)}:${concernSlotIndex}:${suffix}`
}

function makeFinalStepId(helpTypeIndex: number): string {
  return `step-final:${helpTypeIndex}`
}

function resolveConcernTip(grade: string, concern: string): ConcernTipItem {
  const gradeTips = QUICK_GUIDE_CONCERN_TIPS_BY_GRADE[grade]
  const byGrade = gradeTips?.[concern]
  if (byGrade) {
    return byGrade
  }

  const fallback = QUICK_GUIDE_DEFAULT_CONCERN_TIPS[concern]
  if (fallback) {
    return {
      title: "알아두세요",
      content: fallback,
    }
  }

  return {
    title: "알아두세요",
    content: "지금 고민을 더 구체화하면 아이에게 맞는 코칭 방향을 함께 찾을 수 있어요.",
  }
}

function resolveConcernBySlot(grade: string, concernSlotIndex: number): string {
  const concerns = QUICK_GUIDE_GRADE_INFO[grade]?.concerns ?? []
  if (concerns[concernSlotIndex]) {
    return concerns[concernSlotIndex]
  }

  if (concerns[0]) {
    return concerns[0]
  }

  if (QUICK_GUIDE_ROOT_CONCERNS[concernSlotIndex]) {
    return QUICK_GUIDE_ROOT_CONCERNS[concernSlotIndex]
  }

  return QUICK_GUIDE_ROOT_CONCERNS[0] ?? ""
}

function resolveConcernsForGrade(grade: string): string[] {
  const concerns = QUICK_GUIDE_GRADE_INFO[grade]?.concerns ?? []
  if (concerns.length > 0) {
    return concerns
  }

  return QUICK_GUIDE_ROOT_CONCERNS
}

function resolveGradeTip(grade: string): string {
  return QUICK_GUIDE_GRADE_INFO[grade]?.tip ?? ""
}

function buildQuickGuideStepGroups(): StepGroup[] {
  const stepGroups: StepGroup[] = [
    {
      id: QUICK_GUIDE_INITIAL_STEP_ID,
      botMessage: `${QUICK_GUIDE_INTRO_HEAD_MESSAGE}\n\n학년구분을 선택해주세요.`,
      options: QUICK_GUIDE_GRADE_LEVELS.map((level) => ({
        label: level.label,
        nextStep: makeGradeDetailStepId(level.key),
      })),
    },
  ]

  QUICK_GUIDE_GRADE_LEVELS.forEach((level) => {
    stepGroups.push({
      id: makeGradeDetailStepId(level.key),
      botMessage: "학년을 선택해주세요.",
      options: level.grades.map((grade) => ({
        label: grade,
        nextStep: makeConcernStepId(grade),
      })),
    })
  })

  const allGrades = QUICK_GUIDE_GRADE_LEVELS.flatMap((level) => level.grades)

  allGrades.forEach((grade) => {
    const concerns = resolveConcernsForGrade(grade)
    const gradeTip = resolveGradeTip(grade)

    stepGroups.push({
      id: makeConcernStepId(grade),
      botMessage: "지금 가장 마음에 걸리는 게 뭔가요?",
      questions: gradeTip
        ? [
            {
              label: "💡 알고 계셨나요?",
              description: gradeTip,
            },
          ]
        : undefined,
      options: concerns.map((concern, concernSlotIndex) => ({
        label: concern,
        nextStep: makeConcernTipStepId(grade, concernSlotIndex),
      })),
    })

    concerns.forEach((_, concernSlotIndex) => {
      const concern = resolveConcernBySlot(grade, concernSlotIndex)
      const concernTip = resolveConcernTip(grade, concern)
      const followUpOptions =
        concernTip.hasFollowUpQuestion && concernTip.followUpOptions?.length ? concernTip.followUpOptions : []
      const hasFollowUpFlow = followUpOptions.length > 0

      stepGroups.push({
        id: makeConcernTipStepId(grade, concernSlotIndex),
        botMessage: hasFollowUpFlow ? concernTip.followUpQuestion ?? "지금 상황에 가장 가까운 항목을 선택해주세요." : "어떤 방식으로 도움받고 싶으세요?",
        questions: [
          {
            label: `💡 ${concernTip.title}`,
            description: concernTip.content,
          },
        ],
        options: hasFollowUpFlow
          ? followUpOptions.map((followUpOption, followUpOptionIndex) => ({
              label: followUpOption,
              nextStep: makeHelpStepId(grade, concernSlotIndex, followUpOptionIndex),
            }))
          : undefined,
        cta: !hasFollowUpFlow,
      })

      if (!hasFollowUpFlow) {
        return
      }

      followUpOptions.forEach((followUpOption, followUpOptionIndex) => {
        const followUpResponse = concernTip.followUpResponses?.[followUpOption] ?? ""

        stepGroups.push({
          id: makeHelpStepId(grade, concernSlotIndex, followUpOptionIndex),
          botMessage: "어떤 방식으로 도움받고 싶으세요?",
          questions: followUpResponse
            ? [
                {
                  label: "💡 이렇게 살펴볼 수 있어요",
                  description: followUpResponse,
                },
              ]
            : undefined,
          cta: true,
        })
      })
    })
  })

  QUICK_GUIDE_HELP_TYPES.forEach((helpType, helpTypeIndex) => {
    stepGroups.push({
      id: makeFinalStepId(helpTypeIndex),
      botMessage: "우리 아이에게 맞는 방법, 같이 찾아드릴게요.",
      checkpoint: [...QUICK_GUIDE_FINAL_CHECKLIST],
      questions: [
        {
          label: helpType.label,
          description: helpType.description || "(설명 없음)",
        },
      ],
      cta: true,
    })
  })

  return stepGroups
}

export const QUICK_GUIDE_DATA: GuideData = buildQuickGuideStepGroups()
