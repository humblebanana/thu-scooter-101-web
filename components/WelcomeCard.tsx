"use client"

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface ContentSection {
  title: string
  items: string[]
}

interface ContentType {
  title: string
  sections: ContentSection[]
  footer: string
}

interface WelcomeContent {
  [key: string]: ContentType
}

const WelcomeCard = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [content, setContent] = useState<WelcomeContent | null>(null)
  const { language } = useLanguage()

  useEffect(() => {
    // 检查是否已经显示过
    const hasShown = localStorage.getItem('welcomeModalShown')
    if (!hasShown) {
      setIsVisible(true)
      localStorage.setItem('welcomeModalShown', 'true')
    }

    // 获取内容数据
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/welcome')
        const data = await response.json()
        setContent(data)
      } catch (error) {
        console.error('Failed to fetch welcome content:', error)
      }
    }

    fetchContent()
  }, [])

  if (!isVisible || !content) return null

  const currentContent = content[language as keyof typeof content]

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {currentContent.title}
        </h2>
        
        <div className="space-y-4">
          {currentContent.sections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-800 mb-2">{section.title}</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm text-gray-500 italic">
          {currentContent.footer}
        </p>
      </div>
    </div>
  )
}

export default WelcomeCard