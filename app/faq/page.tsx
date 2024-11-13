'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState, useEffect } from 'react'

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)
  const [faqItems, setFaqItems] = useState<FAQItem[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFAQData() {
      try {
        const response = await fetch('/api/faq');
        if (!response.ok) {
          throw new Error('Failed to fetch FAQ data');
        }
        const data = await response.json();
        setFaqItems(data);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : '获取FAQ数据时发生未知错误';
        setError(errorMessage);
        console.error('获取FAQ数据失败:', e);
      }
    }

    fetchFAQData();
  }, []);

  return (
    <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="space-y-8 sm:space-y-12">
        <section className="text-center space-y-2 sm:space-y-4">
          <h1 className="text-2xl sm:text-4xl font-bold">常见问题</h1>
          <p className="text-sm sm:text-xl text-gray-600">
            找到关于电动车购买、使用和维护的常见问题解答
          </p>
        </section>

        <section className="space-y-3 sm:space-y-6">
          {error ? (
            <p className="text-red-500 text-sm sm:text-base">错误: {error}</p>
          ) : faqItems.length === 0 ? (
            <p className="text-sm sm:text-base">正在加载FAQ数据...</p>
          ) : (
            faqItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <button
                  className="w-full text-left p-3 sm:p-6 focus:outline-none"
                  onClick={() => setOpenQuestion(openQuestion === item.id ? null : item.id)}
                >
                  <div className="flex justify-between items-center gap-4">
                    <h2 className="text-sm sm:text-lg font-semibold">{item.question}</h2>
                    {openQuestion === item.id ? (
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </div>
                </button>
                {openQuestion === item.id && (
                  <div className="px-3 sm:px-6 pb-3 sm:pb-6">
                    <p className="text-xs sm:text-base text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  )
}
