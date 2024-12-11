'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'

const Footer = () => {
  const { t } = useLanguage()

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Description Section */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600">{t('footer.about.description')}</p>
          </div>

          {/* Logo Section */}
          <div className="flex justify-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#4E2A84]">
              <rect width="32" height="32" rx="8" fill="currentColor"/>
              <g transform="translate(4, 4) scale(0.3)" fill="white">
                <path d="M47.47,22.41a10.05,10.05,0,1,0-13.9,0,10,10,0,0,0,13.9,0ZM43.11,46.25h4.16a1.09,1.09,0,0,1,1.09,1.09,1,1,0,0,1-.19.6l-9.9,16.9a1.09,1.09,0,0,1-2-.78l1.46-10.37-4.93.09a1.09,1.09,0,0,1-1.1-1.07,1.1,1.1,0,0,1,.15-.57l9.74-16.89a1.09,1.09,0,0,1,2,.7l-.5,10.3ZM32.82,104.67h15.4v10.51a7.72,7.72,0,0,1-7.7,7.7h0a7.72,7.72,0,0,1-7.7-7.7V104.67Zm5-33.74H43.2A11.88,11.88,0,0,1,55.05,82.79v17a2,2,0,0,1-2,2H28a2,2,0,0,1-2-2v-17A11.9,11.9,0,0,1,37.85,70.93Z"/>
                <path d="M54.89,23.38A20.38,20.38,0,0,1,70.53,43.12v37.6a20.21,20.21,0,0,1-6,14.32,20.8,20.8,0,0,1-3.43,2.77V92.43l.42-.4a16,16,0,0,0,4.71-11.31V43.12a16.09,16.09,0,0,0-15.68-16,15.09,15.09,0,0,1-9.66,3c-5,0-8-1.34-10.41-3a16.05,16.05,0,0,0-15.72,16v37.6a16,16,0,0,0,4.6,11.21l.1.1.42.4v5.38A20.8,20.8,0,0,1,16.48,95l-.12-.12a20.25,20.25,0,0,1-5.84-14.2V43.12a20.18,20.18,0,0,1,6-14.32h0a20.39,20.39,0,0,1,9.66-5.41,11.12,11.12,0,0,0-7.8-3.1H5.17c-6.89,0-6.89-10.42,0-10.42H18.34C28,9.86,27.43,0,40.92,0,53.21,0,53.16,9.86,62.7,9.86H75.88c6.89,0,6.89,10.42,0,10.42H62.7a11.24,11.24,0,0,0-7.81,3.1Z"/>
              </g>
            </svg>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-right space-y-2">
            <p className="text-sm text-gray-600 flex items-center justify-center md:justify-end gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t('footer.contact.email')}
            </p>
            <p className="text-sm text-gray-600 flex items-center justify-center md:justify-end gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t('footer.contact.wechat')}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 pt-2 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer