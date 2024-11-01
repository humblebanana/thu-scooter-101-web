"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    const newLang = language === 'zh' ? 'en' : 'zh'
    console.log('Switching language from', language, 'to', newLang)
    setLanguage(newLang)
    localStorage.setItem('language', newLang)
  }

  return (
    <Button
      onClick={toggleLanguage}
      variant="ghost"
      className="font-semibold"
    >
      {language === 'zh' ? 'EN' : '中文'}
    </Button>
  )
}

export default LanguageToggle 