'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)

  const questions = [
    {
      question: "如何选择适合我的电动车？",
      answer: "选择电动车时，考虑您的日常使用场景、所需续航里程、预算等因素。建议您查看我们的购买指南，了解更多详细信息。"
    },
    {
      question: "在校园内哪里可以给电动车充电？",
      answer: "清华大学校园内设有多个充电站，主要分布在宿舍区、教学楼周边和图书馆附近。您可以在使用指南页面查看详细的充电站地图。"
    },
    {
      question: "电动车需要定期保养吗？",
      answer: "是的，定期保养可以延长电动车的使用寿命。建议每3-6个月进行一次全面检查，包括轮胎、刹车、电池等部件。详细的保养建议可以在维修与保养页面查看。"
    },
    {
      question: "如何处理电动车故障？",
      answer: "对于简单故障，可以参考我们的维修与保养页面进行自行处理。如遇复杂问题，建议联系专业维修点。您可以在维修与保养页面找到推荐的维修点信息。"
    },
    {
      question: "在校园内骑行电动车有哪些注意事项？",
      answer: "请遵守校园限速规定，不超过15km/h；停放在指定区域；禁止载人；注意行人安全。更多安全骑行建议，请查看法规与安全页面。"
    }
  ]

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-12">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">常见问题</h1>
          <p className="text-xl text-gray-600">
            找到关于电动车购买、使用和维护的常见问题解答
          </p>
        </section>

        <section className="space-y-6">
          {questions.map((q, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md">
              <button
                className="w-full text-left p-6 focus:outline-none"
                onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{q.question}</h2>
                  {openQuestion === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </button>
              {openQuestion === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600">{q.answer}</p>
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}
