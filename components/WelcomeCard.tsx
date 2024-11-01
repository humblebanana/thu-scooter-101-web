"use client"

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const WelcomeCard = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { language } = useLanguage()

  useEffect(() => {
    // 检查是否已经显示过
    const hasShown = localStorage.getItem('welcomeModalShown')
    if (!hasShown) {
      setIsVisible(true)
      localStorage.setItem('welcomeModalShown', 'true')
    }
  }, [])

  if (!isVisible) return null

  const content = {
    zh: {
      title: "清华大学近年来对于电动车出行的规定日趋严谨，以下仅截取学校部分相关规定供大家参考。",
      sections: [
        {
          title: "1. 电动车进入校园规定",
          items: [
            "必须悬挂正规号牌,临时标识不可进校园",
            "校内限速15公里/小时",
            "必须避让行人和自行车",
            "禁止鸣笛和骑车使用手机"
          ]
        },
        {
          title: "2. 电池管理规定",
          items: [
            "电动车及电池禁止进入教学楼、科研楼、办公楼",
            "电动车及电池禁止进入学生公寓",
            "禁止在公寓给电动车充电"
          ]
        },
        {
          title: "3. 电子标签管理",
          items: [
            "2019年4月30日后不再办理新的电子标签",
            "2021年11月1日起临时标识车辆禁止上路"
          ]
        }
      ],
      footer: "以上仅为部分规定摘要,建议同学们仔细阅读完整的管理办法再做决定。"
    },
    en: {
      title: "Tsinghua University E-bike Management Regulations",
      sections: [
        {
          title: "1. Campus Entry Regulations",
          items: [
            "Must have official license plate, temporary tags not allowed",
            "Speed limit 15km/h on campus",
            "Must yield to pedestrians and bicycles",
            "No honking or using phone while riding"
          ]
        },
        {
          title: "2. Battery Management",
          items: [
            "E-bikes and batteries prohibited in academic buildings",
            "E-bikes and batteries prohibited in student dormitories",
            "Charging in dormitories is prohibited"
          ]
        },
        {
          title: "3. Electronic Tag Management",
          items: [
            "No new electronic tags issued after April 30, 2019",
            "Vehicles with temporary tags prohibited after November 1, 2021"
          ]
        }
      ],
      footer: "Above is only a summary. Students are advised to read the complete regulations before making decisions."
    }
  }

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
          {content[language as keyof typeof content].title}
        </h2>
        
        <div className="space-y-4">
          {content[language as keyof typeof content].sections.map((section, index) => (
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
          {content[language as keyof typeof content].footer}
        </p>
      </div>
    </div>
  )
}

export default WelcomeCard