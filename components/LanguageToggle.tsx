import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

const LanguageToggle = () => {
  const [currentLang, setCurrentLang] = useState('zh')
  const router = useRouter()

  useEffect(() => {
    // 从 localStorage 获取已保存的语言设置
    const savedLang = localStorage.getItem('language')
    if (savedLang) {
      setCurrentLang(savedLang)
    }
  }, [])

  const toggleLanguage = () => {
    const newLang = currentLang === 'zh' ? 'en' : 'zh'
    setCurrentLang(newLang)
    localStorage.setItem('language', newLang)
    // 这里可以触发语言切换事件
    window.dispatchEvent(new Event('languageChange'))
  }

  return (
    <Button
      onClick={toggleLanguage}
      variant="ghost"
      className="font-semibold"
    >
      {currentLang === 'zh' ? 'EN' : '中文'}
    </Button>
  )
}

export default LanguageToggle 