export type NavigationChild = {
  title: string
  href: string
}

export type NavigationGroup = {
  type: "group"
  title: string
  children: NavigationChild[]
}

export type NavigationLink = {
  type: "link"
  title: string
  href: string
}

export type NavigationEntry = NavigationGroup | NavigationLink

export const NAVIGATION: NavigationEntry[] = [
  {
    type: "group",
    title: "사발면 스토리",
    children: [
      { title: "사발면 소개", href: "/about/intro" },
      { title: "전문가 소개", href: "/about/experts" },
      { title: "오시는 길", href: "/about/location" },
    ],
  },
]
