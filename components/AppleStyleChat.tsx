'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export default function AppleStyleChat() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isInitialState, setIsInitialState] = useState(true);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, isUser: true }]);
      setInputText('');
      setIsInitialState(false);
      // 这里可以添加发送消息到后端的逻辑
      // 模拟AI回复
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "这是一个AI回复的示例。", isUser: false }]);
      }, 1000);
    }
  };

  const recommendedQuestions = [
    "电动车在哪里买？",
    "哪里能停车？",
    "哪里能充电？",
    "清华现在的电动车政策是什么"
  ];

  const handleQuestionClick = (question) => {
    setInputText(question);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg">
      {isInitialState ? (
        <>
          <h1 className="text-3xl font-bold text-center mb-8">关于在清华骑电动车，我能帮你什么</h1>
          
          <div className="bg-gray-100 rounded-full p-2 flex items-center mb-6 transition-all duration-300 hover:bg-gray-200">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="给 THU Scooter 老铁发消息"
              className="flex-grow bg-transparent outline-none px-4"
            />
            <button onClick={handleSendMessage} className="p-2 transition-transform duration-300 hover:scale-110">
              <Send size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {recommendedQuestions.map((question, index) => (
              <button 
                key={index} 
                className="bg-gray-200 rounded-lg p-3 text-left text-sm text-gray-700 transition-all duration-300 hover:bg-gray-300 hover:shadow-md transform hover:-translate-y-1"
                onClick={() => handleQuestionClick(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="h-96 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:shadow-inner">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.isUser ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg transition-all duration-300 ${message.isUser ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                  {message.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="输入您的问题..."
              className="flex-grow p-2 border-none rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <button 
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded-r-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              <Send size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
