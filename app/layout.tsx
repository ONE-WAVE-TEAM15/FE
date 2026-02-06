import React from "react"
import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR } from 'next/font/google'

import './globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-noto-sans-kr',
})

export const metadata: Metadata = {
  title: '컴패스',
  description: 'Comp-Pass의 새로운 가족이 되어주세요. 꿈꾸던 기업으로의 여정, 가장 체계적인 로드맵을 제시해 드립니다.',
}

export const viewport: Viewport = {
  themeColor: '#FF5A5F',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
