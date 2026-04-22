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
    type: "link",
    title: "사발면 소개",
    href: "/about/intro",
  },
  {
    type: "link",
    title: "전문가 소개",
    href: "/about/experts",
  },
  {
    type: "link",
    title: "오시는 길",
    href: "/about/location",
  },
]
