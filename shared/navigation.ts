export type NavigationItem = {
  title: string
  href: string
}

export type NavigationGroup = {
  title: string
  children: NavigationItem[]
}

export const NAVIGATION: NavigationGroup[] = [
  {
    title: "맞춤형 프로그램",
    children: [
      { title: "연령별 발달 가이드", href: "/program/age-guide" },
      { title: "상담/코칭 프로그램", href: "/program/counseling-coaching" },
    ],
  },
  {
    title: "사발면 스토리",
    children: [
      { title: "사발면 소개", href: "/about/intro" },
      { title: "전문가 소개", href: "/about/experts" },
      { title: "오시는 길", href: "/about/location" },
    ],
  },
  {
    title: "커뮤니티",
    children: [
      { title: "고객 후기", href: "/community/reviews" },
      { title: "전문가 칼럼/인터뷰", href: "/community/insights" },
      { title: "FAQ", href: "/community/faq" },
    ],
  },
]
