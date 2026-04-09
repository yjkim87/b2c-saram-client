import type { Metadata } from 'next'
import { Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
  title: "\uc0ac\ubc1c\uba74 \uc13c\ud130 | \ubc1c\ub2ec\uc2ec\ub9ac \uc804\ubb38 \ucf54\uce9c",
  description: "0\uc138\ubd80\ud130 18\uc138\uae4c\uc9c0, \ubc1c\ub2ec\uc2ec\ub9ac\ud559\uc744 \uae30\ubc18\uc73c\ub85c \ud55c \ub9de\uce61\ud615 \uc2ec\ub9ac \ucf54\uce9c\uc73c\ub85c \uc544\uc774\uc758 \uc7a0\uc7ac\ub825\uc744 \uae68\uc6cc\ub4dc\ub9bd\ub2c8\ub2e4.",
  generator: "v0.dev",
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
        <Analytics />
      </body>
    </html>
  )
}
