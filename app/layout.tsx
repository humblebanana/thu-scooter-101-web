import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WelcomeCard from '@/components/WelcomeCard'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'THU Scooter 101',
  description: '清华大学电动车全方位指南',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
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
      </body>
    </html>
  )
}