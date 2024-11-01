"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '@/locales/translations'

type LanguageContextType = {
  language: string
  t: (key: string) => string
  setLanguage: (lang: string) => void
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'zh',
  t: () => '',
  setLanguage: () => {}
})

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState('zh')

  // 翻译函数
  const t = (key: string): string => {
    try {
      const keys = key.split('.')
      let current: any = translations[language as keyof typeof translations]
      
      for (const k of keys) {
        if (current[k] === undefined) {
          console.warn(`Translation key not found: ${key}`)
          return key
        }
        current = current[k]
      }
      
      return current || key
    } catch (error) {
      console.error('Translation error:', error)
      return key
    }
  }

  // 初始化语言设置
  useEffect(() => {
    const savedLang = localStorage.getItem('language')
    if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
      setLanguage(savedLang)
    }
  }, [])

  // 语言变更处理
  const handleLanguageChange = (newLang: string) => {
    if (newLang === 'zh' || newLang === 'en') {
      setLanguage(newLang)
      localStorage.setItem('language', newLang)
      // 触发重新渲染
      window.dispatchEvent(new Event('languageChange'))
    }
  }

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        t, 
        setLanguage: handleLanguageChange 
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}