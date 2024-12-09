'use client'

import React, { useState, useEffect } from 'react'
import AppleStyleChat from '@/components/AppleStyleChat'
import Link from 'next/link'
import Image from 'next/image'
import { Bike, Book, Wrench, Shield, HelpCircle } from 'lucide-react'
import WelcomeCard from '@/components/WelcomeCard'
import BlurIn from "@/components/ui/blur-in"
import { RainbowButton } from "@/components/ui/rainbow-button"
import { useLanguage } from '@/contexts/LanguageContext'

export default function Home() {
  const [showContent, setShowContent] = useState(true)
  const { t } = useLanguage()
  
  useEffect(() => {
    // 获取上次访问的日期
    const lastVisitDate = localStorage.getItem('lastVisitDate')
    const today = new Date().toDateString()
    
    // 如果今天没有访问过，显示欢迎界面
    if (lastVisitDate !== today) {
      setShowContent(false)
      localStorage.setItem('lastVisitDate', today)
    } else {
      setShowContent(true)
    }
  }, [])

  const sections = [
    { 
      title: t('home.sections.buyingGuide.title'), 
      icon: Bike, 
      href: "/buying-guide", 
      description: t('home.sections.buyingGuide.description') 
    },
    { 
      title: t('home.sections.usageGuide.title'), 
      icon: Book, 
      href: "/usage-guide", 
      description: t('home.sections.usageGuide.description') 
    },
    { 
      title: t('home.sections.repairMaintenance.title'), 
      icon: Wrench, 
      href: "/repair-maintenance", 
      description: t('home.sections.repairMaintenance.description') 
    },
    { 
      title: t('home.sections.lawsSafety.title'), 
      icon: Shield, 
      href: "/laws-safety", 
      description: t('home.sections.lawsSafety.description') 
    },
    { 
      title: t('home.sections.faq.title'), 
      icon: HelpCircle, 
      href: "/faq", 
      description: t('home.sections.faq.description') 
    },
  ]

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {!showContent ? (
          <>
            <WelcomeCard />
            <div className="flex-grow flex items-center justify-center p-8 sm:p-20">
              <div className="text-center">
                <BlurIn
                  word={t('home.welcome.mainTitle')}
                  className="text-2xl sm:text-4xl font-bold mb-6 bg-gradient-to-t from-gray-800 to-gray-400 text-transparent bg-clip-text whitespace-nowrap"
                />
                <BlurIn
                  word={t('home.welcome.subTitle')}
                  className="text-xl sm:text-4xl font-bold mb-6 bg-gradient-to-t from-gray-800 to-gray-400 text-transparent bg-clip-text whitespace-nowrap"
                />
                <div className="opacity-0 animate-fadeIn">
                  <RainbowButton 
                    onClick={() => setShowContent(true)}
                    className="hover:scale-105"
                  >
                    {t('home.welcome.startButton')}
                  </RainbowButton>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-12">
            <div className="w-full max-w-4xl mx-auto mb-12 pt-[50px]">
              <AppleStyleChat />
            </div>
            <section className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 w-full max-w-6xl">
              {sections.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                  <item.icon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500 mb-3 sm:mb-5" />
                  <h2 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{item.title}</h2>
                  <p className="text-gray-600 mb-2 sm:mb-3 text-xs sm:text-sm">{item.description}</p>
                  <Link
                    href={item.href}
                    className="inline-block bg-gradient-to-r from-gray-600 to-gray-400 text-white px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full hover:bg-black transition-colors duration-300 font-semibold"
                  >
                    {t('home.sections.learnMore')}
                  </Link>
                </div>
              ))}
            </section>
          </div>
        )}
      </div>
    </>
  );
}
