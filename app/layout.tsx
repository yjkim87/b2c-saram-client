import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
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
        url: '/icon_color-32x32.png',
        sizes: '32x32',
        type: 'image/png',
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
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KDH3XQVH');`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KDH3XQVH"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
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
