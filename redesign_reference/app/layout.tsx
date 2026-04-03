import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import FloatingActionMenu from '@/components/floating-action-menu'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
})

const notoSerifKR = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: "사발면 센터 | 발달심리 전문 코칭",
  description: "0세부터 18세까지, 발달심리학을 기반으로 한 맞춤형 심리 코칭으로 아이의 잠재력을 깨워드립니다.",
  generator: "v0.dev",
}

export const viewport: Viewport = {
  themeColor: "#1a2e2a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} ${notoSerifKR.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <FloatingActionMenu />
        <Analytics />
      </body>
    </html>
  )
}
