"use client"

import Link from 'next/link'
import LanguageToggle from './LanguageToggle'
import { useLanguage } from '@/contexts/LanguageContext'

const Header = () => {
  const { t } = useLanguage()
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            {t('nav.home')}
          </Link>
          
          <div className="flex items-center gap-8">
            <ul className="hidden md:flex space-x-8">
              <li>
                <Link href="/buying-guide" className="text-gray-600 hover:text-gray-900 transition-colors">
                  {t('nav.buyingGuide')}
                </Link>
              </li>
              <li>
                <Link href="/usage-guide" className="text-gray-600 hover:text-gray-900 transition-colors">
                  {t('nav.usageGuide')}
                </Link>
              </li>
              <li>
                <Link href="/repair-maintenance" className="text-gray-600 hover:text-gray-900 transition-colors">
                  {t('nav.repairMaintenance')}
                </Link>
              </li>
              <li>
                <Link href="/laws-safety" className="text-gray-600 hover:text-gray-900 transition-colors">
                  {t('nav.lawsSafety')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors">
                  {t('FAQ')}
                </Link>
              </li>
            </ul>
            
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header