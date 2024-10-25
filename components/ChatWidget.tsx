'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { MessageCircle, X, Send } from 'lucide-react'

interface Message {
  text: string;
  isUser: boolean;
}

const ChatWidget: React.FC = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [suggestedQuestions] = useState([
    "如何申请电动车牌照?",
    "电动车充电站在哪里?",
    "电动车最高时速是多少?",
    "如何正确保养电动车电池?"
  ])

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleRouteChange = () => {
      // 添加页面过渡效果
      document.body.classList.add('page-transition');
      setTimeout(() => {
        document.body.classList.remove('page-transition');
      }, 300); // 过渡时间
    };

    // 注意：Next.js 13+ 的 App Router 不再使用 events
    // 如果你使用的是 Pages Router，可以保留这些代码
    // 如果使用 App Router，可以考虑使用其他方式来处理路由变化
    // router.events.on('routeChangeStart', handleRouteChange);
    // return () => {
    //   router.events.off('routeChangeStart', handleRouteChange);
    // };
  }, [router, isMounted]);

  const handleSendMessage = (text: string) => {
    if (text.trim() === '') return

    const newMessages = [
      ...messages,
      { text, isUser: true },
      { text: `您问了: "${text}"。我们正在处理您的问题,请稍候。`, isUser: false }
    ]
    setMessages(newMessages)
    setInputText('')
  }

  if (!isMounted) {
    return null; // 或者返回一个加载指示器
  }

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <MessageCircle size={32} />
        </button>
      </div>

      {isChatOpen && (
        <div className="fixed bottom-24 right-8 w-96 h-[32rem] bg-white border border-gray-200 rounded-lg shadow-2xl z-50 flex flex-col transition-all duration-300 ease-in-out transform scale-100 opacity-100">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">THU Scooter 助手</h3>
            <button 
              onClick={() => setIsChatOpen(false)} 
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            <p className="text-gray-600 mb-4">您好!我是THU Scooter助手。有什么可以帮助您的吗?</p>
            {messages.length === 0 && (
              <div className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
                    onClick={() => handleSendMessage(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.isUser ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${message.isUser ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  {message.text}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                placeholder="输入您的问题..."
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
              />
              <button 
                onClick={() => handleSendMessage(inputText)}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-2 rounded-r-md hover:shadow-md transition-all duration-200 transform hover:scale-105"
              >
                <Send size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatWidget
