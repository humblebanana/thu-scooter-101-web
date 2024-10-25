'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

// 定义消息类
interface Message {
  id: number;
  content: string;
  isUser: boolean;
}

// 添加新的类型定义
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function AppleStyleChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialState, setIsInitialState] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function sendMessage(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    try {
      setIsLoading(true);
      setIsInitialState(false);
      
      // 添加用户消息
      const userMessage: Message = {
        id: Date.now(),
        content: inputValue,
        isUser: true
      };
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');

      // 准备发送给API的消息历史
      const chatMessages: ChatMessage[] = messages.map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.content
      }));
      chatMessages.push({ role: 'user', content: inputValue });

      // 发送请求到API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: chatMessages }),
      });

      if (!response.ok) {
        throw new Error('无法获取回复');
      }

      // 处理流式响应
      const reader = response.body?.getReader();
      let aiMessageContent = '';

      if (reader) {
        // 添加一个空的AI消息
        const aiMessage: Message = {
          id: Date.now() + 1,
          content: '',
          isUser: false
        };
        setMessages(prev => [...prev, aiMessage]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          // 将 Uint8Array 转换为文本
          const text = new TextDecoder().decode(value);
          aiMessageContent += text;
          
          // 更新最后一条消息
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].content = aiMessageContent;
            return newMessages;
          });
        }
      }

    } catch (error) {
      console.error('发送消息时出错:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        content: '抱歉，发生了一些错误。请稍后再试。',
        isUser: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  const recommendedQuestions = [
    "电动车在哪里买？",
    "哪里能停车？",
    "哪里能充电？",
    "清华现在的电动车政策是什么"
  ];

  const handleQuestionClick = async (question: string) => {
    try {
      setIsLoading(true);
      setIsInitialState(false);
      
      // 直接使用问题内容，而不是依赖 inputValue
      const userMessage: Message = {
        id: Date.now(),
        content: question,
        isUser: true
      };
      setMessages(prev => [...prev, userMessage]);

      // 准备发送给API的消息历史
      const chatMessages: ChatMessage[] = messages.map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.content
      }));
      chatMessages.push({ role: 'user', content: question });

      // 发送请求到API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: chatMessages }),
      });

      if (!response.ok) {
        throw new Error('无法获取回复');
      }

      // 处理流式响应
      const reader = response.body?.getReader();
      let aiMessageContent = '';

      if (reader) {
        // 添加一个空的AI消息
        const aiMessage: Message = {
          id: Date.now() + 1,
          content: '',
          isUser: false
        };
        setMessages(prev => [...prev, aiMessage]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          // 将 Uint8Array 转换为文本
          const text = new TextDecoder().decode(value);
          aiMessageContent += text;
          
          // 更新最后一条消息
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].content = aiMessageContent;
            return newMessages;
          });
        }
      }

    } catch (error) {
      console.error('发送消息时出错:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        content: '抱歉，发生了一些错误。请稍后再试。',
        isUser: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-transparent rounded-2xl  transition-all duration-300 hover:shadow-lg">
      {isInitialState ? (
        <>
          <h1 className="text-3xl font-bold text-center mb-8">我是清华老司机，让我跟聊聊清华骑电动车</h1>
          
          <div className="bg-gray-100 rounded-full p-2 flex items-center mb-6 transition-all duration-300 hover:bg-gray-200">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="🛵给清华老司机发消息"
              className="flex-grow bg-transparent outline-none px-4"
              onKeyPress={handleKeyPress}
            />
            <button onClick={() => sendMessage()} className="p-2 transition-transform duration-300 hover:scale-110">
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
                <span className={`inline-block p-2 rounded-lg transition-all duration-300 ${message.isUser ? 'bg-transparent border-gray-200 text-black hover:bg-gray-200' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                  {message.content}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center bg-gray-100 rounded-full p-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="输入您的问题..."
              className="flex-grow p-2 bg-transparent border-none focus:outline-none"
              onKeyPress={handleKeyPress}
            />
            <button 
              onClick={() => sendMessage()}
              className="bg-transparent text-black-500 p-2 rounded-full transition-all duration-300 transform hover:scale-110"
            >
              <Send size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
