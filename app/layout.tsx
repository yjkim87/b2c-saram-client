import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/shared/ui/toaster'
import { MobileFloatingReservationCTA } from '@/shared/ui/mobile-floating-reservation-cta'
import { ScrollToTopOnRouteChange } from '@/shared/providers/scroll-to-top'
import { GlobalFloatingBanner } from '@/shared/providers/global-floating-banner'
import './globals.css'

const geist = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist"
});

export const metadata: Metadata = {
  title: {
    default: '사발면 | 사람의 발견을 원하면',
    template: '%s | 사발면',
  },
  description: '검증된 데이터와 전문가 네트워크를 통해 양육과 아이의 성장을 변화시켜 줍니다.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={geist.variable}>
      <body className="font-sans antialiased">
        <ScrollToTopOnRouteChange />
        {children}
        <GlobalFloatingBanner />
        <MobileFloatingReservationCTA />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
