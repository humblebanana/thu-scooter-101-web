"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '@/locales/translations'
import type { Translations } from '@/types/translations'

type LanguageContextType = {
  language: keyof Translations
  setLanguage: (lang: keyof Translations) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'zh',
  setLanguage: () => {},
  t: (key: string) => key
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<keyof Translations>('zh')

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as keyof Translations
    if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
      setLanguage(savedLang)
    }
  }, [])

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k as keyof typeof value]
      }
    }
    
    if (typeof value !== 'string') {
      console.warn(`Translation missing for key: ${key}`)
      return key
    }
    
    return value
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)