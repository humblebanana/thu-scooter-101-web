import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WelcomeCard from '@/components/WelcomeCard'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import FeedbackButton from '@/components/FeedbackButton'
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'THU Scooter 101',
  description: '清华电动车指南',
  icons: {
    icon: [
      { url: '/icon.png', sizes: '180x180', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <WelcomeCard />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children} 
            </main>
            <Footer />
          </div>
        </LanguageProvider>
        <Toaster />
        <Analytics />
        {process.env.NODE_ENV === 'production' && (
          <script defer src="https://hm.baidu.com/hm.js?YOUR_BAIDU_ANALYTICS_ID"></script>
        )}
        <FeedbackButton />
      </body>
    </html>
  )
}