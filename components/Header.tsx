"use client"

import Link from 'next/link'
import Image from 'next/image'
import LanguageToggle from './LanguageToggle'
import { useLanguage } from '@/contexts/LanguageContext'

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3">
            <Link href="/">
              <Image
                src="/icon.svg"
                alt="THU Electric Bike Logo"
                width={32}
                height={32}
                className="w-6 h-6 md:w-8 md:h-8"
              />
            </Link>
            <Link href="/" className="hidden md:block md:text-2xl font-bold text-gray-900">
              THU-电动车-101
            </Link>
          </div>
          
          <nav className="flex items-center">
            <ul className="flex space-x-3 md:space-x-8 text-xs md:text-base">
              <li>
                <Link 
                  href="/buying-guide" 
                  className="text-gray-600 hover:text-gray-900 font-medium relative whitespace-nowrap
                    after:content-[''] after:absolute after:left-0 after:bottom-[-4px]
                    after:h-[2px] after:w-0 after:bg-gray-900 after:transition-all
                    hover:after:w-full"
                >
                  购买指南
                </Link>
              </li>
              <li>
                <Link 
                  href="/usage-guide" 
                  className="text-gray-600 hover:text-gray-900 font-medium relative
                    after:content-[''] after:absolute after:left-0 after:bottom-[-4px]
                    after:h-[2px] after:w-0 after:bg-gray-900 after:transition-all
                    hover:after:w-full"
                >
                  使用指南
                </Link>
              </li>
              <li>
                <Link 
                  href="/repair-maintenance" 
                  className="text-gray-600 hover:text-gray-900 font-medium relative
                    after:content-[''] after:absolute after:left-0 after:bottom-[-4px]
                    after:h-[2px] after:w-0 after:bg-gray-900 after:transition-all
                    hover:after:w-full"
                >
                  维修保养
                </Link>
              </li>
              <li>
                <Link 
                  href="/laws-safety" 
                  className="text-gray-600 hover:text-gray-900 font-medium relative
                    after:content-[''] after:absolute after:left-0 after:bottom-[-4px]
                    after:h-[2px] after:w-0 after:bg-gray-900 after:transition-all
                    hover:after:w-full"
                >
                  法规安全
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq" 
                  className="text-gray-600 hover:text-gray-900 font-medium relative
                    after:content-[''] after:absolute after:left-0 after:bottom-[-4px]
                    after:h-[2px] after:w-0 after:bg-gray-900 after:transition-all
                    hover:after:w-full"
                >
                  常见问题
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header