import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'معمل سلمى التعليمي | منصة تعليمية تفاعلية',
  description: 'منصة تعليمية تفاعلية للطالبات - ابني مملكتك الرياضية',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/logo/شعار (1).png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-tajawal">{children}</body>
    </html>
  )
}
