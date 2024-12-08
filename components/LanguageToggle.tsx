"use client"

import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
      className="px-3 py-1 rounded-md text-sm font-medium text-gray-600 hover:text-purple-900 transition-colors"
    >
      {language === 'zh' ? 'EN' : '中文'}
    </button>
  )
} 