"use client"

import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import Link from 'next/link'
import LanguageToggle from './LanguageToggle'

const Header = () => {
  const { t, language } = useLanguage()

  const navLinks = [
    { 
      href: '/buying-guide', 
      key: 'buyingGuide',
      zhLabel: ['购买', '指南'],
      enLabel: ['Buying', 'Guide']
    },
    { 
      href: '/usage-guide', 
      key: 'usageGuide',
      zhLabel: ['使用', '指南'],
      enLabel: ['Usage', 'Guide']
    },
    { 
      href: '/repair-maintenance', 
      key: 'repairMaintenance',
      zhLabel: ['维修', '保养'],
      enLabel: ['Repair','Guide']
    },
    { 
      href: '/laws-safety', 
      key: 'lawsSafety',
      zhLabel: ['法规', '安全'],
      enLabel: ['Laws &', 'Safety']
    },
    { 
      href: '/faq', 
      key: 'faq',
      zhLabel: ['常见', '问题'],
      enLabel: ['FAQ', '']
    }
  ]

  const siteName = {
    zh: 'THU-电动车-101',
    en: 'THU-Scooter-101'
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/icon.svg"
                alt={language === 'zh' ? 'THU电动车Logo' : 'THU Scooter Logo'}
                width={32}
                height={32}
                className="w-7 h-7 md:w-8 md:h-8"
                priority
              />
              <span className="hidden md:block text-xl font-bold text-gray-900 ml-3">
                {siteName[language]}
              </span>
            </Link>
          </div>
          
          {/* Navigation Section */}
          <nav className="flex items-center">
            <ul className="flex items-center">
              {navLinks.map(({ href, key, zhLabel, enLabel }, index) => (
                <li key={href} className={`
                  ${language === 'zh' ? 'mx-2.5 md:mx-5' : 'mx-2 md:mx-4'}
                  ${index === navLinks.length - 1 ? 'mr-3 md:mr-6' : ''}
                `}>
                  <Link 
                    href={href} 
                    className="text-gray-600 hover:text-gray-900 font-medium relative block text-center
                      after:content-[''] after:absolute after:left-0 after:bottom-[-4px]
                      after:h-[2px] after:w-0 after:bg-gray-900 after:transition-all
                      hover:after:w-full"
                  >
                    {/* Desktop Version */}
                    <span className="hidden md:block whitespace-nowrap">
                      {t(`nav.${key}`)}
                    </span>
                    {/* Mobile Version - Two Lines */}
                    <span className="md:hidden flex flex-col items-center text-xs leading-tight">
                      <span>{language === 'zh' ? zhLabel[0] : enLabel[0]}</span>
                      <span>{language === 'zh' ? zhLabel[1] : enLabel[1]}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pl-1 md:pl-2 scale-90 md:scale-100">
              <LanguageToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header