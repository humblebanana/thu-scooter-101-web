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
          <div className="flex items-center gap-3">
            <Image
              src="/icon.svg"
              alt="THU Electric Bike Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <Link href="/" className="text-2xl font-bold text-gray-900">
              THU-电动车-101
            </Link>
          </div>
          
          <div className="flex items-center gap-8">
            <ul className="hidden md:flex space-x-8">
              <li>
                <Link 
                  href="/buying-guide" 
                  className="text-gray-600 hover:text-gray-900 font-medium relative
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
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header