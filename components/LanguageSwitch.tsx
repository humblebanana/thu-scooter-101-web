import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
      className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
    >
      {language === 'zh' ? 'English' : '中文'}
    </button>
  )
} 