import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/locales/translations'
import type { TranslationType } from '@/types/translations'

export function useTranslation() {
  const { language } = useLanguage()

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language as keyof typeof translations]
    
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

  return { t }
} 