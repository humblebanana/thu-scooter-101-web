"use client"

import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import Link from 'next/link'
import LanguageToggle from './LanguageToggle'

const Header = () => {
  const { t, language } = useLanguage()

  const navLinks = [
    { href: '/buying-guide', key: 'buyingGuide' },
    { href: '/usage-guide', key: 'usageGuide' },
    { href: '/repair-maintenance', key: 'repairMaintenance' },
    { href: '/laws-safety', key: 'lawsSafety' },
    { href: '/faq', key: 'faq' }
  ]

  const siteName = {
    zh: 'THU-电动车-101',
    en: 'THU-Scooter-101'
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3">
            <Link href="/">
              <Image
                src="/icon.svg"
                alt={language === 'zh' ? 'THU电动车Logo' : 'THU Scooter Logo'}
                width={32}
                height={32}
                className="w-6 h-6 md:w-8 md:h-8"
              />
            </Link>
            <Link href="/" className="hidden md:block md:text-2xl font-bold text-gray-900">
              {siteName[language]}
            </Link>
          </div>
          
          <nav className="flex items-center space-x-4">
            <ul className="flex space-x-3 md:space-x-8 text-xs md:text-base">
              {navLinks.map(({ href, key }) => (
                <li key={href}>
                  <Link 
                    href={href} 
                    className="text-gray-600 hover:text-gray-900 font-medium relative whitespace-nowrap
                      after:content-[''] after:absolute after:left-0 after:bottom-[-4px]
                      after:h-[2px] after:w-0 after:bg-gray-900 after:transition-all
                      hover:after:w-full"
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
            <LanguageToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header